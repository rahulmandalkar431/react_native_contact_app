import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MainStack } from './src/navigation/Navigation';

export default App = () => {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
};
