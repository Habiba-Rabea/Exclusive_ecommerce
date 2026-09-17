import { createContext, useContext } from 'react';
import { useLocalStorage } from '../Hooks/useLocalStorage';
import {
  loginUser,
  registerUser,
  refreshAccessToken,
  getProfile,
  updateProfile as updateProfileApi,
} from '../APIs/authservice';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useLocalStorage('currentUser', null);
  const [token, setToken] = useLocalStorage('user_token', null);
  const [refreshToken, setRefreshToken] = useLocalStorage('refresh_token', null);
  const [usersList, setUsersList] = useLocalStorage('users', []);

  // بيحاول يجيب البروفايل بالتوكن الحالي، ولو منتهي بيجدده تلقائيًا مرة واحدة
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
      // مش هنوقف عملية تسجيل الدخول عشان البروفايل فشل، بس نسجل الخطأ
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

  const updateProfile = async (updateData) => {
    const profileId = currentUser?.id || currentUser?.profile_id;
    const data = await updateProfileApi(profileId, updateData, token);
    updateUser(updateData);
    return data;
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
