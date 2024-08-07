

import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Image,Button } from 'react-native';
import HomeScreen from '../screens/homeScreen';
import TrackScreen from '../screens/customers/trackScreen';
import GetSupportScreen from '../screens/getSupportScreen';
import RatingAndReviewsScreen from '../screens/ratingAndReviewsScreen';
import WalletStack from './walletStack';
import TrackStack from './trackStack';
import { Colors, FontSizes } from '../assets/colors';

const referimage = require('../assets/images/referr.png');
const reviewsimage = require('../assets/images/reviews.png');
const trackimage = require('../assets/images/track.png');

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function BottomTabs({ navigation }) {
  const [firstscreen, setFirstscreen] = useState('HomeScreen');
  const [middleScreen, setMiddleScreen] = useState('RatingAndReviewsScreen');
  const [lastScreen, setLastScreen] = useState('Track');
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: { height: 100 },
        tabBarActiveTintColor: '#16588e',
        tabBarLabelStyle: { color: Colors.black, fontSize: FontSizes.tinymedium, marginBottom: 30, fontWeight: '500' },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Refer',
          tabBarIcon: ({ color }) => (
            <Image
              source={referimage}
              style={{ width: 30, height: 30, tintColor: color }}
            />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            setFirstscreen((prev) => (prev === 'HomeScreen' ? 'WalletStack' : 'HomeScreen'));
            if (firstscreen === 'HomeScreen') {
              navigation.navigate('WalletStack');
            } else {
              navigation.navigate('Home');
            }
            setMiddleScreen('RatingAndReviewsScreen'); // Reset middle screen to Reviews when Home is selected
          },
        })}
      />
      <Tab.Screen
        name="Middle"
        component={middleScreen === 'RatingAndReviewsScreen' ? RatingAndReviewsScreen : GetSupportScreen}
        options={{
          tabBarLabel: middleScreen === 'RatingAndReviewsScreen' ? 'Reviews' : 'Get Support',
          tabBarIcon: ({ color }) => (
            <Image
              source={middleScreen === 'RatingAndReviewsScreen' ? reviewsimage : referimage}
              style={{ width: 30, height: 30, tintColor: color }}
            />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('Middle');
          },
        })}
      />
      <Tab.Screen
        name="Track"
        component={TrackStack}
        options={{
          tabBarLabel: 'Track',
          tabBarIcon: ({ color }) => (
            <Image
              source={trackimage}
              style={{ width: 30, height: 30, tintColor: color }}
            />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: () => {
            setMiddleScreen('GetSupportScreen'); // Change middle tab to GetSupportScreen when Track is selected
            navigation.navigate('Track');
          },
        })}
      />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={BottomTabs} />
      <Stack.Screen
        name="WalletStack"
        component={WalletStack}
      />
       <Stack.Screen
        name="TrackStack"
        component={TrackStack}
      />
    </Stack.Navigator>
  );
}

export default AppNavigator;
