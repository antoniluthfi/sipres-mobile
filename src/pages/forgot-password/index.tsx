/* eslint-disable react-native/no-inline-styles */
import Button from '../../shared/components/button';
import Input from '../../shared/components/Input';
import React, {useEffect, useState} from 'react';
import useAxios from '../../shared/hooks/useAxios';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {BgLogin} from '../../assets/images';
import {COLORS} from '../../shared/utils/colors';
import {Mail} from 'lucide-react-native';
import {FONTS} from '../../shared/utils/fonts';
import {setStatusBarStyle} from '../../shared/utils/functions';
import {useNavigation} from '@react-navigation/native';

const ForgotPasswordScreen = () => {
  const navigation = useNavigation<any>();
  const api = useAxios();

  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState({
    email: __DEV__ ? 'antoni@gmail.com' : '',
  });

  const handleForgotPassword = async () => {
    try {
      setIsLoading(true);

      const response = await api.post('/auth/forgot-password', {
        email: inputValue.email,
      });

      if (response.data?.message === 'Berhasil mengirimkan email') {
        Alert.alert(
          'Berhasil',
          'Berhasil mengirimkan email. Silahkan cek email anda',
        );
        navigation.replace('Login');
      }
    } catch (error: any) {
      console.log('error login: ', error);
      Alert.alert(
        'Warning',
        error?.error || error?.message || error?.errors?.[0]?.msg,
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setStatusBarStyle({style: 'dark-content', backgroundColor: 'white'});
  }, []);

  return (
    <View style={styles.container}>
      <Image source={BgLogin} style={styles.bgLogin} resizeMode="contain" />
      <Text style={styles.loginTitle}>Lupa Password</Text>

      <Input
        label="Email"
        value={inputValue.email}
        onChange={val => setInputValue(prev => ({...prev, email: val}))}
        placeholder="Masukkan Email"
        keyboardType="email-address"
        rightIcon={<Mail color={COLORS.SECONDARY} />}
      />

      <Button
        title="Kirim Email"
        containerStyle={{marginTop: 40}}
        onPress={handleForgotPassword}
        isLoading={isLoading}
      />

      <TouchableOpacity>
        <Text style={styles.text}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 20,
    gap: 10,
  },
  bgLogin: {
    width: 232,
    height: 262,
  },
  loginTitle: {
    fontSize: 30,
    fontFamily: FONTS.POPPINS_BOLD,
    color: COLORS.PRIMARY,
    marginBottom: 30,
  },
  text: {
    fontFamily: FONTS.POPPINS_MEDIUM,
    color: COLORS.BLACK,
    fontSize: 14,
  },
});
