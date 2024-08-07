
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  Colors,
  FontSizes,
  FontWeights,
  Margins,
  Paddings,
  BorderRadius,
  BorderWidths,
} from '../../assets/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import DropShadow from 'react-native-drop-shadow';
import {loginWitNumber} from '../redux/actions/authAction';
import OTTLoginHeader from '../../components/OTTLoginHeader';
import DeviceInfo from 'react-native-device-info';
import axios from 'axios';
const LoginScreen = ({navigation}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState(null);


  const [mobile, setMobile] = useState();
  const dispatch = useDispatch();
  const authState = useSelector(state => state.auth);
  console.log('authstate===========',authState)
  const handleLogin = () => {
    if (!mobile) {
      setError('Please Enter Mobile No.');
      return;
    } else if (mobile.length !== 10) {
      setError('Please Enter Valid Mobile No.');
      return;
    }
    setError(null);
    dispatch(loginWitNumber(mobile, navigation));
  };

  const [isModalVisible, setModalVisible] = useState(false);
  const [latestVersion, setLatestVersion] = useState(null);
  const [validatedata, setValidatedata] = useState();

  useEffect(() => {
    // fetchValidate()
    checkForUpdate();
  }, []);

  const checkForUpdate = async () => {
    try {
      const currentVersion = DeviceInfo.getVersion();
      const response = await axios.get(
        'https://your-api-endpoint.com/check-version',
      );
      const serverVersion = response.data.version;
      if (serverVersion !== currentVersion) {
        setLatestVersion(serverVersion);
        setModalVisible(true);
      }
    } catch (error) {
      console.error('Failed to check for update', error);
    }
  };

  return (
    <View style={{flex: 1}}>
      <OTTLoginHeader
        navigation={navigation}
        title={'trusted & trained driver'}
      />
      {/* <Text style={{color:'red'}}>App Version: {appVersion}</Text> */}
      <View style={styles.loginContainer}>
        <View style={styles.header}>
          <View style={styles.roudtripcontainer}>
            <Text style={styles.roudtripText}>Trusted & Trained Driver</Text>
            <View style={styles.iconContainer}>
              <Image
                source={require('../../assets/images/rt_icon.png')}
                resizeMode={'cover'}
                style={styles.icon}
              />
            </View>
          </View>
          <View style={styles.loginTextContainer}>
            <Text style={styles.loginText}>Customer Login</Text>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
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
                isFocused || mobile ? styles.inputFocused : null,
              ]}
              onChangeText={mobile => setMobile(mobile)}
              value={mobile}
              placeholder="Enter Mobile Number"
              keyboardType="numeric"
              placeholderTextColor={Colors.darkgrey}
              onFocus={() => setIsFocused(true)}
              onPressIn={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              maxLength={10} 
            />
          </View>
             <Text style={{color: 'red', fontSize: 16, marginTop: 10 ,marginLeft:25}}>
                  {error}
                </Text>
          <View style={styles.submitButtonContainer}>
            <DropShadow style={styles.shadow}>
              <TouchableOpacity
                onPress={handleLogin}
                style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </DropShadow>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
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
    fontWeight: FontWeights.regular,
    fontSize: FontSizes.xlarge,
  },
  inputContainer: {
    ...BorderRadius.br5,
    borderColor: Colors.primary,
  },
  input: {
    ...Paddings.p.p4,
    fontSize: FontSizes.xsmall,
    color: Colors.black,
    fontWeight: FontWeights.regular,
    width: '90%',
    ...BorderWidths.bt.bt1,
    ...BorderWidths.bb.bb1,
    ...BorderWidths.br.br1,

    borderTopColor: Colors.grey,
    borderBottomColor: Colors.grey,
    borderRightColor: Colors.grey,
  },
  callIcon: {
    alignItems: 'center',
  },
  iconWrapper: {
    justifyContent: 'center',
    ...Paddings.ph.ph10,
    alignItems: 'center',
    ...BorderWidths.bw.bw1,
    borderColor: Colors.grey,
  },
  inputWrapper: {
    flexDirection: 'row',
    ...Margins.mh.mh25,
    marginTop: '30%',
  },
  inputFocused: {
    borderTopColor: Colors.primary,
    borderBottomColor: Colors.primary,
    borderRightColor: Colors.primary,
    fontWeight: FontWeights.bold,
  },
  submitButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    ...Paddings.ph.ph20,
    ...Margins.mv.mv30,
  },
  shadow: {
    shadowColor: '#171717',
    shadowOffset: {width: 2, height: 6},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 20,
  },
  submitButton: {
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    alignItems: 'center',
    ...Paddings.p.p10,
    ...BorderRadius.br5,
    ...Paddings.ph.ph20,
    width: '80%',
  },
  submitButtonText: {
    color: Colors.white,
    fontSize: FontSizes.tinymedium,
    ...Paddings.ph.ph20,
    fontWeight: FontWeights.bold,
  },
});









// import React, {useState, useEffect} from 'react';
// import {useDispatch, useSelector} from 'react-redux';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TextInput,
//   TouchableOpacity,
// } from 'react-native';
// import {
//   Colors,
//   FontSizes,
//   FontWeights,
//   Margins,
//   Paddings,
//   BorderRadius,
//   BorderWidths,
// } from '../../assets/colors';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import DropShadow from 'react-native-drop-shadow';
// import {loginWitNumber} from '../redux/actions/authAction';
// import OTTLoginHeader from '../../components/OTTLoginHeader';
// import DeviceInfo from 'react-native-device-info';
// import axios from 'axios';
// const LoginScreen = ({navigation}) => {
//   const [isFocused, setIsFocused] = useState(false);

//   const [mobile, setMobile] = useState();
//   const dispatch = useDispatch();
//   const authState = useSelector(state => state.auth);
//   console.log('authstate===========',authState)
//   const handleLogin = () => {
//     dispatch(loginWitNumber(mobile, navigation));
//   };

//   const [isModalVisible, setModalVisible] = useState(false);
//   const [latestVersion, setLatestVersion] = useState(null);
//   const [validatedata, setValidatedata] = useState();
//   const [error , setError] = useState("")

//   useEffect(() => {
//     // fetchValidate()
//     checkForUpdate();
//   }, []);

//   const checkForUpdate = async () => {
//     try {
//       const currentVersion = DeviceInfo.getVersion();
//       const response = await axios.get(
//         'https://your-api-endpoint.com/check-version',
//       );
//       const serverVersion = response.data.version;
//       if (serverVersion !== currentVersion) {
//         setLatestVersion(serverVersion);
//         setModalVisible(true);
//       }
//     } catch (error) {
//       console.error('Failed to check for update', error);
//     }
//   };

//   return (
//     <View style={{flex: 1}}>
//       <OTTLoginHeader
//         navigation={navigation}
//         title={'trusted & trained driver'}
//       />
//       {/* <Text style={{color:'red'}}>App Version: {appVersion}</Text> */}
//       <View style={styles.loginContainer}>
//         <View style={styles.header}>
//           <View style={styles.roudtripcontainer}>
//             <Text style={styles.roudtripText}>Trusted & Trained Driver</Text>
//             <View style={styles.iconContainer}>
//               <Image
//                 source={require('../../assets/images/rt_icon.png')}
//                 resizeMode={'cover'}
//                 style={styles.icon}
//               />
//             </View>
//           </View>
//           <View style={styles.loginTextContainer}>
//             <Text style={styles.loginText}>Customer Login</Text>
//           </View>
//         </View>
//         <View style={styles.inputContainer}>
//           <View style={styles.inputWrapper}>
//             <View style={styles.iconWrapper}>
//             <Icon
//                 name="sign-in"
//                 color={Colors.icon}
//                 size={16}

//                 style={styles.callIcon}
//               />
//             </View>
//             <TextInput
//               style={[
//                 styles.input,
//                 isFocused || mobile ? styles.inputFocused : null,
//               ]}
//               onChangeText={mobile => setMobile(mobile)}
//               value={mobile}
//               placeholder="Enter Mobile Number"
//               keyboardType="numeric"
//               placeholderTextColor={Colors.darkgrey}
//               onFocus={() => setIsFocused(true)}
//               onPressIn={() => setIsFocused(true)}
//               onBlur={() => setIsFocused(false)}
//             />
//           </View>
//           <View style={styles.submitButtonContainer}>
//             <DropShadow style={styles.shadow}>
//               <TouchableOpacity
//                 onPress={handleLogin}
//                 style={styles.submitButton}>
//                 <Text style={styles.submitButtonText}>Submit</Text>
//               </TouchableOpacity>
//             </DropShadow>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default LoginScreen;
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
//     fontWeight: FontWeights.regular,
//     fontSize: FontSizes.xlarge,
//   },
//   inputContainer: {
//     ...BorderRadius.br5,
//     borderColor: Colors.primary,
//   },
//   input: {
//     ...Paddings.p.p4,
//     fontSize: FontSizes.xsmall,
//     color: Colors.black,
//     fontWeight: FontWeights.regular,
//     width: '90%',
//     ...BorderWidths.bt.bt1,
//     ...BorderWidths.bb.bb1,
//     ...BorderWidths.br.br1,

//     borderTopColor: Colors.grey,
//     borderBottomColor: Colors.grey,
//     borderRightColor: Colors.grey,
//   },
//   callIcon: {
//     alignItems: 'center',
//   },
//   iconWrapper: {
//     justifyContent: 'center',
//     ...Paddings.ph.ph10,
//     alignItems: 'center',
//     ...BorderWidths.bw.bw1,
//     borderColor: Colors.grey,
//   },
//   inputWrapper: {
//     flexDirection: 'row',
//     ...Margins.mh.mh25,
//     marginTop: '30%',
//   },
//   inputFocused: {
//     borderTopColor: Colors.primary,
//     borderBottomColor: Colors.primary,
//     borderRightColor: Colors.primary,
//     fontWeight: FontWeights.bold,
//   },
//   submitButtonContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     ...Paddings.ph.ph20,
//     ...Margins.mv.mv30,
//   },
//   shadow: {
//     shadowColor: '#171717',
//     shadowOffset: {width: 2, height: 6},
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//     elevation: 20,
//   },
//   submitButton: {
//     justifyContent: 'center',
//     backgroundColor: Colors.primary,
//     alignItems: 'center',
//     ...Paddings.p.p10,
//     ...BorderRadius.br5,
//     ...Paddings.ph.ph20,
//     width: '80%',
//   },
//   submitButtonText: {
//     color: Colors.white,
//     fontSize: FontSizes.tinymedium,
//     ...Paddings.ph.ph20,
//     fontWeight: FontWeights.bold,
//   },
// });