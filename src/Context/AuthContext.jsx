import { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from '../Hooks/useLocalStorage';
import { getProfile } from '../APIs/authservice';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useLocalStorage('currentUser', null);
  const [token, setToken] = useLocalStorage('user_token', null);
  const [usersList, setUsersList] = useLocalStorage('users', []);

 useEffect(() => {
  let isMounted = true;

  async function fetchLatestUserData() {
    if (!token) return;

    const userId = currentUser?.id || currentUser?.profile_id;
    if (!userId) return;

    try {
      const profileData = await getProfile(userId);
      const normalizedUser = profileData?.user || profileData?.data || profileData;

      if (isMounted) {
        setCurrentUser(normalizedUser);
      }
    } catch (error) {
      console.error("Failed to fetch fresh user profile:", error);
    }
  }

  fetchLatestUserData();

  return () => {
    isMounted = false;
  };
}, [token]);

  const login = (userData, userToken = null) => {
  if (!userData) return;
  const userObj = userData?.user || userData?.data?.user || userData?.data || userData;
  const extractedToken = 
    userToken || 
    userData?.token || 
    userData?.access || 
    userData?.key || 
    userData?.data?.token;

  setCurrentUser(userObj);
  localStorage.setItem('currentUser', JSON.stringify(userObj));

  if (extractedToken) {
    setToken(extractedToken);
    localStorage.setItem('user_token', extractedToken);
  }
};

  const signup = (userData) => {
    const userObj = userData?.user || userData;
    setUsersList((prevUsers) => [...prevUsers, userObj]);
    setCurrentUser(userObj);
  };

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('user_token');
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

  const value = {
    currentUser,
    token,
    usersList,
    isLoggedIn: !!currentUser,
    login,
    signup,
    logout,
    updateUser,
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