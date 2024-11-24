import React from 'react';
import TabItem from './TabItem';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {boxShadow} from '../../utils/functions';
import {StyleSheet, View} from 'react-native';

const CustomBottomTab = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  return (
    <View
      style={[
        styles.container,
        boxShadow('#000', {height: 0, width: 5}, 6.27, 0.34),
      ]}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TabItem
            key={index}
            title={label as any}
            active={isFocused}
            onPress={onPress}
            onLongPress={onLongPress}
          />
        );
      })}
    </View>
  );
};

export default CustomBottomTab;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 12,
    backgroundColor: 'white',
    position: 'relative',
  },
});
