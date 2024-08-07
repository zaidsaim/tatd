

// const styles = StyleSheet.create({
//   loginContainer: {
//     margin: 20,
//     height: 350,
//     borderWidth: 2,
//     borderColor: Colors.primary, // replace with Colors.primary
//     borderRadius: 10,
//     backgroundColor: Colors.primary, // replace with Colors.primary
//   },
//   header: {
//     backgroundColor: Colors.primary, // replace with Colors.primary
//     height: 110,
//     justifyContent: 'space-between',
//     borderRadius: 7,
//     padding: 10,
//   },
//   roudtripcontainer: {
//     // marginVertical: 7,
//     height: 50,
//     width: '100%',
//     borderRadius: 10,
//     backgroundColor: '#ffffff', // replace with Colors.white
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 10,
//   },
//   roudtripText: {
//     color: Colors.primary, // replace with Colors.primary
//   },
//   iconContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   icon: {
//     width: 20,
//     height: 20,
//     borderWidth: 1,
//     borderColor: '#ffffff', // replace with Colors.white
//   },
//   loginTextContainer: {
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   loginText: {
//     color: 'black', // replace with Colors.white
//     fontWeight: '500', // replace with FontWeights.regular
//     fontSize: 24, // replace with FontSizes.xlarge
//   },
//   contentContainer: {
//     margin: 15,
//     backgroundColor: Colors.primary, // replace with Colors.primary
//   },
//   alertText: {
//     color: '#000000', // replace with Colors.black
//     fontSize: 16, // replace with appropriate font size
//     marginBottom: 20,
//   },
//   dateContainer: {
//     marginBottom: 10,
//   },
//   dateText: {
//     color: '#000000', // replace with Colors.black
//     fontSize: 14, // replace with appropriate font size
//   },
//   bookingIdContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   bookingIdText: {
//     color: '#000000', // replace with Colors.black
//     fontSize: 14, // replace with appropriate font size
//   },
//   priceText: {
//     color: '#000000', // replace with Colors.black
//     fontSize: 18, // replace with appropriate font size
//     marginBottom: 10,
//   },
//   cancelText: {
//     color: '#007bff', // replace with Colors.primary
//     fontSize: 16, // replace with appropriate font size
//     textAlign: 'right',
//   },
// });

import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OTTHeader from '../components/OTTHeader';
import {
  Colors,
  FontSizes,
  FontWeights,
  Margins,
  Paddings,
  BorderRadius,
  BorderWidths,
} from '../assets/colors';
const FlexibleThankYou = ({navigation, route}) => {
  const {fsId} = route?.params;
  //   console.log('cancel==========',itemcancel)

  //   useEffect(() => {
  //     const handleNavigation = async () => {
  //       await removeData('bookingvalue');
  //       navigation.navigate('TrackScreen');
  //     };

  //     setTimeout(() => {
  //       handleNavigation();
  //     }, 5000);
  //   }, []);

  //   const removeData = async (key) => {
  //     try {
  //       await AsyncStorage.removeItem(key);
  //       console.log(`Data associated with key "${key}" has been removed.`);
  //     } catch (error) {
  //       console.error('Error removing data:', error);
  //     }
  //   };

  return (
    <View style={{flex: 1}}>
      <OTTHeader navigation={navigation} title={'trusted & trained driver'} />
      <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.daysRow}>
          <Text style={styles.daysText}>2 Days</Text>
          <Text style={styles.priceText}>Rs 2064</Text>
          <Text style={styles.paymentText}>Cash</Text>
        </View>
        <View style={styles.carTypeRow}>

          <Text style={styles.carTypeText}>Manual - SUV</Text>
        </View>
      </View>
      <Text style={styles.testingText}>testing</Text>
      <View style={styles.dateRow}>
        <Text style={styles.dateText}>09 Aug | 15 Aug</Text>
      </View>
      <View style={styles.idRow}>
        <Text style={styles.idText}>491727</Text>
        <Text style={styles.idText}>491728</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.totalText}>Rs 1032</Text>
        <Text style={styles.hoursText}>12 Hours/day</Text>
        <Text style={styles.cancelText}>Cancel</Text>
      </View>
    </View>
    </View>
  );
};
export default FlexibleThankYou;

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#007AFF',
      padding: 10,
      margin: 10,
    },
    header: {
      backgroundColor: '#007AFF',
      borderRadius: 5,
      padding: 10,
    },
    daysRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    daysText: {
      color: 'white',
      fontWeight: 'bold',
    },
    priceText: {
      color: 'white',
    },
    paymentText: {
      color: 'white',
    },
    carTypeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 5,
    },
    carIcon: {
      width: 20,
      height: 20,
      marginRight: 5,
    },
    carTypeText: {
      color: 'white',
    },
    testingText: {
      marginTop: 10,
    },
    dateRow: {
      marginTop: 5,
    },
    dateText: {
      fontWeight: 'bold',
    },
    idRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 5,
    },
    idText: {
      backgroundColor: '#E0E0E0',
      padding: 5,
      borderRadius: 5,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 10,
    },
    totalText: {
      fontWeight: 'bold',
    },
    hoursText: {
      color: 'gray',
    },
    cancelText: {
      color: '#007AFF',
    },
  });
