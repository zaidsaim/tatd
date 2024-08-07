
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, } from 'react-native';
import OTTHeader from '../components/OTTHeader';
import { Colors, FontSizes, FontWeights,Paddings,Margins } from '../assets/colors';
const RescheduleThankuScreen = ({ navigation,route }) => {

  const {bookingId} = route?.params


  setTimeout(() => {
    navigation.navigate('track')
  }, 2000);



  return (
    <View style={{ flex: 1 }}>
      <OTTHeader navigation={navigation} title={'trusted & trained driver'} />
      <View style={styles.loginContainer}>
        <View style={styles.header}>
          <View style={styles.roudtripcontainer}>
            <Text style={styles.roudtripText}>
              wwww.tatd.in
            </Text>
            <View style={styles.iconContainer}>
              <Image
                source={require('../assets/images/rt_icon.png')}
                resizeMode={'cover'}
                style={styles.icon}
              />
            </View>
          </View>
          <View style={styles.loginTextContainer}>
            <Text style={styles.loginText}>ThankYou</Text>
          </View>
        </View>
        <View style={{ ...Margins.m.m15 }}>
          <Text style={{ color: Colors.black }}>Your Booking ID {bookingId} rescheduled</Text>
          <Text style={{ color: Colors.black }}>successfully.</Text>
          <View style={{ ...Margins.mv.mv20 }}>
          </View>
        </View>
      </View>
    </View>
  );
}

export default RescheduleThankuScreen;

const styles = StyleSheet.create({
  loginContainer: {
   ...Margins.m.m20,
    height: 350,
    borderBottomWidth: 2,
    borderLeftColor: Colors.primary
    , borderRightColor: Colors.primary, borderBottomColor: Colors.primary,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderRadius: 10,
  },
  header: {
    backgroundColor: Colors.primary,
    height: 110,
    justifyContent: 'space-between',
    borderRadius: 7,
    borderColor: Colors.primary,
  },
  roudtripcontainer: {
   ...Margins.mv.mv7,
    height: 20,
    width: '78%',
    backgroundColor: Colors.white
  },
  roudtripText: {
    position: 'absolute',
    color: Colors.primary,
  },
  iconContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    left: 20,
  },
  icon: {
    width: 20,
    height: 20,
    borderLeftWidth: 1,
    borderLeftColor: Colors.white,
  },
  loginTextContainer: {
    alignItems: 'center',
   ...Margins.mb.mb10,
  },
  loginText: {
    color: Colors.white,
    fontWeight: FontWeights.regular,
    fontSize: FontSizes.xlarge
  },
  input: {
   ...Paddings.p.p4,
    fontSize: FontSizes.xsmall,
    color: Colors.black,
  },
});
