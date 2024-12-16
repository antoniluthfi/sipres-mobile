import BottomTab from '../bottom-tab';
import ContactUsScreen from '../../../pages/contact-us';
import LoginScreen from '../../../pages/login';
import PermissionScreen from '../../../pages/permission';
import React from 'react';
import ScanScreen from '../../../pages/scan';
import SplashScreen from '../../../pages/splash';
import {COLORS} from '../../utils/colors';
import {createStackNavigator} from '@react-navigation/stack';
import {SCREEN_OPTIONS} from '../../utils/screen-options';

const Stack = createStackNavigator<RootStackParamList>();

const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={SCREEN_OPTIONS.DEFAULT}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={SCREEN_OPTIONS.DEFAULT}
      />
      <Stack.Screen
        name="MainTab"
        component={BottomTab}
        options={SCREEN_OPTIONS.DEFAULT}
      />
      <Stack.Screen
        name="Permission"
        component={PermissionScreen}
        options={SCREEN_OPTIONS.DEFAULT}
      />
      <Stack.Screen
        name="ScanQr"
        component={ScanScreen}
        options={SCREEN_OPTIONS.DEFAULT}
      />
      <Stack.Screen
        name="ContactUs"
        component={ContactUsScreen}
        options={{
          ...SCREEN_OPTIONS.DEFAULT,
          headerStyle: {
            backgroundColor: COLORS.PRIMARY,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
