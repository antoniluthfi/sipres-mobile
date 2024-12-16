import AnnouncementList from './components/announcement-list';
import Carousel from './components/carousel';
import Menu from './components/menu';
import React, {useCallback} from 'react';
import useAuthStore from '../../shared/data-store/useAuthStore';
import {COLORS} from '../../shared/utils/colors';
import {DummyProfile} from '../../assets/images';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {FONTS} from '../../shared/utils/fonts';
import {Logo} from '../../assets/icons';
import {setStatusBarStyle} from '../../shared/utils/functions';
import {useFocusEffect} from '@react-navigation/native';
import {useLatestAnnouncementList} from '../../shared/api/useLatestAnnouncementList';

// Header Component
const Header = () => (
  <View style={styles.header}>
    <Image source={Logo} style={styles.headerLogo} />
    <Text style={styles.headerText}>SiPres Mobile</Text>
  </View>
);

// ProfileInfo Component
const ProfileInfo = ({userData}: {userData: any}) => (
  <View style={styles.profileContainer}>
    <Image source={DummyProfile} style={styles.profileImage} />
    <View>
      <Text style={styles.greetingText}>Halo, {userData?.name}</Text>
      <Text style={styles.welcomeText}>
        Selamat Datang di Aplikasi Presensi Universitas{'\n'}Siliwangi
      </Text>
    </View>
  </View>
);

// HomeScreen Component
const HomeScreen = () => {
  const userData = useAuthStore(state => state.userData);

  const {data, isLoading} = useLatestAnnouncementList({page: 1});

  useFocusEffect(
    useCallback(() => {
      setStatusBarStyle({
        style: 'light-content',
        backgroundColor: COLORS.PRIMARY,
      });
    }, []),
  );

  const renderItem = () => {
    return (
      <>
        <View style={styles.carouselContainer}>
          <Carousel data={data} isLoading={isLoading} />
        </View>

        <Menu />
        <AnnouncementList data={data} isLoading={isLoading} />
      </>
    );
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.contentContainer}>
        <ProfileInfo userData={userData} />

        <FlatList
          data={[1]}
          renderItem={renderItem}
          keyExtractor={(_, i) => `home_${i}`}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.PRIMARY,
    flex: 1,
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerLogo: {
    width: 40,
    height: 40,
  },
  headerText: {
    fontFamily: FONTS.POPPINS_BOLD,
    color: 'white',
    fontSize: 24,
  },
  contentContainer: {
    backgroundColor: 'white',
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  greetingText: {
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: 14,
    color: 'black',
  },
  welcomeText: {
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: 12,
    color: 'black',
  },
  carouselContainer: {
    width: '100%',
    position: 'relative',
    marginBottom: 150,
  },
});

export default HomeScreen;
