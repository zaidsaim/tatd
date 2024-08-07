

// import React, { useState, useRef, useEffect } from 'react';
// import { View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity,SafeAreaView,TouchableWithoutFeedback } from 'react-native';
// import OTTHeader from '../../components/OTTHeader';
// import { Colors,FontSizes,FontWeights,Paddings,Margins,BorderRadius,BorderWidths } from '../../assets/colors';
// import { Picker } from '@react-native-picker/picker';
// import Ionicons from 'react-native-vector-icons/Ionicons'
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
// import { Button, RadioButton } from 'react-native-paper';
// import { Divider } from '@rneui/base';
// import DropShadow from "react-native-drop-shadow";
// import RBSheet from 'react-native-raw-bottom-sheet';
// import Modal from "react-native-modal";
// import { getCouponApi } from '../../api/services/apiService';
// import moment from 'moment';
// import Icon from 'react-native-vector-icons/MaterialIcons'; 
// import { validateAccessToken,refreshAccessToken ,decodeTokenservice} from '../../utils/validation';
// const OutstationDriverBookingScreen = ({ navigation }) => {
//   const refRBSheet = useRef();
//   const [selectedHour, setSelectedHour] = useState('1');
//   const [buttonNames, setButtonNames] = useState({ standard: 'Standard', luxury: 'Luxury' });
//   const [selectedTime, setSelectedTime] = useState();
//   const [selectedTimeOneway, setSelectedTimeOneway] = useState();
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [selectedOption, setSelectedOption] = useState('Roundtrip');
//   const [isStandardSelected, setIsStandardSelected] = useState(true);
//   const [isLuxurySelected, setIsLuxurySelected] = useState(false);
//   const [name, setName] = useState()

//   const [mobileNumber, setMobileNumber] = useState()
//   const [pickupAddress, setPickupAddress] = useState()
//   const [destination, setDestination] = useState()
//   const [selectedOptions, setSelectedOptions] = useState(null);
//   const [isStandardOptionSelectedoneway, setIsStandardOptionSelectedoneway] = useState(true);
//   const [isLuxuryOptionSelectedoneway, setIsLuxuryOptionSelectedoneway] = useState(false);
//   const [selectedSubOptiononeway, setSelectedSubOptiononeway] = useState('Standard-Auto');
//   const [selectedMainOptiononeway, setSelectedMainOptiononeway] = useState('');
//   const [isStandardOptionSelected, setIsStandardOptionSelected] = useState(true);
//   const [isLuxuryOptionSelected, setIsLuxuryOptionSelected] = useState(false);
//   const [selectedSubOption, setSelectedSubOption] = useState('Standard');
//   const [selectedMainOption, setSelectedMainOption] = useState('');
//   const [coupondata,setCoupondata]=useState()
//   const [selectedDistance, setSelectedDistance] = useState('100');
//   const [modalVisible,setModalVisible]=useState(false)
//   const [initialLoad, setInitialLoad] = useState(true);
//   const [getTime, setGetTime] = useState([])
//   const [viewDetailsModal, setViewDetailsModal] = useState(false)
//   const [modalVisiblecoupon,setModalVisiblecoupon]=useState(false)
//   const [loading,setLoading]=useState(false)
//   const [selectedDate, setSelectedDate] = useState();

//   const [selectedDateReturn, setSelectedDateReturn] = useState();
//   const [modalVisibleToday, setModalVisibleToday]=useState()
//   const [modalVisibleReturn,setModalVisibleReturn]=useState(false)
//   const [selectedDateDepart, setSelectedDateDepart] = useState('');
// const [displayDateDepart, setDisplayDateDepart] = useState('');
// const [modalVisibleDepart, setModalVisibleDepart] = useState(false);
//   const [displayDate,setDisplayDate]=useState()
//  useState()
//   useEffect(()=>{
//     getCoupon()
//     getDecodedToken()
//   },[])
//   const  getCoupon = async () => {
//     setLoading(true);
//     const isValid = await validateAccessToken();
//     if (!isValid) {
//       await refreshAccessToken();
//     }
//     try {
//       const response = await getCouponApi();
//       if (response?.user_coupon_data?.coupon_value > 0) {
//         setModalVisiblecoupon(true);
//       }
//       setCoupondata(response?.user_coupon_data);
//       console.log('Coupon Data roundtrip:',response);
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };
//   const generateDistanceOptions = () => {
//     const distances = [];
//     for (let i = 100; i <= 500; i += 50) {
//       distances.push(i);
//     }
//     for (let i = 600; i <= 1000; i += 100) {
//       distances.push(i);
//     }
//     for (let i = 1200; i <= 2000; i += 200) {
//       distances.push(i);
//     }
//     for (let i = 2200; i <= 2500; i += 300) {
//       distances.push(i);
//     }
//     for (let i = 3000; i <= 5000; i += 500) {
//       distances.push(i);
//     }
//     return distances;
//   };
//   const distances = generateDistanceOptions();

//   const selectStandardOptiononeway = () => {
//     setIsStandardOptionSelectedoneway(true);
//     setIsLuxuryOptionSelectedoneway(false);
//     setSelectedMainOptiononeway('Standard');
//   };
//   const selectLuxuryOptiononeway = () => {
//     setIsStandardOptionSelectedoneway(false);
//     setIsLuxuryOptionSelectedoneway(true);
//     setSelectedMainOptiononeway('Luxury');
//   };
//   const selectSubOptiononeway = (option) => {
//     setSelectedSubOptiononeway(option);
//   };
//   const selectStandardOption = () => {
//     setIsStandardOptionSelected(true);
//     setIsLuxuryOptionSelected(false);
//     setSelectedMainOption('Standard');
//   };
//   const selectLuxuryOption = () => {
//     setIsStandardOptionSelected(false);
//     setIsLuxuryOptionSelected(true);
//     setSelectedMainOption('Luxury');
//   };
//   const selectSubOption = (option) => {
//     setSelectedSubOption(option);
//   };
//   const handleOptionSelects = (option) => {
//     setSelectedOption(option);
//   };
//   const firstHandleSelected = (option) => {
//     setSelectedOptions(option);
//   }
//   console.log('selectedOption====', selectedOption)
//   const toggleModal = () => {
//     setIsModalVisible(!isModalVisible);
//   };
//   const closeModal = () => {
//     setIsModalVisible(false);
//   };
//   const handleOptionSelect = (option) => {
//     setSelectedOption(option);
//   };
//   const handleStandardPress = () => {
//     setIsStandardSelected(true);
//     setIsLuxurySelected(false);
//     setSelectedOption(null);
//   };
//   const handleLuxuryPress = () => {
//     setIsStandardSelected(false);
//     setIsLuxurySelected(true);
//     setSelectedOption(null);
//   };
//   const handleOpenModal = (option) => {
//     setModalContent(option);
//     toggleModal();
//   };
//   console.log('first==============', selectedSubOption)
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

//   const generateTimesOneway = () => {
//     const timesOneway = [];
//     const start = new Date(0, 0, 0, 0, 15);
//     const end = new Date(0, 0, 0, 23, 45);
//     while (start <= end) {
//       const hours = start.getHours();
//       const minutes = start.getMinutes();
//       const period = hours >= 12 ? 'PM' : 'AM';
//       const adjustedHours = hours % 12 || 12;
//       const time = `${adjustedHours}:${minutes < 10 ? '0' : ''}${minutes} ${period}`;
//       timesOneway.push(time);
//       start.setMinutes(start.getMinutes() + 30);
//     }
//     return timesOneway;
//   };

//   const timesOneway = generateTimesOneway();

//   const getFormattedDate = (date) => {
//     const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//     const monthNames = [
//       "January", "February", "March", "April", "May", "June",
//       "July", "August", "September", "October", "November", "December"
//     ];
    
//     const dayName = dayNames[date.getDay()];
//     const day = date.getDate();
//     const month = monthNames[date.getMonth()];
    
//     return `${dayName}, ${day} ${month}`;
//   };
//   //second
//   const getFormattedDateDepart = (date) => {
//     const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//     const monthNames = [
//       "January", "February", "March", "April", "May", "June",
//       "July", "August", "September", "October", "November", "December"
//     ];
    
//     const dayName = dayNames[date.getDay()];
//     const day = date.getDate();
//     const month = monthNames[date.getMonth()];
    
//     return `${dayName}, ${day} ${month}`;
//   };
//   //third
//   const getFormattedDateReturn = (date) => {
//     const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//     const monthNames = [
//       "January", "February", "March", "April", "May", "June",
//       "July", "August", "September", "October", "November", "December"
//     ];
    
//     const dayName = dayNames[date.getDay()];
//     const day = date.getDate();
//     const month = monthNames[date.getMonth()];
    
//     return `${dayName}, ${day} ${month}`;
//   };
  
//   const generateDates = () => {
//     const dates = [];
//     const today = new Date();
//     const dayAfterTomorrow = new Date(today);
//     dayAfterTomorrow.setDate(today.getDate() + 2); // Start from the day after tomorrow
//     const oneMonthLater = new Date(today);
//     oneMonthLater.setMonth(today.getMonth() + 1);
  
//     for (let date = new Date(dayAfterTomorrow); date <= oneMonthLater; date.setDate(date.getDate() + 1)) {
//       dates.push(moment(date).format('ddd, DD MMM'));
//     }
  
//     return dates;
//   };

//   const handleValueChanges = (newValue) => {
//     if (newValue === 'today') {
//       setSelectedDate(moment().format('YYYY-MM-DD'));
//       setDisplayDate('Today');
//     } else if (newValue === 'tomorrow') {
//       setSelectedDate(moment().add(1, 'days').format('YYYY-MM-DD'));
//       setDisplayDate('Tomorrow');
//     } else {
//       setSelectedDate(newValue);
//       setDisplayDate(newValue);
//     }
//   };
 
//   const dates = generateDates();

// //


// const handleValueChangesDepart = (newValue) => {
//   if (newValue === 'Today') {
//     setSelectedDateDepart(moment().format('YYYY-MM-DD'));
//     setDisplayDateDepart('Today');
//   } else if (newValue === 'Tomorrow') {
//     setSelectedDateDepart(moment().add(1, 'days').format('YYYY-MM-DD'));
//     setDisplayDateDepart('Tomorrow');
//   } else {
//     setSelectedDateDepart(newValue);
//     setDisplayDateDepart(newValue);
//   }
// };

// const generateDatesDepart = () => {
//   const dates = [];
//   const today = new Date();
//   const dayAfterTomorrow = new Date(today);
//   dayAfterTomorrow.setDate(today.getDate() + 2); // Start from the day after tomorrow
//   const oneMonthLater = new Date(today);
//   oneMonthLater.setMonth(today.getMonth() + 1);

//   for (let date = new Date(dayAfterTomorrow); date <= oneMonthLater; date.setDate(date.getDate() + 1)) {
//     dates.push(moment(date).format('ddd, DD MMM'));
//   }

//   return dates;
// };
// const datesdepart = generateDatesDepart();

// //
// const getDecodedToken = async () => {
//   try {
//     const decoded = await decodeTokenservice();
//     if (decoded) {
//       setDecodedToken(decoded);
//       setMobileNumber(decoded?.data?.mobile_number || '');
//     }
//   } catch (error) {
//     console.error('Error getting decoded token:', error);
//   }
// };
//   return (
//     <ScrollView style={{ flex: 1 }}>
//       <OTTHeader navigation={navigation} title={'trusted & trained driver'} />
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisiblecoupon}
//         onRequestClose={() => {
//           setModalVisiblecoupon(!modalVisiblecoupon);
//         }}
//       >
//         <View style={styles.modalView}>
//           <View
//             style={{ alignItems: 'center', justifyContent: 'center' }}
//           >
//             <Text style={{ color: Colors.primary, ...Paddings.p.p10, fontSize: FontSizes.medium, ...FontWeights.bold }}>Congradulations!</Text>
//             <Text style={{ color: Colors.darkgrey ,fontSize:FontSizes.small}}>₹{coupondata?.coupon_value} Coupon Code Applied Sucessfully Have a</Text>
//             <Text style={{ color: Colors.darkgrey,fontSize:FontSizes.small, ...Margins.mv.mv5}}>greate day!</Text>
//             <TouchableOpacity style={{
//               backgroundColor: Colors.secondary, justifyContent: 'center', alignItems: 'center',
//               ...Margins.mv.mv10, ...BorderRadius.br5, ...Paddings.p.p10, ...Paddings.ph.ph30
//             }} onPress={() => {
//               setModalVisiblecoupon(!modalVisiblecoupon);
//             }}>
//               <Text style={{ color: Colors.black }}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={viewDetailsModal}
//         onRequestClose={() => {
//           setViewDetailsModal(!viewDetailsModal);
//           // setModalVisiblecoupon(!modalVisiblecoupon);
//         }}>
//         <SafeAreaView style={{flex: 1}}>
//           <TouchableWithoutFeedback onPress={() => setViewDetailsModal(false)}>
//             <View style={{alignItems: 'center', backgroundColor: 'white'}}>
//               <View
//                 style={{
//                   paddingHorizontal: 20,
//                 }}>
//                 <Text
//                   style={{
//                     fontSize: 16,
//                     fontWeight: 'bold',
//                     marginBottom: 1,
//                     color: 'black',
//                     fontFamily: 'Roboto-Medium',
//                   }}>
//                   Pricing
//                 </Text>

//                 <View style={{}}>
//                   <View style={{flexDirection: 'row'}}>
//                     <Ionicons name="chevron-forward" size={17} color="black" />
//                     <Text
//                       style={{
//                         fontSize: FontSizes.xsmall,
//                         marginBottom: 8,
//                         color: 'black',
//                         fontFamily: 'Roboto-Medium',
//                       }}>
//                       Prices shown are GST Inclusive & KM's basis.
//                     </Text>
//                   </View>
//                   <View style={{flexDirection: 'row'}}>
//                     <Ionicons name="chevron-forward" size={17} color="black" />
//                     <Text
//                       style={{
//                         fontSize: FontSizes.xsmall,
//                         marginBottom: 8,
//                         color: 'black',
//                         fontFamily: 'Roboto-Medium',
//                       }}>
//                       Extra KM Charges- Rs 8 Per KM (Applied incase Running KM's
//                       exceed Package KM's)
//                     </Text>
//                   </View>
//                   <View style={{flexDirection: 'row'}}>
//                     <Ionicons name="chevron-forward" size={17} color="black" />
//                     <Text
//                       style={{
//                         fontSize: FontSizes.xsmall,
//                         marginBottom: 8,
//                         color: 'black',
//                         fontFamily: 'Roboto-Medium',
//                       }}>
//                       Delay Charges- Rs 2 Per Minute (Applied Incase of delay in
//                       start or during Halt Time) Exceptions- 10 Minutes
//                     </Text>
//                   </View>

//                   <View style={{flexDirection: 'row'}}>
//                     <Ionicons name="chevron-forward" size={17} color="black" />
//                     <Text
//                       style={{
//                         fontSize: FontSizes.tinymedium,
//                         marginBottom: 8,
//                         color: 'black',
//                         fontFamily: 'Roboto-Medium',
//                       }}>
//                       Rs 200 Night travel charges (NTA) to be applied in case
//                       you travel in between 10:00 PM To 06:00 AM
//                     </Text>
//                   </View>

//                   <View style={{flexDirection: 'row'}}>
//                     <Ionicons name="chevron-forward" size={17} color="black" />
//                     <Text
//                       style={{
//                         fontSize: FontSizes.xsmall,
//                         marginBottom: 8,
//                         color: 'black',
//                         fontFamily: 'Roboto-Medium',
//                       }}>
//                       Driver return charges are included in package, Do not pay
//                       return charges to driver{' '}
//                     </Text>
//                   </View>
//                 </View>

//                 <Text
//                   style={{
//                     fontSize: 16,
//                     fontWeight: 'bold',
//                     marginBottom: 1,
//                     color: 'black',
//                     fontFamily: 'Roboto-Medium',
//                   }}>
//                   Things To Know
//                 </Text>

//                 <View>
//                   <View style={{flexDirection: 'row'}}>
//                     <Ionicons name="chevron-forward" size={17} color="black" />
//                     <Text
//                       style={{
//                         fontSize: FontSizes.xsmall,
//                         marginBottom: 8,
//                         color: 'black',
//                         fontFamily: 'Roboto-Medium',
//                       }}>
//                       Nearby driver in 30 Mins at your doorstep
//                     </Text>
//                   </View>
//                   <View style={{flexDirection: 'row'}}>
//                     <Ionicons name="chevron-forward" size={17} color="black" />
//                     <Text
//                       style={{
//                         fontSize: FontSizes.xsmall,
//                         marginBottom: 8,
//                         color: 'black',
//                         fontFamily: 'Roboto-Medium',
//                       }}>
//                       Experienced Driver
//                     </Text>
//                   </View>

//                   <View style={{flexDirection: 'row'}}>
//                     <Ionicons name="chevron-forward" size={17} color="black" />
//                     <Text
//                       style={{
//                         fontSize: FontSizes.xsmall,
//                         marginBottom: 8,
//                         color: 'black',
//                         fontFamily: 'Roboto-Medium',
//                       }}>
//                       Pay at the end of trip
//                     </Text>
//                   </View>
//                 </View>

//                 <View
//                   style={{
//                     borderBottomWidth: 0.3,
//                     borderBottomColor: 'black',
//                   }}
//                 />
//                 <TouchableOpacity
//                   onPress={() => setViewDetailsModal(false)}
//                   style={{
//                     backgroundColor: 'white',
//                     paddingHorizontal: 15,
//                     paddingVertical: 8,
//                     borderRadius: 5,
//                     alignSelf: 'center',
//                     borderColor: 'black',
//                     borderWidth: 0.5,
//                     marginVertical:8
//                   }}>
//                   <Text
//                     style={{
//                       fontSize: 14,
//                       color: 'black',
//                       fontFamily: 'Roboto-Medium',
//                     }}>
//                     Close
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </TouchableWithoutFeedback>
//         </SafeAreaView>
//       </Modal>
//       <View style={{ flex: 1, ...Margins.mt.mt20 }}>
//         <View style={styles.RoundTripView}>
//           <TouchableOpacity
//             onPress={() => handleOptionSelect('Roundtrip')}
//             style={[
//               styles.optionContainer,
//               {
//                 backgroundColor: selectedOption === 'Roundtrip' ? Colors.primary : Colors.white,
//                 borderWidth: selectedOption !== 'Roundtrip' ? 1 : 0,
//                 borderColor: selectedOption !== 'Roundtrip' ? Colors.primary : Colors.white,
//                 borderRadius: 3,
//               }
//             ]}
//           >
//             <View style={styles.roudtripcontainer}>
//               <Text style={[

//                 { color: selectedOption === 'Roundtrip' ? Colors.primary : Colors.primary, position: 'absolute', }
//               ]}>
//                 Round Trip
//               </Text>
//               <View style={{ left: 50 }}>
//                 <Image
//                   source={require('../../assets/images/rt_icon.png')}
//                   resizeMode={'cover'}
//                   style={{ width: 22, height: 22, borderLeftWidth: 1, borderLeftColor: Colors.white }}
//                 />
//               </View>
//             </View>
//             <View style={styles.overlayIconContainer}>
//               <Image
//                 source={
//                   selectedOption === 'Roundtrip'
//                     ? require('../../assets/images/white-circlebg_bg.png')
//                     : require('../../assets/images/blue-circlebg_bg.png')
//                 }
//                 style={{ height: '56.5%', width: 53.9,...Margins.mb.mb8, ...Margins.mh.mh5 }}
//               />
//             </View>
//           </TouchableOpacity>
//           {/* Option 2 */}
//           <TouchableOpacity
//             onPress={() => handleOptionSelect('Onewaytrip')}
//             style={[
//               styles.optionContainer,
//               {
//                 backgroundColor: selectedOption === 'Onewaytrip' ? Colors.primary : Colors.white,
//                 borderWidth: selectedOption !== 'Onewaytrip' ? 1 : 0,
//                 borderColor: selectedOption !== 'Onewaytrip' ? Colors.primary : Colors.white,
//                 borderRadius: 3
//               }
//             ]}
//           >
//             <View style={styles.imageContainer}>
//               <View style={{ left: 57 }}>
//                 <Image
//                   source={require('../../assets/images/rt_icon.png')}
//                   resizeMode={'cover'}
//                   style={{ width: 22, height: 22 }}
//                 />
//               </View>
//               <Text style={[
//                 styles.overlayText,
//                 { color: selectedOption === 'Onewaytrip' ? Colors.primary : Colors.primary, position: 'absolute' }
//               ]}>
//                 One WayTrip
//               </Text>
//             </View>
//             <View style={styles.overlayIconContainer}>
//               <Image
//                 source={
//                   selectedOption === 'Onewaytrip'
//                     ? require('../../assets/images/arrow_fade_blue.png')
//                     : require('../../assets/images/arrow-right-tatd.png')
//                 }
//                 style={{ height: '50%', width: 50, ...Margins.mb.mb10 }}
//               />
//             </View>
//           </TouchableOpacity>
//         </View>
//         {
//           selectedOption === 'Onewaytrip' ? <Text style={{ color: Colors.icon, fontSize: FontSizes.xbody, ...Paddings.p.p10, ...Margins.mh.mh30, ...Margins.mt.mt20, fontWeight: FontWeights.regular }}>PLAN YOUR JOURNEY</Text>
//             : <Text style={{ color: Colors.icon, fontSize: FontSizes.xbody, ...Paddings.p.p10, ...Margins.mh.mh30, fontWeight: FontWeights.regular, ...Margins.mt.mt20 }}>PLAN YOUR JOURNEY</Text>
//         }
//       </View>

//       {
//         selectedOption === 'Roundtrip' ?
//           <View style={{ flex: 1 }}>
//             <View>
//             {/* <View style={styles.mainContainer}>
//                 <View style={styles.labelContainer}>
//                   <View style={styles.dot} />
//                   <Text style={styles.labelText}>Depart By</Text>
//                 </View>
//                 <View style={styles.containerSelectHour}>
//                  <View style={{}}>
//                   <TouchableOpacity
//             onPress={() => setModalVisibleReturn(true)}
//             style={styles.pickerContainer}
//           >

//             <Text style={{ color: Colors.white, fontSize: FontSizes.small }}>
//               {displayDateDepart || 'Date'}
//             </Text>
//             <Icon name="arrow-drop-down" size={20} color={Colors.white}/>
//           </TouchableOpacity>
//           </View> 
//           <Modal
//             transparent={true}
//             visible={modalVisibleDepart}
//             onRequestClose={() => setModalVisibleDepart(false)}
//           >
//             <View style={styles.modalOverlay}>
//               <View style={styles.modalContainer}>
//                 <ScrollView>
//                   <RadioButton.Group
//                     onValueChange={(newValue) => {
//                       handleValueChangesDepart(newValue);
//                       setModalVisibleDepart(false);
//                     }}
//                     value={selectedDateDepart}
//                   >
//                     <RadioButton.Item 
//                       label="Today" 
//                       value="Today" 
//                       labelStyle={{ color: Colors.black, fontSize: FontSizes.body }} 
//                       style={{ backgroundColor: 'white' }} 
//                     />
//                     <RadioButton.Item 
//                       label="Tomorrow" 
//                       value="Tomorrow" 
//                       labelStyle={{ color: Colors.black, fontSize: FontSizes.body }} 
//                       style={{ backgroundColor: 'white' }}
//                     />
//                     {Array.isArray(datesdepart) && datesdepart.map((date, index) => (
//                       <RadioButton.Item 
//                         key={index} 
//                         label={date} 
//                         value={date} 
//                         labelStyle={{ color: Colors.black, fontSize: FontSizes.body }} 
//                         style={{ backgroundColor: 'white' }}
//                       />
//                     ))}
//                   </RadioButton.Group>
//                 </ScrollView>
//               </View>
//             </View>
//           </Modal>
//                   </View>
               
//               </View> */}
    
//         <View style={styles.mainContainer}>
//           <View style={styles.labelContainer}>
//             <View style={styles.dot} />
//             <Text style={styles.labelText}>Depart By</Text>
//           </View>
//           <View style={styles.containerSelectHour}>
//             <View>
//               <TouchableOpacity
//                 onPress={() => setModalVisibleDepart(true)}
//                 style={styles.pickerContainer}
//               >
//                 <Text style={{ color: Colors.white, fontSize: FontSizes.small ,marginHorizontal:5}}>
//                   {displayDateDepart || 'Todays'}
//                 </Text>
//                 <Icon name="arrow-drop-down" size={20} color={Colors.white} style={{marginHorizontal:2}}/>
//               </TouchableOpacity>
//             </View>
//             <Modal
//               transparent={true}
//               visible={modalVisibleDepart}
//               onRequestClose={() => setModalVisibleDepart(false)}
//             >
//               <View style={styles.modalOverlay}>
//                 <View style={styles.modalContainer}>
//                   <ScrollView>
//                     <RadioButton.Group
//                       onValueChange={(newValue) => {
//                         handleValueChangesDepart(newValue);
//                         setModalVisibleDepart(false);
//                       }}
//                       value={selectedDateDepart}
//                     >
//                       <RadioButton.Item
//                         label="Today"
//                         value="Today"
//                         labelStyle={{ color: Colors.black, fontSize: FontSizes.body }}
//                         style={{ backgroundColor: 'white' }}
//                       />
//                       <RadioButton.Item
//                         label="Tomorrow"
//                         value="Tomorrow"
//                         labelStyle={{ color: Colors.black, fontSize: FontSizes.body }}
//                         style={{ backgroundColor: 'white' }}
//                       />
//                       {Array.isArray(datesdepart) && datesdepart.map((date, index) => (
//                         <RadioButton.Item
//                           key={index}
//                           label={date}
//                           value={date}
//                           labelStyle={{ color: Colors.black, fontSize: FontSizes.body }}
//                           style={{ backgroundColor: 'white' }}
//                         />
//                       ))}
//                     </RadioButton.Group>
//                   </ScrollView>
//                 </View>
//               </View>
//             </Modal>
//           </View>
//         </View>
    
//               {/* <View style={styles.mainContainer}>
//                 <View style={styles.labelContainer}>
//                   <View style={styles.dot} />
//                   <Text style={styles.labelText}>Depart By</Text>
//                 </View>
//                 <View style={styles.containerSelectHour}>
//                   <View style={styles.pickerContainer}>
//                   <Picker
//                         selectedValue={selectedDateDepart}
//                         onValueChange={(itemValue) => setSelectedDateDepart(itemValue)}
//                         style={styles.pickerDateDepart}
//                         dropdownIconColor={Colors.white}
//                         itemStyle={{ color: Colors.white, fontSize:FontSizes.tiny }}
//                       >
//                         <Picker.Item label={'Today'} value={''} style={{ fontSize:FontSizes.small }} />
//                         {dates.map((date, index) => (
//                           <Picker.Item key={index} label={date} value={date} style={{ color: Colors.white, fontSize:FontSizes.tinymedium }} />
//                         ))}
//                       </Picker>
//                   </View>
//                 </View>
//               </View> */}
//               <View style={styles.mainContainer}>
//                 <View style={styles.labelContainer}>
//                   <View style={styles.dotGreen} />
//                   <Text style={styles.labelText}>Return By</Text>
//                 </View>
//                 <View style={styles.containerSelectHour}>
//                  <View style={{}}>
//                   <TouchableOpacity
//             onPress={() => setModalVisibleReturn(true)}
//             style={styles.pickerContainer}
//           >

//             <Text style={{ color: Colors.white, fontSize: FontSizes.small,marginHorizontal:5 }}>
//               {displayDate || 'Date'}
//             </Text>
//             <Icon name="arrow-drop-down" size={20} color={Colors.white} style={{marginHorizontal:2}}/>
//           </TouchableOpacity>
//           </View> 
//           <Modal
//             transparent={true}
//             visible={modalVisibleReturn}
//             onRequestClose={() => setModalVisibleReturn(false)}
//           >
//             <View style={styles.modalOverlay}>
//               <View style={styles.modalContainer}>
//                 <ScrollView>
//                   <RadioButton.Group
//                     onValueChange={(newValue) => {
//                       handleValueChanges(newValue);
//                       setModalVisibleReturn(false);
//                     }}
//                     value={selectedDate}
//                   >
//                     <RadioButton.Item 
//                       label="Today" 
//                       value="Today" 
//                       labelStyle={{ color: Colors.black, fontSize: FontSizes.body }} 
//                       style={{ backgroundColor: 'white' }} 
//                     />
//                     <RadioButton.Item 
//                       label="Tomorrow" 
//                       value="Tomorrow" 
//                       labelStyle={{ color: Colors.black, fontSize: FontSizes.body }} 
//                       style={{ backgroundColor: 'white' }}
//                     />
//                     {Array.isArray(dates) && dates.map((date, index) => (
//                       <RadioButton.Item 
//                         key={index} 
//                         label={date} 
//                         value={date} 
//                         labelStyle={{ color: Colors.black, fontSize: FontSizes.body }} 
//                         style={{ backgroundColor: 'white' }}
//                       />
//                     ))}
//                   </RadioButton.Group>
//                 </ScrollView>
//               </View>
//             </View>
//           </Modal>
//                   </View>
               
//               </View>
//               <View style={{ justifyContent: 'center', alignItems: 'center', ...Margins.mt.mt25 }}>
//                 <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                   <Text style={{ color: Colors.primary, fontSize:FontSizes.large, fontWeight: FontWeights.regular }}>₹400</Text>
//                 </View>
//                 <TouchableOpacity onPress={() => setViewDetailsModal(true)}>
//                   <Text style={{ color: Colors.primary, fontSize:FontSizes.small }}>View Details</Text>
//                 </TouchableOpacity>
//               </View>
//               <View style={{  }}>
//               <View style={{ ...Margins.mv.mv25 }}>
//               <View style={{ flexDirection: 'row', justifyContent: 'space-between', ...Margins.mh.mh15 }}>
//                 <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: Colors.grey, width: '48%' }}>
//                   <View style={{
//                     justifyContent: 'center', ...Paddings.ph.ph10, alignItems: 'center', borderRightWidth: 1, borderRightColor: Colors.grey
//                   }}>
//                     <Ionicons name="person" color={Colors.icon} size={16} style={{ alignItems: 'center' }} />
//                   </View>
//                   <TextInput
//                     style={styles.input}
//                     onChangeText={(name) => setName(name)}
//                     value={name}
//                     placeholder="Name"
//                     keyboardType="text"
//                     placeholderTextColor={Colors.black}
//                   />
//                 </View>
//                 <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: Colors.grey, width: '49%', }}>
//                   <View style={{
//                     justifyContent: 'center', ...Paddings.ph.ph10, alignItems: 'center', borderRightWidth: 1, borderRightColor: Colors.grey
//                   }}>
//                     <Ionicons name="call" color={Colors.icon} size={16} style={{ alignItems: 'center' }} />
//                   </View>
//                   <TextInput
//                    style={styles.input}
//                    value={mobileNumber}
//                    placeholder="Mobile Number"
//                    keyboardType="numeric"
//                    placeholderTextColor={Colors.black}
//                    editable={false}
//                   />
//                 </View>
//               </View>
//               <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: Colors.grey, ...Margins.mh.mh15, ...Margins.mt.mt5}}>
//                   <View style={{
//                     justifyContent: 'center', ...Paddings.ph.ph10, alignItems: 'center', borderRightWidth: 1, borderRightColor: Colors.grey
//                   }}>
//                     <MaterialCommunityIcons name="map-marker" color={Colors.icon} size={16} style={{ alignItems: 'center' }} />
//                   </View>
//                   <TextInput
//                     style={styles.input}
//                     onChangeText={(pickupAddress) => setPickupAddress(pickupAddress)}
//                     value={pickupAddress}
//                     placeholder="Enter Pickup Address"
//                     keyboardType="numeric"
//                     placeholderTextColor={Colors.black}
//                   />
//                 </View>
//               <View style={{ flexDirection: 'row', ...Margins.mt.mt10, ...Margins.mh.mh15, width:'93%'}}>
//                 <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: Colors.grey, width: '50%', height: 40 }}>
//                   <View style={{
//                     justifyContent: 'center', ...Paddings.ph.ph10, alignItems: 'center', borderRightWidth: 1, borderRightColor: Colors.grey
//                   }}>
//                     <MaterialCommunityIcons name="car" color={Colors.icon} size={16} style={{ alignItems: 'center' }} />
//                   </View>
//                   <TouchableOpacity
//                     onPress={() => refRBSheet.current.open()}
//                     style={{
//                       flexDirection: 'row',
//                       justifyContent: 'space-between',
//                       alignItems: 'center',
//                     }}
//                   >
//                     <Text
//                       style={{
//                         color: Colors.black,
//                         ...Margins.mr.mr15,
//                         fontSize:FontSizes.tinymedium,
//                         ...Margins.mh.mh5
//                       }}
//                     >
//                       {selectedSubOptiononeway}
//                     </Text>
//                     <Ionicons
//                       name="caret-down"
//                       color={Colors.black}
//                       size={14}
//                       style={{
//                         position: 'absolute',
//                         right: 0,
//                       }}
//                     />
//                   </TouchableOpacity>
//                 </View>
//                 <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: Colors.grey, ...Margins.mh.mh10,width:'46%'}}>
//                 <View style={{
//                   justifyContent: 'center', ...Paddings.ph.ph10, alignItems: 'center', borderRightWidth: 1, borderRightColor: Colors.grey
//                 }}>
//                   <MaterialCommunityIcons name="clock" color={Colors.icon} size={16}  />
//                 </View>
//                   <View style={{alignItems:'center',justifyContent:'center'}}>
//                     <Picker
//                       selectedValue={selectedTime}
//                       onValueChange={(itemValue) => setSelectedTime(itemValue)}
//                       style={styles.pickerTime}
//                       dropdownIconColor={Colors.black}
//                       itemStyle={{ color: Colors.black, fontSize:FontSizes.tiny }}
//                     >
//                       <Picker.Item label={'Time'} value={''} style={{ fontSize:FontSizes.xsmall }} />
//                       {times.map((time, index) => (
//                         <Picker.Item key={index} label={time} value={time} style={{ color: Colors.white, fontSize:FontSizes.tinymedium }} />
//                       ))}
//                     </Picker>
//                     {selectedTime === '' && (
//                       <Text style={styles.placeholderText}>time</Text>
//                     )}
//                   </View>
//                 </View>
//               </View>
//               <RBSheet
// ref={refRBSheet}
// useNativeDriver={true}
// customStyles={{
//   container: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: 260,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//   },
//   wrapper: {
//     backgroundColor: 'transparent',
//   },
//   draggableIcon: {
//     backgroundColor: '#000',
//   },
// }}
// customModalProps={{
//   animationType: 'slide',
//   statusBarTranslucent: true,
// }}
// customAvoidingViewProps={{
//   enabled: false,
// }}>
// <View style={{...Margins.mh.mh20}}>
//   <View style={{}}>
//     <TouchableOpacity
//       style={{
//         justifyContent: 'flex-end',
//         alignItems: 'flex-end',
//         ...Margins.mb.mb10,
//       }}
//       onPress={() => refRBSheet.current.close()}>
//       <Ionicons
//         name="close-outline"
//         color={Colors.darkgrey}
//         size={24}
//         style={{alignItems: 'center'}}
//       />
//     </TouchableOpacity>
//     <View style={styles.buttonsContainer}>
//       <View style={styles.buttonContainer}>
//         <Button
//           mode="contained"
//           style={[
//             styles.button,
//             styles.confirmButton,
//             isStandardOptionSelected
//               ? styles.activeButton
//               : styles.inactiveButton,
//           ]}
//           onPress={selectStandardOption}
//           labelStyle={
//             isStandardOptionSelected
//               ? styles.activeText
//               : styles.inactiveText
//           }>
//           {buttonNames.standard}
//         </Button>
//         <Button
//           mode="contained"
//           style={[
//             styles.button,
//             styles.confirmButton,
//             isLuxuryOptionSelected
//               ? styles.activeButton
//               : styles.inactiveButton,
//           ]}
//           onPress={selectLuxuryOption}
//           labelStyle={
//             isLuxuryOptionSelected
//               ? styles.activeText
//               : styles.inactiveText
//           }>
//           {buttonNames.luxury}
//         </Button>
//       </View>
//       {isStandardOptionSelected ? (
//         <View
//           style={{
//             ...BorderWidths.bl.bl1,
//             borderLeftColor: Colors.darkgrey,
//             ...BorderWidths.bb.bb1,
//             borderBottomColor: Colors.darkgrey,
//             ...BorderWidths.br.br1,
//             borderRightColor: Colors.darkgrey,
//           }}>
//           <TouchableOpacity
//             value="Standard-Manual"
//             status={
//               selectedSubOption === 'Standard-Manual'
//                 ? 'checked'
//                 : 'unchecked'
//             }
//             onPress={() => {
//               selectSubOption('Standard-Manual'),
//                 refRBSheet.current.close();
//             }}
//             size={5}
//             uncheckedColor={Colors.darkgrey}
//             color={Colors.darkblue}
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               ...Margins.m.m10,
//               alignItems: 'center',
//             }}>
//             <View
//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//               }}>
//               <Image
//                 source={require('../../assets/images/hatchback.png')}
//                 style={{width: 70, height: 30}}
//               />
//               <Text style={styles.radioButtonTextStandard}>
//                 Manual
//               </Text>
//             </View>
//             <RadioButton
//               value="Standard-Manual"
//               status={
//                 selectedSubOption === 'Standard-Manual'
//                   ? 'checked'
//                   : 'unchecked'
//               }
//               onPress={() => {
//                 selectSubOption('Standard-Manual'),
//                   refRBSheet.current.close();
//               }}
//               size={5}
//               uncheckedColor={Colors.darkgrey}
//               color={Colors.darkblue}
//             />
//           </TouchableOpacity>
//           <Divider width={1} />
//           <TouchableOpacity
//             value="Standard-Auto"
//             status={
//               selectedSubOption === 'Standard-Auto'
//                 ? 'checked'
//                 : 'unchecked'
//             }
//             onPress={() => {
//               selectSubOption('Standard-Auto'),
//                 refRBSheet.current.close();
//             }}
//             uncheckedColor={Colors.darkgrey}
//             color={Colors.darkblue}
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               ...Margins.m.m10,
//               alignItems: 'center',
//             }}>
//             <View
//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//               }}>
//               <Image
//                 source={require('../../assets/images/hatchback.png')}
//                 style={{width: 70, height: 30}}
//               />
//               <Text style={styles.radioButtonText}>
//                 Automatic
//               </Text>
//             </View>
//             <RadioButton
//               value="Standard-Auto"
//               status={
//                 selectedSubOption === 'Standard-Auto'
//                   ? 'checked'
//                   : 'unchecked'
//               }
//               onPress={() => {
//                 selectSubOption('Standard-Auto'),
//                   refRBSheet.current.close();
//               }}
//               uncheckedColor={Colors.darkgrey}
//               color={Colors.darkblue}
//             />
//           </TouchableOpacity>
//         </View>
//       ) : (
//         <View
//           style={{
//             ...BorderWidths.bl.bl1,
//             borderLeftColor: Colors.darkgrey,
//             ...BorderWidths.bb.bb1,
//             borderBottomColor: Colors.darkgrey,
//             ...BorderWidths.br.br1,
//             borderRightColor: Colors.darkgrey,
//           }}>
//           <TouchableOpacity
//            value="Luxury-Manual"
//            status={
//              selectedSubOption === 'Luxury-Manual'
//                ? 'checked'
//                : 'unchecked'
//            }
//            onPress={() => {
//              selectSubOption('Luxury-Manual'),
//                refRBSheet.current.close();
//            }}
//            uncheckedColor={Colors.darkgrey}
//            color={Colors.darkblue}

//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               ...Margins.m.m10,
//             }}>
//             <View
//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//               }}>
//               <Image
//                 source={require('../../assets/images/hatchback.png')}
//                 style={{width: 70, height: 30}}
//               />
//               <Text style={styles.radioButtonTextStandard}>
//                 Manual
//               </Text>
//             </View>
//             <RadioButton
//               value="Luxury-Manual"
//               status={
//                 selectedSubOption === 'Luxury-Manual'
//                   ? 'checked'
//                   : 'unchecked'
//               }
//               onPress={() => {
//                 selectSubOption('Luxury-Manual'),
//                   refRBSheet.current.close();
//               }}
//               uncheckedColor={Colors.darkgrey}
//               color={Colors.darkblue}
//             />
//           </TouchableOpacity>
//           <Divider width={1} />
//           <TouchableOpacity
//           value="Luxury-Auto"
//           status={
//             selectedSubOption === 'Luxury-Auto'
//               ? 'checked'
//               : 'unchecked'
//           }
//           onPress={() => {
//             selectSubOption('Luxury-Auto'),
//               refRBSheet.current.close();
//           }}
//           uncheckedColor={Colors.darkgrey}
//           color={Colors.darkblue}
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               ...Margins.m.m10,
//             }}>
//             <View
              
//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//               }}>
//               <Image
//                 source={require('../../assets/images/hatchback.png')}
//                 style={{
//                   width: 70,
//                   height: 30,
//                   justifyContent: 'flex-end',
//                 }}
//               />
//               <Text style={styles.radioButtonText}>
//                 Automatic
//               </Text>
//             </View>
//             <RadioButton
//               value="Luxury-Auto"
//               status={
//                 selectedSubOption === 'Luxury-Auto'
//                   ? 'checked'
//                   : 'unchecked'
//               }
//               onPress={() => {
//                 selectSubOption('Luxury-Auto'),
//                   refRBSheet.current.close();
//               }}
//               uncheckedColor={Colors.darkgrey}
//               color={Colors.darkblue}
//             />
//           </TouchableOpacity>
//         </View>
//       )}
//     </View>
//   </View>
// </View>
// </RBSheet>
//               <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: Colors.grey, ...Margins.mh.mh15, ...Margins.mt.mt11 }}>
//                 <View style={{
//                   justifyContent: 'center', ...Paddings.ph.ph10, alignItems: 'center', borderRightWidth: 1, borderRightColor: Colors.grey
//                 }}>
//                   <MaterialCommunityIcons name="map-marker" color={Colors.icon} size={16} style={{ alignItems: 'center' }} />
//                 </View>
//                 <TextInput
//                   style={styles.input}
//                   onChangeText={(destination) => setDestination(destination)}
//                   value={destination}
//                   placeholder="Enter Destination"
//                   keyboardType="text"
//                   placeholderTextColor={Colors.black}
//                 />
//               </View>
//             </View>
//               </View>
//             </View>
//             <View style={{ justifyContent: 'center', alignItems: 'center', ...Paddings.ph.ph20, }}>
//               <DropShadow style={{
//                 shadowColor: '#171717',
//                 shadowOffset: { width: 2, height: 6 },
//                 shadowOpacity: 0.2,
//                 shadowRadius: 3, elevation: 20,
//               }}>
//                 <TouchableOpacity onPress={() => navigation.navigate('payment')} style={{ justifyContent: 'center', backgroundColor: '#16588e', alignItems: 'center',...Paddings.p.p10, borderRadius: 5, ...Paddings.ph.ph20, width: '80%', }}>
//                   <Text style={{ color: Colors.white, fontSize:FontSizes.tinymedium, ...Paddings.ph.ph20, fontWeight: '700' }}>Book Now</Text>
//                 </TouchableOpacity>
//               </DropShadow>
//             </View>
//           </View>
//           :
//           //second view 
//           <View>
//             <View style={styles.mainContainer}>
//               <View style={styles.labelContainer}>
//                 <View style={styles.dotGreen} />
//                 <Text style={styles.labelText}>Distance</Text>
//               </View>
//               <View style={styles.containerSelectHour}>
//                 <View style={styles.pickerContainer}>
//                 <Picker
//         selectedValue={selectedDistance}
//         onValueChange={(itemValue) => setSelectedDistance(itemValue)}
//         style={styles.picker}
//         dropdownIconColor="white"
//       >
//         {distances.map((distance, index) => (
//           <Picker.Item key={index} label={`${distance} km`} value={`${distance}`} style={{ fontSize:FontSizes.tinymedium }} />
//         ))}
//       </Picker>
//                 </View>
//               </View>
//             </View>
//             <View style={{ justifyContent: 'center', alignItems: 'center', ...Margins.mt.mt25 }}>
//               <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                 <Text style={{ color: Colors.primary, fontSize:FontSizes.large, fontWeight: FontWeights.regular }}>₹400</Text>
//               </View>
//               <TouchableOpacity>
//                 <Text style={{ color: Colors.primary, fontSize:FontSizes.small }}>View Details</Text>
//               </TouchableOpacity>
//             </View>
//             <View style={{ ...Margins.mv.mv30 }}>
//               <View style={{ flexDirection: 'row', justifyContent: 'space-between', ...Margins.mh.mh15 }}>
//                 <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: Colors.grey, width: '48%' }}>
//                   <View style={{
//                     justifyContent: 'center', ...Paddings.ph.ph10, alignItems: 'center', borderRightWidth: 1, borderRightColor: Colors.grey
//                   }}>
//                     <Ionicons name="person" color={Colors.icon} size={16} style={{ alignItems: 'center' }} />
//                   </View>
//                   <TextInput
//                     style={styles.input}
//                     onChangeText={(name) => setName(name)}
//                     value={name}
//                     placeholder="Name"
//                     keyboardType="text"
//                     placeholderTextColor={Colors.black}
//                   />
//                 </View>
//                 <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: Colors.grey, width: '49%', }}>
//                   <View style={{
//                     justifyContent: 'center', ...Paddings.ph.ph10, alignItems: 'center', borderRightWidth: 1, borderRightColor: Colors.grey
//                   }}>
//                     <Ionicons name="call" color={Colors.icon} size={16} style={{ alignItems: 'center' }} />
//                   </View>
//                   <TextInput
//                     style={styles.input}
//                     onChangeText={(mobileNumber) => setMobileNumber(mobileNumber)}
//                     value={mobileNumber}
//                     placeholder="Mobile Number"
//                     keyboardType="numeric"
//                     placeholderTextColor={Colors.black}
//                   />
//                 </View>
//               </View>
//               <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: Colors.grey, ...Margins.mh.mh15, ...Margins.mt.mt11 }}>
//                 <View style={{
//                   justifyContent: 'center', ...Paddings.ph.ph10, alignItems: 'center', borderRightWidth: 1, borderRightColor: Colors.grey
//                 }}>
//                   <MaterialCommunityIcons name="map-marker" color={Colors.icon} size={16} style={{ alignItems: 'center' }} />
//                 </View>
//                 <TextInput
//                   style={styles.input}
//                   onChangeText={(pickupAddress) => setPickupAddress(pickupAddress)}
//                   value={pickupAddress}
//                   placeholder="Enter Pickup Address"
//                   keyboardType="text"
//                   placeholderTextColor={Colors.black}
//                 />
//               </View>
//               <View style={{ flexDirection: 'row', marginTop: 15, ...Margins.mh.mh15, }}>
//                 <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: Colors.grey, width: '60%', height: 40 }}>
//                   <View style={{
//                     justifyContent: 'center', ...Paddings.ph.ph10, alignItems: 'center', borderRightWidth: 1, borderRightColor: Colors.grey
//                   }}>
//                     <MaterialIcons name="calendar-month" color={Colors.icon} size={16} style={{ alignItems: 'center' }} />
//                   </View>
//                   <View style={{ justifyContent: 'center', alignItems: 'center' }}>
//                     <Picker
//                       selectedValue={selectedDate}
//                       onValueChange={(itemValue) => setSelectedDate(itemValue)}
//                       style={styles.pickerDate}
//                       dropdownIconColor={Colors.black}
//                       itemStyle={{ color: Colors.white, fontSize:FontSizes.small }}
//                     >
//                       <Picker.Item label={'Today'} value={''} style={{ fontSize:FontSizes.xsmall }} />
//                       {dates.map((date, index) => (
//                         <Picker.Item key={index} label={date} value={date} style={{ color: Colors.black, fontSize:FontSizes.tinymedium }} />
//                       ))}
//                     </Picker>
//                     {selectedDate === '' && (
//                       <Text style={styles.placeholderText}>Select date</Text>
//                     )}
//                   </View>
//                 </View>
//                 <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: Colors.grey, width: '37%', ...Margins.mh.mh10, alignItems: 'center' }}>
//                   <View>
//                     <Picker
//                       selectedValue={selectedTimeOneway}
//                       onValueChange={(itemValue) => setSelectedTimeOneway(itemValue)}
//                       style={styles.pickerTime}
//                       dropdownIconColor={Colors.black}
//                       itemStyle={{ color: Colors.black, fontSize:FontSizes.tiny }}
//                     >
//                       <Picker.Item label={'Time'} value={''} style={{ fontSize:FontSizes.xsmall }} />
//                       {timesOneway.map((time, index) => (
//                         <Picker.Item key={index} label={time} value={time} style={{ color: Colors.black, fontSize:FontSizes.tinymedium }} />
//                       ))}
//                     </Picker>
//                     {selectedTime === '' && (
//                       <Text style={styles.placeholderText}>time</Text>
//                     )}
//                   </View>
//                 </View>
//               </View>
//               <RBSheet
//                 ref={refRBSheet}
//                 useNativeDriver={true}
//                 customStyles={{
//                   container: {
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     height: 260,
//                     borderTopLeftRadius: 20,
//                     borderTopRightRadius: 20,
//                   },
//                   wrapper: {
//                     backgroundColor: 'transparent',
//                   },
//                   draggableIcon: {
//                     backgroundColor: '#000',
//                   },
//                 }}
//                 customModalProps={{
//                   animationType: 'slide',
//                   statusBarTranslucent: true,
//                 }}
//                 customAvoidingViewProps={{
//                   enabled: false,
//                 }}>
//                 <View style={{ ...Margins.m.m20 }}>
//                   <TouchableOpacity
//                     style={{ justifyContent: 'flex-end', alignItems: 'flex-end',...Margins.mb.mb20}}
//                     onPress={() => refRBSheet.current.close()}
//                   >
//                     <Ionicons name="close-outline" color={Colors.darkgrey} size={24} style={{ alignItems: 'center' }} />
//                   </TouchableOpacity>
//                   <Divider width={1} />
//                   <View style={styles.buttonContainer}>
//                     <Button
//                       mode="contained"
//                       style={[
//                         styles.button,
//                         styles.confirmButton,
//                         isStandardOptionSelectedoneway ? styles.activeButton : styles.inactiveButton,
//                       ]}
//                       onPress={selectStandardOptiononeway}
//                       labelStyle={
//                         isStandardOptionSelectedoneway ? styles.activeText : styles.inactiveText
//                       }
//                     >
//                       Standard
//                     </Button>
//                     <Button
//                       mode="contained"
//                       style={[
//                         styles.button,
//                         styles.confirmButton,
//                         isLuxuryOptionSelectedoneway ? styles.activeButton : styles.inactiveButton,
//                       ]}
//                       onPress={selectLuxuryOptiononeway}
//                       labelStyle={
//                         isLuxuryOptionSelectedoneway ? styles.activeText : styles.inactiveText
//                       }
//                     >
//                       Luxury
//                     </Button>
//                   </View>
//                   {isStandardOptionSelectedoneway ? (
//                     <View
//                       style={{
//                         borderLeftWidth: 1,
//                         borderLeftColor:Colors.darkgrey,
//                         borderBottomWidth: 1,
//                         borderBottomColor:Colors.darkgrey,
//                         borderRightWidth: 1,
//                         borderRightColor:Colors.darkgrey,
//                       }}
//                     >
//                       <View
//                         style={{
//                           flexDirection: 'row',
//                           justifyContent: 'space-between',
//                          ...Margins.m.m10,
//                         }}
//                       >
//                         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                           <Image
//                             source={require('../../assets/images/hatchback.png')}
//                             style={{ width: 70, height: 30 }}
//                           />
//                           <Text style={styles.radioButtonTextStandard}>Manual</Text>
//                         </View>
//                         <RadioButton
//                           value="Standard-Manual"
//                           status={
//                             selectedSubOptiononeway === 'Standard-Manual' ? 'checked' : 'unchecked'
//                           }
//                           onPress={() => selectSubOptiononeway('Standard-Manual')}
//                           uncheckedColor={Colors.darkgrey}
//                           color={Colors.darkblue}
//                         />
//                       </View>
//                       <Divider width={1} />
//                       <View
//                         style={{
//                           flexDirection: 'row',
//                           justifyContent: 'space-between',
//                          ...Margins.m.m10,
//                         }}
//                       >
//                         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                           <Image
//                             source={require('../../assets/images/hatchback.png')}
//                             style={{ width: 70, height: 30 }}
//                           />
//                           <Text style={styles.radioButtonTextStandard}>Automatic</Text>
//                         </View>
//                         <RadioButton
//                           value="Standard-Auto"
//                           status={
//                             selectedSubOptiononeway === 'Standard-Auto' ? 'checked' : 'unchecked'
//                           }
//                           onPress={() => selectSubOptiononeway('Standard-Auto')}
//                           uncheckedColor={Colors.darkgrey}
//                           color={Colors.darkblue}
//                         />
//                       </View>
//                     </View>
//                   ) : (
//                     <View
//                       style={{
//                         borderLeftWidth: 1,
//                         borderLeftColor:Colors.darkgrey,
//                         borderBottomWidth: 1,
//                         borderBottomColor:Colors.darkgrey,
//                         borderRightWidth: 1,
//                         borderRightColor:Colors.darkgrey,
//                       }}
//                     >
//                       <View
//                         style={{
//                           flexDirection: 'row',
//                           justifyContent: 'space-between',
//                          ...Margins.m.m10,
//                         }}
//                       >
//                         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                           <Image
//                             source={require('../../assets/images/hatchback.png')}
//                             style={{ width: 70, height: 30 }}
//                           />
//                           <Text style={styles.radioButtonTextStandard}>Manual</Text>
//                         </View>
//                         <RadioButton
//                           value="Luxury-Manual"
//                           status={
//                             selectedSubOptiononeway === 'Luxury-Manual' ? 'checked' : 'unchecked'
//                           }
//                           onPress={() => selectSubOptiononeway('Luxury-Manual')}
//                           uncheckedColor={Colors.darkgrey}
//                           color={Colors.darkblue}
//                         />
//                       </View>
//                       <Divider width={1} />
//                       <View
//                         style={{
//                           flexDirection: 'row',
//                           justifyContent: 'space-between',
//                          ...Margins.m.m10,
//                         }}
//                       >
//                         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                           <Image
//                             source={require('../../assets/images/hatchback.png')}
//                             style={{ width: 70, height: 30 }}
//                           />
//                           <Text style={styles.radioButtonTextStandard}>Automatic</Text>
//                         </View>
//                         <RadioButton
//                           value="Luxury-Auto"
//                           status={
//                             selectedSubOptiononeway === 'Luxury-Auto' ? 'checked' : 'unchecked'
//                           }
//                           onPress={() => selectSubOptiononeway('Luxury-Auto')}
//                           uncheckedColor={Colors.darkgrey}
//                           color={Colors.darkblue}
//                         />
//                       </View>
//                     </View>
//                   )}
//                 </View>
//               </RBSheet>
          
//               <View style={{ flexDirection: 'row', ...Margins.mt.mt11, ...Margins.mh.mh15, width: '100%' }}>
//                 <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: Colors.grey, width: '42%' }}>
//                   <View style={{
//                     justifyContent: 'center', ...Paddings.ph.ph10, alignItems: 'center', borderRightWidth: 1, borderRightColor: Colors.grey
//                   }}>
//                     <MaterialCommunityIcons name="map-marker" color={Colors.icon} size={16} style={{ alignItems: 'center' }} />
//                   </View>
//                   <TextInput
//                     style={styles.input}
//                     onChangeText={(destination) => setDestination(destination)}
//                     value={destination}
//                     placeholder="Enter Destination"
//                     keyboardType="text"
//                     placeholderTextColor={Colors.black}
//                   />
//                 </View>
//                 <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: Colors.grey, width: '47%', ...Margins.mh.mh10 }}>
//                   <View style={{
//                     justifyContent: 'center', ...Paddings.ph.ph10, alignItems: 'center', borderRightWidth: 1, borderRightColor: Colors.grey
//                   }}>
//                     <MaterialCommunityIcons name="car" color={Colors.icon} size={16} style={{ alignItems: 'center' }} />
//                   </View>
//                   <TouchableOpacity
//                     onPress={() => refRBSheet.current.open()}
//                     style={{
//                       flexDirection: 'row',
//                       justifyContent: 'space-between',
//                       alignItems: 'center',
//                     }}
//                   >
//                     <Text
//                       style={{
//                         color: Colors.black,
//                         ...Margins.mr.mr15,
//                         fontSize:FontSizes.tinymedium,
//                         ...Margins.mh.mh5
//                       }}
//                     >
//                       {selectedSubOptiononeway}
//                     </Text>
//                     <Ionicons
//                       name="caret-down"
//                       color={Colors.black}
//                       size={14}
//                       style={{
//                         position: 'absolute',
//                         right: 0,
//                       }}
//                     />
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>
//             <View style={{ justifyContent: 'center', alignItems: 'center', ...Paddings.ph.ph20, }}>
//               <DropShadow style={{
//                 shadowColor: '#171717',
//                 shadowOffset: { width: 2, height: 6 },
//                 shadowOpacity: 0.2,
//                 shadowRadius: 3, elevation: 20,
//               }}>
//                 <TouchableOpacity onPress={() => navigation.navigate('payment')} style={{ justifyContent: 'center', backgroundColor: '#16588e', alignItems: 'center',...Paddings.p.p10, borderRadius: 5, ...Paddings.ph.ph20, width: '80%', }}>
//                   <Text style={{ color: Colors.white, fontSize:FontSizes.tinymedium, ...Paddings.ph.ph20, fontWeight: '700' }}>Book Now</Text>
//                 </TouchableOpacity>
//               </DropShadow>
//             </View>
//           </View>
//       }
//     </ScrollView>
//   );
// };

// export default OutstationDriverBookingScreen;

// const styles = StyleSheet.create({
//   modalContainer: {
//     width: '100%',
//     backgroundColor: 'white',
    
//     padding: 20,
//     elevation: 2,
//   },
//   mainContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     ...Margins.mh.mh30,
//     width: '84%',
//     marginTop:10
//   },
//   labelContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   dot: {
//     backgroundColor: Colors.primary,
//     width: 5,
//     height: 5,
//     borderRadius: 10,
//     ...Paddings.p.P5,
//   },
//   dotGreen: {
//     backgroundColor: 'green',
//     width: 5,
//     height: 5,
//     borderRadius: 10,
//     ...Paddings.p.P5
//   },
//   labelText: {
//     color: Colors.black,
//     ...Margins.mh.mh7,
//     fontSize:FontSizes.small,
//   },
//   containerSelectHour: {
//     width: '34%',
//     height:17,
 
//   },
//   picker: {
//     height: 50,
//     color: Colors.white,
//   },
//   pickerItemText: {
//     fontSize:FontSizes.tinymedium,
//     fontWeight: FontWeights.bold,
//   },
//   label: {
//     fontSize:FontSizes.tinyxsmall,
//     color: Colors.white,
//     fontWeight: FontWeights.bold,
//   },
//   pickerContainer: {
//     backgroundColor: Colors.orange,
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     flexDirection:'row',

//   },
//   btn: {
//     backgroundColor: Colors.white,
//     height: 120,
//     width: '49%',
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.50,
//     shadowRadius: 3.84,
//     elevation: 10
//   },
//   picker: {
//     width: 130,
//     height: 10,
//     color: Colors.white,
//   },
//   pickerTime: {
//     width: 133,
//     height: 10,
//     color: Colors.black,
//     position: 'relative'
//   },
//   pickerDate: {
//     width: 160,
//     height: 10,
//     color: Colors.black,
//   },
//   pickerDateDepart: {
//     width: 130,
//     height: 10,
//     color: Colors.white,
//   },
//   pickerDateReturn: {
//     width: 130,
//     height: 10,
//     color: Colors.white,
//   },
//   pickerItem: {
//     fontSize:FontSizes.tinyxsmall,
//     color: Colors.white,
//     fontWeight: FontWeights.bold
//   },
//   roudtripcontainer: {
//     marginVertical: 7,
//     height: 22,
//     position: 'absolute',
//     width: '48%',
//     backgroundColor: Colors.white,
//     alignItems: 'center',
//   },
//   imageContainer: {
//     marginVertical: 7,
//     height: 22,
//     position: 'absolute',
//     width: '60%',
//     backgroundColor: Colors.white,
//     alignItems: 'center',
//   },
//   icon: {
//     fontSize:FontSizes.tinyxsmall,
//     backgroundColor: 'blue'
//   },
//   selectedValue: {
//     ...Margins.mt.mt20,
//     fontSize:FontSizes.tinyxsmall,
//     color: Colors.white,
//   },
//   input: {
//     ...Paddings.p.p4,
//     fontSize:FontSizes.xsmall,
//     color: Colors.black,
//     width:'100%'
//   },
//   RoundTripView: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     ...Margins.mh.mh15,
//   },
//   oneWayView: {
//     flexDirection: 'row', 
//     justifyContent: 'space-between',
//      ...Margins.mh.mh15
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//   },
//   confirmButton: {
//     backgroundColor: Colors.white,
//   },
//   activeButton: {
//     backgroundColor: Colors.primary,
//     borderColor: Colors.primary,
//   },
//   inactiveButton: {
//     backgroundColor: Colors.white,
//     borderColor: '#ccc',
//     borderWidth: 1,
//   },
//   activeText: {
//     color: Colors.white,
//   },
//   inactiveText: {
//     color:Colors.darkgrey,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     ...Margins.mt.mt20,
//   },
//   button: {
//     ...Paddings.pv.pv10,
//     ...Paddings.ph.ph20,
//   },
//   closeButton: {
//     backgroundColor: Colors.white,
//   },
//   confirmButton: {
//     backgroundColor: Colors.white,
//   },
//   buttonText: {
//   fontSize:FontSizes.medium,
//     textAlign: 'center',
//     color: Colors.black,
//   },
//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalView: {
//     backgroundColor: Colors.white,
//     borderRadius: 10,
//     ...Paddings.p.p20,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   buttonsContainer: {
//     borderColor:Colors.darkgrey,
//     ...Margins.mt.mt10
//   },
//   radioButtonTextStandard: {
//   fontSize:FontSizes.medium,
//    ...Margins.mh.mh20,
//     color:Colors.darkgrey,
//   },
//   radioButtonText: {
//   fontSize:FontSizes.medium,
//     color:Colors.darkgrey,
//    ...Margins.mh.mh20
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     width: '100%',
//   },
//   button: {
//     width: '50%',
//     ...Paddings.pv.pv5,
//     borderRadius: 1,
//   },
//   closeButton: {
//     backgroundColor: 'red',
//   },
//   buttonText: {
//   fontSize:FontSizes.medium,
//     color: Colors.white,
//     textAlign: 'center',
//   },
//   optionContainer: {
//     width: '49%',
//     height: 110,
//     position: 'relative',
//   },
//   icon: {
//    ...Paddings.p.p10,
//     position: 'relative',
//   },
//   overlayIconContainer: {
//     position: 'absolute',
//     justifyContent: 'flex-end',
//     alignItems: 'flex-end',
//     width: '100%',
//     height: '100%',
//    ...Paddings.p.p10,
//   }
// });






import React, { useState, useRef,useEffect } from 'react';
import { View, Text, ScrollView, Modal ,TouchableOpacity,Image} from 'react-native';
import OTTHeader from '../../components/OTTHeader';
import { Colors, FontSizes, FontWeights, Margins,Paddings,BorderRadius ,BorderWidths} from '../../assets/colors';
import OutstaionRoundtrip from './outstationRoundtrip';
import OutstationOnewaytrip from './outstationOnewaytrip';
import styles from './styles'; 
const OutstationDriverBookingScreen = ({ navigation,route }) => {
  const refRBSheet = useRef();
  const { selectedzone } = route?.params;
 console.log('seeee2',selectedzone)
  const [selectedOption, setSelectedOption] = useState('Roundtrip');
  const [isModalVisibleHour, setModalVisibleHour] = useState(false);
  const [selectedHour, setSelectedHour] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [selectedTime, setSelectedTime] = useState();

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };
  const openModalHour = () => {
    setModalVisibleHour(!isModalVisibleHour);
  };
  const closeModalHour = () => {
    setModalVisibleHour(false);
  };
  return (
    <ScrollView style={{ flex: 1 }}>
      <OTTHeader navigation={navigation} title={'trusted & trained driver'} />
      {/* <Modal
        isVisible={isModalVisibleHour}
        onBackdropPress={closeModalHour}
        style={styles.modal}
      >
        <View style={styles.modalContentBooking}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <TouchableOpacity onPress={closeModalHour} style={styles.closeButtonHour}>
              <Ionicons name="close" color={Colors.white} size={24} />
            </TouchableOpacity>
            <View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', ...Margins.mh.mh20 }}>
                <View style={{ alignItems: 'center' }}>
                  <Text style={{ color: Colors.white, fontSize: FontSizes.tinymedium }}>My Start & End</Text>
                  <Text style={{ color: Colors.white, fontSize: FontSizes.tinymedium, ...Margins.mv.mv5 }}>address is<Text style={{ color: Colors.white, fontSize: FontSizes.tinymedium, fontWeight: FontWeights.semiBold }}> same</Text></Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Text style={{ color: Colors.white, fontSize: FontSizes.tinymedium }}>My End address is</Text>
                  <Text style={{ color: Colors.white, fontSize: FontSizes.tinymedium, fontWeight: FontWeights.semiBold, ...Margins.mv.mv5 }}>different</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', ...Paddings.p.p10, alignItems: 'center' }}>
                <TouchableOpacity style={{ backgroundColor: Colors.orange, ...Paddings.p.p10, ...BorderRadius.br5, width: '43%', alignItems: 'center' }}>
                  <Text style={{ color: Colors.white, fontSize: FontSizes.tinymedium, fontWeight: FontWeights.semiBold }}>Round Trip</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: Colors.orange, ...Paddings.p.p10, ...BorderRadius.br5, width: '43%', alignItems: 'center' }}>
                  <Text style={{ color: Colors.white, fontSize: FontSizes.tinymedium, fontWeight: FontWeights.semiBold }}>OnewayTrip</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal> */}
      <View style={{ flex: 1, ...Margins.mt.mt20 }}>
        <View style={styles.RoundTripView}>
          <TouchableOpacity
            onPress={() => handleOptionSelect('Roundtrip')}
            style={[
              styles.optionContainer,
              {
                backgroundColor: selectedOption === 'Roundtrip' ? Colors.primary : Colors.white,
                borderWidth: selectedOption !== 'Roundtrip' ? 1 : 0,
                borderColor: selectedOption !== 'Roundtrip' ? Colors.primary : Colors.white,
                borderRadius: 3,
              }
            ]}
          >
            <View style={styles.roudtripcontainer}>
              <Text style={[{ color: selectedOption === 'Roundtrip' ? Colors.primary : Colors.primary, position: 'absolute', }]}>
                Round Trip
              </Text>
              <View style={{ left: 50 }}>
                <Image
                  source={require('../../assets/images/rt_icon.png')}
                  resizeMode={'cover'}
                  style={{ width: 22, height: 22, ...BorderWidths.bl.bl1, borderLeftColor: Colors.white }}
                />
              </View>
            </View>
            <View style={styles.overlayIconContainer}>
              <Image
                source={
                  selectedOption === 'Roundtrip'
                    ? require('../../assets/images/white-circlebg_bg.png')
                    : require('../../assets/images/blue-circlebg_bg.png')
                }
                style={{ height: '56.5%', width: 53.9, ...Margins.mb.mb8, ...Margins.mh.mh5 }}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleOptionSelect('Onewaytrip')}
            style={[
              styles.optionContainer,
              {
                backgroundColor: selectedOption === 'Onewaytrip' ? Colors.primary : Colors.white,
                borderWidth: selectedOption !== 'Onewaytrip' ? 1 : 0,
                borderColor: selectedOption !== 'Onewaytrip' ? Colors.primary : Colors.white,
                borderRadius: 3
              }
            ]}
          >
            <View style={styles.imageContainer}>
              <View style={{ left: 57 }}>
                <Image
                  source={require('../../assets/images/rt_icon.png')}
                  resizeMode={'cover'}
                  style={{ width: 22, height: 22 }}
                />
              </View>
              <Text style={[styles.overlayText, { color: selectedOption === 'Onewaytrip' ? Colors.primary : Colors.primary, position: 'absolute' }]}>
                One WayTrip
              </Text>
            </View>
            <View style={styles.overlayIconContainer}>
              <Image
                source={
                  selectedOption === 'Onewaytrip'
                    ? require('../../assets/images/arrow_fade_blue.png')
                    : require('../../assets/images/arrow-right-tatd.png')
                }
                style={{ height: '50%', width: 50, ...Margins.mb.mb10 }}
              />
            </View>
          </TouchableOpacity>
        </View>
        {selectedOption === 'Onewaytrip'
          ? <Text style={{ color: Colors.icon, fontSize: FontSizes.xbody, ...Paddings.p.p10, ...Margins.mh.mh30, ...Margins.mt.mt20, fontWeight: FontWeights.regular }}>PLAN YOUR JOURNEY</Text>
          : <Text style={{ color: Colors.icon, fontSize: FontSizes.xbody, ...Paddings.p.p10, ...Margins.mh.mh30, fontWeight: FontWeights.regular, ...Margins.mt.mt20 }}>PLAN YOUR JOURNEY</Text>
        }
      </View>
      {selectedOption === 'Roundtrip'
        ? <OutstaionRoundtrip navigation={navigation} refRBSheet={refRBSheet} openModalHour={openModalHour} selectedzone={selectedzone}/>
        : <OutstationOnewaytrip navigation={navigation} refRBSheet={refRBSheet} selectedzone={selectedzone}/>}
    </ScrollView>
  );
};
export default OutstationDriverBookingScreen;



