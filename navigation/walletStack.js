
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WalletBalance from '../screens/walletBalance';
import LifetimeEarningScreen from '../screens/lifetimeEarningScreen';
import AmountScreen from '../screens/amountScreen';
const Stack = createStackNavigator();
const WalletStack = () => {
  return (
    <Stack.Navigator initialRouteName="WalletBalance">
      <Stack.Screen
        name="WalletBalance"
        component={WalletBalance}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LifetimeEarningScreen"
        component={LifetimeEarningScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AmountScreen"
        component={AmountScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export default WalletStack;
