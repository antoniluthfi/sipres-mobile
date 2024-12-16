import React from 'react';
import {ArrowLeft} from 'lucide-react-native';
import {COLORS} from '../../utils/colors';
import {FONTS} from '../../utils/fonts';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const Leading = ({title}: {title: string}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.goBack()}>
      <ArrowLeft size={25} color={COLORS.WHITE} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Leading;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 16, 
    paddingHorizontal: 20
  },
  imgLeft: {
    height: 20,
    width: 20,
    marginLeft: 16,
  },
  title: {
    color: COLORS.WHITE,
    fontFamily: FONTS.POPPINS_BOLD,
    fontSize: 16,
  },
});
