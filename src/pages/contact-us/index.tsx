import appBar from '../../shared/components/leading/AppBar';
import Leading from '../../shared/components/leading';
import React, {useEffect} from 'react';
import {COLORS} from '../../shared/utils/colors';
import {FONTS} from '../../shared/utils/fonts';
import {Mail} from 'lucide-react-native';
import {StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const ContactUsScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions(
      appBar({
        leading: <Leading title="Kontak Kami" />,
      }),
    );
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Mail size={80} color={COLORS.PRIMARY} />

      <View style={styles.cardContainer}>
        <Text style={styles.text}>
          <Text style={styles.title}>Pelayan satu Pintu</Text>
          {'\n'}Gedung Rektorat Unsil
          {'\n'}Universitas Siliwangi kampus Siliwangi
          {'\n'}Jln. Siliwangi No.24 Kahuripan
          {'\n'}Kota Tasikmalaya 46115
          {'\n'}Jawa Barat
        </Text>

        <Text style={styles.text}>
          <Text style={styles.title}>Melalui Berani</Text>
          {'\n'}Telepon (0265) 330 634
          {'\n'}Email: info@unsil.ac.id
        </Text>

        <Text style={styles.text}>
          <Text style={styles.title}>Akun Resmi</Text>
          {'\n'}Twiter: @univ_siliwangi
          {'\n'}Facebook: @univ_siliwangi
          {'\n'}Instagram: @univ_siliwangi
          {'\n'}Youtube: unsil
        </Text>
      </View>
    </View>
  );
};

export default ContactUsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE,
    gap: 30,
  },
  cardContainer: {
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: COLORS.GRAY,
    padding: 15,
    elevation: 4,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    width: '90%',
    gap: 15,
  },
  text: {
    fontFamily: FONTS.POPPINS_REGULAR,
    color: COLORS.BLACK,
    fontSize: 14,
  },
  title: {
    fontFamily: FONTS.POPPINS_BOLD,
    fontSize: 16,
  },
});
