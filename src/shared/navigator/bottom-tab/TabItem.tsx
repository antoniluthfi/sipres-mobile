import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {COLORS} from '../../utils/colors';
import {Home, ScanQrCode, User} from 'lucide-react-native';
import {FONTS} from '../../utils/fonts';

type TabItemProps = {
  title: string;
  active: boolean;
  onPress: () => void;
  onLongPress: () => void;
};

const TabItem: React.FC<TabItemProps> = ({
  title,
  active,
  onPress,
  onLongPress,
}) => {
  const Icon = () => {
    if (title === 'Home') {
      return <Home color={active ? COLORS.PRIMARY : COLORS.SECONDARY} />;
    }

    if (title === 'Scan') {
      return <ScanQrCode color={'white'} />;
    }

    if (title === 'Profile') {
      return <User color={active ? COLORS.PRIMARY : COLORS.SECONDARY} />;
    }
  };

  if (title === 'Scan') {
    return (
      <TouchableOpacity
        onPress={onPress}
        onLongPress={onLongPress}
        style={styles.scanMenu}>
        <Icon />
        <Text
          style={[
            styles.text,
            {
              color: 'white',
              fontFamily: active ? FONTS.POPPINS_BOLD : FONTS.POPPINS_REGULAR,
            },
          ]}>
          SCAN
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      onLongPress={onLongPress}>
      <Icon />
      <Text
        style={[
          styles.text,
          {color: active ? COLORS.PRIMARY : COLORS.SECONDARY},
          {fontFamily: active ? FONTS.POPPINS_BOLD : FONTS.POPPINS_REGULAR},
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default TabItem;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 35,
    flex: 1,
  },
  text: {
    fontSize: 10,
    marginTop: 4,
  },
  scanMenu: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    position: 'absolute',
    top: -25,
    right: '41%',
    alignItems: 'center',
  },
});
