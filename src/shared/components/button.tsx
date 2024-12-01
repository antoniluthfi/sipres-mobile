import React from 'react';
import {COLORS} from '../utils/colors';
import {FONTS} from '../utils/fonts';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

type ButtonProps = {
  containerStyle?: ViewStyle;
  title: string;
  onPress?: () => void;
  isLoading?: boolean;
};

const Button = ({title, containerStyle, onPress, isLoading}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, containerStyle]}
      onPress={onPress}
      disabled={isLoading}>
      {isLoading && <ActivityIndicator size="small" color="white" />}
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
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  title: {
    fontSize: 16,
    color: 'white',
    fontFamily: FONTS.POPPINS_REGULAR,
  },
});
