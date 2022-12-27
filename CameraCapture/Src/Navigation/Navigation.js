import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import CameraScreen from '../Screens/CameraScreen';
import CaptureScreen from '../Screens/CaptureScreen';
import ResizeScreen from '../Screens/ResizeScreen';
import Example from '../Screens/Example';

const Stack = createNativeStackNavigator();
const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: true}}>
        <Stack.Screen name="camera" component={CameraScreen} />
        <Stack.Screen name="capture" component={Example} />
        <Stack.Screen name="resize" component={ResizeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
