/* eslint-disable react-refresh/only-export-components */
import { jwtDecode } from "jwt-decode";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface DecodedToken {
  id: string;
  email: string;
  role: string;
  exp: number;
}


interface AuthContextType {
  loginData: DecodedToken | null;
  setLoginData: React.Dispatch<React.SetStateAction<DecodedToken | null>>;
  saveLoginData: () => Promise<void>;
  isLoading: boolean;
  logOutUser: () => void;
  isAuth: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

/* ================== Context ================== */

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export default function AuthProvider({ children }: AuthProviderProps) {
  const [loginData, setLoginData] = useState<DecodedToken | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [isAuth, setIsAuth] = useState<boolean>(
    Boolean(localStorage.getItem("token"))
  );

  const saveLoginData = async (): Promise<void> => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        const decoded = jwtDecode<DecodedToken>(token);
        setLoginData(decoded);
        setIsAuth(true);
      } else {
        setLoginData(null);
        setIsAuth(false);
      }
    } catch (err) {
      console.error("Invalid token", err);
      localStorage.removeItem("token");
      setIsAuth(false);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    if (localStorage.getItem("token")) {
      saveLoginData();
    } else {
      setLoginData(null);
      setIsLoading(false);
    }
  }, []);

  const logOutUser = (): void => {
    localStorage.removeItem("token");
    saveLoginData();
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider
      value={{
        loginData,
        setLoginData,
        saveLoginData,
        isLoading,
        logOutUser,
        isAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* ================== Custom Hook ================== */

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};