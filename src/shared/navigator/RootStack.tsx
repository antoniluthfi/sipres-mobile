import LoginScreen from '../../pages/login';
import React from 'react';
import SplashScreen from '../../pages/splash';
import {createStackNavigator} from '@react-navigation/stack';
import {SCREEN_OPTIONS} from '../utils/screen-options';

const Stack = createStackNavigator();

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
    </Stack.Navigator>
  );
};

export default RootStack;
