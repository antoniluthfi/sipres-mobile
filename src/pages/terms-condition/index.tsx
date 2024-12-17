import appBar from '../../shared/components/leading/AppBar';
import Leading from '../../shared/components/leading';
import React, {useEffect} from 'react';
import {COLORS} from '../../shared/utils/colors';
import {FONTS} from '../../shared/utils/fonts';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const TermsConditionScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions(
      appBar({
        leading: <Leading title="Syarat & Ketentuan" />,
      }),
    );
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.header}>
          Syarat dan Ketentuan Penggunaan SiPres Mobile
        </Text>

        <Text style={styles.subHeader}>1. Definisi</Text>
        <Text style={styles.content}>
          - <Text style={styles.bold}>Aplikasi SiPres Mobile</Text>: Aplikasi
          absensi digital yang dikembangkan untuk Universitas Siliwangi, dapat
          diakses melalui perangkat Android dan iOS.{'\n'}-{' '}
          <Text style={styles.bold}>Pengguna</Text>: Mahasiswa, dosen, staf, dan
          pihak terkait lainnya yang diberikan izin untuk menggunakan aplikasi
          ini.{'\n'}- <Text style={styles.bold}>Data Pribadi</Text>: Informasi
          yang diberikan pengguna meliputi nama, NIM/NIDN, email, lokasi, waktu,
          dan data absensi.
        </Text>

        <Text style={styles.subHeader}>2. Penggunaan Aplikasi</Text>
        <Text style={styles.content}>
          - Aplikasi SiPres Mobile hanya diperuntukkan bagi civitas akademika
          Universitas Siliwangi.{'\n'}- Setiap pengguna wajib menggunakan akun
          resmi yang telah disediakan oleh universitas untuk mengakses aplikasi.
          {'\n'}- Pengguna bertanggung jawab menjaga kerahasiaan akun dan kata
          sandi mereka.
        </Text>

        <Text style={styles.subHeader}>3. Kewajiban Pengguna</Text>
        <Text style={styles.content}>
          - Pengguna wajib mengisi absensi secara akurat sesuai dengan waktu dan
          lokasi yang telah ditentukan.{'\n'}- Pengguna tidak diperbolehkan
          melakukan manipulasi data absensi dengan cara apapun.{'\n'}- Pengguna
          wajib memastikan perangkat yang digunakan kompatibel dengan aplikasi
          dan memiliki akses internet yang stabil.{'\n'}- Pengguna wajib
          memberikan izin akses ke GPS dan kamera perangkat untuk melakukan
          absensi melalui fitur lokasi dan pemindaian QR code.
        </Text>

        <Text style={styles.subHeader}>4. Pengumpulan dan Penggunaan Data</Text>
        <Text style={styles.content}>
          - SiPres Mobile akan mengumpulkan data absensi pengguna seperti waktu,
          lokasi, dan identitas pengguna.{'\n'}- Aplikasi ini menggunakan fitur
          GPS untuk memverifikasi lokasi absensi secara real-time.{'\n'}-
          Aplikasi memerlukan izin akses kamera untuk melakukan pemindaian QR
          code saat absensi.{'\n'}- Data yang dikumpulkan akan digunakan untuk
          tujuan pemantauan kehadiran, evaluasi akademik, dan administrasi
          universitas.{'\n'}- Data pengguna dijaga kerahasiaannya dan hanya
          digunakan oleh pihak berwenang di Universitas Siliwangi.
        </Text>

        <Text style={styles.subHeader}>5. Hak Cipta dan Lisensi</Text>
        <Text style={styles.content}>
          - Aplikasi SiPres Mobile dan seluruh kontennya dimiliki oleh
          Universitas Siliwangi.{'\n'}- Pengguna tidak diperkenankan untuk
          memodifikasi, menyalin, mendistribusikan, atau menggunakan aplikasi
          untuk kepentingan komersial.
        </Text>

        <Text style={styles.subHeader}>6. Pembatasan Tanggung Jawab</Text>
        <Text style={styles.content}>
          - Universitas Siliwangi tidak bertanggung jawab atas kerugian yang
          disebabkan oleh penyalahgunaan akun atau aplikasi oleh pengguna.{'\n'}
          - Aplikasi dapat mengalami gangguan teknis sewaktu-waktu. Universitas
          Siliwangi akan berusaha memperbaiki masalah tersebut sesegera mungkin.
        </Text>

        <Text style={styles.subHeader}>7. Perubahan Syarat dan Ketentuan</Text>
        <Text style={styles.content}>
          - Universitas Siliwangi berhak untuk memperbarui atau mengubah syarat
          dan ketentuan ini kapan saja.{'\n'}- Pengguna akan diberitahu jika ada
          perubahan melalui pemberitahuan di aplikasi.
        </Text>

        <Text style={styles.subHeader}>8. Penyalahgunaan Aplikasi</Text>
        <Text style={styles.content}>
          - Setiap bentuk pelanggaran atau penyalahgunaan aplikasi akan
          dikenakan sanksi sesuai dengan peraturan Universitas Siliwangi.
        </Text>

        <Text style={styles.subHeader}>9. Kontak dan Bantuan</Text>
        <Text style={styles.content}>
          - Untuk pertanyaan atau masalah teknis terkait aplikasi, pengguna
          dapat menghubungi layanan dukungan resmi Universitas Siliwangi melalui
          email atau kontak yang tertera di aplikasi.
        </Text>

        <Text style={styles.footer}>
          Dengan menggunakan SiPres Mobile, pengguna menyetujui semua syarat dan
          ketentuan yang telah ditetapkan di atas.
        </Text>
      </ScrollView>
    </View>
  );
};

export default TermsConditionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  scrollView: {
    flexGrow: 1, 
    padding: 20
  },
  text: {
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: 14,
    color: COLORS.BLACK,
  },
  header: {
    fontSize: 22,
    fontFamily: FONTS.POPPINS_BOLD,
    marginBottom: 12,
    color: COLORS.BLACK,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 18,
    fontFamily: FONTS.POPPINS_BOLD,
    marginTop: 10,
    marginBottom: 5,
    color: COLORS.BLACK,
  },
  content: {
    fontSize: 16,
    fontFamily: FONTS.POPPINS_REGULAR,
    lineHeight: 24,
    color: COLORS.BLACK,
  },
  bold: {
    fontFamily: FONTS.POPPINS_BOLD,
  },
  footer: {
    fontSize: 16,
    fontFamily: FONTS.POPPINS_REGULAR,
    marginTop: 20,
    textAlign: 'center',
    color: COLORS.GRAY,
  },
});
