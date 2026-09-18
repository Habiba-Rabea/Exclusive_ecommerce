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
  const [usersList, setUsersList] = useLocalStorage('users', []);

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
    const base = profileData?.user || profileData?.data || profileData || {};
    return { ...base, ...(base.profile_data || {}) };
  }

  const login = async (email, password) => {
    const data = await loginUser({ email, password }); // { access, refresh }
    setToken(data.access);
    setRefreshToken(data.refresh);

    let profileData = {};
    try {
      profileData = await fetchProfile(data.access);
    } catch (error) {
      console.error('Logged in, but failed to load profile:', error);
    }

    const userObj = { email, ...flattenProfile(profileData) };
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
    if (!currentUser) return;

    const updatedUser = { ...currentUser, ...updatedInfo };
    setCurrentUser(updatedUser);
    setUsersList((prevUsers) =>
      prevUsers.map((user) =>
        user.email?.toLowerCase() === currentUser.email?.toLowerCase() ? updatedUser : user
      )
    );
  };

  async function resolveProfileId(accessToken) {
    if (currentUser?.profile_id) return currentUser.profile_id;

    try {
      const all = await listProfiles(accessToken);
      const mine = Array.isArray(all)
        ? all.find((p) => p.username === currentUser?.email)
        : null;
      if (mine?.id) {
        setCurrentUser((prev) => ({ ...prev, profile_id: mine.id }));
        return mine.id;
      }
    } catch (error) {
      console.error('Failed to list profiles, will try creating one:', error);
    }

    const created = await createProfile(
      {
        name: currentUser?.name || currentUser?.email || 'New User',
        username: currentUser?.email || '',
        role: 'customer',
      },
      accessToken
    );
    setCurrentUser((prev) => ({ ...prev, profile_id: created.id }));
    return created.id;
  }

  const updateProfile = async (updateData) => {
    const attempt = async (accessToken) => {
      const profileId = await resolveProfileId(accessToken);
      const data = await updateProfileApi(profileId, updateData, accessToken);
      updateUser(updateData);
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
        } catch (refreshError) {
          logout();
          throw new Error('Your session has expired, please log in again');
        }
      }
      throw error;
    }
  };

  const refreshProfile = async () => {
    if (!token) return;
    const profileData = await fetchProfile(token);
    console.log('RAW /api/api/me/ response:', profileData); // مؤقت للتشخيص - هنشيله بعدين
    const normalized = flattenProfile(profileData);
    if (normalized) setCurrentUser((prev) => ({ ...prev, ...normalized }));
  };

  const value = {
    currentUser,
    token,
    usersList,
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
