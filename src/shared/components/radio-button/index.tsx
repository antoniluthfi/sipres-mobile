import React from 'react';
import {Circle} from 'lucide-react-native';
import {COLORS} from '../../utils/colors';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {FONTS} from '../../utils/fonts';

type RadioButtonProps = {
  title: string;
  isChecked: boolean;
  onPress: () => void;
};

const RadioButton = ({title, isChecked, onPress}: RadioButtonProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
      <Circle size={18} fill={isChecked ? COLORS.PRIMARY : COLORS.WHITE} />
    </TouchableOpacity>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  title: {
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: 14,
    color: COLORS.BLACK,
  },
});
