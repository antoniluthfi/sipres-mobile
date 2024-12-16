import Input from '../../shared/components/Input';
import React, {useCallback, useState} from 'react';
import RecordItem from './components/record-item';
import useAuthStore from '../../shared/data-store/useAuthStore';
import {
  AttendanceRecord,
  useAttendanceRecordList,
} from '../../shared/api/useAttendanceRecordList';
import {COLORS} from '../../shared/utils/colors';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import {Search} from 'lucide-react-native';
import {setStatusBarStyle} from '../../shared/utils/functions';
import {useFocusEffect} from '@react-navigation/native';
import {useShallow} from 'zustand/shallow';

const AttendanceHistoryScreen = () => {
  const {userData} = useAuthStore(
    useShallow((state: any) => ({
      userData: state.userData,
    })),
  );

  const [isRefreshing, setIsRefreshing] = useState(false);

  const {data, refetch, isLoading} = useAttendanceRecordList({
    page: 1,
    limit: 10,
    user_id: userData?.id,
  });

  useFocusEffect(
    useCallback(() => {
      setStatusBarStyle({
        style: 'dark-content',
        backgroundColor: 'white',
      });
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
      <View style={styles.searchContainer}>
        <Input placeholder="Cari data" rightIcon={<Search />} />
      </View>
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
  searchContainer: {
    padding: 20,
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
