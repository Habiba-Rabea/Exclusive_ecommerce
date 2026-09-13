import { createContext, useContext } from 'react';
import { useLocalStorage } from '../Hooks/useLocalStorage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useLocalStorage('currentUser', null);
  const [token, setToken] = useLocalStorage('user_token', null);
  const [usersList, setUsersList] = useLocalStorage('users', []); 

  const login = (userData, userToken = '') => {
    setCurrentUser(userData);
    if (userToken) setToken(userToken);
  };

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
  };
  const updateUser = (updatedInfo) => {
    const updatedUser = { ...currentUser, ...updatedInfo };
    setCurrentUser(updatedUser);
    setUsersList((prevUsers) =>
      prevUsers.map((user) =>
        user.email === updatedUser.email ? updatedUser : user
      )
    );
  };

  const value = {
    currentUser,
    token,
    isLoggedIn: !!currentUser, 
    login,
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