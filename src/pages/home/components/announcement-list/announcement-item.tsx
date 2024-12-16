import React, {memo, useCallback} from 'react';
import {Announcement} from '../../../../shared/api/useLatestAnnouncementList';
import {COLORS} from '../../../../shared/utils/colors';
import {FONTS} from '../../../../shared/utils/fonts';
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

type AnnouncementItemProps = {
  item: Announcement;
};

const AnnouncementItem = ({item}: AnnouncementItemProps) => {
  const handlePress = useCallback(async () => {
    await Linking.openURL(item?.href);
  }, [item?.href]);

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={handlePress}>
      <Image
        source={{uri: item?.img}}
        style={{width: 50, height: 50, borderRadius: 5}}
        resizeMode="contain"
      />
      <Text
        style={{fontFamily: FONTS.POPPINS_MEDIUM, fontSize: 14, width: '80%'}}>
        {item?.title}
      </Text>
    </TouchableOpacity>
  );
};

export default memo(AnnouncementItem);

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: COLORS.GRAY,
    padding: 10,
    elevation: 4,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
