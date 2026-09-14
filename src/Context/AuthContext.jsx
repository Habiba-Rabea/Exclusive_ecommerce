import { createContext, useContext } from 'react';
import { useLocalStorage } from '../Hooks/useLocalStorage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useLocalStorage('currentUser', null);
  const [token, setToken] = useLocalStorage('user_token', null);
  const [usersList, setUsersList] = useLocalStorage('users', []);
<<<<<<< HEAD
=======

>>>>>>> temp-branch
  const login = (userData, userToken = '') => {
    setCurrentUser(userData);
    if (userToken) setToken(userToken);
  };
<<<<<<< HEAD
=======

>>>>>>> temp-branch
  const signup = (userData) => {
    setUsersList((prevUsers) => [...prevUsers, userData]);
    setCurrentUser(userData);
  };
<<<<<<< HEAD
=======

>>>>>>> temp-branch
  const logout = () => {
    setCurrentUser(null);
    setToken(null);
  };

  const updateUser = (updatedInfo) => {
    if (!currentUser) return;

    const updatedUser = { ...currentUser, ...updatedInfo };
    setCurrentUser(updatedUser);
    setUsersList((prevUsers) =>
      prevUsers.map((user) =>
<<<<<<< HEAD
        user.email === currentUser.email ? updatedUser : user
=======
        user.email.toLowerCase() === currentUser.email.toLowerCase() ? updatedUser : user
>>>>>>> temp-branch
      )
    );
  };

  const value = {
    currentUser,
    token,
<<<<<<< HEAD
=======
    usersList, 
>>>>>>> temp-branch
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