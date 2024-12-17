import React, {createContext, ReactNode, useContext, useEffect} from 'react';
import useAuthStore from '../data-store/useAuthStore';
import useAxios from '../hooks/useAxios';
import {Alert} from 'react-native';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {useShallow} from 'zustand/shallow';

interface AuthContextType {
  logout: () => void;
  login: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const navigation = useNavigation<any>();
  const api = useAxios();
  const {
    isLogin,
    setIsLogin,
    userData,
    setUserData,
    isRefreshTokenValid,
    setRefreshTokenValid,
  } = useAuthStore(
    useShallow((state: any) => ({
      isLogin: state.isLogin,
      setIsLogin: state.setIsLogin,
      userData: state.userData,
      setUserData: state.setUserData,
      isRefreshTokenValid: state.isRefreshTokenValid,
      setRefreshTokenValid: state.setRefreshTokenValid,
    })),
  );

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

  const login = () => {
    setIsLogin(true);
    setRefreshTokenValid(true);
  };

  const getAuthenticatedUser = async () => {
    try {
      const response = await api.get('/auth/authenticated-user');
      setUserData(response.data?.data || null);
    } catch (error: any) {
      console.log('error getAuthenticatedUser: ', error);
      if (userData?.id) {
        Alert.alert('Warning', error?.error);
      }
      logout();
    }
  };

  useEffect(() => {
    if (isLogin && isRefreshTokenValid) {
      getAuthenticatedUser();
    }

    if (isLogin && !isRefreshTokenValid) {
      logout();
    }
  }, [isLogin, isRefreshTokenValid]);

  return (
    <AuthContext.Provider value={{logout, login}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
