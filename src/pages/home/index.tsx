import Carousel from './components/Carousel';
import React, {memo, useCallback} from 'react';
import useAuthStore from '../../shared/data-store/useAuthStore';
import useMenu, {Menu} from './hooks/useMenu';
import {COLORS} from '../../shared/utils/colors';
import {DummyProfile} from '../../assets/images';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {FONTS} from '../../shared/utils/fonts';
import {Logo} from '../../assets/icons';
import {setStatusBarStyle} from '../../shared/utils/functions';
import {useFocusEffect} from '@react-navigation/native';

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

// Optimized Carousel
const OptimizedCarousel = memo(Carousel);

// MenuItem Component
const MenuItem = memo(({menu}: {menu: Menu}) => (
  <View style={styles.menuItem}>
    <View style={styles.menuIconContainer}>{menu.icon}</View>
    <Text style={styles.menuText}>{menu.name}</Text>
  </View>
));

// HomeScreen Component
const HomeScreen = () => {
  const userData = useAuthStore(state => state.userData);
  const MENU = useMenu();

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
      <Header />
      <View style={styles.contentContainer}>
        <ProfileInfo userData={userData} />
        <View style={styles.carouselContainer}>
          <OptimizedCarousel />
        </View>
        <Text style={styles.menuHeaderText}>Menu</Text>
        <FlatList
          data={MENU}
          renderItem={({item}) => <MenuItem menu={item} />}
          keyExtractor={(item, index) => `menu_${index}`}
          numColumns={4}
          columnWrapperStyle={styles.menuColumnWrapper}
          showsVerticalScrollIndicator={false}
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
  menuHeaderText: {
    fontFamily: FONTS.POPPINS_BOLD,
    fontSize: 16,
    color: 'black',
    marginBottom: 10,
  },
  menuColumnWrapper: {
    gap: 20,
  },
  menuItem: {
    alignItems: 'center',
    marginBottom: 10,
  },
  menuIconContainer: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 100,
    borderColor: COLORS.PRIMARY,
  },
  menuText: {
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: 10,
    color: COLORS.PRIMARY,
    textAlign: 'center',
  },
});

export default HomeScreen;
