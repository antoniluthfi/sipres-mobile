/* eslint-disable react-hooks/exhaustive-deps */
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
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
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
  const [page, setPage] = useState(1);
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const {data, refetch, isLoading, pagination} = useAttendanceRecordList({
    page,
    limit: 5,
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

  useEffect(() => {
    if (data) {
      if (page === 1) {
        setRecords(data);
      } else {
        setRecords(prevRecords => [...prevRecords, ...data]);
        setIsLoadingMore(false);
      }
    }
  }, [data, page]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setPage(1);
    try {
      await refetch();
    } catch (error) {
      console.error('Failed to refresh:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const loadMore = () => {
    if (!isLoadingMore && page < pagination?.totalPages) {
      setIsLoadingMore(true);
      setPage(prevPage => prevPage + 1);
    }
  };

  const renderItem = ({item}: {item: AttendanceRecord}) => {
    return <RecordItem item={item} />;
  };

  return (
    <View style={styles.screen}>
      <Filter onSubmit={setSelectedCourseId} />

      {isLoading && page === 1 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.PRIMARY} />
        </View>
      ) : (
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContent}
          data={records}
          renderItem={renderItem}
          keyExtractor={(_, i) => `course_${i}`}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isLoadingMore ? (
              <ActivityIndicator size="small" color={COLORS.PRIMARY} />
            ) : null
          }
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
