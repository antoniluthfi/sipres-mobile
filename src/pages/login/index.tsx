import Button from '../../shared/components/button';
import Input from '../../shared/components/Input';
import React, {useEffect, useState} from 'react';
import {BgLogin} from '../../assets/images';
import {COLORS} from '../../shared/utils/colors';
import {Eye, Mail} from 'lucide-react-native';
import {FONTS} from '../../shared/utils/fonts';
import {Image, StyleSheet, Text, View} from 'react-native';
import {setStatusBarStyle} from '../../shared/utils/functions';

const LoginScreen = () => {
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
  });

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
        value={inputValue.email}
        onChange={val => setInputValue(prev => ({...prev, email: val}))}
        placeholder="Masukkan Password"
        rightIcon={<Eye color={COLORS.SECONDARY} />}
        secureTextEntry
      />

      <Button title="Login" containerStyle={{marginTop: 40}} />
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
});
