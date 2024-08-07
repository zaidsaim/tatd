// src/navigation/TrackStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TrackScreen from '../screens/customers/trackScreen';
import ThankuScreen from '../screens/customers/ThankuScreen';

const Stack = createStackNavigator();

const TrackStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TrackScreen" component={TrackScreen} />
      <Stack.Screen name="ThankYouScreen" component={ThankuScreen} />
    </Stack.Navigator>
  );
};

export default TrackStack;
