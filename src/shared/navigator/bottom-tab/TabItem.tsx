import React from 'react';
import {CalendarClock, Home, User} from 'lucide-react-native';
import {COLORS} from '../../utils/colors';
import {FONTS} from '../../utils/fonts';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

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
    if (title === 'Beranda') {
      return <Home color={active ? COLORS.PRIMARY : COLORS.SECONDARY} />;
    }

    if (title === 'Jadwal Kuliah') {
      return (
        <CalendarClock color={active ? COLORS.PRIMARY : COLORS.SECONDARY} />
      );
    }

    if (title === 'Profil') {
      return <User color={active ? COLORS.PRIMARY : COLORS.SECONDARY} />;
    }
  };

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
});
