import { createContext, useContext } from 'react';
import { useLocalStorage } from '../Hooks/useLocalStorage';
import {
  loginUser,
  registerUser,
  refreshAccessToken,
  getProfile,
  listProfiles,
  createProfile,
  updateProfile as updateProfileApi,
} from '../APIs/authservice';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useLocalStorage('currentUser', null);
  const [token, setToken] = useLocalStorage('user_token', null);
  const [refreshToken, setRefreshToken] = useLocalStorage('refresh_token', null);

  async function fetchProfile(accessToken) {
    try {
      return await getProfile(accessToken);
    } catch (error) {
      if (refreshToken) {
        const newAccess = await refreshAccessToken(refreshToken);
        setToken(newAccess);
        return await getProfile(newAccess);
      }
      throw error;
    }
  }

  function flattenProfile(profileData) {
    if (!profileData) return {};
    const base = profileData.user || profileData.data || profileData || {};
    const extra = base.profile_data || {};
    return { ...base, ...extra };
  }

  const login = async (email, password) => {
    const data = await loginUser({ email, password });
    setToken(data.access);
    setRefreshToken(data.refresh);

    let profileData = {};
    try {
      profileData = await fetchProfile(data.access);
    } catch (error) {
      console.error('Logged in, but failed to load profile:', error);
    }

    let profileId = null;
    let matchedProfile = null;
    try {
      const all = await listProfiles();
      const list = Array.isArray(all) ? all : all?.results || [];
      matchedProfile = list.find(
        (p) =>
          (p.username || '').toLowerCase() === email.toLowerCase() ||
          (p.username || '').toLowerCase() === (profileData?.username || '').toLowerCase()
      );
      if (matchedProfile) {
        profileId = matchedProfile.id;
      }
    } catch (e) {
      console.error('Could not list profiles after login:', e);
    }

    const flattened = flattenProfile(profileData);
    const fromMatch = matchedProfile || {};

    const userObj = {
      email,
      ...flattened,
      ...fromMatch,
      profile_id: profileId || fromMatch.id || flattened.profile_id || null,
      name:
        fromMatch.name ||
        flattened.name ||
        [flattened.firstName || flattened.first_name, flattened.lastName || flattened.last_name]
          .filter(Boolean)
          .join(' ') ||
        email,
      image: fromMatch.image ?? flattened.image ?? '',
    };

    setCurrentUser(userObj);
    return userObj;
  };

  const signup = async ({ firstName, lastName, name, email, password }) => {
    const fullName = name || [firstName, lastName].filter(Boolean).join(' ');
    return await registerUser({ name: fullName, email, password });
  };

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
    setRefreshToken(null);
  };

  const updateUser = (updatedInfo) => {
    setCurrentUser((prev) => {
      if (!prev) return prev;
      return { ...prev, ...updatedInfo };
    });
  };

  async function resolveProfileId(accessToken) {
    const email = (currentUser?.email || currentUser?.username || '').toLowerCase();

    if (currentUser?.profile_id) {
      return currentUser.profile_id;
    }

    try {
      const all = await listProfiles();
      const list = Array.isArray(all) ? all : all?.results || [];
      const mine = list.find((p) => (p.username || '').toLowerCase() === email);
      if (mine?.id) {
        setCurrentUser((prev) => (prev ? { ...prev, profile_id: mine.id } : prev));
        return mine.id;
      }
    } catch (error) {
      console.error('Failed to list profiles:', error);
    }

    const created = await createProfile(
      {
        name: currentUser?.name || currentUser?.email || 'New User',
        username: currentUser?.email || currentUser?.username || '',
        role: 'customer',
      },
      accessToken
    );
    setCurrentUser((prev) => (prev ? { ...prev, profile_id: created.id } : prev));
    return created.id;
  }

  const updateProfile = async (updateData) => {
    const attempt = async (accessToken) => {
      const profileId = await resolveProfileId(accessToken);

      const payload = {
        name: [updateData.firstName, updateData.lastName].filter(Boolean).join(' ').trim(),
      };
      if (updateData.image !== undefined) {
        payload.image = updateData.image || null;
      }

      const data = await updateProfileApi(profileId, payload, accessToken);

      const fullName = payload.name;
      const parts = fullName.split(/\s+/);
      updateUser({
        name: fullName,
        firstName: parts[0] || '',
        lastName: parts.slice(1).join(' ') || '',
        image: payload.image,
        profile_id: profileId,
      });

      return data;
    };

    try {
      return await attempt(token);
    } catch (error) {
      if (error.status === 401 && refreshToken) {
        try {
          const newAccess = await refreshAccessToken(refreshToken);
          setToken(newAccess);
          return await attempt(newAccess);
        } catch {
          logout();
          throw new Error('Your session has expired, please log in again');
        }
      }
      throw error;
    }
  };

  const refreshProfile = async () => {
    if (!currentUser?.email && !token) return null;

    try {
      const email = (currentUser?.email || currentUser?.username || '').toLowerCase();
      let matched = null;

      try {
        const all = await listProfiles();
        const list = Array.isArray(all) ? all : all?.results || [];
        matched = list.find((p) => (p.username || '').toLowerCase() === email);
      } catch (e) {
        console.warn('listProfiles in refresh failed:', e.message);
      }

      if (matched) {
        setCurrentUser((prev) => ({
          ...prev,
          ...matched,
          profile_id: matched.id,
          name: matched.name || prev?.name || prev?.email,
          image: matched.image ?? prev?.image ?? '',
          email: prev?.email || matched.username,
        }));
        return matched;
      }

      // Optional fallback to /api/me/ only if we have a token
      if (!token) return null;

      try {
        const profileData = await fetchProfile(token);
        const normalized = flattenProfile(profileData);

        if (normalized && Object.keys(normalized).length > 0) {
          setCurrentUser((prev) => ({
            ...prev,
            ...normalized,
            name:
              normalized.name ||
              [normalized.firstName || normalized.first_name, normalized.lastName || normalized.last_name]
                .filter(Boolean)
                .join(' ') ||
              prev?.name ||
              prev?.email,
          }));
        }
        return normalized;
      } catch (e) {
        console.warn('getProfile fallback failed:', e.message);
        return null;
      }
    } catch (error) {
      console.warn('refreshProfile failed:', error.message);
      return null;
    }
  };

  const value = {
    currentUser,
    token,
    isLoggedIn: !!currentUser,
    login,
    signup,
    logout,
    updateUser,
    updateProfile,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
