import React from 'react';
import {StyleSheet, Text, TouchableOpacity, ViewStyle} from 'react-native';
import {COLORS} from '../utils/colors';
import {FONTS} from '../utils/fonts';

type ButtonProps = {
  containerStyle?: ViewStyle;
  title: string;
  onPress?: () => void;
};

const Button = ({title, containerStyle, onPress}: ButtonProps) => {
  return (
    <TouchableOpacity style={[styles.button, containerStyle]} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    backgroundColor: COLORS.PRIMARY,
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  title: {
    fontSize: 16,
    color: 'white',
    fontFamily: FONTS.POPPINS_REGULAR,
  },
});
