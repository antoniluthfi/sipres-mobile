/* eslint-disable react-native/no-inline-styles */
import Button from '../../shared/components/button';
import Input from '../../shared/components/Input';
import React, {useEffect, useState} from 'react';
import useAxios from '../../shared/hooks/useAxios';
import {BgLogin} from '../../assets/images';
import {COLORS} from '../../shared/utils/colors';
import {Eye, Mail} from 'lucide-react-native';
import {FONTS} from '../../shared/utils/fonts';
import {setStatusBarStyle} from '../../shared/utils/functions';
import {useAuth} from '../../shared/context/AuthContext';
import {useNavigation} from '@react-navigation/native';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const api = useAxios();
  const {login} = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState({
    // email: __DEV__ ? 'antoni@gmail.com' : '',
    // password: __DEV__ ? '12345678' : '',
    email: __DEV__ ? '207006068@student.unsil.ac.id' : '',
    password: __DEV__ ? '118271f74de3729c' : '',
  });

  const handleLogin = async () => {
    try {
      setIsLoading(true);

      const response = await api.post('/auth/login', {
        email: inputValue.email,
        password: inputValue.password,
        scope: 'app',
      });

      if (response.data?.message === 'Berhasil masuk') {
        login();
        navigation.replace('MainTab');
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
      <Text style={styles.loginTitle}>Login Mahasiswa</Text>

      <Input
        label="Email"
        value={inputValue.email}
        onChange={val => setInputValue(prev => ({...prev, email: val}))}
        placeholder="Masukkan Email"
        keyboardType="email-address"
        rightIcon={<Mail color={COLORS.SECONDARY} />}
      />

      <Input
        label="Password"
        value={inputValue.password}
        onChange={val => setInputValue(prev => ({...prev, password: val}))}
        placeholder="Masukkan Password"
        rightIcon={<Eye color={COLORS.SECONDARY} />}
        secureTextEntry
      />

      <Button
        title="Login"
        containerStyle={{marginTop: 40}}
        onPress={handleLogin}
        isLoading={isLoading}
      />

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.text}>Lupa Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

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
