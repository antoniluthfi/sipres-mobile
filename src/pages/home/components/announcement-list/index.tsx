import AnnouncementItem from './announcement-item';
import React, {memo} from 'react';
import {COLORS} from '../../../../shared/utils/colors';
import {FONTS} from '../../../../shared/utils/fonts';
import {Announcement} from '../../../../shared/api/useLatestAnnouncementList';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type AnnouncementListProps = {
  data: Announcement[];
  isLoading: boolean;
};

const AnnouncementList = ({data, isLoading}: AnnouncementListProps) => {
  const renderItem = ({item}: {item: Announcement}) => {
    return <AnnouncementItem item={item} />;
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.PRIMARY} />
      </View>
    );
  }

  return (
    <>
      <Text style={styles.menuHeaderText}>Pengumuman Terbaru</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(_, i) => `announcement_${i}`}
        scrollEnabled={false}
      />
    </>
  );
};

export default memo(AnnouncementList);

const styles = StyleSheet.create({
  menuHeaderText: {
    fontFamily: FONTS.POPPINS_BOLD,
    fontSize: 16,
    color: 'black',
    marginBottom: 10,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
