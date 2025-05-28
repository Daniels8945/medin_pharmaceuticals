import * as React from 'react';
import { account } from "../appwrite";

const AuthContext = React.createContext();

export const useAuth = () => React.useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

    const login = async (email, password) => {
      const loggedIn = await account.createEmailPasswordSession(email, password);
      setUser(loggedIn);
    }

    const logout = async () => {
      await account.deleteSession('current');
      setUser(null)
    };

  const fetchUser = async () => {
    try {
      const user = await account.get();
      setUser(user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ current: user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
