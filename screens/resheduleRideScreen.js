// import React, { useState } from 'react';
// import { View, Text, StyleSheet, Image, TextInput, Pressable } from 'react-native';
// import OTTHeader from '../components/OTTHeader';
// import { Colors, FontSizes, FontWeights,Paddings,Margins } from '../assets/colors';
// import DropShadow from "react-native-drop-shadow";
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
// import { Picker } from '@react-native-picker/picker';
// const ResheduleRideScreen = ({ navigation }) => {
//   const [selectedTime, setSelectedTime] = useState();
//   const [selectedDate, setSelectedDate] = useState()
//   const generateTimes = () => {
//     const times = [];
//     const start = new Date(0, 0, 0, 0, 15);
//     const end = new Date(0, 0, 0, 23, 45);
//     while (start <= end) {
//       const hours = start.getHours();
//       const minutes = start.getMinutes();
//       const period = hours >= 12 ? 'PM' : 'AM';
//       const adjustedHours = hours % 12 || 12;
//       const time = `${adjustedHours}:${minutes < 10 ? '0' : ''}${minutes} ${period}`;
//       times.push(time);
//       start.setMinutes(start.getMinutes() + 30);
//     }
//     return times;
//   };
//   const times = generateTimes();

//   const getFormattedDate = (date) => {
//     const options = { year: 'numeric', month: 'long', day: 'numeric' };
//     return date.toLocaleDateString(undefined, options);
//   };
//   const generateDates = () => {
//     const dates = [];
//     const today = new Date();
//     const oneMonthLater = new Date();
//     oneMonthLater.setMonth(today.getMonth() + 1);
//     for (let date = new Date(today); date <= oneMonthLater; date.setDate(date.getDate() + 1)) {
//       dates.push(getFormattedDate(new Date(date)));
//     }
//     return dates;
//   };
//   const dates = generateDates();
//   return (
//     <View style={{ flex: 1 }}>
//       <OTTHeader navigation={navigation} title={'trusted & trained driver'} />
//       <View style={styles.loginContainer}>
//         <View style={styles.header}>
//           <View style={styles.roudtripcontainer}>
//             <Text style={styles.roudtripText}>
//               Booking ID-429612
//             </Text>
//             <View style={styles.iconContainer}>
//               <Image
//                 source={require('../assets/images/rt_icon.png')}
//                 resizeMode={'cover'}
//                 style={styles.icon}
//               />
//             </View>
//           </View>
//           <View style={styles.loginTextContainer}>
//             <Text style={styles.loginText}>Reschedule Your Ride</Text>
//           </View>
//         </View>
//         <View style={{ flexDirection: 'row', marginTop: '20%', ...Margins.mh.mh20, alignItems: 'center', width: '80%' }}>
//           <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: Colors.grey, width: '60%', ...Margins.mr.mr5, height: 40 }}>
//             <View style={{
//               justifyContent: 'center', alignItems: 'center', borderRightWidth: 1, borderRightColor: Colors.grey
//             }}>
//               <MaterialIcons name="calendar-month" color={Colors.icon} size={18} style={{ alignItems: 'center', ...Paddings.ph.ph5}} />
//             </View>
//             <View style={{ justifyContent: 'center', }}>
//               <Picker
//                 selectedValue={selectedDate}
//                 onValueChange={(itemValue) => setSelectedDate(itemValue)}
//                 style={styles.pickerDate}
//                 dropdownIconColor={Colors.black}
//                 itemStyle={{ color: Colors.black, fontSize: FontSizes.small, }}
//               >
//                 <Picker.Item label={'Today'} value={''} style={{ fontSize: FontSizes.small, }} />
//                 {dates.map((date, index) => (
//                   <Picker.Item key={index} label={date} value={date} style={{ color: Colors.black, fontSize: FontSizes.tinymedium, }} />
//                 ))}
//               </Picker>
//             </View>
//           </View>
//           <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: Colors.grey, width: '50%', height: 40 }}>
//             <View style={{ justifyContent: 'center', }}>
//               <Picker
//                 selectedValue={selectedTime}
//                 onValueChange={(itemValue) => setSelectedTime(itemValue)}
//                 style={styles.pickerTime}
//                 dropdownIconColor={Colors.black}
//                 itemStyle={{ color: Colors.black, fontSize: FontSizes.small }}
//               >
//                 <Picker.Item label={'Time'} value={''} style={{ fontSize: FontSizes.small }} />
//                 {times.map((time, index) => (
//                   <Picker.Item key={index} label={time} value={time} style={{ color: Colors.black, fontSize: FontSizes.tinymedium }} />
//                 ))}
//               </Picker>
//             </View>
//           </View>
//         </View>
//         <View style={{ justifyContent: 'center', alignItems: 'center', ...Paddings.ph.ph20, ...Margins.mv.mv30 }}>
//           <DropShadow style={{
//             shadowColor: '#171717',
//             shadowOffset: { width: 2, height: 6 },
//             shadowOpacity: 0.2,
//             shadowRadius: 3, elevation: 20,
//           }}>
//             <Pressable onPress={() => navigation.navigate('otp')} style={{ justifyContent: 'center', backgroundColor: Colors.primary, alignItems: 'center', padding: 10, borderRadius: 5, ...Paddings.ph.ph20, width: '80%', }}>
//               <Text style={{ color: Colors.white, fontSize: FontSizes.tinymedium, ...Paddings.ph.ph20, fontWeight: FontWeights.semiBold }}>Update</Text>
//             </Pressable>
//           </DropShadow>
//         </View>
//       </View>
//     </View>
//   );
// }

// export default ResheduleRideScreen;

// const styles = StyleSheet.create({
//   loginContainer: {
//     margin: 20,
//     height: 350,
//     borderBottomWidth: 2,
//     borderLeftColor: Colors.primary,
//      borderRightColor: Colors.primary,
//       borderBottomColor: Colors.primary,
//     borderLeftWidth: 2,
//     borderRightWidth: 2,
//     borderRadius: 10,
//   },
//   header: {
//     backgroundColor: Colors.primary,
//     height: 130,
//     justifyContent: 'space-between',
//     borderRadius: 7,
//     borderColor: Colors.primary,
//   },
//   roudtripcontainer: {
//     ...Margins.mv.mv7,
//     height: 20,
//     width: '78%',
//     backgroundColor: Colors.white,
//   },
//   roudtripText: {
//     position: 'absolute',
//     color: Colors.primary,
//     ...Margins.ml.ml5
//   },
//   iconContainer: {
//     justifyContent: 'flex-end',
//     alignItems: 'flex-end',
//     left: 20,
//   },
//   icon: {
//     width: 20,
//     height: 20,
//     borderLeftWidth: 1,
//     borderLeftColor: Colors.white,
//   },
//   loginTextContainer: {
//     alignItems: 'center',
//     ...Margins.mb.mb40,
//   },
//   loginText: {
//     color: Colors.white,
//     fontWeight: FontWeights.regular,
//     fontSize: FontSizes.xlarge
//   },
//   input: {
//     ...Paddings.p.p4,
//     fontSize: FontSizes.xsmall,
//     color: Colors.darkgrey,
//     fontWeight: FontWeights.regular
//   },

//   pickerDate: {
//     width: 130,
//     color: Colors.black,
//   },
//   pickerItem: {
//     fontSize: 6,
//     color: Colors.white,
//     fontWeight: FontWeights.bold
//   },
//   pickerTime: {
//     width: 140,
//     flex: 1,
//     color: Colors.black,

//   },
//   picker: {
//     width: '100%',
//     color: Colors.black,
//   },
// });
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import OTTHeader from '../components/OTTHeader';
import {
  Colors,
  FontSizes,
  FontWeights,
  Paddings,
  Margins,
} from '../assets/colors';
import DropShadow from 'react-native-drop-shadow';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Picker} from '@react-native-picker/picker';
import {refreshAccessToken, validateAccessToken} from '../utils/validation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const ResheduleRideScreen = ({navigation, route}) => {
  const {bookingId} = route?.params;
  console.log(bookingId, 'iiiiidd');

  const [selectedTime, setSelectedTime] = useState();
  const [selectedDate, setSelectedDate] = useState();

  const rescheduleBooking = async () => {
    if (!selectedTime && !selectedDate) {
      Alert.alert('Selected time or date is missing');
      return; // Exit the function if either value is missing
    }
    const isValid = await validateAccessToken();
    if (!isValid) {
      await refreshAccessToken();
    }
    try {
      const userData = await AsyncStorage.getItem('userData');
      const parsedUserData = userData ? JSON.parse(userData) : null;
      const token = parsedUserData ? parsedUserData.jwt : null;
      console.log(token, ' jwt token');
      if (!token) {
        throw new Error('No token found');
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      const response = await axios.post(
        'https://www.tatd.in/app-api/customer/myride/reschedule-booking-api.php',
        {
          action: 'reschedule_booking',
          booking_number: bookingId,
          date: selectedDate,
          time: selectedTime,
        },
        config,
      );

      console.log(
        {
          action: 'reschedule_booking',
          booking_number: bookingId,
          date: selectedDate,
          time: selectedTime,
        },
        'reschedule booking Api body',
      );

      console.log(response.data, 'reschedule Api Response');
      if (response.data.success_code == 200) {
        console.log('navigate1');

        navigation.navigate('RescheduleThankuScreen', {bookingId: bookingId});
        console.log('navigate2');
      }
    } catch (err) {
      console.log('Error from rating API:', err.message);
    }
  };

  const generateTimes = () => {
    const times = [];
    const start = new Date(0, 0, 0, 0, 15);
    const end = new Date(0, 0, 0, 23, 45);
    while (start <= end) {
      const hours = start.getHours();
      const minutes = start.getMinutes();
      const period = hours >= 12 ? 'PM' : 'AM';
      const adjustedHours = hours % 12 || 12;
      const time = `${adjustedHours}:${
        minutes < 10 ? '0' : ''
      }${minutes} ${period}`;
      times.push(time);
      start.setMinutes(start.getMinutes() + 30);
    }
    return times;
  };
  const times = generateTimes();

  const getFormattedDate = date => {
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    return date.toLocaleDateString(undefined, options);
  };
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    const oneMonthLater = new Date();
    oneMonthLater.setMonth(today.getMonth() + 1);
    for (
      let date = new Date(today);
      date <= oneMonthLater;
      date.setDate(date.getDate() + 1)
    ) {
      dates.push(getFormattedDate(new Date(date)));
    }
    return dates;
  };
  const dates = generateDates();

  console.log(selectedDate, 'dateeeeeeeeeeee');
  console.log(selectedTime, 'timeeeeeeeeeeee');
  return (
    <View style={{flex: 1}}>
      <OTTHeader navigation={navigation} title={'trusted & trained driver'} />
      <View style={styles.loginContainer}>
        <View style={styles.header}>
          <View style={styles.roudtripcontainer}>
            <Text style={styles.roudtripText}>Booking ID-{bookingId}</Text>
            <View style={styles.iconContainer}>
              <Image
                source={require('../assets/images/rt_icon.png')}
                resizeMode={'cover'}
                style={styles.icon}
              />
            </View>
          </View>
          <View style={styles.loginTextContainer}>
            <Text style={styles.loginText}>Reschedule Your Ride</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: '20%',
            ...Margins.mh.mh20,
            alignItems: 'center',
            width: '80%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: Colors.grey,
              width: '60%',
              ...Margins.mr.mr5,
              height: 40,
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                borderRightWidth: 1,
                borderRightColor: Colors.grey,
              }}>
              <MaterialIcons
                name="calendar-month"
                color={Colors.icon}
                size={18}
                style={{alignItems: 'center', ...Paddings.ph.ph5}}
              />
            </View>
            <View style={{justifyContent: 'center'}}>
              <Picker
                selectedValue={selectedDate}
                onValueChange={itemValue => setSelectedDate(itemValue)}
                style={styles.pickerDate}
                dropdownIconColor={Colors.black}
                itemStyle={{color: Colors.black, fontSize: FontSizes.small}}>
                <Picker.Item
                  label={'Today'}
                  value={''}
                  style={{fontSize: FontSizes.small}}
                />
                {dates.map((date, index) => (
                  <Picker.Item
                    key={index}
                    label={date}
                    value={date}
                    style={{
                      color: Colors.black,
                      fontSize: FontSizes.tinymedium,
                    }}
                  />
                ))}
              </Picker>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: Colors.grey,
              width: '50%',
              height: 40,
            }}>
            <View style={{justifyContent: 'center'}}>
              <Picker
                selectedValue={selectedTime}
                onValueChange={itemValue => setSelectedTime(itemValue)}
                style={styles.pickerTime}
                dropdownIconColor={Colors.black}
                itemStyle={{color: Colors.black, fontSize: FontSizes.small}}>
                <Picker.Item
                  label={'Time'}
                  value={''}
                  style={{fontSize: FontSizes.small}}
                />
                {times.map((time, index) => (
                  <Picker.Item
                    key={index}
                    label={time}
                    value={time}
                    style={{
                      color: Colors.black,
                      fontSize: FontSizes.tinymedium,
                    }}
                  />
                ))}
              </Picker>
            </View>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            ...Paddings.ph.ph20,
            ...Margins.mv.mv30,
          }}>
          <DropShadow
            style={{
              shadowColor: '#171717',
              shadowOffset: {width: 2, height: 6},
              shadowOpacity: 0.2,
              shadowRadius: 3,
              elevation: 20,
            }}>
            <Pressable
              // onPress={() => navigation.navigate('otp')}
              // onPress={() => console.log('press Submit')}
              onPress={rescheduleBooking}
              style={{
                justifyContent: 'center',
                backgroundColor: Colors.primary,
                alignItems: 'center',
                padding: 10,
                borderRadius: 5,
                ...Paddings.ph.ph20,
                width: '80%',
              }}>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: FontSizes.tinymedium,
                  ...Paddings.ph.ph20,
                  fontWeight: FontWeights.semiBold,
                }}>
                Update
              </Text>
            </Pressable>
          </DropShadow>
        </View>
      </View>
    </View>
  );
};

export default ResheduleRideScreen;

const styles = StyleSheet.create({
  loginContainer: {
    margin: 20,
    height: 350,
    borderBottomWidth: 2,
    borderLeftColor: Colors.primary,
    borderRightColor: Colors.primary,
    borderBottomColor: Colors.primary,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderRadius: 10,
  },
  header: {
    backgroundColor: Colors.primary,
    height: 130,
    justifyContent: 'space-between',
    borderRadius: 7,
    borderColor: Colors.primary,
  },
  roudtripcontainer: {
    ...Margins.mv.mv7,
    height: 20,
    width: '78%',
    backgroundColor: Colors.white,
  },
  roudtripText: {
    position: 'absolute',
    color: Colors.primary,
    ...Margins.ml.ml5,
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
    ...Margins.mb.mb40,
  },
  loginText: {
    color: Colors.white,
    fontWeight: FontWeights.regular,
    fontSize: FontSizes.xlarge,
  },
  input: {
    ...Paddings.p.p4,
    fontSize: FontSizes.xsmall,
    color: Colors.darkgrey,
    fontWeight: FontWeights.regular,
  },

  pickerDate: {
    width: 130,
    color: Colors.black,
  },
  pickerItem: {
    fontSize: 6,
    color: Colors.white,
    fontWeight: FontWeights.bold,
  },
  pickerTime: {
    width: 140,
    flex: 1,
    color: Colors.black,
  },
  picker: {
    width: '100%',
    color: Colors.black,
  },
});
