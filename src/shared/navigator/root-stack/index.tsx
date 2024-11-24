import BottomTab from '../bottom-tab';
import LoginScreen from '../../../pages/login';
import React from 'react';
import SplashScreen from '../../../pages/splash';
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
    </Stack.Navigator>
  );
};

export default RootStack;
