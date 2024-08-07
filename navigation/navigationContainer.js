import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer, } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppStack from './appStack'; 
import AuthStack from './authStack'; 
import { Colors } from '../assets/colors';
const MeannavigationContainer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const checkUserToken = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData !== null) {
          const parsedData = JSON.parse(userData);
          setUserToken(parsedData.jwt);
        }
      } catch (error) {
        console.error('Failed to load user data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    checkUserToken();
  }, []);

 
  return (
    <NavigationContainer>
      {userToken ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default MeannavigationContainer;
