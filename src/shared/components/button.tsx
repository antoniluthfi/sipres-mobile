import React from 'react';
import {COLORS} from '../utils/colors';
import {FONTS} from '../utils/fonts';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

type ButtonProps = {
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  title: string;
  onPress?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
};

const Button = ({
  title,
  containerStyle,
  titleStyle,
  onPress,
  isLoading,
  disabled,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, containerStyle]}
      onPress={onPress}
      disabled={isLoading || disabled}>
      {isLoading && <ActivityIndicator size="small" color="white" />}
      <Text style={[styles.title, titleStyle]}>{title}</Text>
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
