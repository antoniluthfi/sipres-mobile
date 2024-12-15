import Button from '../../shared/components/button';
import Input from '../../shared/components/Input';
import React, {useCallback, useState} from 'react';
import useAuthStore from '../../shared/data-store/useAuthStore';
import useAxios from '../../shared/hooks/useAxios';
import {Alert, Image, StyleSheet, View} from 'react-native';
import {Building, GraduationCap, Mail, Phone, User} from 'lucide-react-native';
import {DummyProfile} from '../../assets/images';
import {useAuth} from '../../shared/context/AuthContext';
import {useShallow} from 'zustand/shallow';
import {useFocusEffect} from '@react-navigation/native';
import {setStatusBarStyle} from '../../shared/utils/functions';

const ProfileScreen = () => {
  const api = useAxios();
  const {logout} = useAuth();
  const {userData} = useAuthStore(
    useShallow((state: any) => ({
      userData: state.userData,
    })),
  );

  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await api.get('/auth/logout');
    } catch (error: any) {
      console.log(error);
      Alert.alert('Warning', error?.error);
    } finally {
      setIsLoading(false);
      logout();
    }
  };

  useFocusEffect(
    useCallback(() => {
      setStatusBarStyle({
        style: 'dark-content',
        backgroundColor: 'white',
      });
    }, []),
  );

  return (
    <View style={styles.container}>
      <Image
        source={
          userData?.proile_url
            ? {
                uri: userData?.proile_url,
              }
            : DummyProfile
        }
        style={styles.profileImage}
        resizeMode="contain"
      />

      <View style={styles.inputContainer}>
        <Input label="Nama" value="Antoni" disabled rightIcon={<User />} />
        <Input
          label="NPM"
          value={userData?.identification_number || '-'}
          disabled
          rightIcon={<GraduationCap />}
        />
        <Input
          label="Email"
          value={userData?.email || '-'}
          disabled
          rightIcon={<Mail />}
        />
        <Input
          label="No. Telpon"
          value={userData?.phone_number || '-'}
          disabled
          rightIcon={<Phone />}
        />
        <Input
          label="Tempat Tanggal Lahir"
          value="Jakarta, 11 Juli 2000"
          disabled
          rightIcon={<Building />}
        />
      </View>

      <Button
        title="Logout"
        containerStyle={{backgroundColor: 'red'}}
        onPress={handleLogout}
        isLoading={isLoading}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 20,
    gap: 30,
    flexDirection: 'column',
  },
  profileImage: {
    width: 125,
    height: 125,
    borderRadius: 100,
  },
  inputContainer: {
    gap: 10,
    width: '100%',
  },
});
