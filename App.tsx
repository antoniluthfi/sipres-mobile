/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import RootStack from './src/shared/navigator/root-stack';
import {AuthProvider} from './src/shared/context/AuthContext';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './src/shared/utils/navigation-service';
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer ref={navigationRef}>
        <BottomSheetModalProvider>
          <AuthProvider>
            <RootStack />
          </AuthProvider>
        </BottomSheetModalProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
