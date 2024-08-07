import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { Colors, FontSizes } from '../assets/colors';

const OTTReferHeader = ({navigation,title}) => {
  return (
    <View style={styles.headerContainer}>
      <Pressable style={styles.logoContainer} onPress={()=>navigation.goBack()}>
        <View>
          <View style={styles.logoRow}>
            <Image source={require('../assets/images/logo-tatd.png')} style={styles.logoImage} />
            <Text style={styles.logoText}>tat d</Text>
          </View>
          <Text style={styles.sloganText}>{title}</Text>
        </View>
      </Pressable >
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity >
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding:10,
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  logoContainer: {
    flexDirection: 'row',
    margin:10
  },
  logoRow: {
    flexDirection: 'row',
  },
  logoImage: {
    width: 37,
    height: 37,
    tintColor: Colors.primary,
  },
  logoText: {
    color: Colors.primary,
    fontSize: FontSizes.xxlarge,
    marginTop: 10,
    marginLeft: 10,
    fontFamily: 'AbhayaLibre-Bold' 
  },
  sloganText: {
    color: Colors.primary,
    fontSize: 9,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: 25,
    fontFamily: 'AbhayaLibre-Bold' 
  },
  backButton: {
    backgroundColor: Colors.white,
    marginHorizontal:10,
    borderRadius: 5,
    padding: 7,
    alignItems: 'center',
    paddingHorizontal: 12,
    borderColor: Colors.grey,
    borderWidth: 1,
    marginTop:5
  },
  backButtonText: {
    color: Colors.black,
  },
});

export default OTTReferHeader;
