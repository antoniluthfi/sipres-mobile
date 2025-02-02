/* eslint-disable react-hooks/exhaustive-deps */
import appBar from '../../shared/components/leading/AppBar';
import CourseItem from './components/course-item';
import DataNotFound from '../../shared/components/data-not-found';
import Input from '../../shared/components/Input';
import Leading from '../../shared/components/leading';
import PermissionModal from './components/permission-modal';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import SickModal from './components/sick-modal';
import useAuthStore from '../../shared/data-store/useAuthStore';
import useDebounce from '../../shared/hooks/useDebounce';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {COLORS} from '../../shared/utils/colors';
import {Search} from 'lucide-react-native';
import {setStatusBarStyle} from '../../shared/utils/functions';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useShallow} from 'zustand/shallow';
import {
  UserCourseData,
  useUserCoursesList,
} from '../../shared/api/useUserCoursesList';

const CourseListScreen = () => {
  const navigation = useNavigation();
  const {userData} = useAuthStore(
    useShallow((state: any) => ({
      userData: state.userData,
    })),
  );

  const permissionModalRef = useRef<BottomSheetModal>(null);
  const sickModalRef = useRef<BottomSheetModal>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [courseData, setCourseData] = useState<UserCourseData>();
  const [keyword, setKeyword] = useState('');

  const debounceSearch = useDebounce(keyword, 500);
  const {data, refetch, isLoading} = useUserCoursesList({
    page: 1,
    limit: 10,
    search: debounceSearch,
    user_id: userData?.id,
    include_upcoming_schedule: 1,
    include_attendance_recap: 0,
  });

  useEffect(() => {
    navigation.setOptions(
      appBar({
        leading: <Leading title="Jadwal Kuliah" useBackButton={false} />,
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

  const handlePresentPermissionModalPress = useCallback(() => {
    permissionModalRef.current?.present();
  }, []);

  const handlePresentSickModalPress = useCallback(() => {
    sickModalRef.current?.present();
  }, []);

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

  const renderItem = ({item}: {item: UserCourseData}) => {
    return (
      <CourseItem
        item={item}
        onPressPermission={val => {
          setCourseData(val);
          handlePresentPermissionModalPress();
        }}
        onPressSick={val => {
          setCourseData(val);
          handlePresentSickModalPress();
        }}
      />
    );
  };

  return (
    <View style={styles.screen}>
      <View style={styles.searchContainer}>
        <Input
          placeholder="Cari mata kuliah"
          rightIcon={<Search />}
          value={keyword}
          onChange={setKeyword}
        />
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
          ListEmptyComponent={DataNotFound}
        />
      )}
      <PermissionModal ref={permissionModalRef} data={courseData} />
      <SickModal ref={sickModalRef} data={courseData} />
    </View>
  );
};

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

export default CourseListScreen;
