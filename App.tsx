import React from 'react';
import RootStack from './src/shared/navigator/root-stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './src/shared/utils/navigation-service';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer ref={navigationRef}>
        <RootStack />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
