import CourseItem from './components/course-item';
import Input from '../../shared/components/Input';
import PermissionModal from './components/permission-modal';
import React, {useCallback, useRef, useState} from 'react';
import SickModal from './components/sick-modal';
import useAuthStore from '../../shared/data-store/useAuthStore';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {COLORS} from '../../shared/utils/colors';
import {FlatList, StyleSheet, View} from 'react-native';
import {Search} from 'lucide-react-native';
import {setStatusBarStyle} from '../../shared/utils/functions';
import {useFocusEffect} from '@react-navigation/native';
import {useShallow} from 'zustand/shallow';
import {
  UserCourseData,
  useUserCoursesList,
} from '../../shared/api/useUserCoursesList';

const CourseListScreen = () => {
  const {userData} = useAuthStore(
    useShallow((state: any) => ({
      userData: state.userData,
    })),
  );

  const {data, refetch} = useUserCoursesList({
    page: 1,
    limit: 10,
    user_id: userData?.id,
    include_upcoming_schedule: 1,
    include_attendance_recap: 1,
  });

  const permissionModalRef = useRef<BottomSheetModal>(null);
  const sickModalRef = useRef<BottomSheetModal>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [courseData, setCourseData] = useState<UserCourseData>();

  useFocusEffect(
    useCallback(() => {
      setStatusBarStyle({
        style: 'dark-content',
        backgroundColor: 'white',
      });
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
        onPressPermission={data => {
          setCourseData(data);
          handlePresentPermissionModalPress();
        }}
        onPressSick={data => {
          setCourseData(data);
          handlePresentSickModalPress();
        }}
      />
    );
  };

  return (
    <View style={styles.screen}>
      <View style={styles.searchContainer}>
        <Input placeholder="Cari mata kuliah" rightIcon={<Search />} />
      </View>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContent}
        data={data}
        renderItem={renderItem}
        keyExtractor={(_, i) => `course_${i}`}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
      />
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
});

export default CourseListScreen;
