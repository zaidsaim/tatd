import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Colors } from '../assets/colors';
const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('login');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/images/logo-white.png')} style={styles.logoImage} />
      </View>
    </View>
  );
}

export default SplashScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    backgroundColor: Colors.primary,
    padding: 30,
    borderRadius: 10,
  },
  logoImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
});
