import appBar from '../../shared/components/leading/AppBar';
import DataNotFound from '../../shared/components/data-not-found';
import Filter from './components/filter';
import Leading from '../../shared/components/leading';
import React, {useCallback, useEffect, useState} from 'react';
import RecordItem from './components/record-item';
import useAuthStore from '../../shared/data-store/useAuthStore';
import {COLORS} from '../../shared/utils/colors';
import {setStatusBarStyle} from '../../shared/utils/functions';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useShallow} from 'zustand/shallow';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import {
  AttendanceRecord,
  useAttendanceRecordList,
} from '../../shared/api/useAttendanceRecordList';

const AttendanceHistoryScreen = () => {
  const navigation = useNavigation();
  const {userData} = useAuthStore(
    useShallow((state: any) => ({
      userData: state.userData,
    })),
  );

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState('');

  const {data, refetch, isLoading} = useAttendanceRecordList({
    page: 1,
    limit: 10,
    user_id: userData?.id,
    course_id: selectedCourseId,
  });

  useEffect(() => {
    navigation.setOptions(
      appBar({
        leading: <Leading title="Riwayat Absensi" useBackButton={false} />,
      }),
    );
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      setStatusBarStyle({
        style: 'light-content',
        backgroundColor: COLORS.PRIMARY,
      });
      refetch();
    }, []),
  );

  // Fungsi untuk handle refresh
  const handleRefresh = async () => {
    setIsRefreshing(true); // Mulai refresh
    try {
      await refetch(); // Refetch data dari API
    } catch (error) {
      console.error('Failed to refresh:', error);
    } finally {
      setIsRefreshing(false); // Akhiri refresh
    }
  };

  const renderItem = ({item}: {item: AttendanceRecord}) => {
    return <RecordItem item={item} />;
  };

  return (
    <View style={styles.screen}>
      <Filter onSubmit={setSelectedCourseId} />

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.PRIMARY} />
        </View>
      ) : (
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContent}
          data={data}
          renderItem={renderItem}
          keyExtractor={(_, i) => `course_${i}`}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          ListEmptyComponent={DataNotFound}
        />
      )}
    </View>
  );
};

export default AttendanceHistoryScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  list: {
    paddingHorizontal: 20,
  },
  listContent: {
    gap: 10,
    paddingBottom: 100,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
