import React from 'react';
import {ArrowLeft, ArrowRight} from 'lucide-react-native';
import {StyleProp, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';

interface IProps {
  iconName: 'arrowright' | 'arrowleft';
  onPress: () => void;
  arrowLeftPosition?: StyleProp<ViewStyle>;
  arrowRightPosition?: StyleProp<ViewStyle>;
}

const CarouselButton: React.FC<IProps> = props => {
  const {iconName, onPress, arrowLeftPosition, arrowRightPosition} = props;

  return (
    <TouchableOpacity
      style={[
        iconName === 'arrowleft' ? {left: 20} : {right: 20},
        styles.button,
        iconName === 'arrowleft' ? arrowLeftPosition : arrowRightPosition,
      ]}
      onPress={onPress}>
      {iconName === 'arrowleft' ? (
        <ArrowLeft size={30} />
      ) : (
        <ArrowRight size={30} />
      )}
    </TouchableOpacity>
  );
};

export default CarouselButton;

const styles = StyleSheet.create({
  button: {
    width: 31,
    height: 31,
    borderRadius: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: '45%',
  },
});
