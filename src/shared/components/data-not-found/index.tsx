import React from 'react';
import {COLORS} from '../../utils/colors';
import {FileTextIcon} from 'lucide-react-native';
import {FONTS} from '../../utils/fonts';
import {StyleSheet, Text, View} from 'react-native';
import {WINDOW_HEIGHT} from '../../utils/functions';

const DataNotFound = () => {
  return (
    <View style={styles.container}>
      <FileTextIcon size={100} />
      <Text style={styles.text}>Data tidak ditemukan</Text>
    </View>
  );
};

export default DataNotFound;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    height: WINDOW_HEIGHT / 1.5,
  },
  text: {
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: 14,
    color: COLORS.BLACK,
  },
});
