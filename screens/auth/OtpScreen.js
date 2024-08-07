// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   Alert,
// } from 'react-native';
// import {useDispatch, useSelector} from 'react-redux';
// import OTTHeader from '../../components/OTTHeader';
// import {
//   Colors,
//   FontSizes,
//   FontWeights,
//   Margins,
//   Paddings,
//   BorderWidths,
//   BorderRadius,
// } from '../../assets/colors';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import DropShadow from 'react-native-drop-shadow';
// import {loginWithOtp, resentOtp} from '../redux/actions/authAction';
// const OtpScreen = ({navigation, route}) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const [error, setError] = useState(null);

//   const {mobile} = route?.params;
//   const [otp, setOtp] = useState('');
//   const dispatch = useDispatch();
//   const otpLogin = () => {
//   if (!otp) {
//     setError('Please Enter OTP');
//     return;
//   } else if (otp.length !== 4) {
//     setError('Please Enter Valid OTP.');
//     return;
//   }
//   setError(null);
//   dispatch(loginWithOtp(mobile, otp, navigation));
// };

//   const handleOtp = () => {
//     dispatch(resentOtp(mobile, navigation));
//   };

//   //

//   return (
//     <View style={{flex: 1}}>
//       <OTTHeader navigation={navigation} title={'trusted & trained driver'} />
//       <View style={styles.loginContainer}>
//         <View style={styles.header}>
//           <View style={styles.roudtripcontainer}>
//             <Text style={styles.roudtripText}>
//               Verified & Experienced Driver
//             </Text>
//             <View style={styles.iconContainer}>
//               <Image
//                 source={require('../../assets/images/rt_icon.png')}
//                 resizeMode={'cover'}
//                 style={styles.icon}
//               />
//             </View>
//           </View>
//           <View style={styles.loginTextContainer}>
//             <Text style={styles.loginText}>Submit OTP</Text>
//           </View>
//         </View>
//         <View style={styles.otpInfoContainer}>
//           <Text style={styles.otpInfoText}>
//             An OTP is sent to{' '}
//             <Text style={{color: Colors.darkgrey}}>{mobile}</Text> via Whatsapp
//             and
//           </Text>
//           <Text style={styles.otpInfoText}>SMS</Text>
//           <TouchableOpacity
//             onPress={handleOtp}
//             style={styles.resendOtpContainer}>
//             <Text style={styles.resendOtpText}>Resend OTP?</Text>
//           </TouchableOpacity>
//           <View style={styles.inputContainer}>
//             <View style={styles.iconWrapper}>
//               <Icon
//                 name="sign-in"
//                 color={Colors.icon}
//                 size={16}
//                 style={styles.callIcon}
//               />
//             </View>
//             <TextInput
//               style={[
//                 styles.input,
//                 isFocused || otp ? styles.inputFocused : null,
//               ]}
//               onChangeText={otp => setOtp(otp)}
//               value={otp}
//               placeholder="Enter OTP"
//               keyboardType="numeric"
//               placeholderTextColor={Colors.darkgrey}
//               onFocus={() => setIsFocused(true)}
//               onPressIn={() => setIsFocused(true)}
//               onBlur={() => setIsFocused(false)}
// maxLength={4}
//             />
//           </View>
// <Text
//   style={{
//     color: 'red',
//     fontSize: 16,
//     marginTop: 10,
//     marginLeft: 25,
//   }}>
//   {error}
// </Text>
//           <View style={styles.verifyButtonContainer}>
//             <DropShadow style={styles.shadowStyle}>
//               <TouchableOpacity onPress={otpLogin} style={styles.verifyButton}>
//                 <Text style={styles.verifyButtonText}>Verify</Text>
//               </TouchableOpacity>
//             </DropShadow>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default OtpScreen;

// const styles = StyleSheet.create({
//   loginContainer: {
//     ...Margins.m.m20,
//     height: 350,
//     ...BorderWidths.bb.bb2,
//     borderLeftColor: Colors.primary,
//     borderRightColor: Colors.primary,
//     borderBottomColor: Colors.primary,
//     ...BorderWidths.bl.bl2,
//     ...BorderWidths.br.br2,
//     ...BorderRadius.br10,
//   },
//   header: {
//     backgroundColor: Colors.primary,
//     height: 100,
//     justifyContent: 'space-between',
//     ...BorderRadius.br7,
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
//     ...Margins.ml.ml5,
//   },
//   iconContainer: {
//     justifyContent: 'flex-end',
//     alignItems: 'flex-end',
//     left: 20,
//   },
//   icon: {
//     width: 20,
//     height: 20,
//     ...BorderWidths.bl.bl1,
//     borderLeftColor: Colors.white,
//   },
//   loginTextContainer: {
//     alignItems: 'center',
//     ...Margins.mb.mb10,
//   },
//   loginText: {
//     color: Colors.white,
//     fontWeight: FontWeights.medium,
//     fontSize: FontSizes.xlarge,
//   },
//   otpInfoContainer: {
//     ...Margins.mt.mt10,
//   },
//   otpInfoText: {
//     color: Colors.darkgrey,
//     ...Margins.mh.mh10,
//     fontSize: FontSizes.xsmall,
//     ...Paddings.ph.ph5,
//   },
//   resendOtpContainer: {
//     width: '27%',
//     ...Margins.mt.mt5,
//     ...Margins.mh.mh15,
//     color: Colors.darkgrey,
//   },
//   resendOtpText: {
//     color: Colors.darkgrey,
//     ...BorderWidths.bb.bb1,
//     borderBottomColor: Colors.grey,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     ...Margins.mh.mh25,
//     marginTop: '10%',
//   },
//   iconWrapper: {
//     justifyContent: 'center',
//     ...Paddings.ph.ph10,
//     alignItems: 'center',
//     ...BorderWidths.bw.bw1,
//     borderColor: Colors.grey,
//   },
//   callIcon: {
//     alignItems: 'center',
//   },
//   input: {
//     ...Paddings.p.p4,
//     fontSize: FontSizes.xsmall,
//     color: Colors.black,
//     flex: 1,
//     fontWeight: FontWeights.regular,
//     width: '100%',
//     ...BorderWidths.bb.bb1,

//     ...BorderWidths.bt.bt1,
//     ...BorderWidths.br.br1,
//     borderTopColor: Colors.grey,
//     borderRightColor: Colors.grey,
//     borderBottomColor: Colors.grey,
//   },
//   inputFocused: {
//     borderTopColor: Colors.primary,
//     borderRightColor: Colors.primary,
//     borderBottomColor: Colors.primary,
//     fontWeight: FontWeights.bold,
//   },
//   verifyButtonContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     ...Paddings.ph.ph20,
//     ...Margins.mv.mv30,
//   },
//   shadowStyle: {
//     shadowColor: '#171717',
//     shadowOffset: {width: 2, height: 6},
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//     elevation: 20,
//   },
//   verifyButton: {
//     justifyContent: 'center',
//     backgroundColor: Colors.primary,
//     alignItems: 'center',
//     ...Paddings.p.p10,
//     ...BorderRadius.br5,
//     ...Paddings.ph.ph20,
//     width: '80%',
//   },
//   verifyButtonText: {
//     color: Colors.white,
//     fontSize: FontSizes.tinymedium,
//     ...Paddings.ph.ph20,
//     fontWeight: FontWeights.bold,
//   },
// });

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector, Alert} from 'react-redux';
import OTTHeader from '../../components/OTTHeader';
import {
  Colors,
  FontSizes,
  FontWeights,
  Margins,
  Paddings,
  BorderWidths,
  BorderRadius,
} from '../../assets/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import DropShadow from 'react-native-drop-shadow';
import {loginWithOtp, resentOtp} from '../redux/actions/authAction';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
import {validateAccessToken, refreshAccessToken} from '../../utils/validation';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { initializeFirebase } from '../firebase/firebase';
const OtpScreen = ({navigation, route}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [fcmToken, setFcmToken] = useState('');
  const {mobile} = route?.params;
  const [otp, setOtp] = useState('');

  const [fcmdata, setFcmdata] = useState();
  const [otpdata, setOtpdata] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  // const otpLogin = () => {
  //   dispatch(loginWithOtp(mobile, otp, navigation));

  // };

  const handleOtp = () => {
    dispatch(resentOtp(mobile, navigation));
  };

  const loginWithOtpVerify = async () => {
    if (!otp) {
      setError('Please Enter OTP');
      return;
    } else if (otp.length !== 4) {
      setError('Please Enter Valid OTP.');
      return;
    }
    setError(null);
    dispatch(loginWithOtp(mobile, otp, navigation));

    console.log('mmmmmmmm=====', mobile, otp);
    try {
      const response = await axios.post(
        'https://www.tatd.in/app-api/customer/login/verify-otp-login.php',
        {
          mobile: mobile,
          otp: otp,
        },
      );

      console.log('otppppdata:', response.data);
      if (response.data.status_code === 200) {
        await AsyncStorage.setItem('userData', JSON.stringify(response?.data));
        sendNotification();
        const storedUserData = await AsyncStorage.getItem('userData');
        if (storedUserData) {
          const userData = JSON.parse(storedUserData);
          console.log('Stored User Data:', userData);
        }
        navigation.navigate('home', {mobile});
      }
    } catch (error) {
      console.error('error: from notificationtoken api', error);
    }
  };

  //
  // useEffect(() => {
  //   const unsubscribe = initializeFirebase();

  //   return () => {
  //     if (unsubscribe) unsubscribe();
  //   };
  // }, []);

  const sendNotification = async () => {
    const isValid = await validateAccessToken();
    if (!isValid) {
      await refreshAccessToken();
    }
    try {
      const userData = await AsyncStorage.getItem('userData');
      const parsedUserData = userData ? JSON.parse(userData) : null;
      const token = parsedUserData ? parsedUserData.jwt : null;
      console.log('fffffffff=====', fcmToken);
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
        'https://www.tatd.in/app-api/customer/login/save-fcm-token-api.php',
        {
          fcm_token: fcmToken,
          action: 'save_fcm',
        },
        config,
      );
      setFcmdata(response.data);
      console.log('toen succesfull send:', response.data);
    } catch (error) {
      console.error('error:', error);
    }
  };

  useEffect(() => {
    const requestUserPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
        getFcmToken();
      }
    };

    const getFcmToken = async () => {
      const token = await messaging().getToken();
      if (token) {
        console.log('Your Firebase Cloud Messaging token is:', token);
        setFcmToken(token);
      } else {
        console.log('Failed to get FCM token');
      }
    };

    requestUserPermission();
    const unsubscribe = messaging().onTokenRefresh(token => {
      console.log('New FCM token:', token);
      setFcmToken(token);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return (
    <View style={{flex: 1}}>
      <OTTHeader navigation={navigation} title={'trusted & trained driver'} />
      <View style={styles.loginContainer}>
        <View style={styles.header}>
          <View style={styles.roudtripcontainer}>
            <Text style={styles.roudtripText}>
              Verified & Experienced Driver
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
            <Text style={styles.loginText}>Submit OTP</Text>
          </View>
        </View>
        <View style={styles.otpInfoContainer}>
          <Text style={styles.otpInfoText}>
            An OTP is sent to{' '}
            <Text style={{color: Colors.darkgrey}}>{mobile}</Text> via Whatsapp
            and
          </Text>
          <Text style={styles.otpInfoText}>SMS</Text>
          <TouchableOpacity
            onPress={handleOtp}
            style={styles.resendOtpContainer}>
            <Text style={styles.resendOtpText}>Resend OTP?</Text>
          </TouchableOpacity>
          <View style={styles.inputContainer}>
            <View style={styles.iconWrapper}>
              <Icon
                name="sign-in"
                color={Colors.icon}
                size={16}
                style={styles.callIcon}
              />
            </View>
            <TextInput
              style={[
                styles.input,
                isFocused || otp ? styles.inputFocused : null,
              ]}
              onChangeText={otp => setOtp(otp)}
              value={otp}
              placeholder="Enter OTP"
              keyboardType="numeric"
              placeholderTextColor={Colors.darkgrey}
              onFocus={() => setIsFocused(true)}
              onPressIn={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              maxLength={4}
            />
          </View>
          <Text
            style={{
              color: 'red',
              fontSize: 16,
              marginTop: 10,
              marginLeft: 25,
            }}>
            {error}
          </Text>
          <View style={styles.verifyButtonContainer}>
            <DropShadow style={styles.shadowStyle}>
              <TouchableOpacity
                onPress={loginWithOtpVerify}
                style={styles.verifyButton}>
                <Text style={styles.verifyButtonText}>Verify</Text>
              </TouchableOpacity>
            </DropShadow>
          </View>
        </View>
      </View>
    </View>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  loginContainer: {
    ...Margins.m.m20,
    height: 350,
    ...BorderWidths.bb.bb2,
    borderLeftColor: Colors.primary,
    borderRightColor: Colors.primary,
    borderBottomColor: Colors.primary,
    ...BorderWidths.bl.bl2,
    ...BorderWidths.br.br2,
    ...BorderRadius.br10,
  },
  header: {
    backgroundColor: Colors.primary,
    height: 100,
    justifyContent: 'space-between',
    ...BorderRadius.br7,
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
    ...BorderWidths.bl.bl1,
    borderLeftColor: Colors.white,
  },
  loginTextContainer: {
    alignItems: 'center',
    ...Margins.mb.mb10,
  },
  loginText: {
    color: Colors.white,
    fontWeight: FontWeights.medium,
    fontSize: FontSizes.xlarge,
  },
  otpInfoContainer: {
    ...Margins.mt.mt10,
  },
  otpInfoText: {
    color: Colors.darkgrey,
    ...Margins.mh.mh10,
    fontSize: FontSizes.xsmall,
    ...Paddings.ph.ph5,
  },
  resendOtpContainer: {
    width: '27%',
    ...Margins.mt.mt5,
    ...Margins.mh.mh15,
    color: Colors.darkgrey,
  },
  resendOtpText: {
    color: Colors.darkgrey,
    ...BorderWidths.bb.bb1,
    borderBottomColor: Colors.grey,
  },
  inputContainer: {
    flexDirection: 'row',
    ...Margins.mh.mh25,
    marginTop: '10%',
  },
  iconWrapper: {
    justifyContent: 'center',
    ...Paddings.ph.ph10,
    alignItems: 'center',
    ...BorderWidths.bw.bw1,
    borderColor: Colors.grey,
  },
  callIcon: {
    alignItems: 'center',
  },
  input: {
    ...Paddings.p.p4,
    fontSize: FontSizes.xsmall,
    color: Colors.black,
    flex: 1,
    fontWeight: FontWeights.regular,
    width: '100%',
    ...BorderWidths.bb.bb1,

    ...BorderWidths.bt.bt1,
    ...BorderWidths.br.br1,
    borderTopColor: Colors.grey,
    borderRightColor: Colors.grey,
    borderBottomColor: Colors.grey,
  },
  inputFocused: {
    borderTopColor: Colors.primary,
    borderRightColor: Colors.primary,
    borderBottomColor: Colors.primary,
    fontWeight: FontWeights.bold,
  },
  verifyButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    ...Paddings.ph.ph20,
    ...Margins.mv.mv30,
  },
  shadowStyle: {
    shadowColor: '#171717',
    shadowOffset: {width: 2, height: 6},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 20,
  },
  verifyButton: {
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    alignItems: 'center',
    ...Paddings.p.p10,
    ...BorderRadius.br5,
    ...Paddings.ph.ph20,
    width: '80%',
  },
  verifyButtonText: {
    color: Colors.white,
    fontSize: FontSizes.tinymedium,
    ...Paddings.ph.ph20,
    fontWeight: FontWeights.bold,
  },
});

// //
