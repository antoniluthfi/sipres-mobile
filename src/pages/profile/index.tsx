import Button from '../../shared/components/button';
import Input from '../../shared/components/Input';
import React from 'react';
import {Building, GraduationCap, Mail, Phone, User} from 'lucide-react-native';
import {DummyProfile} from '../../assets/images';
import {Image, StyleSheet, View} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';

type Props = NavigationProp<RootStackParamList, 'MainTab'>;

const ProfileScreen = () => {
  const navigation = useNavigation<Props>();

  return (
    <View style={styles.container}>
      <Image
        source={DummyProfile}
        style={styles.profileImage}
        resizeMode="contain"
      />

      <View style={styles.inputContainer}>
        <Input label="Nama" value="Antoni" disabled rightIcon={<User />} />
        <Input
          label="NPM"
          value="207006068"
          disabled
          rightIcon={<GraduationCap />}
        />
        <Input
          label="Email"
          value="antoni@gmail.com"
          disabled
          rightIcon={<Mail />}
        />
        <Input
          label="No. Telpon"
          value="08212345678"
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
        onPress={() => navigation.navigate('Login')}
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
