import React, {useEffect} from 'react';
import useAuthStore from '../../shared/data-store/useAuthStore';
import {COLORS} from '../../shared/utils/colors';
import {FONTS} from '../../shared/utils/fonts';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Logo} from '../../assets/icons';
import {useNavigation} from '@react-navigation/native';
import {useShallow} from 'zustand/shallow';
import {
  requestCustomPermissions,
  setStatusBarStyle,
} from '../../shared/utils/functions';

const SplashScreen = () => {
  const navigation = useNavigation<any>();
  const {userData} = useAuthStore(
    useShallow((state: any) => ({
      userData: state.userData,
    })),
  );

  useEffect(() => {
    setStatusBarStyle({
      style: 'light-content',
      backgroundColor: COLORS.PRIMARY,
    });

    setTimeout(() => {
      requestCustomPermissions({
        onSuccess: () => {
          if (userData?.id) {
            navigation.replace('MainTab');
          } else {
            navigation.replace('Login');
          }
        },
        onFailed: () => {
          navigation.replace('Permission');
        },
      });
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.splashLogo} resizeMode="contain" />
      <Text style={styles.logoText}>SiPres Mobile</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.PRIMARY,
    padding: 20,
    gap: 10,
  },
  splashLogo: {
    width: 80,
    height: 80,
  },
  logoText: {
    fontSize: 40,
    color: 'white',
    fontFamily: FONTS.POPPINS_BOLD,
  },
});
