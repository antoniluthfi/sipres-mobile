import React, {ReactNode, useEffect, useState} from 'react';
import {COLORS} from '../utils/colors';
import {FONTS} from '../utils/fonts';
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type InputProps = {
  label: string;
  value?: string;
  onChange?: (val: string) => void;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  rightIcon?: ReactNode;
  secureTextEntry?: boolean;
  disabled?: boolean;
};

const Input = ({
  label,
  value,
  onChange,
  placeholder,
  keyboardType,
  rightIcon,
  secureTextEntry,
  disabled,
}: InputProps) => {
  const [text, onChangeText] = useState('');

  const handleChange = (val: string) => {
    onChangeText(val);
    onChange?.(val);
  };

  useEffect(() => {
    if (value) {
      onChangeText(value);
    }
  }, [value]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          {backgroundColor: disabled ? COLORS.DISABLE : 'white'},
        ]}>
        {rightIcon}
        <TextInput
          style={styles.input}
          onChangeText={handleChange}
          value={text}
          placeholder={placeholder}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          editable={!disabled}
        />
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontFamily: FONTS.POPPINS_SEMIBOLD,
  },
  inputContainer: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLORS.SECONDARY,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    fontFamily: FONTS.POPPINS_REGULAR,
  },
});
