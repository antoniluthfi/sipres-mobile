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
      style={[
        styles.button,
        {
          backgroundColor: disabled ? COLORS.DISABLE : COLORS.PRIMARY,
        },
        containerStyle,
      ]}
      onPress={onPress}
      disabled={isLoading || disabled}>
      {isLoading && <ActivityIndicator size="small" color="white" />}
      <Text
        style={[
          styles.title,
          {
            color: disabled ? COLORS.BLACK : COLORS.WHITE,
          },
          titleStyle,
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: FONTS.POPPINS_REGULAR,
  },
});
