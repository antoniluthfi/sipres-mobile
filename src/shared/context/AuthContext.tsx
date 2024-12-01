import React, {createContext, ReactNode, useContext} from 'react';
import {CommonActions, useNavigation} from '@react-navigation/native';
import useAuthStore from '../data-store/useAuthStore';

interface AuthContextType {
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const navigation = useNavigation();
  const setIsLogin = useAuthStore((state: any) => state.setIsLogin);
  const setUserData = useAuthStore((state: any) => state.setUserData);

  const logout = () => {
    setIsLogin(false);
    setUserData(null);
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Login'}],
      }),
    );
  };

  return (
    <AuthContext.Provider value={{logout}}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
