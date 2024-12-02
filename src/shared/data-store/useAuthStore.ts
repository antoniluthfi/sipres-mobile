import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

interface AuthState {
  isLogin: boolean;
  userData: any | null; // Bisa disesuaikan dengan tipe data yang lebih spesifik jika ada
  setIsLogin: (val: boolean) => void;
  setUserData: (userData: any | null) => void; // Bisa disesuaikan dengan tipe data yang lebih spesifik jika ada
  isRefreshTokenValid: boolean;
  setRefreshTokenValid: (val: boolean) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isLogin: false,
      setIsLogin: (val: boolean) => set({isLogin: val}),
      userData: null,
      setUserData: (userData: any) => set({userData}),
      isRefreshTokenValid: false,
      setRefreshTokenValid: (val: boolean) => set({isRefreshTokenValid: val})
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useAuthStore;
