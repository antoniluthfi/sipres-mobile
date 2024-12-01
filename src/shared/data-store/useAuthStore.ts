import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

const useAuthStore = create(
  persist((set, get) => ({
    isLogin: false,
    setIsLogin: (val: boolean) => set({ isLogin: val }),
    userData: null,
    setUserData: (userData: any) => set({ userData }),
  }), {
    name: 'auth-storage',
    storage: createJSONStorage(() => AsyncStorage),
  }),
);

export default useAuthStore;
