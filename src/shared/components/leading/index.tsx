import React from 'react';
import {ArrowLeft} from 'lucide-react-native';
import {COLORS} from '../../utils/colors';
import {FONTS} from '../../utils/fonts';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

type LeadingProps = {
  title: string;
  useBackButton?: boolean;
};

const Leading = ({title, useBackButton = true}: LeadingProps) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {useBackButton && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={25} color={COLORS.WHITE} />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default Leading;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 20,
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
