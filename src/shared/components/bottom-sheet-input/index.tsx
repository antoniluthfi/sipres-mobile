import React, {ReactNode, useEffect, useState} from 'react';
import {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import {COLORS} from '../../utils/colors';
import {FONTS} from '../../utils/fonts';
import {KeyboardTypeOptions, StyleSheet, Text, View} from 'react-native';

type InputProps = {
  label?: string;
  value?: string;
  onChange?: (val: string) => void;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  rightIcon?: ReactNode;
  secureTextEntry?: boolean;
  disabled?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
};

const BSheetInput = ({
  label,
  value,
  onChange,
  placeholder,
  keyboardType,
  rightIcon,
  secureTextEntry,
  disabled,
  multiline,
  numberOfLines,
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
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          {backgroundColor: disabled ? COLORS.DISABLE : 'white'},
        ]}>
        {rightIcon}
        <BottomSheetTextInput
          style={styles.input}
          onChangeText={handleChange}
          value={text}
          placeholder={placeholder}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          editable={!disabled}
          multiline={multiline}
          numberOfLines={numberOfLines}
        />
      </View>
    </View>
  );
};

export default BSheetInput;

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
    gap: 10,
  },
  input: {
    width: '100%',
    fontFamily: FONTS.POPPINS_REGULAR,
  },
});
