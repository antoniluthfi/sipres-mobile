import React from 'react';
import {FlatList, View} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

type Props = {
  index: number;
  backgroundColor: string;
  length: number;
  animValue: Animated.SharedValue<number>;
  isRotate?: boolean;
  size?: number;
  marginTop?: number;
};

const PaginationItem: React.FC<Props> = ({
  animValue,
  index,
  length,
  backgroundColor,
  isRotate,
  size = 10,
  marginTop,
}) => {
  const animStyle = useAnimatedStyle(() => {
    let inputRange = [index - 1, index, index + 1];
    let outputRange = [-size, 0, size];

    if (index === 0 && animValue?.value > length - 1) {
      inputRange = [length - 1, length, length + 1];
      outputRange = [-size, 0, size];
    }

    return {
      transform: [
        {
          translateX: interpolate(
            animValue?.value,
            inputRange,
            outputRange,
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  }, [animValue, index, length]);

  return (
    <View
      style={{
        backgroundColor: '#E7E7E7',
        width: size,
        height: size,
        borderRadius: 50,
        overflow: 'hidden',
        marginTop,
        marginRight: 3,
        transform: [
          {
            rotateZ: isRotate ? '90deg' : '0deg',
          },
        ],
      }}>
      <Animated.View
        style={[
          {
            borderRadius: 50,
            backgroundColor,
            flex: 1,
          },
          animStyle,
        ]}
      />
    </View>
  );
};

type PaginationProps = {
  backgroundColor: string;
  length: number;
  animValue: Animated.SharedValue<number>;
  isRotate?: boolean;
  size?: number;
  marginTop?: number;
  data: any[];
  show: boolean;
};

const Pagination: React.FC<PaginationProps> = ({
  animValue,
  length,
  backgroundColor,
  size = 10,
  marginTop,
  data,
  show,
}) => {
  const renderItem = ({_, index}: any) => {
    return (
      <PaginationItem
        backgroundColor={backgroundColor}
        animValue={animValue}
        index={index}
        length={length}
        size={size}
        marginTop={marginTop}
      />
    );
  };

  if (!show) return null;
  return (
    <FlatList
      contentContainerStyle={{
        width: '100%',
        justifyContent: 'center',
        alignSelf: 'center',
      }}
      data={data}
      renderItem={renderItem}
      horizontal
      keyExtractor={(_, index) => index.toString()}
    />
  );
};

export default Pagination;
