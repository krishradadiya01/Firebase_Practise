import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CartScreen from '../Screens/CartScreen';
import AuthenticationScreen from '../Screens/AuthenticationScreen';
import CrashNylitics from '../Screens/CrashNylitics';
const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AuthenticationScreen"
        component={AuthenticationScreen}></Stack.Screen>
      <Stack.Screen name="CartScreen" component={CartScreen}></Stack.Screen>
      <Stack.Screen
        name="CrashNylitics"
        component={CrashNylitics}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default StackNavigation;
