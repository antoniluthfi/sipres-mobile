import React, {memo} from 'react';
import useMenu, {Menu as MenuType} from '../../hooks/useMenu';
import {COLORS} from '../../../../shared/utils/colors';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FONTS} from '../../../../shared/utils/fonts';

// MenuItem Component
const MenuItem = memo(({menu}: {menu: MenuType}) => (
  <TouchableOpacity style={styles.menuItem} onPress={menu?.onPress}>
    <View style={styles.menuIconContainer}>{menu.icon}</View>
    <Text style={styles.menuText}>{menu.name}</Text>
  </TouchableOpacity>
));

const Menu = () => {
  const MENU = useMenu();

  return (
    <>
      <Text style={styles.menuHeaderText}>Menu</Text>
      <View style={{maxHeight: 250}}>
        <FlatList
          data={MENU}
          renderItem={({item}) => <MenuItem menu={item} />}
          keyExtractor={(item, index) => `menu_${index}`}
          numColumns={4}
          columnWrapperStyle={styles.menuColumnWrapper}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  );
};

export default memo(Menu);

const styles = StyleSheet.create({
  menuHeaderText: {
    fontFamily: FONTS.POPPINS_BOLD,
    fontSize: 16,
    color: 'black',
    marginBottom: 10,
  },
  menuColumnWrapper: {
    gap: 25,
  },
  menuItem: {
    alignItems: 'center',
    marginBottom: 10,
  },
  menuIconContainer: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 100,
    borderColor: COLORS.PRIMARY,
  },
  menuText: {
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: 10,
    color: COLORS.PRIMARY,
    textAlign: 'center',
  },
});
