import AttendanceHistoryScreen from '../../../pages/attendance-history';
import CourseListScreen from '../../../pages/course-list';
import CustomBottomTab from './CustomBottomTab';
import HomeScreen from '../../../pages/home';
import ProfileScreen from '../../../pages/profile';
import React from 'react';
import {COLORS} from '../../utils/colors';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator tabBar={(props: any) => <CustomBottomTab {...props} />}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Beranda',
        }}
      />
      <Tab.Screen
        name="CourseList"
        component={CourseListScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Jadwal Kuliah',
          headerStyle: {
            backgroundColor: COLORS.PRIMARY,
          },
        }}
      />
      <Tab.Screen
        name="AttendanceHistory"
        component={AttendanceHistoryScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Riwayat',
          headerStyle: {
            backgroundColor: COLORS.PRIMARY,
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Profil',
          headerStyle: {
            backgroundColor: COLORS.PRIMARY,
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
