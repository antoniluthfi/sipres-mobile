import CustomBottomTab from './CustomBottomTab';
import HomeScreen from '../../../pages/home';
import ProfileScreen from '../../../pages/profile';
import React from 'react';
import ScanScreen from '../../../pages/scan';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator tabBar={(props: any) => <CustomBottomTab {...props} />}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Scan"
        component={ScanScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
