import BottomTab from '../bottom-tab';
import ClassFloorPlanDetailsScreen from '../../../pages/class-floor-plan-details';
import ClassFloorPlanScreen from '../../../pages/class-floor-plan';
import ContactUsScreen from '../../../pages/contact-us';
import LoginScreen from '../../../pages/login';
import PermissionScreen from '../../../pages/permission';
import React from 'react';
import ScanScreen from '../../../pages/scan';
import SplashScreen from '../../../pages/splash';
import TermsConditionScreen from '../../../pages/terms-condition';
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
        options={{
          ...SCREEN_OPTIONS.DEFAULT,
          headerStyle: {
            backgroundColor: COLORS.PRIMARY,
          },
        }}
      />
      <Stack.Screen
        name="ContactUs"
        component={ContactUsScreen}
        options={{
          ...SCREEN_OPTIONS.SLIDE_LEFT,
          headerStyle: {
            backgroundColor: COLORS.PRIMARY,
          },
        }}
      />
      <Stack.Screen
        name="ClassFloorPlan"
        component={ClassFloorPlanScreen}
        options={{
          ...SCREEN_OPTIONS.SLIDE_LEFT,
          headerStyle: {
            backgroundColor: COLORS.PRIMARY,
          },
        }}
      />
      <Stack.Screen
        name="ClassFloorPlanDetails"
        component={ClassFloorPlanDetailsScreen}
        options={{
          ...SCREEN_OPTIONS.SLIDE_LEFT,
          headerStyle: {
            backgroundColor: COLORS.PRIMARY,
          },
        }}
      />
      <Stack.Screen
        name="TermsCondition"
        component={TermsConditionScreen}
        options={{
          ...SCREEN_OPTIONS.SLIDE_LEFT,
          headerStyle: {
            backgroundColor: COLORS.PRIMARY,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
