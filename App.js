import React, {useEffect,useState} from 'react';
import { Provider } from 'react-redux';
import { store } from './screens/redux/store';
import MeannavigationContainer from './navigation/navigationContainer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {fetchValidate, refreshAccessToken} from './screens/redux/actions/authAction'
import messaging from '@react-native-firebase/messaging';

// useEffect(() => {
//   const unsubscribe = messaging().onMessage(async (remoteMessage) => {
//     console.log('A new FCM message arrived!', remoteMessage);
//   });

//   messaging().setBackgroundMessageHandler(async (remoteMessage) => {
//     console.log('Message handled in the background!', remoteMessage);
   
//   });

//   return unsubscribe;
// }, []);
const App = () => {
  const [validatedData, setValidatedData] = useState(null);
  const [refreshData, setRefreshData] = useState(null);
  const [error, setError] = useState(null);
  const API_BASE_URL = 'https://www.tatd.in/app-api/customer/';

  // useEffect(() => {
  //   fetchDataWithValidation();
  // }, []);
  // const fetchDataWithValidation = async () => {
  //   try {
  //     let validated = await fetchValidate();
  //     console.log('validate from app=================',validated)
  //     console.log('validate from appmessage=================',validated.message)
  //     if (validated.message === "Invalid token") {
  //       const newToken = await refreshAccessToken();
  //       console.log('newtoken console from app',newToken)
  //       await AsyncStorage.setItem('userData', JSON.stringify(newToken));
  //       console.log('vali====================new token',newToken)
  //       validated = await fetchValidate(); 
  //       console.log('vali====================',validated)// Revalidate with new token
  //     }
  //     setValidatedData(validated);
  //   } catch (err) {
  //     setError(err.message);
  //     console.log('errror from app=====',err.message)
  //   }
  // };



  // const fetchDataWithValidation = () => {
  //   fetchValidate()
  //     .then(validated => {
  //       console.log('validate from app=================', validated);
  //       console.log('validate from appmessage=================', validated.message);

  //       if (validated.message === "Invalid token") {
  //         return refreshAccessToken()
  //           .then(newToken => {
  //             console.log('new token console from app', newToken);
  //             return AsyncStorage.setItem('userData', JSON.stringify(newToken))
  //               .then(() => {
  //                 console.log('vali====================new token', newToken);
  //                 return fetchValidate(); // Revalidate with new token
  //               });
  //           })
  //           .then(validated => {
  //             console.log('vali====================', validated);
  //             setValidatedData(validated);
  //           });
  //       } else {
  //         setValidatedData(validated);
  //       }
  //     })
  //     .catch(err => {
  //       refreshAccessToken()
  //       setError(err.message);
  //       console.log('error from app=====', err.message);
  //     });
  // };

  return (
    <Provider store={store}>
    <MeannavigationContainer/>
   </Provider>
  );
}

export default App;



// import React from 'react';
// import { View, Button, Alert } from 'react-native';
// // import RazorpayCheckout from 'razorpay-react-native';
// import RazorpayCheckout from 'react-native-razorpay';
// const App = () => {
//   const handlePayment = () => {
//     var options = {
//       page_type:"incity_roundtrip",
//       description: 'Incity Roundtrip',
//       image: 'https://www.tatd.in/img/logo/bluelogo.png',
//       currency: 'INR',
//       key: 'rzp_live_0wecjqTARWJWu3', // Your Razorpay Key ID
//       amount: '5000', // Amount in paise (i.e., 5000 paise = INR 50)
//       name: 'TAT D',
//       prefill: {
//         email: 'zaidansari335@gmail.com',
//         contact: '6397688464',
//         name: 'Razorpay User'
//       },
//       theme: { color: '#F37254' }
//     }

//     RazorpayCheckout.open(options).then((data) => {
//       // handle success
//       Alert.alert(`Success: ${data.razorpay_payment_id}`);
//     }).catch((error) => {
//       // handle failure
//       Alert.alert(`Error: ${error.code} | ${error.description}`);
//     });
//   };

//   return (
//     <View>
//       <Button title="Pay with Razorpay" onPress={handlePayment} />
//     </View>
//   );
// };