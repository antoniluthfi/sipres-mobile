import appBar from '../../shared/components/leading/AppBar';
import Button from '../../shared/components/button';
import Config from '../../shared/config/env.json';
import FastImage from 'react-native-fast-image';
import Input from '../../shared/components/Input';
import Leading from '../../shared/components/leading';
import React, {useCallback, useEffect, useState} from 'react';
import useAuthStore from '../../shared/data-store/useAuthStore';
import useAxios from '../../shared/hooks/useAxios';
import {Alert, StyleSheet, View} from 'react-native';
import {Building, GraduationCap, Mail, Phone, User} from 'lucide-react-native';
import {COLORS} from '../../shared/utils/colors';
import {DummyProfile} from '../../assets/images';
import {setStatusBarStyle} from '../../shared/utils/functions';
import {useAuth} from '../../shared/context/AuthContext';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useShallow} from 'zustand/shallow';

const ProfileScreen = () => {
  const navigation = useNavigation();
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

  useEffect(() => {
    navigation.setOptions(
      appBar({
        leading: <Leading title="Profil" useBackButton={false} />,
      }),
    );
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      setStatusBarStyle({
        style: 'light-content',
        backgroundColor: COLORS.PRIMARY,
      });
    }, []),
  );

  return (
    <View style={styles.container}>
      <FastImage
        source={
          userData?.profile_url
            ? {
                uri: Config.BE_URL + userData?.profile_url,
                priority: FastImage.priority.high,
                cache: 'immutable',
              }
            : DummyProfile
        }
        style={styles.profileImage}
        resizeMode={FastImage.resizeMode.cover}
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
