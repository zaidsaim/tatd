// import React, {useEffect, useState, useCallback} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   TextInput,
//   Image,
//   Linking,
//   ImageBackground,
//   RefreshControl,
// } from 'react-native';
// import OTTHeader from '../../components/OTTHeader';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import {
//   Colors,
//   FontSizes,
//   FontWeights,
//   Paddings,
//   Margins,
// } from '../../assets/colors';
// import DropShadow from 'react-native-drop-shadow';
// import {Divider, Input} from '@rneui/base';
// import Modal from 'react-native-modal';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Feather from 'react-native-vector-icons/Feather';
// import axios from 'axios';
// import {useFocusEffect} from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {validateAccessToken, refreshAccessToken} from '../../utils/validation';
// import Icon from 'react-native-vector-icons/FontAwesome';

// const TrackScreen = ({navigation}) => {
//   const [feedback, setFeedback] = useState();
//   const [activePage, setActivePage] = useState('Current');
//   const [selectedOption, setSelectedOption] = useState();
//   const [isModalVisible, setModalVisible] = useState(false);
//   const [isModalVisibleBooking, setModalVisibleBooking] = useState(false);
//   const [currentbooking, setCurrentbooking] = useState([]);
//   const [currentbookingget, setCurrentbookingget] = useState([]);
//   const [trackdata, setTrackdata] = useState([]);
//   const [error, setError] = useState();
//   const [remarks, setRemarks] = useState();
//   const [isModalVisibleFeedback, setModalVisibleFeedback] = useState(false);
//   const [needhelpdata, setNeedhelpdata] = useState();
//   const [cancelbooking, setCancelbooking] = useState();
//   const [suggestion, setSuggestion] = useState();
//   const [refreshing, setRefreshing] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [bookingnumber,setBookingnumber]=useState()
//   const [historyBooking, setHistoryBooking] = useState([]);
//   const [offset, setOffset] = useState(0);
//   const [loadMoreButtonShow, setLoadMoreButtonShow] = useState(0);

//   useEffect(() => {
//     fetchCurrentBooking()
//     fetchHistoryBooking(0);
//     findAnothrtDriver()
//   }, []);

//   const loadMore = () => {
//     setOffset(prevOffset => {
//       const newOffset = prevOffset + 10;
//       fetchHistoryBooking(newOffset);
//       return newOffset;
//     });
//   };

//   const fetchHistoryBooking = async offSet => {
//     const isValid = await validateAccessToken();
//     if (!isValid) {
//       await refreshAccessToken();
//     }
//     try {
//       const userData = await AsyncStorage.getItem('userData');
//       const parsedUserData = userData ? JSON.parse(userData) : null;
//       const token = parsedUserData ? parsedUserData.jwt : null;

//       console.log(token, 'jwt');
//       if (!token) {
//         throw new Error('No token found');
//       }
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       };
//       const response = await axios.post(
//         'https://www.tatd.in/app-api/customer/myride/customer-history-tab-api.php',
//         {
//           offset: offSet,
//           limit: 10,
//           action: 'history_booking',
//         },
//         config,
//       );

//       const {history_bookings} = response.data;

//       console.log(response.data, 'all history data');
//       console.log('current history booking Data:', history_bookings);
//       console.log(response.data.load_more_flag, 'load_more_flag from response');

//       if (!history_bookings || history_bookings.length === 0) {
//         setLoadMoreButtonShow(0);
//       } else {
//         setLoadMoreButtonShow(1);
//         setHistoryBooking(prevHistoryBooking => [
//           ...prevHistoryBooking,
//           ...history_bookings,
//         ]);
//       }
//     } catch (err) {
//       setError(err.message);
//       console.log('Error from current Historybooking API:', err.message);
//     }
//   };

//   // use baad me

//   // const handleBookAgain = async bookingId => {
//   //   const isValid = await validateAccessToken();
//   //   if (!isValid) {
//   //     await refreshAccessToken();
//   //   }
//   //   try {
//   //     const userData = await AsyncStorage.getItem('userData');
//   //     const parsedUserData = userData ? JSON.parse(userData) : null;
//   //     const token = parsedUserData ? parsedUserData.jwt : null;

//   //     console.log(token, 'jwt');
//   //     if (!token) {
//   //       throw new Error('No token found');
//   //     }
//   //     const config = {
//   //       headers: {
//   //         Authorization: `Bearer ${token}`,
//   //         'Content-Type': 'application/json',
//   //       },
//   //     };
//   //     const response = await axios.post(
//   //       'https://www.tatd.in/app-api/customer/myride/customer-history-tab-api.php',
//   //       {
//   //         booking_number: bookingId,
//   //         action: 'book_again',
//   //       },
//   //       config,
//   //     );
//   //     console.log('Book Again response Data:', response.data);

//   //     await AsyncStorage.setItem(
//   //       'bookingData',
//   //       JSON.stringify(response.data.booking_data),
//   //     );

//   //     if (
//   //       response.data.status_code == 200 &&
//   //       response.data.redirect == 'incity_roundtrip'
//   //     ) {
//   //       navigation.navigate('booking', {selectedzone: 'A'});
//   //     } else if (
//   //       response.data.status_code == 200 &&
//   //       response.data.redirect == 'outstation_roundtrip'
//   //     ) {
//   //       navigation.navigate(
//   //         'outstationbooking',
//   //         {selectedzone: 'B'},
//   //         {bookingId: response.data.booking_number},
//   //       );
//   //     }
//   //   } catch (err) {
//   //     setError(err.message);
//   //     console.log('Error from Book Again error API:', err.message);
//   //   }
//   // };

//   const fetchCurrentBooking = async () => {
//     setLoading(true);
//     const isValid = await validateAccessToken();
//     if (!isValid) {
//       await refreshAccessToken();
//     }
//     try {
//       const userData = await AsyncStorage.getItem('userData');
//       const parsedUserData = userData ? JSON.parse(userData) : null;
//       const token = parsedUserData ? parsedUserData.jwt : null;
//       if (!token) {
//         throw new Error('No token found');
//       }
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       };
//       const response = await axios.post(
//         'https://www.tatd.in/app-api/customer/myride/customer-myride-api.php',
//         {action: 'current_booking'},
//         config,
//       );
//       console.log('current booking Data:', response.data?.bookings);
//       setCurrentbooking(response.data?.bookings);
//       setBookingnumber(response.data?.bookings[0]?.booking_number)
//       if (response.data.bookings.length > 0) {
//         fetchtrack();
//         fetchCurrentBooking();
//       }
//       setLoading(false);
//     } catch (err) {
//       setError(err.message);
//       console.log('Error from current track booking API:', err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // useEffect(() => {
//   //   setTimeout(() => {
//   //     fetchCurrentBooking();
//   //   }, 10000);
//   // }, []);

//   // const onRefresh = useCallback(() => {
//   //   setRefreshing(true);
//   //   fetchCurrentBooking().then(() => setRefreshing(false));
//   // }, []);

//   const fetchtrack = async () => {
//     const isValid = await validateAccessToken();
//     if (!isValid) {
//       await refreshAccessToken();
//     }
//     try {
//       const userData = await AsyncStorage.getItem('userData');
//       const parsedUserData = userData ? JSON.parse(userData) : null;
//       const token = parsedUserData ? parsedUserData.jwt : null;
//       console.log('cuuuuuuuuuuurrrr------', currentbooking[0]?.booking_number);
//       console.log('booking___________number',bookingnumber)
//       if (!token) {
//         throw new Error('No token found');
//       }
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       };
//       const response = await axios.post(
//         'https://www.tatd.in/app-api/customer/myride/customer-myride-api.php',

//         {
//           action: 'track_booking',
//           booking_number: bookingnumber,
//         },
//         config,
//       );
//       setTrackdata(response.data.all_booking_status);
//       console.log('track Data:', response.data);
//     } catch (err) {
//       setError(err.message);
//       console.log('Error from fetch track  API:', err.message);
//     }
//   };
//   const findAnothrtDriver = async () => {
//     const isValid = await validateAccessToken();
//     if (!isValid) {
//       await refreshAccessToken();
//     }
//     try {
//       const userData = await AsyncStorage.getItem('userData');
//       const parsedUserData = userData ? JSON.parse(userData) : null;
//       const token = parsedUserData ? parsedUserData.jwt : null;
//       console.log('cboking---------number', currentbooking[0]?.booking_number);
//       if (!token) {
//         throw new Error('No token found');
//       }
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       };
//       const response = await axios.post(
//         'https://www.tatd.in/app-api/customer/myride/customer-myride-api.php',

//         {
//           action: 'findanotherdriver',
//           booking_number: currentbooking[0]?.booking_number,
//         },
//         config,
//       );
//       //setTrackdata(response.data.all_booking_status);
//       console.log('find another api Data:', response.data);
//     } catch (err) {
//       setError(err.message);
//       console.log('Error from find anotherdriver API:', err.message);
//     }
//   };
//   const needHelp = async () => {
//     const isValid = await validateAccessToken();
//     if (!isValid) {
//       await refreshAccessToken();
//     }
//     try {
//       const userData = await AsyncStorage.getItem('userData');
//       const parsedUserData = userData ? JSON.parse(userData) : null;
//       const token = parsedUserData ? parsedUserData.jwt : null;
//       console.log('remarks------number', currentbooking[0]?.booking_number);
//       if (!token) {
//         throw new Error('No token found');
//       }
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       };
//       const response = await axios.post(
//         'https://www.tatd.in/app-api/customer/myride/customer-myride-api.php',
//         {
//           action: 'add_customer_ticket',
//           booking_number: currentbooking[0]?.booking_number,
//           category: 'Private Driver',
//           remarks: remarks,
//         },
//         config,
//       );
//       setNeedhelpdata(response.data);
//       console.log('need help Data:', response.data);
//     } catch (err) {
//       setError(err.message);
//       console.log('Error from need help  API:', err.message);
//     }
//   };
//   const fetchcancelBooking = async () => {
//     const isValid = await validateAccessToken();
//     if (!isValid) {
//       await refreshAccessToken();
//     }
//     try {
//       const userData = await AsyncStorage.getItem('userData');
//       const parsedUserData = userData ? JSON.parse(userData) : null;
//       const token = parsedUserData ? parsedUserData.jwt : null;
//       console.log('remarks------number', currentbooking[0]?.booking_number);
//       if (!token) {
//         throw new Error('No token found');
//       }
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       };
//       const response = await axios.post(
//         'https://www.tatd.in/app-api/customer/myride/cancel-booking-api.php',
//         {
//           action: 'cancel_booking',
//           booking_number: currentbooking[0]?.booking_number,
//           cancel_reason: selectedOption,
//           message: suggestion,
//           name: currentbooking[0]?.name,
//         },
//         config,
//       );
//       setCancelbooking(response.data);
//       console.log('cancel Data: first', response.data);
//       if (response.data.status_code === 200) {
//         fetchCurrentBooking();
//         setCurrentbooking(null)
//         console.log('check booking data==================data',currentbooking)
//         navigation.navigate('ThankYouScreen', {itemcancel: response.data});

//       }

//       console.log('cancel Data: second', response.data);
//     } catch (err) {
//       setError(err.message);
//       console.log('Error from cancel API:', err.message);
//     }
//   };

//   // console.log('selected=========option', selectedOption);
//   // useEffect(() => {
//   //   if (currentbooking?.length > 0) {
//   //     fetchtrack();
//   //   }
//   // }, []);
//   const openModalFeedback = () => {
//     setModalVisibleFeedback(!isModalVisibleFeedback);
//   };
//   const closeModalFeedback = () => {
//     setModalVisibleFeedback(false);
//   };

//   const openModal = () => {
//     setModalVisible(!isModalVisible);
//   };
//   const closeModal = () => {
//     setModalVisible(false);
//   };
//   const openModalBooking = () => {
//     setModalVisibleBooking(!isModalVisibleBooking);
//   };
//   const closeModalBooking = () => {
//     setModalVisibleBooking(false);
//   };

//   const handlePress = item => {
//     Linking.openURL(`tel:${item}`);
//   };
//   const renderContent = () => {
//     if (activePage === 'Current') {
//       return (
//         <View style={styles.pageContainer}>
//           <ScrollView
//            >
//             {currentbooking && currentbooking.length > 0 ? (
//               currentbooking.map((item, index) => (
//                 <View style={[styles.card]}>
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       justifyContent: 'space-between',
//                     }}>
//                     <Text style={{color: Colors.black}}>
//                       Booking ID: {item.booking_number}
//                     </Text>
//                     <Text style={{color: Colors.black}}>
//                       {item.customer_otp}
//                     </Text>
//                   </View>
//                   {item.driver_section_view_flag === 1 ? (
//                     <View
//                       style={{
//                         borderColor: Colors.darkgrey,
//                         borderWidth: 1,
//                         ...Margins.mt.mt10,
//                         borderRadius: 5,
//                       }}>
//                       <View
//                         style={{
//                           flexDirection: 'row',
//                           justifyContent: 'space-between',
//                           ...Margins.m.m10,
//                         }}>
//                         <View style={{flexDirection: 'row'}}>
//                           <View
//                             style={{
//                               borderRadius: 100,
//                               width: 50,
//                               height: 50,
//                               borderWidth: 1,
//                               borderColor: Colors.darkgrey,
//                               overflow: 'hidden',
//                             }}>
//                             <ImageBackground
//                               source={{uri: item.driver_photo}}
//                               style={{width: '100%', height: '100%'}}>
//                               {item.driver_rating_view_flag === 1 ? (
//                                 <View
//                                   style={{
//                                     flexDirection: 'row',
//                                     borderColor: Colors.darkgrey,
//                                     borderWidth: 1,
//                                     marginTop: 30,
//                                     backgroundColor: Colors.white,
//                                     borderRadius: 5,
//                                     alignItems: 'center',
//                                     justifyContent: 'center',
//                                   }}>
//                                   <Text
//                                     style={{
//                                       color: Colors.black,
//                                       fontSize: FontSizes.tiny,
//                                     }}>
//                                     {item.driver_rating}
//                                   </Text>
//                                   <MaterialIcons
//                                     name="star"
//                                     size={12}
//                                     color="#ffa534"
//                                   />
//                                 </View>
//                               ) : null}
//                             </ImageBackground>
//                           </View>
//                           <View style={{...Margins.mh.mh10}}>
//                             <Text
//                               style={{
//                                 color: Colors.black,
//                                 fontSize: FontSizes.medium,
//                                 fontWeight: FontWeights.bold,
//                               }}>
//                               {item.driver_name}
//                             </Text>
//                             <Text
//                               style={{
//                                 color: Colors.darkgrey,
//                                 fontSize: FontSizes.medium,
//                               }}>
//                               Your Driver Partner
//                             </Text>
//                           </View>
//                         </View>
//                         <TouchableOpacity
//                           onPress={() => handlePress(item.driver_mobile_number)}
//                           style={{
//                             ...Paddings.p.p10,
//                             borderRadius: 60,
//                             borderWidth: 1,
//                             borderColor: Colors.black,
//                           }}>
//                           <Image
//                             source={require('../../assets/images/openblueicon.png')}
//                             style={{...Paddings.p.p5}}
//                           />
//                         </TouchableOpacity>
//                       </View>
//                     </View>
//                   ) : (
//                     <View
//                       style={{
//                         borderColor: Colors.darkgrey,
//                         borderWidth: 1,
//                         ...Margins.mt.mt10,
//                         borderRadius: 5,
//                       }}>
//                       <Text style={{color: Colors.primary, margin: 5}}>
//                         Driver details will be shared here shortly. or at
//                       </Text>
//                       <Text
//                         style={{
//                           color: Colors.primary,
//                           ...Margins.mh.mh5,
//                           marginBottom: 25,
//                         }}>
//                         least 60 minutes before the scheduled time.
//                       </Text>
//                     </View>
//                   )}
//                   <TouchableOpacity
//                     onPress={openModalFeedback}
//                     style={{
//                       justifyContent: 'flex-end',
//                       alignItems: 'flex-end',
//                       marginVertical: 5,
//                       flexDirection: 'row',
//                     }}>
//                     <View>
//                       <Text
//                         style={{
//                           color: Colors.primary,
//                           fontSize: FontSizes.medium,
//                         }}>
//                         Need Help ?
//                       </Text>
//                       <View
//                         style={{
//                           borderWidth: 1.2,
//                           borderColor: Colors.primary,
//                           color: 'solid',
//                         }}
//                       />
//                     </View>
//                     <MaterialCommunityIcons
//                       name="arrow-right-thick"
//                       color={Colors.primary}
//                       size={18}
//                     />
//                   </TouchableOpacity>
//                   <View
//                     style={{
//                       borderStyle: 'dotted',
//                       borderWidth: 1,
//                       borderRadius: 1,
//                       marginVertical: 5,
//                     }}
//                   />
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       justifyContent: 'space-between',
//                     }}>
//                     <Text
//                       style={{color: Colors.black, fontSize: FontSizes.medium}}>
//                       Sheduled Time:
//                     </Text>
//                     <Text
//                       style={{color: Colors.black, fontSize: FontSizes.medium}}>
//                       {item.booking_time_display}, {item.booking_date_display}
//                     </Text>
//                   </View>
//                   <View
//                     style={{
//                       borderStyle: 'dotted',
//                       borderWidth: 1,
//                       borderRadius: 1,
//                       marginVertical: 5,
//                     }}
//                   />
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       justifyContent: 'space-between',
//                     }}>
//                     <Text
//                       style={{color: Colors.black, fontSize: FontSizes.medium}}>
//                       Incity:
//                     </Text>
//                     <Text
//                       style={{color: Colors.black, fontSize: FontSizes.medium}}>
//                       {item.package_detail}
//                     </Text>
//                   </View>
//                   <View
//                     style={{
//                       borderStyle: 'dotted',
//                       borderWidth: 1,
//                       borderRadius: 1,
//                       marginVertical: 5,
//                     }}></View>
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       justifyContent: 'space-between',
//                     }}>
//                     <Text
//                       style={{color: Colors.black, fontSize: FontSizes.medium}}>
//                       Package & Price:
//                     </Text>
//                     <View style={{flexDirection: 'row'}}>
//                       <Text
//                         style={{
//                           color: Colors.black,
//                           fontWeight: FontWeights.extraBold,
//                           fontSize: FontSizes.medium,
//                         }}>
//                         ₹{item.budget}
//                       </Text>
//                     </View>
//                   </View>
//                   <View
//                     style={{
//                       borderStyle: 'dotted',
//                       borderWidth: 1,
//                       borderRadius: 1,
//                       marginVertical: 5,
//                     }}
//                   />

//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       justifyContent: 'space-between',
//                     }}>
//                     <Text
//                       style={{color: Colors.black, fontSize: FontSizes.medium}}>
//                       Grand Total:
//                     </Text>
//                     <View style={{flexDirection: 'row'}}>
//                       <Text
//                         style={{
//                           color: Colors.black,
//                           fontWeight: FontWeights.extraBold,
//                           fontSize: FontSizes.medium,
//                         }}>
//                         ₹{item.grand_total}
//                       </Text>
//                     </View>
//                   </View>
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       justifyContent: 'space-between',
//                       marginVertical: 10,
//                       ...Margins.mt.mt20,
//                     }}>
//                     {item.view_section_flag.cancel_button_view_flag === 1 ? (
//                       <TouchableOpacity
//                         style={[styles.cardButton]}
//                         onPress={openModal}>
//                         <Text
//                           style={{
//                             color: Colors.black,
//                             fontWeight: FontWeights.extraBold,
//                           }}>
//                           Cancel
//                         </Text>
//                       </TouchableOpacity>
//                     ) : null}
//                     {item.view_section_flag.reschedule_button_view_flag ===
//                     1 ? (
//                       <TouchableOpacity
//                         onPress={() =>
//                           navigation.navigate('resheduleridescreen', {
//                             bookingId: item.booking_number,
//                           })
//                         }
//                         style={[styles.cardButton]}>
//                         <Text
//                           style={{
//                             color: Colors.black,
//                             fontWeight: FontWeights.extraBold,
//                           }}>
//                           Reschedule
//                         </Text>
//                       </TouchableOpacity>
//                     ) : null}
//                   </View>

//                       <TouchableOpacity
//                       style={[styles.cardButtons]}
//                       onPress={openModalBooking}>
//                       <Text
//                         style={{
//                           color: Colors.black,
//                           fontWeight: FontWeights.extraBold,
//                         }}>
//                         Track
//                       </Text>
//                     </TouchableOpacity>
//                     {item.rate_your_experience_button_view_flag ===
//                     1 ? (
//                   <TouchableOpacity
//                     onPress={() =>
//                       navigation.navigate('rateYourExperience', {
//                         bookingId: item.booking_number,
//                       })
//                     }
//                     style={[styles.cardButtons, {marginVertical: 10}]}>
//                     <Text
//                       style={{
//                         color: Colors.black,
//                         fontWeight: FontWeights.extraBold,
//                       }}>
//                       Rate Us
//                     </Text>
//                   </TouchableOpacity>
//                 ) : null}
//                 </View>
//               ))
//             ) : (
//               <View style={{}}>
//                 <View style={{}}>
//                   <Image
//                     source={require('../../assets/images/my_current_rides.jpg')}
//                     style={styles.image}
//                   />
//                 </View>
//                 <View style={{alignItems: 'center'}}>
//                   <Text
//                     style={{
//                       color: Colors.black,
//                       fontSize: 16,
//                       fontWeight: '500',
//                     }}>
//                     No Active Bookings
//                   </Text>
//                   <TouchableOpacity
//                     style={{
//                       backgroundColor: Colors.primary,
//                       padding: 5,
//                       paddingHorizontal: 30,
//                       marginTop: 20,
//                       fontSize: 12,
//                       borderRadius: 3,
//                     }}>
//                     <Text style={{color: Colors.white}}>Book Now</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             )}
//           </ScrollView>
//         </View>
//         /////////////
//         /* <View
//                             style={{
//                               flexDirection: 'row',
//                               justifyContent: 'space-between',
//                             }}>
//                             <Text
//                               style={{color: Colors.black, fontSize: FontSizes.medium}}>
//                               Grand Total:
//                             </Text>
//                             <View style={{flexDirection: 'row'}}>
//                               <Text
//                                 style={{
//                                   color: Colors.black,
//                                   fontWeight: FontWeights.extraBold,
//                                   fontSize: FontSizes.medium,
//                                 }}>
//                                 ₹{item.grand_total}
//                               </Text>
//                             </View>
//                           </View>
//                           <View
//                             style={{
//                               flexDirection: 'row',
//                               justifyContent: 'space-between',
//                               marginVertical: 10,
//                               ...Margins.mt.mt20,
//                             }}>
//                             {item.view_section_flag.cancel_button_view_flag === 1 ? (
//                               <TouchableOpacity
//                                 style={[styles.cardButton]}
//                                 onPress={openModal}>
//                                 <Text
//                                   style={{
//                                     color: Colors.black,
//                                     fontWeight: FontWeights.extraBold,
//                                   }}>
//                                   Cancel
//                                 </Text>
//                               </TouchableOpacity>
//                             ) : null}
//                             {item.view_section_flag.reschedule_button_view_flag ===
//                             1 ? (
//                               <TouchableOpacity
//                                 onPress={() =>
//                                   navigation.navigate('resheduleridescreen', {
//                                     bookingId: item.booking_number,
//                                   })
//                                 }
//                                 style={[styles.cardButton]}>
//                                 <Text
//                                   style={{
//                                     color: Colors.black,
//                                     fontWeight: FontWeights.extraBold,
//                                   }}>
//                                   Reschedule
//                                 </Text>
//                               </TouchableOpacity>
//                             ) : null}
//                           </View>
//                           <TouchableOpacity
//                             style={[styles.cardButtons]}
//                             onPress={openModalBooking}>
//                             <Text
//                               style={{
//                                 color: Colors.black,
//                                 fontWeight: FontWeights.extraBold,
//                               }}>
//                               Track
//                             </Text>
//                           </TouchableOpacity>

//                           <TouchableOpacity
//                             onPress={() =>
//                               navigation.navigate('rateYourExperience', {
//                                 bookingId: item.booking_number,
//                               })
//                             }
//                             style={[styles.cardButtons, {marginVertical: 10}]}>
//                             <Text
//                               style={{
//                                 color: Colors.black,
//                                 fontWeight: FontWeights.extraBold,
//                               }}>
//                               Rate Us
//                             </Text>
//                           </TouchableOpacity> */

//         ////////////
//       );
//     } else if (activePage === 'History') {
//       return (
//         <ScrollView>
//           {historyBooking && historyBooking.length > 0
//             ? historyBooking.map((historyItem, index) => (
//                 <View
//                   style={{
//                     backgroundColor: Colors.secondydark,
//                     ...Margins.mh.mh15,
//                     marginVertical: 15,
//                     borderBottomLeftRadius: 10,
//                     borderBottomRightRadius: 10,
//                   }}>
//                   <View
//                     style={{
//                       backgroundColor: Colors.secondarylight,
//                       flexDirection: 'row',
//                       justifyContent: 'space-between',
//                       padding: 5,
//                       borderBottomLeftRadius: 10,
//                       borderBottomRightRadius: 10,
//                       alignItems: 'center',
//                     }}>
//                     <View>
//                       <Text
//                         style={{
//                           color: Colors.black,
//                           fontWeight: FontWeights.semiBold,
//                           fontSize: FontSizes.tinymedium,
//                           marginBottom: 3,
//                         }}>
//                         {historyItem.booking_date}{' '}
//                         <Text
//                           style={{
//                             color: Colors.darkgrey,
//                             fontWeight: '900',
//                             fontSize: 20,
//                           }}>
//                           |
//                         </Text>{' '}
//                         {historyItem.booking_time}
//                       </Text>
//                     </View>

//                     <View style={{flexDirection: 'row', alignItems: 'center'}}>
//                       <Text
//                         style={{
//                           color: 'black',
//                           marginRight: 10,
//                           fontFamily: 'Roboto-Medium',
//                         }}>
//                         {historyItem.last_status === 'Cancelled'
//                           ? 'Cancelled'
//                           : 'Completed'}
//                       </Text>

//                       <View
//                         style={{
//                           backgroundColor:
//                             historyItem.last_status == 'Cancelled'
//                               ? Colors.red
//                               : Colors.check,
//                           borderRadius: 30,
//                           ...Paddings.p.p5,
//                         }}>
//                         <MaterialCommunityIcons
//                           name={
//                             historyItem.last_status === 'Cancelled'
//                               ? 'close-circle'
//                               : 'check-circle'
//                           }
//                           color={Colors.white}
//                           style={{fontWeight: 'bold'}}
//                           size={15}
//                         />
//                       </View>
//                     </View>
//                   </View>
//                   <View
//                     style={{
//                       ...Margins.mh.mh10,
//                       ...Margins.mt.mt10,
//                       justifyContent: 'space-between',
//                       flexDirection: 'row',
//                     }}>
//                     <View>
//                       <Text
//                         style={{
//                           color: Colors.black,
//                           fontFamily: 'Roboto-Medium',
//                         }}>
//                         Booking ID {historyItem.booking_number}
//                       </Text>
//                     </View>

//                     {historyItem.invoice_link_view_flag == 1 ? (
//                       <View style={{flexDirection: 'column'}}>
//                         <TouchableOpacity
//                           onPress={() =>
//                             console.log('Invoice Downloaded.....')
//                           }>
//                           <Icon
//                             name="download"
//                             color={Colors.primary}
//                             style={{fontWeight: 'bold', alignSelf: 'center'}}
//                             size={20}
//                           />
//                         </TouchableOpacity>
//                         <Text
//                           style={{
//                             color: Colors.primary,
//                             fontFamily: 'Roboto-Medium',
//                           }}>
//                           Invoice
//                         </Text>
//                       </View>
//                     ) : null}
//                   </View>
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       ...Margins.mt.mt20,
//                       ...Margins.mh.mh10,
//                       alignItems: 'center',
//                     }}>
//                     <Text
//                       style={{
//                         color: Colors.black,
//                         fontSize: FontSizes.xlarge,
//                         fontWeight: FontWeights.extraBold,
//                         fontFamily: 'Roboto-Medium',
//                       }}>
//                       ₹ {historyItem.budget}
//                     </Text>
//                   </View>
//                   <View>
//                     <Text
//                       style={{
//                         color: Colors.black,
//                         ...Margins.mt.mt5,
//                         ...Margins.mh.mh10,
//                         fontFamily: 'Roboto-Medium',
//                       }}>
//                       Package - {historyItem.package_detail}
//                     </Text>
//                   </View>
//                   <View>
//                     {historyItem.driver_data.driver_name ? (
//                       <Text
//                         style={{
//                           color: Colors.black,
//                           ...Margins.mt.mt5,
//                           ...Margins.mh.mh10,
//                           fontWeight: 'bold',
//                         }}>
//                         {historyItem.driver_data.driver_name} assigned{' '}
//                         <Text style={{color: 'black', fontWeight: '500'}}>
//                           as your Driver Partner
//                         </Text>
//                       </Text>
//                     ) : null}
//                   </View>
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       justifyContent: 'space-between',
//                       ...Margins.mh.mh10,
//                     }}>
//                     <View style={styles.verifyButtonContainer}>
//                       <DropShadow style={styles.shadowStyle}>

//                         <TouchableOpacity
//                           onPress={() =>
//                             handleBookAgain(historyItem.driver_data.id)
//                           }
//                           style={styles.verifyButton}>
//                           <Text
//                             style={{
//                               color: Colors.orange,
//                               fontWeight: FontWeights.medium,
//                               fontFamily: 'Roboto-Medium',
//                             }}>
//                             Book Again
//                           </Text>
//                         </TouchableOpacity>
//                       </DropShadow>
//                     </View>
//                     <View style={styles.verifyButtonContainer}>
//                       <DropShadow style={styles.shadowStyle}>
//                         {historyItem &&
//                         historyItem.booking_rating.rate === null ? (
//                           <>
//                             {historyItem.rate_your_experience_view_flag ===
//                             1 ? (
//                               <TouchableOpacity
//                                 onPress={() =>
//                                   navigation.navigate('rateYourExperience', {
//                                     bookingId: historyItem?.booking_number,
//                                   })
//                                 }
//                                 style={styles.verifyButtons}>
//                                 <Text
//                                   style={{
//                                     color: Colors.primary,
//                                     ...Margins.ml.ml4,
//                                     fontWeight: FontWeights.medium,
//                                     fontFamily: 'Roboto-Medium',
//                                   }}>
//                                   Rate Experience
//                                 </Text>
//                               </TouchableOpacity>
//                             ) : (
//                               <TouchableOpacity
//                                   onPress={()=>navigation.navigate('Middle')}
//                                 style={styles.verifyButtons}>
//                                 <Text
//                                   style={{
//                                     color: Colors.primary,
//                                     ...Margins.ml.ml4,
//                                     fontWeight: FontWeights.medium,
//                                     fontFamily: 'Roboto-Medium',
//                                   }}>
//                                   HELP ?
//                                 </Text>
//                               </TouchableOpacity>
//                             )}
//                           </>
//                         ) : (
//                           <TouchableOpacity
//                             onPress={() => console.log('press Rating')}
//                             style={styles.verifyButtons}>
//                             <MaterialIcons
//                               name="star"
//                               size={16}
//                               color={Colors.primary}
//                             />
//                             <Text
//                               style={{
//                                 color: Colors.primary,
//                                 ...Margins.ml.ml4,
//                                 fontFamily: 'Roboto-Medium',

//                                 fontWeight: FontWeights.medium,
//                               }}>
//                               {historyItem.booking_rating.rate ||
//                               historyItem.booking_rating.rate_type
//                                 ? `${historyItem.booking_rating.rate} | ${historyItem.booking_rating.rate_type}`
//                                 : ''}
//                             </Text>
//                           </TouchableOpacity>
//                         )}
//                       </DropShadow>
//                     </View>
//                   </View>
//                 </View>
//               ))
//             : null}

//           {loadMoreButtonShow == 1 ? (
//             <DropShadow style={styles.shadowStyle}>
//               <TouchableOpacity
//                 onPress={loadMore}
//                 style={[styles.verifyButton, {marginBottom: 20}]}>
//                 <Text
//                   style={{
//                     color: Colors.primary,
//                     fontWeight: FontWeights.medium,
//                     fontFamily: 'Roboto-Medium',
//                   }}>
//                   Load More
//                 </Text>
//               </TouchableOpacity>
//             </DropShadow>
//           ) : null}
//         </ScrollView>
//       );
//     }
//   };

//   return (
//     <View style={{flex: 1, backgroundColor: Colors.white}}>
//       <OTTHeader navigation={navigation} title={'trusted & trained driver'} />
//       <Modal
//         isVisible={isModalVisibleFeedback}
//         onBackdropPress={closeModalFeedback}
//         style={styles.modal}>
//         <View style={styles.modalContentBooking}>
//           <ScrollView contentContainerStyle={styles.scrollViewContent}>
//             <TouchableOpacity
//               onPress={closeModalFeedback}
//               style={styles.closeButton}>
//               <Ionicons name="close" color={Colors.white} size={24} />
//             </TouchableOpacity>
//             <View style={{backgroundColor: Colors.secondary, borderRadius: 10}}>
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   ...Margins.m.m20,
//                 }}>
//                 <TextInput
//                   style={styles.input}
//                   onChangeText={remarks => setRemarks(remarks)}
//                   value={remarks}
//                   placeholder="Type your feedback here..."
//                   keyboardType="text"
//                   placeholderTextColor={Colors.black}
//                   numberOfLines={3}
//                   multiline={true}
//                 />
//                 <TouchableOpacity
//                   onPress={() => needHelp()}
//                   style={{
//                     backgroundColor: Colors.white,
//                     borderRadius: 30,
//                     ...Paddings.p.p10,
//                     ...Margins.mt.mt20,
//                     ...Margins.mh.mh5,
//                   }}>
//                   <Feather name="send" size={20} color={Colors.primary} />
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </ScrollView>
//         </View>
//       </Modal>
//       <Modal
//         isVisible={isModalVisibleBooking}
//         onBackdropPress={closeModalBooking}
//         style={styles.modal}>
//         <View style={styles.modalContent}>
//           <ScrollView contentContainerStyle={styles.scrollViewContent}>
//             <View style={{backgroundColor: Colors.secondary}}>
//               <View
//                 style={{
//                   backgroundColor: Colors.primary,
//                   ...Paddings.p.p10,
//                   flexDirection: 'row',
//                   justifyContent: 'space-between',
//                   ...Margins.mt.mt20,
//                   alignItems: 'center',
//                   borderRadius: 5,
//                 }}>
//                 <Text style={{color: Colors.white, fontSize: FontSizes.body}}>
//                   BOOKING STATUS
//                 </Text>
//                 <TouchableOpacity
//                   onPress={closeModalBooking}
//                   style={{backgroundColor: Colors.white, borderRadius: 20}}>
//                   <Ionicons name="close" color={Colors.black} size={28} />
//                 </TouchableOpacity>
//               </View>
//               <View
//                 style={{
//                   borderWidth: 1,
//                   borderColor: Colors.black,
//                   borderRadius: 5,
//                   ...Margins.mt.mt10,
//                 }}>
//                 <View style={{...Margins.mh.mh10, marginVertical: 10}}>
//                   {trackdata && trackdata.length > 0
//                     ? trackdata.map((item, index) => (
//                         <View
//                           style={{
//                             flexDirection: 'row',
//                             justifyContent: 'space-between',
//                             marginVertical: 10,
//                             alignItems: 'center',
//                           }}>
//                           <Text
//                             style={{
//                               color: Colors.black,
//                               fontSize: FontSizes.tinymedium,
//                               fontWeight: FontWeights.semiBold,
//                             }}>
//                             {item.heading}
//                           </Text>
//                           <Text
//                             style={{
//                               color: Colors.black,
//                               fontSize: FontSizes.tinymedium,
//                               fontWeight: FontWeights.semiBold,
//                             }}>
//                             {item.assign_time}
//                           </Text>
//                         </View>
//                       ))
//                     : null}
//                 </View>
//               </View>
//             </View>
//           </ScrollView>
//         </View>
//       </Modal>
//       <Modal
//         isVisible={isModalVisible}
//         onBackdropPress={closeModal}
//         style={styles.modal}>
//         <View style={styles.modalContent}>
//           <ScrollView contentContainerStyle={styles.scrollViewContent}>
//             <View style={{alignItems: 'center'}}>
//               <Text style={styles.title}>Cancel Booking?</Text>
//             </View>
//             <View style={styles.radioContainer}>
//               <View style={styles.firstRadioContainer}>
//                 <Text style={styles.radioText}>Change in plan</Text>
//                 <TouchableOpacity
//                   style={styles.radioButton}
//                   onPress={() => setSelectedOption('changeplan')}>
//                   <View style={styles.radioCircle}>
//                     {selectedOption === 'changeplan' && (
//                       <View style={styles.selectedRb} />
//                     )}
//                   </View>
//                 </TouchableOpacity>
//               </View>
//               <View style={styles.firstRadioContainer}>
//                 <Text style={styles.radioText}>Driver trusted to cancel</Text>
//                 <TouchableOpacity
//                   style={styles.radioButton}
//                   onPress={() => setSelectedOption('driverrequstedcancel')}>
//                   <View style={styles.radioCircle}>
//                     {selectedOption === 'driverrequstedcancel' && (
//                       <View style={styles.selectedRb} />
//                     )}
//                   </View>
//                 </TouchableOpacity>
//               </View>
//               <View style={styles.firstRadioContainer}>
//                 <Text style={styles.radioText}>Driver is unreachable</Text>
//                 <TouchableOpacity
//                   style={styles.radioButton}
//                   onPress={() => setSelectedOption('driverunrechable')}>
//                   <View style={styles.radioCircle}>
//                     {selectedOption === 'driverunrechable' && (
//                       <View style={styles.selectedRb} />
//                     )}
//                   </View>
//                 </TouchableOpacity>
//               </View>
//               <Divider
//                 width={1}
//                 color={Colors.white}
//                 style={{...Margins.mt.mt10}}
//               />
//               <Input
//                 placeholder="Tell us your suggestion..."
//                 style={{marginTop: 30, fontSize: FontSizes.tinymedium}}
//               />
//               <View style={{marginHorizontal: 30}}>
//                 <Text style={{color: Colors.black}}>
//                   Your words makes tat d a better
//                 </Text>
//                 <Text style={{color: Colors.black}}>
//                   place. You are the influence
//                 </Text>
//               </View>
//             </View>

//             <View
//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 justifyContent: 'space-evenly',
//                 marginTop: 15,
//               }}>
//               <TouchableOpacity onPress={closeModal} style={styles.noButton}>
//                 <Text style={styles.noTextButton}>No</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={fetchcancelBooking}
//                 style={styles.cancelButton}>
//                 <Text style={styles.cancelButtonText}>Cancel</Text>
//               </TouchableOpacity>
//             </View>
//             {currentbooking?.view_section_flag?.find_another_driver_view_button_flag === 1 ? (
//                      <TouchableOpacity
//                      onPress={fetchcancelBooking}
//                      style={styles.findButton}>
//                      <Text style={styles.cancelButtonText}>Find Another Driver</Text>
//                    </TouchableOpacity>
//                     ) : null}

//           </ScrollView>
//         </View>
//       </Modal>
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity
//           style={[
//             styles.button,
//             activePage === 'Current' && styles.activeButton,
//           ]}
//           onPress={() => setActivePage('Current')}>
//           <Text style={styles.buttonText}>Current</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[
//             styles.button,
//             activePage === 'History' && styles.activeButton,
//           ]}
//           onPress={() => setActivePage('History')}>
//           <Text style={styles.buttonText}>History</Text>
//         </TouchableOpacity>
//       </View>
//       {renderContent()}
//     </View>
//   );
// };

// export default TrackScreen;

// const styles = StyleSheet.create({
//   findButton:{
//     backgroundColor:'green',
//     marginHorizontal:52,
//     padding:10,
//     width:'68%',
//     borderRadius:5,
//     ...Margins.mt.mt20,
//     justifyContent:'center',
//     alignItems:'center'
//   },
//   verifyButtonContainer: {
//     justifyContent: 'space-between',
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
//     justifyContent: 'space-between',
//     backgroundColor: Colors.white,
//     alignItems: 'center',
//     ...Paddings.p.p11,
//     borderRadius: 5,
//     ...Margins.mh.mh30,
//     borderColor: Colors.orange,
//     borderWidth: 1,
//   },
//   verifyButtons: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     backgroundColor: Colors.white,
//     alignItems: 'center',
//     ...Paddings.p.p11,
//     borderRadius: 5,
//     ...Margins.mh.mh30,
//     borderColor: Colors.primary,
//     borderWidth: 1,
//   },
//   ratingButton: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     backgroundColor: Colors.white,
//     alignItems: 'center',
//     ...Paddings.p.p11,
//     borderRadius: 5,
//     paddingHorizontal: 15,
//     borderColor: Colors.black,
//     borderWidth: 1,
//   },
//   container: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: Colors.white,
//   },
//   buttonContainer: {
//     ...Margins.mh.mh15,
//     ...Paddings.p.p10,
//     backgroundColor: '#edecf1',
//     flexDirection: 'row',
//     borderRadius: 3,
//     ...Margins.mt.mt10,
//   },
//   button: {
//     ...Paddings.ph.ph60,
//     borderRadius: 3,
//     ...Paddings.p.p7,
//   },
//   activeButton: {
//     backgroundColor: Colors.white,
//     ...Paddings.ph.ph50,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: Colors.black,
//   },
//   pageContainer: {
//     backgroundColor: Colors.white,
//     flex: 1,
//   },
//   pageText: {
//     fontSize: FontSizes.xxlarge,
//     color: Colors.black,
//   },
//   modalContentBooking: {
//     backgroundColor: Colors.lightblue,
//     borderTopLeftRadius: 10,
//     borderTopRightRadius: 10,
//     ...Paddings.pb.pb20,
//     ...Paddings.ph.ph20,
//   },
//   pageContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: Colors.white,
//   },
//   input: {
//     borderRadius: 5,
//     ...Margins.mv.mv30,
//     color: Colors.black,
//     ...Paddings.p.p10,
//     backgroundColor: Colors.white,
//     width: '85%',
//   },
//   image: {
//     width: 200,
//     height: 200,
//     resizeMode: 'contain',
//   },
//   card: {
//     backgroundColor: Colors.white,
//     borderRadius: 10,
//     padding: 15,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.8,
//     shadowRadius: 3,
//     elevation: 15,
//   },
//   cardButton: {
//     alignItems: 'center',
//     backgroundColor: Colors.white,
//     borderRadius: 10,
//     width: '46%',
//     padding: 15,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.8,
//     shadowRadius: 3,
//     elevation: 12,
//     borderColor: Colors.darkgrey,
//     borderWidth: 1,
//   },
//   cardButtons: {
//     backgroundColor: Colors.white,
//     borderRadius: 10,
//     alignItems: 'center',
//     padding: 15,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.8,
//     shadowRadius: 3,
//     elevation: 12,
//     borderColor: Colors.darkgrey,
//     borderWidth: 1,
//   },
//   openButton: {
//     backgroundColor: Colors.lightblue,
//     ...Paddings.p.p10,
//     alignItems: 'center',
//     ...Margins.m.m20,
//     borderRadius: 5,
//   },
//   modal: {
//     justifyContent: 'flex-end',
//     margin: 0,
//   },
//   modalContent: {
//     backgroundColor: Colors.secondary,
//     borderTopLeftRadius: 10,
//     borderTopRightRadius: 10,
//     ...Paddings.pb.pb20,
//     ...Paddings.ph.ph20,
//   },
//   closeButton: {
//     alignSelf: 'flex-end',
//     ...Margins.mt.mt10,
//     ...Margins.mb.mb20,
//     borderRadius: 20,
//     borderWidth: 2,
//     borderColor: Colors.white,
//     padding: 5,
//   },
//   scrollViewContent: {},
//   card: {
//     backgroundColor: Colors.white,
//     borderRadius: 5,
//     ...Paddings.p.p20,
//     ...Margins.mb.mb20,
//   },
//   text: {
//     color: Colors.black,
//     fontSize: FontSizes.tiny,
//     ...Margins.mb.mb5,
//   },
//   infoList: {
//     ...Margins.mv.mv20,
//   },
//   listItem: {
//     color: Colors.black,
//     fontSize: FontSizes.tiny,
//     ...Margins.mb.mb5,
//   },
//   title: {
//     color: Colors.black,
//     fontSize: FontSizes.xlarge,
//     fontWeight: FontWeights.bold,
//     ...Margins.mt.mt20,
//   },
//   noTextButton: {
//     color: Colors.black,
//     fontSize: FontSizes.tinymedium,
//   },
//   cancelButtonText: {
//     color: Colors.white,
//     fontSize: FontSizes.tinymedium,
//   },
//   cancelButton: {
//     backgroundColor: Colors.primary,
//     ...Paddings.p.p10,
//     width: '25%',
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   noButton: {
//     backgroundColor: Colors.white,
//     ...Paddings.p.p10,
//     width: '25%',
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   selectedRb: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     backgroundColor: '#2c9dd1',
//   },
//   radioContainer: {
//     justifyContent: 'space-between',
//     ...Margins.mh.mh15,
//     ...Margins.mt.mt25,
//   },
//   firstRadioContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     ...Margins.mv.mv12,
//     alignItems: 'center',
//   },
//   secondRadioContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   radioButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   radioCircle: {
//     height: 20,
//     width: 20,
//     borderRadius: 10,
//     borderWidth: 2,
//     borderColor: '#2c9dd1',
//     alignItems: 'center',
//     justifyContent: 'center',
//     ...Margins.mr.mr10,
//   },
//   radioText: {
//     fontSize: FontSizes.tinymedium,
//     color: '#000',
//     fontWeight: FontWeights.medium,
//   },
//   radioTextCash: {
//     fontSize: FontSizes.small,
//     color: Colors.darkgrey,
//   },
// });

import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Linking,
  ImageBackground,
  RefreshControl,
} from 'react-native';
import OTTHeader from '../../components/OTTHeader';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  Colors,
  FontSizes,
  FontWeights,
  Paddings,
  Margins,
} from '../../assets/colors';
import DropShadow from 'react-native-drop-shadow';
import {Divider, Input} from '@rneui/base';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {validateAccessToken, refreshAccessToken} from '../../utils/validation';
import Icon from 'react-native-vector-icons/FontAwesome';

const TrackScreen = ({navigation}) => {
  const [feedback, setFeedback] = useState();
  const [activePage, setActivePage] = useState('Current');
  const [selectedOption, setSelectedOption] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisibleBooking, setModalVisibleBooking] = useState(false);
  const [currentbooking, setCurrentbooking] = useState([]);
  const [currentbookingget, setCurrentbookingget] = useState([]);
  const [trackdata, setTrackdata] = useState([]);
  const [error, setError] = useState();
  const [remarks, setRemarks] = useState();
  const [isModalVisibleFeedback, setModalVisibleFeedback] = useState(false);
  const [needhelpdata, setNeedhelpdata] = useState();
  const [cancelbooking, setCancelbooking] = useState();
  const [suggestion, setSuggestion] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookingnumber,setBookingnumber]=useState()
  const [historyBooking, setHistoryBooking] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loadMoreButtonShow, setLoadMoreButtonShow] = useState(0);

  useEffect(() => {
    fetchCurrentBooking();
    fetchHistoryBooking(0);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchCurrentBooking().then(() => setRefreshing(false));
  }, []);

  const loadMore = () => {
    setOffset(prevOffset => {
      const newOffset = prevOffset + 10;
      fetchHistoryBooking(newOffset);
      return newOffset;
    });
  };

  const fetchHistoryBooking = async offSet => {
    const isValid = await validateAccessToken();
    if (!isValid) {
      await refreshAccessToken();
    }
    try {
      const userData = await AsyncStorage.getItem('userData');
      const parsedUserData = userData ? JSON.parse(userData) : null;
      const token = parsedUserData ? parsedUserData.jwt : null;

      console.log(token, 'jwt');
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
        'https://www.tatd.in/app-api/customer/myride/customer-history-tab-api.php',
        {
          offset: offSet,
          limit: 10,
          action: 'history_booking',
        },
        config,
      );

      const {history_bookings} = response.data;

      console.log(response.data, 'all history data');
      console.log('current history booking Data:', history_bookings);
      console.log(response.data.load_more_flag, 'load_more_flag from response');

      if (!history_bookings || history_bookings.length === 0) {
        setLoadMoreButtonShow(0);
      } else {
        setLoadMoreButtonShow(1);
        setHistoryBooking(prevHistoryBooking => [
          ...prevHistoryBooking,
          ...history_bookings,
        ]);
      }
    } catch (err) {
      setError(err.message);
      console.log('Error from current Historybooking API:', err.message);
    }
  };

  // use baad me

  // const handleBookAgain = async bookingId => {
  //   const isValid = await validateAccessToken();
  //   if (!isValid) {
  //     await refreshAccessToken();
  //   }
  //   try {
  //     const userData = await AsyncStorage.getItem('userData');
  //     const parsedUserData = userData ? JSON.parse(userData) : null;
  //     const token = parsedUserData ? parsedUserData.jwt : null;

  //     console.log(token, 'jwt');
  //     if (!token) {
  //       throw new Error('No token found');
  //     }
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         'Content-Type': 'application/json',
  //       },
  //     };
  //     const response = await axios.post(
  //       'https://www.tatd.in/app-api/customer/myride/customer-history-tab-api.php',
  //       {
  //         booking_number: bookingId,
  //         action: 'book_again',
  //       },
  //       config,
  //     );
  //     console.log('Book Again response Data:', response.data);

  //     await AsyncStorage.setItem(
  //       'bookingData',
  //       JSON.stringify(response.data.booking_data),
  //     );

  //     if (
  //       response.data.status_code == 200 &&
  //       response.data.redirect == 'incity_roundtrip'
  //     ) {
  //       navigation.navigate('booking', {selectedzone: 'A'});
  //     } else if (
  //       response.data.status_code == 200 &&
  //       response.data.redirect == 'outstation_roundtrip'
  //     ) {
  //       navigation.navigate(
  //         'outstationbooking',
  //         {selectedzone: 'B'},
  //         {bookingId: response.data.booking_number},
  //       );
  //     }
  //   } catch (err) {
  //     setError(err.message);
  //     console.log('Error from Book Again error API:', err.message);
  //   }
  // };

  const fetchCurrentBooking = async () => {
    setLoading(true);
    const isValid = await validateAccessToken();
    if (!isValid) {
      await refreshAccessToken();
    }
    try {
      const userData = await AsyncStorage.getItem('userData');
      const parsedUserData = userData ? JSON.parse(userData) : null;
      const token = parsedUserData ? parsedUserData.jwt : null;
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
        'https://www.tatd.in/app-api/customer/myride/customer-myride-api.php',
        {action: 'current_booking'},
        config,
      );
      console.log('current booking Data:', response.data);
      if(response.data.status_code == 200){
        setCurrentbooking(response.data?.bookings);
        const bookingNumber = response.data.bookings[0].booking_number;
        setBookingnumber(bookingNumber);
        fetchtrack(bookingNumber);
      }
     
      setLoading(false);
    } catch (err) {
      setError(err.message);
      console.log('Error from current track booking API:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchtrack = async (bookingNumber) => {
    console.log('Tracking booking number:', bookingNumber);
    const isValid = await validateAccessToken();
    if (!isValid) {
      await refreshAccessToken();
    }
    try {
      const userData = await AsyncStorage.getItem('userData');
      const parsedUserData = userData ? JSON.parse(userData) : null;
      const token = parsedUserData ? parsedUserData.jwt : null;
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
        'https://www.tatd.in/app-api/customer/myride/customer-myride-api.php',
        {
          action: 'track_booking',
          booking_number: bookingNumber,
        },
        config,
      );
      setTrackdata(response.data.all_booking_status);
    } catch (err) {
      setError(err.message);
      console.log('Error from fetch track API:', err.message);
    }
  };

  const needHelp = async () => {
    const isValid = await validateAccessToken();
    if (!isValid) {
      await refreshAccessToken();
    }
    try {
      const userData = await AsyncStorage.getItem('userData');
      const parsedUserData = userData ? JSON.parse(userData) : null;
      const token = parsedUserData ? parsedUserData.jwt : null;
      console.log('remarks------number', currentbooking[0]?.booking_number);
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
        'https://www.tatd.in/app-api/customer/myride/customer-myride-api.php',
        {
          action: 'add_customer_ticket',
          booking_number: currentbooking[0]?.booking_number,
          category: 'Private Driver',
          remarks: remarks,
        },
        config,
      );
      setNeedhelpdata(response.data);
      console.log('need help Data:', response.data);
    } catch (err) {
      setError(err.message);
      console.log('Error from need help  API:', err.message);
    }
  };

  const fetchcancelBooking = async () => {
    const isValid = await validateAccessToken();
    if (!isValid) {
      await refreshAccessToken();
    }
    try {
      const userData = await AsyncStorage.getItem('userData');
      const parsedUserData = userData ? JSON.parse(userData) : null;
      const token = parsedUserData ? parsedUserData.jwt : null;
      console.log('remarks------number', currentbooking[0]?.booking_number);
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
        'https://www.tatd.in/app-api/customer/myride/cancel-booking-api.php',
        {
          action: 'cancel_booking',
          booking_number: currentbooking[0]?.booking_number,
          cancel_reason: selectedOption,
          message: suggestion,
          name: currentbooking[0]?.name,
        },
        config,
      );
      setCancelbooking(response.data);
      console.log('cancel Data: first', response.data);
      if (response.data.status_code === 200) {
        console.log(
          '-------------check booking check============',
          currentbooking,
        );
        setCurrentbooking(null);
        console.log('check booking data==================data', currentbooking);
        navigation.navigate('ThankYouScreen', {itemcancel: response.data});
      } else if (response.data.status_code === 400) {
        fetchCurrentBooking();
        setCurrentbooking(null);
      } else null;

      console.log('cancel Data: second', response.data);
    } catch (err) {
      setError(err.message);
      console.log('Error from cancel API:', err.message);
    }
  };

  useEffect(() => {
    if (currentbooking?.length > 0) {
      fetchtrack();
    }
  }, [currentbooking]);
  const openModalFeedback = () => {
    setModalVisibleFeedback(!isModalVisibleFeedback);
  };
  const closeModalFeedback = () => {
    setModalVisibleFeedback(false);
  };

  const openModal = () => {
    setModalVisible(!isModalVisible);
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  const openModalBooking = () => {
    setModalVisibleBooking(!isModalVisibleBooking);
  };
  const closeModalBooking = () => {
    setModalVisibleBooking(false);
  };

  const handlePress = item => {
    Linking.openURL(`tel:${item}`);
  };
  const renderContent = () => {
    if (activePage === 'Current') {
      return (
        <View style={styles.pageContainer}>
          <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          >
            {currentbooking && currentbooking.length > 0 ? (
              currentbooking.map((item, index) => (
                <View style={[styles.card]}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{color: Colors.black}}>
                      Booking ID: {item.booking_number}
                    </Text>
                    <Text style={{color: Colors.black}}>
                      {item.customer_otp}
                    </Text>
                  </View>
                  {item.driver_section_view_flag === 1 ? (
                    <View
                      style={{
                        borderColor: Colors.darkgrey,
                        borderWidth: 1,
                        ...Margins.mt.mt10,
                        borderRadius: 5,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          ...Margins.m.m10,
                        }}>
                        <View style={{flexDirection: 'row'}}>
                          <View
                            style={{
                              borderRadius: 100,
                              width: 50,
                              height: 50,
                              borderWidth: 1,
                              borderColor: Colors.darkgrey,
                              overflow: 'hidden',
                            }}>
                            <ImageBackground
                              source={{uri: item.driver_photo}}
                              style={{width: '100%', height: '100%'}}>
                              {item.driver_rating_view_flag === 1 ? (
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    borderColor: Colors.darkgrey,
                                    borderWidth: 1,
                                    marginTop: 30,
                                    backgroundColor: Colors.white,
                                    borderRadius: 5,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}>
                                  <Text
                                    style={{
                                      color: Colors.black,
                                      fontSize: FontSizes.tiny,
                                    }}>
                                    {item.driver_rating}
                                  </Text>
                                  <MaterialIcons
                                    name="star"
                                    size={12}
                                    color="#ffa534"
                                  />
                                </View>
                              ) : null}
                            </ImageBackground>
                          </View>
                          <View style={{...Margins.mh.mh10}}>
                            <Text
                              style={{
                                color: Colors.black,
                                fontSize: FontSizes.medium,
                                fontWeight: FontWeights.bold,
                              }}>
                              {item.driver_name}
                            </Text>
                            <Text
                              style={{
                                color: Colors.darkgrey,
                                fontSize: FontSizes.medium,
                              }}>
                              Your Driver Partner
                            </Text>
                          </View>
                        </View>
                        <TouchableOpacity
                          onPress={() => handlePress(item.driver_mobile_number)}
                          style={{
                            ...Paddings.p.p10,
                            borderRadius: 60,
                            borderWidth: 1,
                            borderColor: Colors.black,
                          }}>
                          <Image
                            source={require('../../assets/images/openblueicon.png')}
                            style={{...Paddings.p.p5}}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : (
                    <View
                      style={{
                        borderColor: Colors.darkgrey,
                        borderWidth: 1,
                        ...Margins.mt.mt10,
                        borderRadius: 5,
                      }}>
                      <Text style={{color: Colors.primary, margin: 5}}>
                        Driver details will be shared here shortly. or at
                      </Text>
                      <Text
                        style={{
                          color: Colors.primary,
                          ...Margins.mh.mh5,
                          marginBottom: 25,
                        }}>
                        least 60 minutes before the scheduled time.
                      </Text>
                    </View>
                  )}
                  <TouchableOpacity
                    onPress={openModalFeedback}
                    style={{
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                      marginVertical: 5,
                      flexDirection: 'row',
                    }}>
                    <View>
                      <Text
                        style={{
                          color: Colors.primary,
                          fontSize: FontSizes.medium,
                        }}>
                        Need Help ?
                      </Text>
                      <View
                        style={{
                          borderWidth: 1.2,
                          borderColor: Colors.primary,
                          color: 'solid',
                        }}
                      />
                    </View>
                    <MaterialCommunityIcons
                      name="arrow-right-thick"
                      color={Colors.primary}
                      size={18}
                    />
                  </TouchableOpacity>
                  <View
                    style={{
                      borderStyle: 'dotted',
                      borderWidth: 1,
                      borderRadius: 1,
                      marginVertical: 5,
                    }}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{color: Colors.black, fontSize: FontSizes.medium}}>
                      Sheduled Time:
                    </Text>
                    <Text
                      style={{color: Colors.black, fontSize: FontSizes.medium}}>
                      {item.booking_time_display}, {item.booking_date_display}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderStyle: 'dotted',
                      borderWidth: 1,
                      borderRadius: 1,
                      marginVertical: 5,
                    }}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{color: Colors.black, fontSize: FontSizes.medium}}>
                      Incity:
                    </Text>
                    <Text
                      style={{color: Colors.black, fontSize: FontSizes.medium}}>
                      {item.package_detail}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderStyle: 'dotted',
                      borderWidth: 1,
                      borderRadius: 1,
                      marginVertical: 5,
                    }}></View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{color: Colors.black, fontSize: FontSizes.medium}}>
                      Package & Price:
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          color: Colors.black,
                          fontWeight: FontWeights.extraBold,
                          fontSize: FontSizes.medium,
                        }}>
                        ₹{item.budget}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      borderStyle: 'dotted',
                      borderWidth: 1,
                      borderRadius: 1,
                      marginVertical: 5,
                    }}
                  />

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{color: Colors.black, fontSize: FontSizes.medium}}>
                      Grand Total:
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          color: Colors.black,
                          fontWeight: FontWeights.extraBold,
                          fontSize: FontSizes.medium,
                        }}>
                        ₹{item.grand_total}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginVertical: 10,
                      ...Margins.mt.mt20,
                    }}>
                    {item.view_section_flag.cancel_button_view_flag === 1 ? (
                      <TouchableOpacity
                        style={[styles.cardButton]}
                        onPress={openModal}>
                        <Text
                          style={{
                            color: Colors.black,
                            fontWeight: FontWeights.extraBold,
                          }}>
                          Cancel
                        </Text>
                      </TouchableOpacity>
                    ) : null}
                    {item.view_section_flag.reschedule_button_view_flag ===
                    1 ? (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('resheduleridescreen', {
                            bookingId: item.booking_number,
                          })
                        }
                        style={[styles.cardButton]}>
                        <Text
                          style={{
                            color: Colors.black,
                            fontWeight: FontWeights.extraBold,
                          }}>
                          Reschedule
                        </Text>
                      </TouchableOpacity>
                    ) : null}
                  </View>
                  <TouchableOpacity
                    style={[styles.cardButtons]}
                    onPress={openModalBooking}>
                    <Text
                      style={{
                        color: Colors.black,
                        fontWeight: FontWeights.extraBold,
                      }}>
                      Track
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('rateYourExperience', {
                        bookingId: item.booking_number,
                      })
                    }
                    style={[styles.cardButtons, {marginVertical: 10}]}>
                    <Text
                      style={{
                        color: Colors.black,
                        fontWeight: FontWeights.extraBold,
                      }}>
                      Rate Us
                    </Text>
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <View style={{}}>
                <View style={{}}>
                  <Image
                    source={require('../../assets/images/my_current_rides.jpg')}
                    style={styles.image}
                  />
                </View>
                <View style={{alignItems: 'center'}}>
                  <Text
                    style={{
                      color: Colors.black,
                      fontSize: 16,
                      fontWeight: '500',
                    }}>
                    No Active Bookings
                  </Text>
                  <TouchableOpacity
                    style={{
                      backgroundColor: Colors.primary,
                      padding: 5,
                      paddingHorizontal: 30,
                      marginTop: 20,
                      fontSize: 12,
                      borderRadius: 3,
                    }}>
                    <Text style={{color: Colors.white}}>Book Now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </ScrollView>
        </View>
        /////////////
        /* <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}>
                            <Text
                              style={{color: Colors.black, fontSize: FontSizes.medium}}>
                              Grand Total:
                            </Text>
                            <View style={{flexDirection: 'row'}}>
                              <Text
                                style={{
                                  color: Colors.black,
                                  fontWeight: FontWeights.extraBold,
                                  fontSize: FontSizes.medium,
                                }}>
                                ₹{item.grand_total}
                              </Text>
                            </View>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              marginVertical: 10,
                              ...Margins.mt.mt20,
                            }}>
                            {item.view_section_flag.cancel_button_view_flag === 1 ? (
                              <TouchableOpacity
                                style={[styles.cardButton]}
                                onPress={openModal}>
                                <Text
                                  style={{
                                    color: Colors.black,
                                    fontWeight: FontWeights.extraBold,
                                  }}>
                                  Cancel
                                </Text>
                              </TouchableOpacity>
                            ) : null}
                            {item.view_section_flag.reschedule_button_view_flag ===
                            1 ? (
                              <TouchableOpacity
                                onPress={() =>
                                  navigation.navigate('resheduleridescreen', {
                                    bookingId: item.booking_number,
                                  })
                                }
                                style={[styles.cardButton]}>
                                <Text
                                  style={{
                                    color: Colors.black,
                                    fontWeight: FontWeights.extraBold,
                                  }}>
                                  Reschedule
                                </Text>
                              </TouchableOpacity>
                            ) : null}
                          </View>
                          <TouchableOpacity
                            style={[styles.cardButtons]}
                            onPress={openModalBooking}>
                            <Text
                              style={{
                                color: Colors.black,
                                fontWeight: FontWeights.extraBold,
                              }}>
                              Track
                            </Text>
                          </TouchableOpacity>
        
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate('rateYourExperience', {
                                bookingId: item.booking_number,
                              })
                            }
                            style={[styles.cardButtons, {marginVertical: 10}]}>
                            <Text
                              style={{
                                color: Colors.black,
                                fontWeight: FontWeights.extraBold,
                              }}>
                              Rate Us
                            </Text>
                          </TouchableOpacity> */

        ////////////
      );
    } else if (activePage === 'History') {
      return (
        <ScrollView>
          {historyBooking && historyBooking.length > 0
            ? historyBooking.map((historyItem, index) => (
                <View
                  style={{
                    backgroundColor: Colors.secondydark,
                    ...Margins.mh.mh15,
                    marginVertical: 15,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                  }}>
                  <View
                    style={{
                      backgroundColor: Colors.secondarylight,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      padding: 5,
                      borderBottomLeftRadius: 10,
                      borderBottomRightRadius: 10,
                      alignItems: 'center',
                    }}>
                    <View>
                      <Text
                        style={{
                          color: Colors.black,
                          fontWeight: FontWeights.semiBold,
                          fontSize: FontSizes.tinymedium,
                          marginBottom: 3,
                        }}>
                        {historyItem.booking_date}{' '}
                        <Text
                          style={{
                            color: Colors.darkgrey,
                            fontWeight: '900',
                            fontSize: 20,
                          }}>
                          |
                        </Text>{' '}
                        {historyItem.booking_time}
                      </Text>
                    </View>

                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text
                        style={{
                          color: 'black',
                          marginRight: 10,
                          fontFamily: 'Roboto-Medium',
                        }}>
                        {historyItem.last_status === 'Cancelled'
                          ? 'Cancelled'
                          : 'Completed'}
                      </Text>

                      <View
                        style={{
                          backgroundColor:
                            historyItem.last_status == 'Cancelled'
                              ? Colors.red
                              : Colors.check,
                          borderRadius: 30,
                          ...Paddings.p.p5,
                        }}>
                        <MaterialCommunityIcons
                          name={
                            historyItem.last_status === 'Cancelled'
                              ? 'close-circle'
                              : 'check-circle'
                          }
                          color={Colors.white}
                          style={{fontWeight: 'bold'}}
                          size={15}
                        />
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      ...Margins.mh.mh10,
                      ...Margins.mt.mt10,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <View>
                      <Text
                        style={{
                          color: Colors.black,
                          fontFamily: 'Roboto-Medium',
                        }}>
                        Booking ID {historyItem.booking_number}
                      </Text>
                    </View>

                    {historyItem.invoice_link_view_flag == 1 ? (
                      <View style={{flexDirection: 'column'}}>
                        <TouchableOpacity
                          onPress={() =>
                            console.log('Invoice Downloaded.....')
                          }>
                          <Icon
                            name="download"
                            color={Colors.primary}
                            style={{fontWeight: 'bold', alignSelf: 'center'}}
                            size={20}
                          />
                        </TouchableOpacity>
                        <Text
                          style={{
                            color: Colors.primary,
                            fontFamily: 'Roboto-Medium',
                          }}>
                          Invoice
                        </Text>
                      </View>
                    ) : null}
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      ...Margins.mt.mt20,
                      ...Margins.mh.mh10,
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: Colors.black,
                        fontSize: FontSizes.xlarge,
                        fontWeight: FontWeights.extraBold,
                        fontFamily: 'Roboto-Medium',
                      }}>
                      ₹ {historyItem.budget}
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        color: Colors.black,
                        ...Margins.mt.mt5,
                        ...Margins.mh.mh10,
                        fontFamily: 'Roboto-Medium',
                      }}>
                      Package - {historyItem.package_detail}
                    </Text>
                  </View>
                  <View>
                    {historyItem.driver_data.driver_name ? (
                      <Text
                        style={{
                          color: Colors.black,
                          ...Margins.mt.mt5,
                          ...Margins.mh.mh10,
                          fontWeight: 'bold',
                        }}>
                        {historyItem.driver_data.driver_name} assigned{' '}
                        <Text style={{color: 'black', fontWeight: '500'}}>
                          as your Driver Partner
                        </Text>
                      </Text>
                    ) : null}
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      ...Margins.mh.mh10,
                    }}>
                    <View style={styles.verifyButtonContainer}>
                      <DropShadow style={styles.shadowStyle}>
                        {/* <TouchableOpacity
                          onPress={() =>handleBookAgain(111111)}
                          style={styles.verifyButton}>
                          <Text
                            style={{
                              color: Colors.orange,
                              fontWeight: FontWeights.medium,
                            }}>
                            Book Again
                          </Text>
                        </TouchableOpacity> */}

                        <TouchableOpacity
                          onPress={() =>
                            handleBookAgain(historyItem.driver_data.id)
                          }
                          style={styles.verifyButton}>
                          <Text
                            style={{
                              color: Colors.orange,
                              fontWeight: FontWeights.medium,
                              fontFamily: 'Roboto-Medium',
                            }}>
                            Book Again
                          </Text>
                        </TouchableOpacity>
                      </DropShadow>
                    </View>
                    <View style={styles.verifyButtonContainer}>
                      <DropShadow style={styles.shadowStyle}>
                        {historyItem &&
                        historyItem.booking_rating.rate === null ? (
                          <>
                            {historyItem.rate_your_experience_view_flag ===
                            1 ? (
                              <TouchableOpacity
                                onPress={() =>
                                  navigation.navigate('rateYourExperience', {
                                    bookingId: historyItem?.booking_number,
                                  })
                                }
                                // console.log('press Experience')}
                                style={styles.verifyButtons}>
                                <Text
                                  style={{
                                    color: Colors.primary,
                                    ...Margins.ml.ml4,
                                    fontWeight: FontWeights.medium,
                                    fontFamily: 'Roboto-Medium',
                                  }}>
                                  Rate Experience
                                </Text>
                              </TouchableOpacity>
                            ) : (
                              <TouchableOpacity
                                // onPress={() => console.log('press Help')}
                                onPress={() => navigation.navigate('Middle')}
                                style={styles.verifyButtons}>
                                <Text
                                  style={{
                                    color: Colors.primary,
                                    ...Margins.ml.ml4,
                                    fontWeight: FontWeights.medium,
                                    fontFamily: 'Roboto-Medium',
                                  }}>
                                  HELP ?
                                </Text>
                              </TouchableOpacity>
                            )}
                          </>
                        ) : (
                          <TouchableOpacity
                            onPress={() => console.log('press Rating')}
                            style={styles.verifyButtons}>
                            <MaterialIcons
                              name="star"
                              size={16}
                              color={Colors.primary}
                            />
                            <Text
                              style={{
                                color: Colors.primary,
                                ...Margins.ml.ml4,
                                fontFamily: 'Roboto-Medium',

                                fontWeight: FontWeights.medium,
                              }}>
                              {historyItem.booking_rating.rate ||
                              historyItem.booking_rating.rate_type
                                ? `${historyItem.booking_rating.rate} | ${historyItem.booking_rating.rate_type}`
                                : ''}
                            </Text>
                          </TouchableOpacity>
                        )}
                      </DropShadow>
                    </View>
                  </View>
                </View>
              ))
            : null}

          {loadMoreButtonShow == 1 ? (
            <DropShadow style={styles.shadowStyle}>
              <TouchableOpacity
                onPress={loadMore}
                style={[styles.verifyButton, {marginBottom: 20}]}>
                <Text
                  style={{
                    color: Colors.primary,
                    fontWeight: FontWeights.medium,
                    fontFamily: 'Roboto-Medium',
                  }}>
                  Load More
                </Text>
              </TouchableOpacity>
            </DropShadow>
          ) : null}
        </ScrollView>
      );
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <OTTHeader navigation={navigation} title={'trusted & trained driver'} />
      <Modal
        isVisible={isModalVisibleFeedback}
        onBackdropPress={closeModalFeedback}
        style={styles.modal}>
        <View style={styles.modalContentBooking}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <TouchableOpacity
              onPress={closeModalFeedback}
              style={styles.closeButton}>
              <Ionicons name="close" color={Colors.white} size={24} />
            </TouchableOpacity>
            <View style={{backgroundColor: Colors.secondary, borderRadius: 10}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  ...Margins.m.m20,
                }}>
                <TextInput
                  style={styles.input}
                  onChangeText={remarks => setRemarks(remarks)}
                  value={remarks}
                  placeholder="Type your feedback here..."
                  keyboardType="text"
                  placeholderTextColor={Colors.black}
                  numberOfLines={3}
                  multiline={true}
                />
                <TouchableOpacity
                  onPress={() => needHelp()}
                  style={{
                    backgroundColor: Colors.white,
                    borderRadius: 30,
                    ...Paddings.p.p10,
                    ...Margins.mt.mt20,
                    ...Margins.mh.mh5,
                  }}>
                  <Feather name="send" size={20} color={Colors.primary} />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
      <Modal
        isVisible={isModalVisibleBooking}
        onBackdropPress={closeModalBooking}
        style={styles.modal}>
        <View style={styles.modalContent}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={{backgroundColor: Colors.secondary}}>
              <View
                style={{
                  backgroundColor: Colors.primary,
                  ...Paddings.p.p10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  ...Margins.mt.mt20,
                  alignItems: 'center',
                  borderRadius: 5,
                }}>
                <Text style={{color: Colors.white, fontSize: FontSizes.body}}>
                  BOOKING STATUS
                </Text>
                <TouchableOpacity
                  onPress={closeModalBooking}
                  style={{backgroundColor: Colors.white, borderRadius: 20}}>
                  <Ionicons name="close" color={Colors.black} size={28} />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: Colors.black,
                  borderRadius: 5,
                  ...Margins.mt.mt10,
                }}>
                <View style={{...Margins.mh.mh10, marginVertical: 10}}>
                  {trackdata && trackdata.length > 0
                    ? trackdata.map((item, index) => (
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginVertical: 10,
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              color: Colors.black,
                              fontSize: FontSizes.tinymedium,
                              fontWeight: FontWeights.semiBold,
                            }}>
                            {item.heading}
                          </Text>
                          <Text
                            style={{
                              color: Colors.black,
                              fontSize: FontSizes.tinymedium,
                              fontWeight: FontWeights.semiBold,
                            }}>
                            {item.assign_time}
                          </Text>
                        </View>
                      ))
                    : null}
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={closeModal}
        style={styles.modal}>
        <View style={styles.modalContent}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.title}>Cancel Booking?</Text>
            </View>
            <View style={styles.radioContainer}>
              <View style={styles.firstRadioContainer}>
                <Text style={styles.radioText}>Change in plan</Text>
                <TouchableOpacity
                  style={styles.radioButton}
                  onPress={() => setSelectedOption('changeplan')}>
                  <View style={styles.radioCircle}>
                    {selectedOption === 'changeplan' && (
                      <View style={styles.selectedRb} />
                    )}
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.firstRadioContainer}>
                <Text style={styles.radioText}>Driver trusted to cancel</Text>
                <TouchableOpacity
                  style={styles.radioButton}
                  onPress={() => setSelectedOption('driverrequstedcancel')}>
                  <View style={styles.radioCircle}>
                    {selectedOption === 'driverrequstedcancel' && (
                      <View style={styles.selectedRb} />
                    )}
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.firstRadioContainer}>
                <Text style={styles.radioText}>Driver is unreachable</Text>
                <TouchableOpacity
                  style={styles.radioButton}
                  onPress={() => setSelectedOption('driverunrechable')}>
                  <View style={styles.radioCircle}>
                    {selectedOption === 'driverunrechable' && (
                      <View style={styles.selectedRb} />
                    )}
                  </View>
                </TouchableOpacity>
              </View>
              <Divider
                width={1}
                color={Colors.white}
                style={{...Margins.mt.mt10}}
              />
              <Input
                placeholder="Tell us your suggestion..."
                style={{marginTop: 30, fontSize: FontSizes.tinymedium}}
              />
              <View style={{marginHorizontal: 30}}>
                <Text style={{color: Colors.black}}>
                  Your words makes tat d a better
                </Text>
                <Text style={{color: Colors.black}}>
                  place. You are the influence
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                marginTop: 15,
              }}>
              <TouchableOpacity onPress={closeModal} style={styles.noButton}>
                <Text style={styles.noTextButton}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={fetchcancelBooking}
                style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            activePage === 'Current' && styles.activeButton,
          ]}
          onPress={() => setActivePage('Current')}>
          <Text style={styles.buttonText}>Current</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            activePage === 'History' && styles.activeButton,
          ]}
          onPress={() => setActivePage('History')}>
          <Text style={styles.buttonText}>History</Text>
        </TouchableOpacity>
      </View>
      {renderContent()}
    </View>
  );
};

export default TrackScreen;

const styles = StyleSheet.create({
  verifyButtonContainer: {
    justifyContent: 'space-between',
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
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    alignItems: 'center',
    ...Paddings.p.p11,
    borderRadius: 5,
    ...Margins.mh.mh30,
    borderColor: Colors.orange,
    borderWidth: 1,
  },
  verifyButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    alignItems: 'center',
    ...Paddings.p.p11,
    borderRadius: 5,
    ...Margins.mh.mh30,
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  ratingButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    alignItems: 'center',
    ...Paddings.p.p11,
    borderRadius: 5,
    paddingHorizontal: 15,
    borderColor: Colors.black,
    borderWidth: 1,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  buttonContainer: {
    ...Margins.mh.mh15,
    ...Paddings.p.p10,
    backgroundColor: '#edecf1',
    flexDirection: 'row',
    borderRadius: 3,
    ...Margins.mt.mt10,
  },
  button: {
    ...Paddings.ph.ph60,
    borderRadius: 3,
    ...Paddings.p.p7,
  },
  activeButton: {
    backgroundColor: Colors.white,
    ...Paddings.ph.ph50,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.black,
  },
  pageContainer: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  pageText: {
    fontSize: FontSizes.xxlarge,
    color: Colors.black,
  },
  modalContentBooking: {
    backgroundColor: Colors.lightblue,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Paddings.pb.pb20,
    ...Paddings.ph.ph20,
  },
  pageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  input: {
    borderRadius: 5,
    ...Margins.mv.mv30,
    color: Colors.black,
    ...Paddings.p.p10,
    backgroundColor: Colors.white,
    width: '85%',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 15,
  },
  cardButton: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 10,
    width: '46%',
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 12,
    borderColor: Colors.darkgrey,
    borderWidth: 1,
  },
  cardButtons: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    alignItems: 'center',
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 12,
    borderColor: Colors.darkgrey,
    borderWidth: 1,
  },
  openButton: {
    backgroundColor: Colors.lightblue,
    ...Paddings.p.p10,
    alignItems: 'center',
    ...Margins.m.m20,
    borderRadius: 5,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: Colors.secondary,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Paddings.pb.pb20,
    ...Paddings.ph.ph20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    ...Margins.mt.mt10,
    ...Margins.mb.mb20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.white,
    padding: 5,
  },
  scrollViewContent: {},
  card: {
    backgroundColor: Colors.white,
    borderRadius: 5,
    ...Paddings.p.p20,
    ...Margins.mb.mb20,
  },
  text: {
    color: Colors.black,
    fontSize: FontSizes.tiny,
    ...Margins.mb.mb5,
  },
  infoList: {
    ...Margins.mv.mv20,
  },
  listItem: {
    color: Colors.black,
    fontSize: FontSizes.tiny,
    ...Margins.mb.mb5,
  },
  title: {
    color: Colors.black,
    fontSize: FontSizes.xlarge,
    fontWeight: FontWeights.bold,
    ...Margins.mt.mt20,
  },
  noTextButton: {
    color: Colors.black,
    fontSize: FontSizes.tinymedium,
  },
  cancelButtonText: {
    color: Colors.white,
    fontSize: FontSizes.tinymedium,
  },
  cancelButton: {
    backgroundColor: Colors.primary,
    ...Paddings.p.p10,
    width: '25%',
    borderRadius: 5,
    alignItems: 'center',
  },
  noButton: {
    backgroundColor: Colors.white,
    ...Paddings.p.p10,
    width: '25%',
    borderRadius: 5,
    alignItems: 'center',
  },
  selectedRb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2c9dd1',
  },
  radioContainer: {
    justifyContent: 'space-between',
    ...Margins.mh.mh15,
    ...Margins.mt.mt25,
  },
  firstRadioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...Margins.mv.mv12,
    alignItems: 'center',
  },
  secondRadioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#2c9dd1',
    alignItems: 'center',
    justifyContent: 'center',
    ...Margins.mr.mr10,
  },
  radioText: {
    fontSize: FontSizes.tinymedium,
    color: '#000',
    fontWeight: FontWeights.medium,
  },
  radioTextCash: {
    fontSize: FontSizes.small,
    color: Colors.darkgrey,
  },
});
