
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, } from 'react-native';
import OTTHeader from '../../components/OTTHeader';
import { Colors, FontSizes, FontWeights ,Margins,Paddings,BorderRadius,BorderWidths} from '../../assets/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ThankuScreen = ({ navigation ,route}) => {

  const {itemcancel} =route?.params
  console.log('cancel==========',itemcancel)

  useEffect(() => {
    const handleNavigation = async () => {
      await removeData('bookingvalue');
      navigation.navigate('TrackScreen'); 
    };

    setTimeout(() => {
      handleNavigation();
    }, 5000);
  }, []);

  const removeData = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      console.log(`Data associated with key "${key}" has been removed.`);
    } catch (error) {
      console.error('Error removing data:', error);
    }
  };


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
                source={require('../../assets/images/rt_icon.png')}
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
          <Text style={{ color: Colors.black }}>Booking Cancelled Alert!</Text>
          <View style={{ ...Margins.mv.mv20 }}>
            <Text style={{ color: Colors.black }}>Dear {itemcancel.name}, Your Booking ID {itemcancel.booking_number} cancelled</Text>
            <Text style={{ color: Colors.black }}>successfully.</Text>
          </View>
          <Text style={{ color: Colors.black, }}>We are looking forward to serve you again!</Text>
          <Text style={{ color: Colors.black, ...Margins.mt.mt35 }}>www.tatd.in</Text>
        </View>
      </View>
    </View>
  );
}
export default ThankuScreen;
const styles = StyleSheet.create({
  loginContainer: {
    ...Margins.m.m20,
    height: 350,
    ...BorderWidths.bb.bb2,
    borderLeftColor: Colors.primary
    , borderRightColor: Colors.primary,
     borderBottomColor: Colors.primary,
     borderLeftWidth:2,
     borderLeftColor:Colors.primary,
    ...BorderWidths.br.br2,
    ...BorderWidths.br.br2,
    ...BorderRadius.br10,
  },
  header: {
    backgroundColor: Colors.primary,
    height: 110,
    justifyContent: 'space-between',
    ...BorderRadius.br7,
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
    ...BorderWidths.bl.bl1,
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
