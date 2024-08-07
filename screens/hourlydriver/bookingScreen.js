
import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import OTTHeader from '../../components/OTTHeader';
import { Colors, FontSizes, FontWeights, Margins, Paddings, BorderRadius, BorderWidths } from '../../assets/colors';
import RoundTripBooking from './RoundTripBooking';
import OnewayTripBooking from './OnewayTripBooking';
import styles from './styles'; 

const BookingScreen = ({ navigation, route }) => {
  const refRBSheet = useRef();
  const { selectedzone } = route?.params;
  console.log('seeee2', selectedzone);
  const [selectedOption, setSelectedOption] = useState('Roundtrip');
  const [isModalVisibleHour, setModalVisibleHour] = useState(false);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    if (option === 'Onewaytrip') {
      setModalVisibleHour(true);
    } else {
      setModalVisibleHour(false);
    }
  };

  const openModalHour = () => {
    setModalVisibleHour(true);
  };

  const closeModalHour = () => {
    setModalVisibleHour(false);
  };

  const activateOnewayTripPage = () => {
    setSelectedOption('Onewaytrip');
    closeModalHour();
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <OTTHeader navigation={navigation} title={'trusted & trained driver'} />
      
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
          ? <Text style={{ color: Colors.icon, fontSize: FontSizes.xbody, ...Paddings.p.p10, ...Margins.mh.mh30, ...Margins.mt.mt20, fontWeight: FontWeights.regular }}>SELECT YOUR DISTANCE</Text>
          : <Text style={{ color: Colors.icon, fontSize: FontSizes.xbody, ...Paddings.p.p10, ...Margins.mh.mh30, fontWeight: FontWeights.regular, ...Margins.mt.mt20 }}>SELECT YOUR HOURS</Text>
        }
      </View>
      {selectedOption === 'Roundtrip'
        ? <RoundTripBooking 
            navigation={navigation} 
            refRBSheet={refRBSheet} 
            openModalHour={openModalHour} 
            closeModalHour={closeModalHour}
            isModalVisibleHour={isModalVisibleHour} 
            activateOnewayTripPage={activateOnewayTripPage} // Pass the function
            selectedzone={selectedzone} 
          />
        : <OnewayTripBooking 
            navigation={navigation} 
            refRBSheet={refRBSheet} 
            openModalHour={openModalHour} 
            closeModalHour={closeModalHour}
            isModalVisibleHour={isModalVisibleHour} 
            selectedzone={selectedzone} 
          />}
    </ScrollView>
  );
};

export default BookingScreen;

































// // const generateDates = () => {
// //   const dates = [];
// //   const today = new Date();
// //   const oneMonthLater = new Date(today);
// //   oneMonthLater.setMonth(today.getMonth() + 1);
// //   for (let date = new Date(today); date <= oneMonthLater; date.setDate(date.getDate() + 1)) {
// //     dates.push(getFormattedDate(new Date(date)));
// //   }
// //   return dates;
// // };

// // const dates = generateDates();
// // console.log(dates); 

// // import React, { useState, useRef, useEffect } from 'react';
// // import { View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
// // import OTTHeader from '../../components/OTTHeader';
// // import { Colors, FontSizes, FontWeights, Paddings, Margins, BorderRadius, BorderWidths } from '../../assets/colors';
// // import { Picker } from '@react-native-picker/picker';
// // import Ionicons from 'react-native-vector-icons/Ionicons'
// // import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
// // import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
// // import { Button, RadioButton } from 'react-native-paper';
// // import { Divider } from '@rneui/base';
// // import DropShadow from "react-native-drop-shadow";
// // import RBSheet from 'react-native-raw-bottom-sheet';
// // import Modal from "react-native-modal";
// // import axios from 'axios';
// // import moment from 'moment';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import { jwtDecode } from "jwt-decode";
// // import { refreshAccessToken, validateAccessToken } from '../../utils/validation';
// // const BookingScreen = ({ navigation, route }) => {
// //   const { selectedzone } = route?.params;

// //   const refRBSheet = useRef();
// //   const [selectedHour, setSelectedHour] = useState('1');
// //   const [selectedTime, setSelectedTime] = useState();
// //   const [selectedOption, setSelectedOption] = useState('Roundtrip');
// //   const [name, setName] = useState()
// //   const [bookingdata, setBookingdata] = useState()
// //   const [coupondata, setCoupondata] = useState()
// //   const [mobileNumber, setMobileNumber] = useState()
// //   const [pickupAddress, setPickupAddress] = useState()
// //   const [destination, setDestination] = useState()
// //   const [editbooking, setEditbooking] = useState()
// //   const [isStandardOptionSelectedoneway, setIsStandardOptionSelectedoneway] = useState(true);
// //   const [isLuxuryOptionSelectedoneway, setIsLuxuryOptionSelectedoneway] = useState(false);
// //   const [selectedSubOptiononeway, setSelectedSubOptiononeway] = useState('Standard-Auto');
// //   const [selectedMainOptiononeway, setSelectedMainOptiononeway] = useState('');
// //   const [isStandardOptionSelected, setIsStandardOptionSelected] = useState(true);
// //   const [isLuxuryOptionSelected, setIsLuxuryOptionSelected] = useState(false);
// //   const [selectedSubOption, setSelectedSubOption] = useState();
// //   const [selectedMainOption, setSelectedMainOption] = useState('');
// //   const [isModalVisibleHour, setModalVisibleHour] = useState(false);
// //   const [selectedDate, setSelectedDate] = useState();
// //   const [decodedToken, setDecodedToken] = useState(null);
// //   const [budgetdata, setBudgetdata] = useState()
// //   const [modalVisiblecoupon, setModalVisiblecoupon] = useState(false)
// //   const [buttonNames, setButtonNames] = useState({ standard: 'Standard', luxury: 'Luxury' });
// //   const [bookingvalidationdata, setBookingvalidationdata] = useState()
// //   const [error, setError] = useState();
// //   const [validationErrors, setValidationErrors] = useState({});
// // const [checkinfo,setCheckinfo]=useState()
// //   useEffect(() => {
// //     getBudget()
// //   }, [selectedHour]
// //   )
// //   useEffect(() => {
// //     getCoupon()
// //   }, [])
// //   useEffect(() => {
// //     const fetchBookingData = async () => {
// //       try {
// //         const bookingvalue = await AsyncStorage.getItem('bookingvalue');
// //         console.log('bookingvalue============', bookingvalue)
// //         if (bookingvalue !== null) {
// //           const parsedBookingValue = JSON.parse(bookingvalue);
// //           setName(parsedBookingValue?.single_booking_validation_data?.name || name);
// //           setPickupAddress(parsedBookingValue?.single_booking_validation_data?.pickup_address || pickupAddress);
// //           setSelectedSubOption(parsedBookingValue?.single_booking_validation_data?.car_model || selectedSubOption);
// //           setSelectedTime(parsedBookingValue?.single_booking_validation_data?.selectedTime || selectedTime);
// //           setSelectedDate(parsedBookingValue?.single_booking_validation_data?.booking_date || selectedDate);
// //         }
// //       } catch (error) {
// //         console.error('Error fetching booking data:', error);
// //       }
// //     };
// //     fetchBookingData();
// //   }, []);

// //   useEffect(() => {
// //     const decodeToken = async () => {
// //       try {
// //         const userData = await AsyncStorage.getItem('userData');
// //         const parsedUserData = userData ? JSON.parse(userData) : null;
// //         const token = parsedUserData ? parsedUserData.jwt : null;
// //         if (token) {
// //           const decoded = jwtDecode(token);
// //           console.log('Decoded Token:', decoded);
// //           setDecodedToken(decoded);
// //           setMobileNumber(decoded?.data?.mobile_number || '');
// //         } else {
// //           console.log('No token found');
// //         }
// //       } catch (error) {
// //         console.error('Error decoding token:', error);
// //       }
// //     };
// //     decodeToken();
// //   }, []);

// //   const getBudget = async () => {
// //     const isValid = await validateAccessToken();
// //     if (!isValid) {
// //       await refreshAccessToken();
// //     }
// //     try {
// //       const userData = await AsyncStorage.getItem('userData');
// //       const parsedUserData = userData ? JSON.parse(userData) : null;
// //       const token = parsedUserData ? parsedUserData.jwt : null;
// //       const selectcitydata = await AsyncStorage.getItem('selectcityitem');
// //       if (!token) {
// //         throw new Error("No token found");
// //       }
// //       const config = {
// //         headers: {
// //           'Authorization': `Bearer ${token}`,
// //           'Content-Type': 'application/json',
// //         },
// //       };
// //       let city;
// //       let zone;
// //       console.log('Selected city :', selectcitydata);
// //       console.log('Selected Item booking:', selectedzone);
// //       if (selectcitydata === "Mumbai") {
// //         city = 'Maharashtra';
// //         zone = selectcitydata;
// //       } else if (selectcitydata === "Delhi/NCR") {
// //         city = 'Delhi';
// //         zone = selectedzone;
// //       } else if (selectcitydata === "Bangalore") {
// //         city = 'Karnataka';
// //         zone = 'Bangalore';
// //       } else if (selectcitydata === "Hyderabad") {
// //         city = 'Telangana';
// //         zone = 'Hyderabad'
// //       } else if (selectcitydata === "Pune") {
// //         city = 'Maharashtra';
// //         zone = 'Pune'
// //       } else if (selectcitydata === "Delhi") {
// //         city = selectcitydata
// //         zone = selectedzone;
// //       } else if (selectcitydata === "Haryana") {
// //         city = selectcitydata
// //         zone = selectedzone;
// //       } else if (selectcitydata === "Krnataka") {
// //         city = selectcitydata
// //         zone = selectedzone;
// //       } else if (selectcitydata === "Maharashtra") {
// //         city = selectcitydata
// //         zone = selectedzone;
// //       } else if (selectcitydata === "Telalangana") {
// //         city = selectcitydata
// //         zone = selectedzone;
// //       } else if (selectcitydata === "Uttar Pradesh") {
// //         city = selectcitydata;
// //         zone = selectedzone;
// //       } else {
// //         return;
// //       }
// //       const response = await axios.post('https://www.tatd.in/app-api/customer/ondemand/get_budget.php', {
// //         category: 'Private Driver',
// //         city: city,
// //         zone: zone,
// //         product_type: 'Incity',
// //         way: 2,
// //         hours: selectedHour,
// //       }, config);
// //       console.log('Budget Data:', response.data);
// //       setBudgetdata(response.data);
// //     } catch (err) {
// //       setError(err.message);
// //       console.log('Error from getBudget API:', err);
// //     }
// //   };

// //   const getCoupon = async () => {
// //     const isValid = await validateAccessToken();
// //     if (!isValid) {
// //       await refreshAccessToken();
// //     }
// //     try {
// //       const userData = await AsyncStorage.getItem('userData');
// //       const parsedUserData = userData ? JSON.parse(userData) : null;
// //       const token = parsedUserData ? parsedUserData.jwt : null;
// //       if (!token) {
// //         throw new Error("No token found");
// //       }
// //       const config = {
// //         headers: {
// //           'Authorization': `Bearer ${token}`,
// //           'Content-Type': 'application/json',
// //         },
// //       };
// //       const response = await axios.get('https://www.tatd.in/app-api/customer/ondemand/get_coupon_discount.php', config);
// //       console.log('Coupon Data:', response.data);
// //       if (response?.data?.user_coupon_data?.coupon_value > 0) {
// //         setModalVisiblecoupon(true);
// //       }
// //       setCoupondata(response?.data?.user_coupon_data);
// //     } catch (err) {
// //       setError(err.message);
// //       console.log('Error from coupon API:', err.message);
// //     }
// //   };
// //   const vehicleType = isStandardOptionSelected ? buttonNames.standard : buttonNames.luxury;
// //   const finalamount = (budgetdata?.budget) - (coupondata?.coupon_value)
// //   const bookingValidation = async () => {
// //     const isValid = await validateAccessToken();
// //     if (!isValid) {
// //       await refreshAccessToken();
// //     }
// //     try {
// //       const userData = await AsyncStorage.getItem('userData');
// //       const parsedUserData = userData ? JSON.parse(userData) : null;
// //       const token = parsedUserData ? parsedUserData.jwt : null;
// //       const bookingvalue = await AsyncStorage.getItem('bookingvalue');
// //       const bookingvaludata = bookingvalue ? JSON.parse(bookingvalue) : null;
// //       console.log('bookingdata.booking_validation_id==================', bookingvaludata)
// //       if (!token) {
// //         throw new Error("No token found");
// //       }
// //       const config = {
// //         headers: {
// //           'Authorization': `Bearer ${token}`,
// //           'Content-Type': 'application/json',
// //         },
// //       };
// //       const response = await axios.post('https://www.tatd.in/app-api/customer/ondemand/get-booking-validation-data.php',
// //         {
// //           booking_validation_id: bookingvaludata
// //         }
// //         , config);
// //       console.log('booking validation Data:', response.data);
// //       await AsyncStorage.setItem('bookingnumber', JSON.stringify(response.data?.single_booking_validation_data?.booking_number));
// //       setBookingvalidationdata(response.data)
// //     } catch (err) {
// //       setError(err.message);
// //       console.log('Error from coupon API:', err.message);
// //     }
// //   };

// //   const handleBooking = async () => {
// //     const bookingvalue = await AsyncStorage.getItem('bookingvalue');
// //     const bookingvaluecheck = bookingvalue ? JSON.parse(bookingvalue) : null;
// //     console.log('check2222', bookingvaluecheck)
// //     if (bookingvaluecheck === null || bookingvaluecheck === undefined) {
// //       confirmBooking();
// //     } else {
// //       editBooking();
// //     }
// //   };


// //   const confirmBooking= async () => {
// //     let errors = {};
// //     if (!name) errors.name = "Name is required";
// //     if (!mobileNumber) errors.mobileNumber = "Mobile number is required";
// //     if (!pickupAddress) {
// //       errors.pickupAddress = "Pickup address is required";
// //     } else if (pickupAddress.length <= 16) {
// //       errors.pickupAddress = "Pickup address must be greater than 16 characters";
// //     }
  
// //     if (!selectedDate) errors.selectedDate = "Date is required";
// //     if (!selectedTime) errors.selectedTime = "Time is required";
// //     if (!selectedSubOption) {
// //       errors.selectedSubOption = 'Vehicle type is required';
// //       refRBSheet.current.open();
// //     }
// //     if (!selectedHour) errors.selectedHour = "Hour selection is required";

// //     setValidationErrors(errors);

// //     if (Object.keys(errors).length > 0) {
// //       return;
// //     }

// //     const isValid = await validateAccessToken();
// //     if (!isValid) {
// //       await refreshAccessToken();
// //     }
// //     try {
// //       const userData = await AsyncStorage.getItem('userData');
// //       const parsedUserData = userData ? JSON.parse(userData) : null;
// //       const token = parsedUserData ? parsedUserData.jwt : null;
// //       const selectcitydata = await AsyncStorage.getItem('selectcityitem');
// //       const parsedDate = moment(selectedDate, 'D MMMM YYYY');
// //       const formattedDate = parsedDate.isValid() ? parsedDate.format('YYYY-MM-DD') : null;
// //       if (!token) {
// //         throw new Error("No token found");
// //       }
// //       const config = {
// //         headers: {
// //           'Authorization': `Bearer ${token}`,
// //           'Content-Type': 'application/json',
// //         },
// //       };
// //       const response = await axios.post('https://www.tatd.in/app-api/customer/ondemand/booking_validation.php?action=add',
// //         {
// //           action: "add",
// //           name: name,
// //           mobile_number: mobileNumber,
// //           pickup_address: pickupAddress,
// //           drop_address: "",
// //           city: selectcitydata,
// //           zone: selectedzone,
// //           category: "Private Driver",
// //           product_type: "Incity",
// //           way: 2,
// //           coupon_type: coupondata?.trigger_type,
// //           coupon_code: coupondata?.coupon_code,
// //           coupon_discount: coupondata?.coupon_value,
// //           total_price: budgetdata?.budget,
// //           gst: "50",
// //           supply_cost: "875",
// //           hours: selectedHour,
// //           days: 0,
// //           kms: 0,
// //           end_date: "0000-00-00",
// //           vehicle_type: vehicleType,
// //           car_model: selectedSubOption,
// //           pending_amount: "",
// //           payment_mode: "",
// //           pay_by: "",
// //           razor_order_id: "",
// //           payment_id: "",
// //           payment_amount: "",
// //           payment_status: "",
// //           add_date: "2023-06-17",
// //           booking_date: formattedDate,
// //           booking_time: selectedTime,
// //           booking_status: "Pending",
// //           booking_oncall_by: "Customer",
// //           booking_oncall_by_number: mobileNumber,
// //           booking_oncall_by_source: "Customer",
// //           booking_oncall_by_subsource: ""
// //         },
// //         config);
// //       console.log('booking data==========>>>>>>:', response.data.payment_page_data);
// //       await AsyncStorage.setItem('bookingvalue', JSON.stringify(response.data?.booking_validation_id));
// //       if (response?.data?.booking_validation_id) {
// //         bookingValidation()
// //         navigation.navigate('payment',{iteminfo:bookingvalidationdata?.payment_page_data});
// //       }
// //     } catch (err) {
// //       console.error('Error from coupon API:', err.message);
// //     }
// //   };
// //   console.log('check99999999999999',bookingvalidationdata?.payment_page_data)

// //   const editBooking = async () => {
// //     let errors = {};
// //     if (!name) errors.name = "Name is required";
// //     if (!mobileNumber) errors.mobileNumber = "Mobile number is required";
// //     if (!pickupAddress) {
// //       errors.pickupAddress = "Pickup address is required";
// //     } else if (pickupAddress.length <= 16) {
// //       errors.pickupAddress = "Pickup address must be greater than 16 characters";
// //     }
  
// //     if (!selectedDate) errors.selectedDate = "Date is required";
// //     if (!selectedTime) errors.selectedTime = "Time is required";
// //     if (!selectedSubOption) {
// //       errors.selectedSubOption = 'Vehicle type is required';
// //       refRBSheet.current.open();
// //     }
// //     if (!selectedHour) errors.selectedHour = "Hour selection is required";

// //     setValidationErrors(errors);

// //     if (Object.keys(errors).length > 0) {
// //       return;
// //     }

// //     const isValid = await validateAccessToken();
// //     if (!isValid) {
// //       await refreshAccessToken();
// //     }
// //     try {
// //       const userData = await AsyncStorage.getItem('userData');
// //       const parsedUserData = userData ? JSON.parse(userData) : null;
// //       const token = parsedUserData ? parsedUserData.jwt : null;
// //       const selectcitydata = await AsyncStorage.getItem('selectcityitem');
// //       const parsedDate = moment(selectedDate, 'D MMMM YYYY');
// //       const formattedDate = parsedDate.isValid() ? parsedDate.format('YYYY-MM-DD') : null;
// //       const bookingvalue = await AsyncStorage.getItem('bookingvalue');
// //       const bookingvaluedata = bookingvalue ? JSON.parse(bookingvalue) : null;
// //       if (!token) {
// //         throw new Error("No token found");
// //       }
// //       const config = {
// //         headers: {
// //           'Authorization': `Bearer ${token}`,
// //           'Content-Type': 'application/json',
// //         },
// //       };
// //       const response = await axios.post('https://www.tatd.in/app-api/customer/ondemand/booking_validation.php?action=add',
// //         {
// //           action: "edit",
// //           booking_validation_id: bookingvaluedata,
// //           name: name,
// //           mobile_number: mobileNumber,
// //           pickup_address: pickupAddress,
// //           drop_address: "",
// //           city: selectcitydata,
// //           zone: selectedzone,
// //           category: "Private Driver",
// //           product_type: "Incity",
// //           way: 2,
// //           coupon_type: coupondata?.trigger_type,
// //           coupon_code: coupondata?.coupon_code,
// //           coupon_discount: coupondata?.coupon_value,
// //           total_price: budgetdata?.budget,
// //           gst: "50",
// //           supply_cost: "875",
// //           hours: selectedHour,
// //           days: 0,
// //           kms: 0,
// //           end_date: "0000-00-00",
// //           vehicle_type: vehicleType,
// //           car_model: selectedSubOption,
// //           pending_amount: "",
// //           payment_mode: "",
// //           pay_by: "",
// //           razor_order_id: "",
// //           payment_id: "",
// //           payment_amount: "",
// //           payment_status: "",
// //           add_date: "2023-06-17",
// //           booking_date: formattedDate,
// //           booking_time: selectedTime,
// //           booking_status: "Pending",
// //           booking_oncall_by: "Customer",
// //           booking_oncall_by_number: mobileNumber,
// //           booking_oncall_by_source: "Customer",
// //           booking_oncall_by_subsource: ""
// //         },
// //         config);
// //       console.log('edit booking data:', response.data);
// //       console.log('check99999999999999',bookingvalidationdata?.payment_page_data)
// //       setEditbooking(response.data);
// //       if (response.data.status_code === 200) {
// //         navigation.navigate('payment',{iteminfo:bookingvalidationdata?.payment_page_data})
// //       }
// //     } catch (err) {
// //       setError(err.message);
// //       console.log('Error from editbooking API:', err.message);
// //     }
// //   };
// //   const openModalHour = () => {
// //     setModalVisibleHour(!isModalVisibleHour);
// //   };
// //   const closeModalHour = () => {
// //     setModalVisibleHour(false);
// //   };
// //   const selectStandardOptiononeway = () => {
// //     setIsStandardOptionSelectedoneway(true);
// //     setIsLuxuryOptionSelectedoneway(false);
// //     setSelectedMainOptiononeway('Standard');
// //   };
// //   const selectLuxuryOptiononeway = () => {
// //     setIsStandardOptionSelectedoneway(false);
// //     setIsLuxuryOptionSelectedoneway(true);
// //     setSelectedMainOptiononeway('Luxury');
// //   };
// //   const selectSubOptiononeway = (option) => {
// //     setSelectedSubOptiononeway(option);
// //   };
// //   const selectStandardOption = () => {
// //     setIsStandardOptionSelected(true);
// //     setIsLuxuryOptionSelected(false);
// //     setSelectedMainOption('Standard');
// //   };
// //   const selectLuxuryOption = () => {
// //     setIsStandardOptionSelected(false);
// //     setIsLuxuryOptionSelected(true);
// //     setSelectedMainOption('Luxury');
// //   };
// //   const selectSubOption = (option) => {
// //     setSelectedSubOption(option);
// //   };
// //   const handleOptionSelect = (option) => {
// //     setSelectedOption(option);
// //   };

// //   const generateTimes = () => {
// //     const times = [];
// //     const start = new Date(0, 0, 0, 0, 15);
// //     const end = new Date(0, 0, 0, 23, 45);
// //     while (start <= end) {
// //       const hours = start.getHours();
// //       const minutes = start.getMinutes();
// //       const period = hours >= 12 ? 'PM' : 'AM';
// //       const adjustedHours = hours % 12 || 12;
// //       const time = `${adjustedHours}:${minutes < 10 ? '0' : ''}${minutes} ${period}`;
// //       times.push(time);
// //       start.setMinutes(start.getMinutes() + 30);
// //     }
// //     return times;
// //   };
// //   const times = generateTimes();

// //   const getFormattedDate = (date) => {
// //     const options = { year: 'numeric', month: 'long', day: 'numeric' };
// //     return date.toLocaleDateString(undefined, options);
// //   };
// //   const generateDates = () => {
// //     const dates = [];
// //     const today = new Date();
// //     const oneMonthLater = new Date();
// //     oneMonthLater.setMonth(today.getMonth() + 1);
// //     for (let date = new Date(today); date <= oneMonthLater; date.setDate(date.getDate() + 1)) {
// //       dates.push(getFormattedDate(new Date(date)));
// //     }
// //     return dates;
// //   };
// //   const dates = generateDates();

// //   const handleValueChange = (itemValue) => {
// //     setSelectedHour(itemValue);
// //     if (itemValue === '1' || itemValue === '2') {
// //       setModalVisibleHour(true);
// //     } else {
// //       setModalVisibleHour(false);
// //     }
// //   };
// //   console.log('==================',selectedSubOption)
// //   return (
// //     <ScrollView style={{ flex: 1, backgroundColor: Colors.white }}>
// //       <OTTHeader navigation={navigation} title={'trusted & trained driver'} />
// //       <Modal
// //         animationType="slide"
// //         transparent={true}
// //         visible={modalVisiblecoupon}
// //         onRequestClose={() => {
// //           setModalVisiblecoupon(!modalVisiblecoupon);
// //         }}
// //       >

// //         <View style={styles.modalView}>
// //           <View
// //             style={{ alignItems: 'center', justifyContent: 'center' }}
// //           >
// //             <Text style={{ color: Colors.primary, ...Paddings.p.p10, fontSize: FontSizes.medium }}>Congradulations!</Text>
// //             <Text style={{ color: Colors.darkgrey }}>{coupondata?.coupon_value} Coupon Code Applied Sucessfully Have a</Text>
// //             <Text style={{ color: Colors.darkgrey }}>greate day!</Text>
// //             <TouchableOpacity style={{
// //               backgroundColor: Colors.secondary, justifyContent: 'center', alignItems: 'center',
// //               ...Margins.mv.mv10, ...BorderRadius.br5, ...Paddings.p.p10, ...Paddings.ph.ph30
// //             }} onPress={() => {
// //               setModalVisiblecoupon(!modalVisiblecoupon);
// //             }}>
// //               <Text style={{ color: Colors.black }}>Close</Text>
// //             </TouchableOpacity>
// //           </View>
// //         </View>
// //       </Modal>
// //       <Modal
// //         isVisible={isModalVisibleHour}
// //         onBackdropPress={closeModalHour}
// //         style={styles.modal}
// //       >
// //         <View style={styles.modalContentBooking}>
// //           <ScrollView contentContainerStyle={styles.scrollViewContent}>
// //             <TouchableOpacity onPress={closeModalHour} style={styles.closeButtonHour}>
// //               <Ionicons name="close" color={Colors.white} size={24} />
// //             </TouchableOpacity>
// //             <View>
// //               <View style={{ flexDirection: 'row', justifyContent: 'space-between', ...Margins.mh.mh20 }}>
// //                 <View style={{ alignItems: 'center' }}>
// //                   <Text style={{ color: Colors.white, fontSize: FontSizes.tinymedium }}>My Start & End</Text>
// //                   <Text style={{ color: Colors.white, fontSize: FontSizes.tinymedium, ...Margins.mv.mv5 }}>address is<Text style={{ color: Colors.white, fontSize: FontSizes.tinymedium, fontWeight: FontWeights.semiBold }}> same</Text></Text>
// //                 </View>
// //                 <View style={{ alignItems: 'center' }}>
// //                   <Text style={{ color: Colors.white, fontSize: FontSizes.tinymedium }}>My End address is</Text>
// //                   <Text style={{ color: Colors.white, fontSize: FontSizes.tinymedium, fontWeight: FontWeights.semiBold, ...Margins.mv.mv5 }}>different</Text>
// //                 </View>
// //               </View>
// //               <View style={{ flexDirection: 'row', justifyContent: 'space-between', ...Paddings.p.p10, alignItems: 'center' }}>
// //                 <TouchableOpacity style={{
// //                   backgroundColor: Colors.orange, ...Paddings.p.p10, ...BorderRadius.br5, width: '43%',
// //                   alignItems: 'center'
// //                 }}>
// //                   <Text style={{ color: Colors.white, fontSize: FontSizes.tinymedium, fontWeight: FontWeights.semiBold }}>Round Trip</Text>
// //                 </TouchableOpacity>
// //                 <TouchableOpacity style={{ backgroundColor: Colors.orange, ...Paddings.p.p10, ...BorderRadius.br5, width: '43%', alignItems: 'center' }}>
// //                   <Text style={{ color: Colors.white, fontSize: FontSizes.tinymedium, fontWeight: FontWeights.semiBold }}>OnewayTrip</Text>
// //                 </TouchableOpacity>
// //               </View>
// //             </View>
// //           </ScrollView>
// //         </View>
// //       </Modal>
// //       <View style={{ flex: 1, ...Margins.mt.mt20 }}>
// //         <View style={styles.RoundTripView}>
// //           <TouchableOpacity
// //             onPress={() => handleOptionSelect('Roundtrip')}
// //             style={[
// //               styles.optionContainer,
// //               {
// //                 backgroundColor: selectedOption === 'Roundtrip' ? Colors.primary : Colors.white,
// //                 borderWidth: selectedOption !== 'Roundtrip' ? 1 : 0,
// //                 borderColor: selectedOption !== 'Roundtrip' ? Colors.primary : Colors.white,
// //                 borderRadius: 3,
// //               }
// //             ]}
// //           >
// //             <View style={styles.roudtripcontainer}>
// //               <Text style={[

// //                 { color: selectedOption === 'Roundtrip' ? Colors.primary : Colors.primary, position: 'absolute', }
// //               ]}>
// //                 Round Trip
// //               </Text>
// //               <View style={{ left: 50 }}>
// //                 <Image
// //                   source={require('../../assets/images/rt_icon.png')}
// //                   resizeMode={'cover'}
// //                   style={{ width: 22, height: 22, ...BorderWidths.bl.bl1, borderLeftColor: Colors.white }}
// //                 />
// //               </View>
// //             </View>
// //             <View style={styles.overlayIconContainer}>
// //               <Image
// //                 source={
// //                   selectedOption === 'Roundtrip'
// //                     ? require('../../assets/images/white-circlebg_bg.png')
// //                     : require('../../assets/images/blue-circlebg_bg.png')
// //                 }
// //                 style={{ height: '56.5%', width: 53.9, ...Margins.mb.mb8, ...Margins.mh.mh5 }}
// //               />
// //             </View>
// //           </TouchableOpacity>
// //           {/* Option 2 */}
// //           <TouchableOpacity
// //             onPress={() => handleOptionSelect('Onewaytrip')}
// //             style={[
// //               styles.optionContainer,
// //               {
// //                 backgroundColor: selectedOption === 'Onewaytrip' ? Colors.primary : Colors.white,
// //                 borderWidth: selectedOption !== 'Onewaytrip' ? 1 : 0,
// //                 borderColor: selectedOption !== 'Onewaytrip' ? Colors.primary : Colors.white,
// //                 borderRadius: 3
// //               }
// //             ]}
// //           >
// //             <View style={styles.imageContainer}>
// //               <View style={{ left: 57 }}>
// //                 <Image
// //                   source={require('../../assets/images/rt_icon.png')}
// //                   resizeMode={'cover'}
// //                   style={{ width: 22, height: 22 }}
// //                 />
// //               </View>
// //               <Text style={[
// //                 styles.overlayText,
// //                 { color: selectedOption === 'Onewaytrip' ? Colors.primary : Colors.primary, position: 'absolute' }
// //               ]}>
// //                 One WayTrip
// //               </Text>
// //             </View>
// //             <View style={styles.overlayIconContainer}>
// //               <Image
// //                 source={
// //                   selectedOption === 'Onewaytrip'
// //                     ? require('../../assets/images/arrow_fade_blue.png')
// //                     : require('../../assets/images/arrow-right-tatd.png')
// //                 }
// //                 style={{ height: '50%', width: 50, ...Margins.mb.mb10 }}
// //               />
// //             </View>
// //           </TouchableOpacity>
// //         </View>
// //         {
// //           selectedOption === 'Onewaytrip' ? <Text style={{ color: Colors.icon, fontSize: FontSizes.xbody, ...Paddings.p.p10, ...Margins.mh.mh30, ...Margins.mt.mt20, fontWeight: FontWeights.regular }}>SELECT YOUR DISTANCE</Text>
// //             : <Text style={{ color: Colors.icon, fontSize: FontSizes.xbody, ...Paddings.p.p10, ...Margins.mh.mh30, fontWeight: FontWeights.regular, ...Margins.mt.mt20 }}>SELECT YOUR HOURS</Text>
// //         }
// //       </View>

// //       {
// //         selectedOption === 'Roundtrip' ?
// //           <View style={{ flex: 1 }}>
// //           <View style={styles.mainContainer}>
// //             <View style={styles.labelContainer}>
// //               <View style={styles.dot} />
// //               <Text style={styles.labelText}>Hours</Text>
// //             </View>
// //             <View style={styles.containerSelectHour}>
// //               <View style={styles.pickerContainer}>
// //                 <Picker
// //                   selectedValue={selectedHour}
// //                   onValueChange={handleValueChange}
// //                   style={styles.picker}
// //                   dropdownIconColor={Colors.white}
// //                 >
// //                   <Picker.Item label={'Select'} value={''} style={{ fontSize: FontSizes.xsmall }} />
// //                   {Array.from({ length: 12 }, (_, i) => (
// //                     <Picker.Item key={i + 1} label={`${i + 1} Hour`} value={`${i + 1}`} style={{ fontSize: FontSizes.small }} />
// //                   ))}
// //                 </Picker>
// //               </View>
// //             </View>
// //             {validationErrors.selectedHour && <Text style={styles.errorText}>{validationErrors.selectedHour}</Text>}
// //           </View>
// //           <View style={{ justifyContent: 'center', alignItems: 'center', ...Margins.mt.mt25 }}>
// //             {coupondata?.coupon_value ? (
// //               <View style={{ flexDirection: 'row', alignItems: 'center' }}>
// //                 <View style={{ flexDirection: 'row' }}>
// //                   <Text style={{ color: Colors.primary, fontSize: FontSizes.large, fontWeight: FontWeights.regular, ...Margins.ml.ml40 }}>₹{finalamount}</Text>
// //                 </View>
// //                 <Text style={styles.strikethroughText}>₹{budgetdata?.budget}</Text>
// //               </View>
// //             ) : (
// //               <View style={{ flexDirection: 'row', alignItems: 'center' }}>
// //                 <Text style={{ color: Colors.primary, fontSize: FontSizes.large, fontWeight: FontWeights.regular }}>{budgetdata?.budget}</Text>
// //               </View>
// //             )}
// //             <TouchableOpacity onPress={openModalHour}>
// //               <Text style={{ color: Colors.primary, fontSize: FontSizes.small }}>View Details</Text>
// //             </TouchableOpacity>
// //           </View>
// //           <View style={{ ...Margins.mv.mv35 }}>
// //             <View style={{ flexDirection: 'row', ...BorderWidths.bw.bw1, borderColor: Colors.grey, ...Margins.mh.mh15 }}>
// //               <View style={{ justifyContent: 'center', ...Paddings.ph.ph10, alignItems: 'center', ...BorderWidths.br.br1, borderRightColor: Colors.grey }}>
// //                 <Ionicons name="person" color={Colors.icon} size={16} style={{ alignItems: 'center' }} />
// //               </View>
// //               <TextInput
// //                    style={[styles.input, validationErrors.name && styles.errorInput]}
// //                 onChangeText={(name) => setName(name)}
// //                 value={name}
// //                 placeholder="Name"
// //                 keyboardType="text"
// //                 placeholderTextColor={Colors.black}
// //               />
// //                <RBSheet
// // ref={refRBSheet}
// // useNativeDriver={true}
// // customStyles={{
// //   container: {
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     height: 260,
// //     borderTopLeftRadius: 20,
// //     borderTopRightRadius: 20,
// //   },
// //   wrapper: {
// //     backgroundColor: 'transparent',
// //   },
// //   draggableIcon: {
// //     backgroundColor: '#000',
// //   },
// // }}
// // customModalProps={{
// //   animationType: 'slide',
// //   statusBarTranslucent: true,
// // }}
// // customAvoidingViewProps={{
// //   enabled: false,
// // }}>
// // <View style={{...Margins.mh.mh20}}>
// //   <View style={{}}>
// //     <TouchableOpacity
// //       style={{
// //         justifyContent: 'flex-end',
// //         alignItems: 'flex-end',
// //         ...Margins.mb.mb10,
// //       }}
// //       onPress={() => refRBSheet.current.close()}>
// //       <Ionicons
// //         name="close-outline"
// //         color={Colors.darkgrey}
// //         size={24}
// //         style={{alignItems: 'center'}}
// //       />
// //     </TouchableOpacity>
// //     <View style={styles.buttonsContainer}>
// //       <View style={styles.buttonContainer}>
// //         <Button
// //           mode="contained"
// //           style={[
// //             styles.button,
// //             styles.confirmButton,
// //             isStandardOptionSelected
// //               ? styles.activeButton
// //               : styles.inactiveButton,
// //           ]}
// //           onPress={selectStandardOption}
// //           labelStyle={
// //             isStandardOptionSelected
// //               ? styles.activeText
// //               : styles.inactiveText
// //           }>
// //           {buttonNames.standard}
// //         </Button>
// //         <Button
// //           mode="contained"
// //           style={[
// //             styles.button,
// //             styles.confirmButton,
// //             isLuxuryOptionSelected
// //               ? styles.activeButton
// //               : styles.inactiveButton,
// //           ]}
// //           onPress={selectLuxuryOption}
// //           labelStyle={
// //             isLuxuryOptionSelected
// //               ? styles.activeText
// //               : styles.inactiveText
// //           }>
// //           {buttonNames.luxury}
// //         </Button>
// //       </View>
// //       {isStandardOptionSelected ? (
// //         <View
// //           style={{
// //             ...BorderWidths.bl.bl1,
// //             borderLeftColor: Colors.darkgrey,
// //             ...BorderWidths.bb.bb1,
// //             borderBottomColor: Colors.darkgrey,
// //             ...BorderWidths.br.br1,
// //             borderRightColor: Colors.darkgrey,
// //           }}>
// //           <TouchableOpacity
// //             value="Standard-Manual"
// //             status={
// //               selectedSubOption === 'Standard-Manual'
// //                 ? 'checked'
// //                 : 'unchecked'
// //             }
// //             onPress={() => {
// //               selectSubOption('Standard-Manual'),
// //                 refRBSheet.current.close();
// //             }}
// //             size={5}
// //             uncheckedColor={Colors.darkgrey}
// //             color={Colors.darkblue}
// //             style={{
// //               flexDirection: 'row',
// //               justifyContent: 'space-between',
// //               ...Margins.m.m10,
// //               alignItems: 'center',
// //             }}>
// //             <View
// //               style={{
// //                 flexDirection: 'row',
// //                 alignItems: 'center',
// //               }}>
// //               <Image
// //                 source={require('../../assets/images/hatchback.png')}
// //                 style={{width: 70, height: 30}}
// //               />
// //               <Text style={styles.radioButtonTextStandard}>
// //                 Manual
// //               </Text>
// //             </View>
// //             <RadioButton
// //               value="Standard-Manual"
// //               status={
// //                 selectedSubOption === 'Standard-Manual'
// //                   ? 'checked'
// //                   : 'unchecked'
// //               }
// //               onPress={() => {
// //                 selectSubOption('Standard-Manual'),
// //                   refRBSheet.current.close();
// //               }}
// //               size={5}
// //               uncheckedColor={Colors.darkgrey}
// //               color={Colors.darkblue}
// //             />
// //           </TouchableOpacity>
// //           <Divider width={1} />
// //           <TouchableOpacity
// //             value="Standard-Auto"
// //             status={
// //               selectedSubOption === 'Standard-Auto'
// //                 ? 'checked'
// //                 : 'unchecked'
// //             }
// //             onPress={() => {
// //               selectSubOption('Standard-Auto'),
// //                 refRBSheet.current.close();
// //             }}
// //             uncheckedColor={Colors.darkgrey}
// //             color={Colors.darkblue}
// //             style={{
// //               flexDirection: 'row',
// //               justifyContent: 'space-between',
// //               ...Margins.m.m10,
// //               alignItems: 'center',
// //             }}>
// //             <View
// //               style={{
// //                 flexDirection: 'row',
// //                 alignItems: 'center',
// //               }}>
// //               <Image
// //                 source={require('../../assets/images/hatchback.png')}
// //                 style={{width: 70, height: 30}}
// //               />
// //               <Text style={styles.radioButtonText}>
// //                 Automatic
// //               </Text>
// //             </View>
// //             <RadioButton
// //               value="Standard-Auto"
// //               status={
// //                 selectedSubOption === 'Standard-Auto'
// //                   ? 'checked'
// //                   : 'unchecked'
// //               }
// //               onPress={() => {
// //                 selectSubOption('Standard-Auto'),
// //                   refRBSheet.current.close();
// //               }}
// //               uncheckedColor={Colors.darkgrey}
// //               color={Colors.darkblue}
// //             />
// //           </TouchableOpacity>
// //         </View>
// //       ) : (
// //         <View
// //           style={{
// //             ...BorderWidths.bl.bl1,
// //             borderLeftColor: Colors.darkgrey,
// //             ...BorderWidths.bb.bb1,
// //             borderBottomColor: Colors.darkgrey,
// //             ...BorderWidths.br.br1,
// //             borderRightColor: Colors.darkgrey,
// //           }}>
// //           <TouchableOpacity
// //            value="Luxury-Manual"
// //            status={
// //              selectedSubOption === 'Luxury-Manual'
// //                ? 'checked'
// //                : 'unchecked'
// //            }
// //            onPress={() => {
// //              selectSubOption('Luxury-Manual'),
// //                refRBSheet.current.close();
// //            }}
// //            uncheckedColor={Colors.darkgrey}
// //            color={Colors.darkblue}

// //             style={{
// //               flexDirection: 'row',
// //               justifyContent: 'space-between',
// //               ...Margins.m.m10,
// //             }}>
// //             <View
// //               style={{
// //                 flexDirection: 'row',
// //                 alignItems: 'center',
// //               }}>
// //               <Image
// //                 source={require('../../assets/images/hatchback.png')}
// //                 style={{width: 70, height: 30}}
// //               />
// //               <Text style={styles.radioButtonTextStandard}>
// //                 Manual
// //               </Text>
// //             </View>
// //             <RadioButton
// //               value="Luxury-Manual"
// //               status={
// //                 selectedSubOption === 'Luxury-Manual'
// //                   ? 'checked'
// //                   : 'unchecked'
// //               }
// //               onPress={() => {
// //                 selectSubOption('Luxury-Manual'),
// //                   refRBSheet.current.close();
// //               }}
// //               uncheckedColor={Colors.darkgrey}
// //               color={Colors.darkblue}
// //             />
// //           </TouchableOpacity>
// //           <Divider width={1} />
// //           <TouchableOpacity
// //           value="Luxury-Auto"
// //           status={
// //             selectedSubOption === 'Luxury-Auto'
// //               ? 'checked'
// //               : 'unchecked'
// //           }
// //           onPress={() => {
// //             selectSubOption('Luxury-Auto'),
// //               refRBSheet.current.close();
// //           }}
// //           uncheckedColor={Colors.darkgrey}
// //           color={Colors.darkblue}
// //             style={{
// //               flexDirection: 'row',
// //               justifyContent: 'space-between',
// //               ...Margins.m.m10,
// //             }}>
// //             <View
              
// //               style={{
// //                 flexDirection: 'row',
// //                 alignItems: 'center',
// //               }}>
// //               <Image
// //                 source={require('../../assets/images/hatchback.png')}
// //                 style={{
// //                   width: 70,
// //                   height: 30,
// //                   justifyContent: 'flex-end',
// //                 }}
// //               />
// //               <Text style={styles.radioButtonText}>
// //                 Automatic
// //               </Text>
// //             </View>
// //             <RadioButton
// //               value="Luxury-Auto"
// //               status={
// //                 selectedSubOption === 'Luxury-Auto'
// //                   ? 'checked'
// //                   : 'unchecked'
// //               }
// //               onPress={() => {
// //                 selectSubOption('Luxury-Auto'),
// //                   refRBSheet.current.close();
// //               }}
// //               uncheckedColor={Colors.darkgrey}
// //               color={Colors.darkblue}
// //             />
// //           </TouchableOpacity>
// //         </View>
// //       )}
// //     </View>
// //   </View>
// // </View>
// // </RBSheet>
// //             </View>
// //             {validationErrors.name && <Text style={styles.errorText}>{validationErrors.name}</Text>}
// //             <View style={{ flexDirection: 'row', ...Margins.mv.mv15, ...Margins.mh.mh15, width: '100%' }}>
// //               <View style={{ flexDirection: 'row', ...BorderWidths.bw.bw1, borderColor: Colors.grey, width: '44%' }}>
// //                 <View style={{ justifyContent: 'center', ...Paddings.ph.ph10, alignItems: 'center', ...BorderWidths.br.br1, borderRightColor: Colors.grey }}>
// //                   <Ionicons name="call" color={Colors.icon} size={16} style={{ alignItems: 'center' }} />
// //                 </View>
// //                 <TextInput
// //                   style={styles.input}
// //                   value={mobileNumber}
// //                   placeholder="Mobile Number"
// //                   keyboardType="numeric"
// //                   placeholderTextColor={Colors.black}
// //                 />
// //               </View>
// //               <View style={{ flexDirection: 'row', ...BorderWidths.bw.bw1, borderColor: Colors.grey, width: '45%', ...Margins.mh.mh10 }}>
// //             <View style={{ justifyContent: 'center', ...Paddings.ph.ph10, alignItems: 'center', ...BorderWidths.br.br1, borderRightColor: Colors.grey }}>
// //               <MaterialCommunityIcons name="car" color={Colors.icon} size={16} style={{ alignItems: 'center' }} />
// //             </View>
// //             <TouchableOpacity
// //               onPress={() => refRBSheet.current.open()}
// //               style={{ ...Margins.mh.mh10, position: 'absolute', right: 0, left: 0, bottom: 0, top: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
// //             >
// //               <Text style={{ color: Colors.black, ...Margins.ml.ml30, fontSize: FontSizes.xsmall }}>
// //                 {selectedSubOption ? selectedSubOption : 'Select'}
// //               </Text>
// //               <Ionicons name="caret-down" color={Colors.black} size={14} />
// //             </TouchableOpacity>
// //             {/* {validationErrors.selectedSubOption && <Text style={styles.errorText}>{validationErrors.selectedSubOption}</Text>} */}
// //           </View>
// //           {validationErrors.selectedSubOption && <Text style={styles.errorText}>{validationErrors.selectedSubOption}</Text>}
// //             </View>
            
// //             <View style={{ flexDirection: 'row', ...BorderWidths.bw.bw1, borderColor: Colors.grey, ...Margins.mh.mh15 }}>
// //               <View style={{ justifyContent: 'center', ...Paddings.ph.ph10, alignItems: 'center', ...BorderWidths.br.br1, borderRightColor: Colors.grey }}>
// //                 <MaterialCommunityIcons name="map-marker" color={Colors.icon} size={16} style={{ alignItems: 'center' }} />
// //               </View>
// //               <TextInput
// //                 style={[styles.input, validationErrors.pickupAddress && styles.errorInput]}
// //                 onChangeText={(pickupAddress) => setPickupAddress(pickupAddress)}
// //                 value={pickupAddress}
// //                 placeholder="Enter Pickup Address"
// //                 keyboardType="text"
// //                 placeholderTextColor={Colors.black}
// //               />
// //             </View>
// //             {validationErrors.pickupAddress && <Text style={styles.errorText}>{validationErrors.pickupAddress}</Text>}
// //             <View style={{ flexDirection: 'row', ...Margins.mt.mt11, ...Margins.mh.mh15, width: '100%' }}>
// //   <View style={{ ...BorderWidths.bw.bw1, borderColor: Colors.grey, width: '54%', height: 40 }}>
// //     <View style={{ flexDirection: 'row', width: '100%', height: '100%' }}>
// //       <View style={{ justifyContent: 'center', ...Paddings.ph.ph10, alignItems: 'center', ...BorderWidths.br.br1, borderRightColor: Colors.grey }}>
// //         <MaterialIcons name="calendar-month" color={Colors.icon} size={16} style={{ alignItems: 'center' }} />
// //       </View>
// //       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
// //         <Picker
// //           selectedValue={selectedDate}
// //           onValueChange={(itemValue) => setSelectedDate(itemValue)}
// //           style={[styles.pickerDate, validationErrors.selectedDate && styles.errorInput]}
// //           dropdownIconColor={Colors.black}
// //           itemStyle={{ color: Colors.black, fontSize: FontSizes.small }}
// //         >
// //           <Picker.Item label={'Today'} value={''} style={{ fontSize: FontSizes.xsmall }} />
// //           {dates.map((date, index) => (
// //             <Picker.Item key={index} label={date} value={date} style={{ color: Colors.black, fontSize: FontSizes.tinymedium }} />
// //           ))}
// //         </Picker>
// //         {selectedDate === '' && <Text style={styles.placeholderText}>Today</Text>}
// //       </View>
// //     </View>
// //     {validationErrors.selectedDate && <Text style={styles.errorText}>{validationErrors.selectedDate}</Text>}
// //   </View>

// //   <View style={{ width: '40%' }}>
// //     <View style={{ ...BorderWidths.bw.bw1, borderColor: Colors.grey, ...Margins.mh.mh8, alignItems: 'center' }}>
// //       <View style={{ flexDirection: 'row', height: 38, alignItems: 'center', width: '100%' }}>
// //         <Picker
// //           selectedValue={selectedTime}
// //           onValueChange={(itemValue) => setSelectedTime(itemValue)}
// //           style={[styles.pickerTime, validationErrors.selectedTime && styles.errorInput]}
// //           dropdownIconColor={Colors.black}
// //           itemStyle={{ color: Colors.black, fontSize: FontSizes.tiny }}
// //         >
// //           <Picker.Item label={'Time'} value={''} style={{ fontSize: FontSizes.tinymedium }} />
// //           {times.map((time, index) => (
// //             <Picker.Item key={index} label={time} value={time} style={{ color: Colors.black, fontSize: FontSizes.tinymedium }} />
// //           ))}
// //         </Picker>
// //         {selectedTime === '' && <Text style={styles.placeholderText}>Time</Text>}
// //       </View>
// //     </View>
// //     {validationErrors.selectedTime && <Text style={styles.errorText}>{validationErrors.selectedTime}</Text>}
// //   </View>
// // </View>
// //           </View>
// //           <View style={{ justifyContent: 'center', alignItems: 'center', ...Paddings.ph.ph20 }}>
// //             <DropShadow
// //               style={{
// //                 shadowColor: '#171717',
// //                 shadowOffset: { width: 2, height: 6 },
// //                 shadowOpacity: 0.2,
// //                 shadowRadius: 3,
// //                 elevation: 20,
// //               }}
// //             >
// //               <TouchableOpacity
// //                 onPress={handleBooking}
// //                 style={{ justifyContent: 'center', backgroundColor: '#16588e', alignItems: 'center', ...Paddings.p.p10, borderRadius: 5, ...Paddings.ph.ph20, width: '80%',marginBottom:10 }}
// //               >
// //                 <Text style={{ color: Colors.white, fontSize: FontSizes.tinymedium, ...Paddings.ph.ph20, fontWeight: FontWeights.semiBold }}>Book Now</Text>
// //               </TouchableOpacity>
// //             </DropShadow>
// //           </View>
// //         </View>
// //           :
// //           //second============
// //           <View>
// //             <View style={styles.mainContainer}>
// //               <View style={styles.labelContainer}>
// //                 <View style={styles.dotGreen} />
// //                 <Text style={styles.labelText}>Distance</Text>
// //               </View>
// //               <View style={styles.containerSelectHour}>
// //                 <View style={styles.pickerContainer}>
// //                   <Picker
// //                     selectedValue={selectedHour}
// //                     onValueChange={(itemValue) => setSelectedHour(itemValue)}
// //                     style={styles.picker}
// //                     dropdownIconColor={Colors.white}

// //                   >
// //                     {Array.from({ length: 14 }, (_, i) => (
// //                       <Picker.Item key={i} label={`${(i + 1) * 5} km`} value={`${(i + 1) * 5}`} style={{ fontSize: FontSizes.tinymedium }} />
// //                     ))}
// //                   </Picker>
// //                 </View>
// //               </View>
// //             </View>
// //             <View style={{ justifyContent: 'center', alignItems: 'center', ...Margins.mt.mt25 }}>
// //               <View style={{ flexDirection: 'row', alignItems: 'center' }}>
// //                 <Text style={{ color: Colors.primary, fontSize: FontSizes.large, fontWeight: FontWeights.regular }}>₹400</Text>
// //               </View>
// //               <TouchableOpacity>
// //                 <Text style={{ color: Colors.primary, fontSize: FontSizes.small }}>View Details</Text>
// //               </TouchableOpacity>
// //             </View>
// //             <View style={{ ...Margins.mv.mv30 }}>
// //               <View style={{ flexDirection: 'row', justifyContent: 'space-between', ...Margins.mh.mh15 }}>
// //                 <View style={{ flexDirection: 'row', ...BorderWidths.bw.bw1, borderColor: Colors.grey, width: '48%' }}>
// //                   <View style={{
// //                     justifyContent: 'center', ...Paddings.ph.ph10, alignItems: 'center', ...BorderWidths.br.br1, borderRightColor: Colors.grey
// //                   }}>
// //                     <Ionicons name="person" color={Colors.icon} size={16} style={{ alignItems: 'center' }} />
// //                   </View>
// //                   <TextInput
// //                     style={styles.input}
// //                     onChangeText={(name) => setName(name)}
// //                     value={name}
// //                     placeholder="Name"
// //                     keyboardType="text"
// //                     placeholderTextColor={Colors.black}
// //                   />
// //                 </View>
// //                 <View style={{ flexDirection: 'row', ...BorderWidths.bw.bw1, borderColor: Colors.grey, width: '49%', }}>
// //                   <View style={{
// //                     justifyContent: 'center', ...Paddings.ph.ph10, alignItems: 'center', ...BorderWidths.br.br1, borderRightColor: Colors.grey
// //                   }}>
// //                     <Ionicons name="call" color={Colors.icon} size={16} style={{ alignItems: 'center' }} />
// //                   </View>
// //                   <TextInput
// //                     style={styles.input}
// //                     onChangeText={(mobileNumber) => setMobileNumber(mobileNumber)}
// //                     value={mobileNumber}
// //                     placeholder="Mobile Number"
// //                     keyboardType="numeric"
// //                     placeholderTextColor={Colors.black}
// //                   />
// //                 </View>
// //               </View>
// //               <View style={{ flexDirection: 'row', ...Margins.mt.mt15, ...Margins.mh.mh15, }}>
// //                 <View style={{ flexDirection: 'row', ...BorderWidths.bw.bw1, borderColor: Colors.grey, width: '60%', height: 40 }}>
// //                   <View style={{
// //                     justifyContent: 'center', ...Paddings.ph.ph10, alignItems: 'center', ...BorderWidths.br.br1, borderRightColor: Colors.grey
// //                   }}>
// //                     <MaterialIcons name="calendar-month" color={Colors.icon} size={16} style={{ alignItems: 'center' }} />
// //                   </View>
// //                   <View style={{ justifyContent: 'center', alignItems: 'center' }}>
// //                     <Picker
// //                       selectedValue={selectedDate}
// //                       onValueChange={(itemValue) => setSelectedDate(itemValue)}
// //                       style={styles.pickerDate}
// //                       dropdownIconColor={Colors.black}
// //                       itemStyle={{ color: Colors.white, fontSize: FontSizes.small }}
// //                     >
// //                       <Picker.Item label={'Today'} value={''} style={{ fontSize: FontSizes.xsmall }} />
// //                       {dates.map((date, index) => (
// //                         <Picker.Item key={index} label={date} value={date} style={{ color: Colors.black, fontSize: FontSizes.tinymedium }} />
// //                       ))}
// //                     </Picker>
// //                     {selectedDate === '' && (
// //                       <Text style={styles.placeholderText}>Select date</Text>
// //                     )}
// //                   </View>
// //                 </View>
// //                 <View style={{ flexDirection: 'row', ...BorderWidths.bw.bw1, borderColor: Colors.grey, width: '37%', ...Margins.mh.mh10, alignItems: 'center' }}>
// //                   <View>
// //                     <Picker
// //                       selectedValue={selectedTime}
// //                       onValueChange={(itemValue) => setSelectedTime(itemValue)}
// //                       style={styles.pickerTime}
// //                       dropdownIconColor={Colors.black}
// //                       itemStyle={{ color: Colors.black, fontSize: FontSizes.tiny }}
// //                     >
// //                       <Picker.Item label={'Time'} value={''} style={{ fontSize: FontSizes.xsmall }} />
// //                       {times.map((time, index) => (
// //                         <Picker.Item key={index} label={time} value={time} style={{ color: Colors.black, fontSize: FontSizes.tinymedium }} />
// //                       ))}
// //                     </Picker>
// //                     {selectedTime === '' && (
// //                       <Text style={styles.placeholderText}>time</Text>
// //                     )}
// //                   </View>
// //                 </View>
// //               </View>
            
// //               <RBSheet
// //               ref={refRBSheet}
// //               useNativeDriver={true}
// //               customStyles={{
// //                 container: {
// //                   justifyContent: 'center',
// //                   alignItems: 'center',
// //                   height: 260,
// //                   borderTopLeftRadius: 20,
// //                   borderTopRightRadius: 20,
// //                 },
// //                 wrapper: {
// //                   backgroundColor: 'transparent',
// //                 },
// //                 draggableIcon: {
// //                   backgroundColor: '#000',
// //                 },
// //               }}
// //               customModalProps={{
// //                 animationType: 'slide',
// //                 statusBarTranslucent: true,
// //               }}
// //               customAvoidingViewProps={{
// //                 enabled: false,
// //               }}>
// //               <View style={{...Margins.m.m20}}>
// //                 <TouchableOpacity
// //                   style={{
// //                     justifyContent: 'flex-end',
// //                     alignItems: 'flex-end',
// //                     ...Margins.mb.mb20,
// //                   }}
// //                   onPress={() => refRBSheet.current.close()}>
// //                   <Ionicons
// //                     name="close-outline"
// //                     color={Colors.darkgrey}
// //                     size={24}
// //                     style={{alignItems: 'center'}}
// //                   />
// //                 </TouchableOpacity>
// //                 <Divider width={1} />
// //                 <View style={styles.buttonContainer}>
// //                   <Button
// //                     mode="contained"
// //                     style={[
// //                       styles.button,
// //                       styles.confirmButton,
// //                       isStandardOptionSelectedoneway
// //                         ? styles.activeButton
// //                         : styles.inactiveButton,
// //                     ]}
// //                     onPress={selectStandardOptiononeway}
// //                     labelStyle={
// //                       isStandardOptionSelectedoneway
// //                         ? styles.activeText
// //                         : styles.inactiveText
// //                     }>
// //                     Standard
// //                   </Button>
// //                   <Button
// //                     mode="contained"
// //                     style={[
// //                       styles.button,
// //                       styles.confirmButton,
// //                       isLuxuryOptionSelectedoneway
// //                         ? styles.activeButton
// //                         : styles.inactiveButton,
// //                     ]}
// //                     onPress={selectLuxuryOptiononeway}
// //                     labelStyle={
// //                       isLuxuryOptionSelectedoneway
// //                         ? styles.activeText
// //                         : styles.inactiveText
// //                     }>
// //                     Luxury
// //                   </Button>
// //                 </View>
// //                 {isStandardOptionSelectedoneway ? (
// //                   <View
// //                     style={{
// //                       ...BorderWidths.bl.bl1,
// //                       borderLeftColor: Colors.darkgrey,
// //                       ...BorderWidths.bb.bb1,
// //                       borderBottomColor: Colors.darkgrey,
// //                       ...BorderWidths.br.br1,
// //                       borderRightColor: Colors.darkgrey,
// //                     }}>
// //                     <TouchableOpacity
// //                       value="Standard-Manual"
// //                       status={
// //                         selectedSubOptiononeway === 'Standard-Manual'
// //                           ? 'checked'
// //                           : 'unchecked'
// //                       }
// //                       onPress={() => {
// //                         selectSubOptiononeway('Standard-Manual'),
// //                           refRBSheet.current.close();
// //                       }}
// //                       uncheckedColor={Colors.darkgrey}
// //                       color={Colors.darkblue}
// //                       style={{
// //                         flexDirection: 'row',
// //                         justifyContent: 'space-between',
// //                         ...Margins.m.m10,
// //                       }}>
// //                       <View
// //                         style={{flexDirection: 'row', alignItems: 'center'}}>
// //                         <Image
// //                           source={require('../../assets/images/hatchback.png')}
// //                           style={{width: 70, height: 30}}
// //                         />
// //                         <Text style={styles.radioButtonTextStandard}>
// //                           Manual
// //                         </Text>
// //                       </View>
// //                       <RadioButton
// //                         value="Standard-Manual"
// //                         status={
// //                           selectedSubOptiononeway === 'Standard-Manual'
// //                             ? 'checked'
// //                             : 'unchecked'
// //                         }
// //                         onPress={() => {
// //                           selectSubOptiononeway('Standard-Manual'),
// //                             refRBSheet.current.close();
// //                         }}
// //                         uncheckedColor={Colors.darkgrey}
// //                         color={Colors.darkblue}
// //                       />
// //                     </TouchableOpacity>
// //                     <Divider width={1} />
// //                     <TouchableOpacity
// //                       value="Standard-Auto"
// //                       status={
// //                         selectedSubOptiononeway === 'Standard-Auto'
// //                           ? 'checked'
// //                           : 'unchecked'
// //                       }
// //                       onPress={() => {
// //                         selectSubOptiononeway('Standard-Auto'),
// //                           refRBSheet.current.close();
// //                       }}
// //                       uncheckedColor={Colors.darkgrey}
// //                       color={Colors.darkblue}
// //                       style={{
// //                         flexDirection: 'row',
// //                         justifyContent: 'space-between',
// //                         ...Margins.m.m10,
// //                       }}>
// //                       <View
// //                         style={{flexDirection: 'row', alignItems: 'center'}}>
// //                         <Image
// //                           source={require('../../assets/images/hatchback.png')}
// //                           style={{width: 70, height: 30}}
// //                         />
// //                         <Text style={styles.radioButtonTextStandard}>
// //                           Automatic
// //                         </Text>
// //                       </View>
// //                       <RadioButton
// //                         value="Standard-Auto"
// //                         status={
// //                           selectedSubOptiononeway === 'Standard-Auto'
// //                             ? 'checked'
// //                             : 'unchecked'
// //                         }
// //                         onPress={() => {
// //                           selectSubOptiononeway('Standard-Auto'),
// //                             refRBSheet.current.close();
// //                         }}
// //                         uncheckedColor={Colors.darkgrey}
// //                         color={Colors.darkblue}
// //                       />
// //                     </TouchableOpacity>
// //                   </View>
// //                 ) : (
// //                   <View
// //                     style={{
// //                       ...BorderWidths.bl.bl1,
// //                       borderLeftColor: Colors.darkgrey,
// //                       ...BorderWidths.bb.bb1,
// //                       borderBottomColor: Colors.darkgrey,
// //                       ...BorderWidths.br.br1,
// //                       borderRightColor: Colors.darkgrey,
// //                     }}>
// //                     <TouchableOpacity
// //                       status={
// //                         selectedSubOptiononeway === 'Luxury-Manual'
// //                           ? 'checked'
// //                           : 'unchecked'
// //                       }
// //                       onPress={() => {
// //                         selectSubOptiononeway('Luxury-Manual'),
// //                           refRBSheet.current.close();
// //                       }}
// //                       uncheckedColor={Colors.darkgrey}
// //                       color={Colors.darkblue}
// //                       style={{
// //                         flexDirection: 'row',
// //                         justifyContent: 'space-between',
// //                         ...Margins.m.m10,
// //                       }}>
// //                       <View
// //                         style={{flexDirection: 'row', alignItems: 'center'}}>
// //                         <Image
// //                           source={require('../../assets/images/hatchback.png')}
// //                           style={{width: 70, height: 30}}
// //                         />
// //                         <Text style={styles.radioButtonTextStandard}>
// //                           Manual
// //                         </Text>
// //                       </View>
// //                       <RadioButton
// //                         value="Luxury-Manual"
// //                         status={
// //                           selectedSubOptiononeway === 'Luxury-Manual'
// //                             ? 'checked'
// //                             : 'unchecked'
// //                         }
// //                         onPress={() => {
// //                           selectSubOptiononeway('Luxury-Manual'),
// //                             refRBSheet.current.close();
// //                         }}
// //                         uncheckedColor={Colors.darkgrey}
// //                         color={Colors.darkblue}
// //                       />
// //                     </TouchableOpacity>
// //                     <Divider width={1} />
// //                     <TouchableOpacity
// //                       value="Luxury-Auto"
// //                       status={
// //                         selectedSubOptiononeway === 'Luxury-Auto'
// //                           ? 'checked'
// //                           : 'unchecked'
// //                       }
// //                       onPress={() => {
// //                         selectSubOptiononeway('Luxury-Auto'),
// //                           refRBSheet.current.close();
// //                       }}
// //                       uncheckedColor={Colors.darkgrey}
// //                       color={Colors.darkblue}
// //                       style={{
// //                         flexDirection: 'row',
// //                         justifyContent: 'space-between',
// //                         ...Margins.m.m10,
// //                       }}>
// //                       <View
// //                         style={{flexDirection: 'row', alignItems: 'center'}}>
// //                         <Image
// //                           source={require('../../assets/images/hatchback.png')}
// //                           style={{width: 70, height: 30}}
// //                         />
// //                         <Text style={styles.radioButtonTextStandard}>
// //                           Automatic
// //                         </Text>
// //                       </View>
// //                       <RadioButton
// //                         value="Luxury-Auto"
// //                         status={
// //                           selectedSubOptiononeway === 'Luxury-Auto'
// //                             ? 'checked'
// //                             : 'unchecked'
// //                         }
// //                         onPress={() => {
// //                           selectSubOptiononeway('Luxury-Auto'),
// //                             refRBSheet.current.close();
// //                         }}
// //                         uncheckedColor={Colors.darkgrey}
// //                         color={Colors.darkblue}
// //                       />
// //                     </TouchableOpacity>
// //                   </View>
// //                 )}
// //               </View>
// //             </RBSheet>
// //               <View style={{ flexDirection: 'row', ...BorderWidths.bw.bw1, borderColor: Colors.grey, ...Margins.mh.mh15, ...Margins.mt.mt11 }}>
// //                 <View style={{
// //                   justifyContent: 'center', ...Paddings.ph.ph10, alignItems: 'center', ...BorderWidths.br.br1, borderRightColor: Colors.grey
// //                 }}>
// //                   <MaterialCommunityIcons name="map-marker" color={Colors.icon} size={16} style={{ alignItems: 'center' }} />
// //                 </View>
// //                 <TextInput
// //                   style={styles.input}
// //                   onChangeText={(pickupAddress) => setPickupAddress(pickupAddress)}
// //                   value={pickupAddress}
// //                   placeholder="Enter Pickup Address"
// //                   keyboardType="text"
// //                   placeholderTextColor={Colors.black}
// //                 />
// //               </View>
// //               <View style={{ flexDirection: 'row', ...Margins.mt.mt11, ...Margins.mh.mh15, width: '100%' }}>
// //                 <View style={{ flexDirection: 'row', ...BorderWidths.bw.bw1, borderColor: Colors.grey, width: '42%' }}>
// //                   <View style={{
// //                     justifyContent: 'center', ...Paddings.ph.ph10, alignItems: 'center', ...BorderWidths.br.br1, borderRightColor: Colors.grey
// //                   }}>
// //                     <MaterialCommunityIcons name="map-marker" color={Colors.icon} size={16} style={{ alignItems: 'center' }} />
// //                   </View>
// //                   <TextInput
// //                     style={styles.input}
// //                     onChangeText={(destination) => setDestination(destination)}
// //                     value={destination}
// //                     placeholder="Enter Destination"
// //                     keyboardType="text"
// //                     placeholderTextColor={Colors.black}
// //                   />
// //                 </View>
// //                 <View style={{ flexDirection: 'row', ...BorderWidths.bw.bw1, borderColor: Colors.grey, width: '47%', ...Margins.mh.mh10 }}>
// //                   <View style={{
// //                     justifyContent: 'center', ...Paddings.ph.ph10, alignItems: 'center', ...BorderWidths.br.br1, borderRightColor: Colors.grey
// //                   }}>
// //                     <MaterialCommunityIcons name="car" color={Colors.icon} size={16} style={{ alignItems: 'center' }} />
// //                   </View>
// //                   <TouchableOpacity
// //                     onPress={() => refRBSheet.current.open()}
// //                     style={{
// //                       flexDirection: 'row',
// //                       justifyContent: 'space-between',
// //                       alignItems: 'center',
// //                     }}
// //                   >
// //                     <Text
// //                       style={{
// //                         color: Colors.black,
// //                         ...Margins.mr.mr15,
// //                         fontSize: FontSizes.tinymedium,
// //                         ...Margins.mh.mh5
// //                       }}
// //                     >
// //                       {selectedSubOptiononeway}
// //                     </Text>
// //                     <Ionicons
// //                       name="caret-down"
// //                       color="black"
// //                       size={14}
// //                       style={{
// //                         position: 'absolute',
// //                         right: 0,
// //                       }}
// //                     />
// //                   </TouchableOpacity>
// //                 </View>
// //               </View>
// //             </View>
// //             <View style={{ justifyContent: 'center', alignItems: 'center', ...Paddings.ph.ph20, }}>
// //               <DropShadow style={{
// //                 shadowColor: '#171717',
// //                 shadowOffset: { width: 2, height: 6 },
// //                 shadowOpacity: 0.2,
// //                 shadowRadius: 3, elevation: 20,
// //               }}>
// //                 <TouchableOpacity onPress={() => navigation.navigate('payment')} style={{ justifyContent: 'center', backgroundColor: '#16588e', alignItems: 'center', ...Paddings.p.p10, borderRadius: 5, ...Paddings.ph.ph20, width: '80%', }}>
// //                   <Text style={{ color: Colors.white, fontSize: FontSizes.tinymedium, ...Paddings.ph.ph20, fontWeight: '700' }}>Book Now</Text>
// //                 </TouchableOpacity>
// //               </DropShadow>
// //             </View>
// //           </View>
// //       }
// //     </ScrollView>
// //   );
// // };

// // export default BookingScreen;

// // const styles = StyleSheet.create({
// //   errorInput: {
// //     borderColor: 'red',
// //   },
// //   errorText: {
// //     color: 'red',
     
// //      marginHorizontal:10
// //   },
// //   strikethroughText: {
// //     color: Colors.darkgrey,
// //     fontSize: FontSizes.medium,
// //     fontWeight: FontWeights.regular,
// //     textDecorationLine: 'line-through',
// //     ...Margins.ml.ml20,
// //   },
// //   //
// //   modalView: {
// //     margin: 20,
// //     backgroundColor: 'white',
// //     borderRadius: 20,
// //     padding: 35,
// //     alignItems: 'center',
// //     shadowColor: '#000',
// //     shadowOffset: {
// //       width: 0,
// //       height: 2
// //     },
// //     shadowOpacity: 0.25,
// //     shadowRadius: 4,
// //     elevation: 5
// //   },
// //   modalText: {
// //     marginBottom: 15,
// //     textAlign: 'center',
// //     color: Colors.black
// //   },
// //   button: {
// //     borderRadius: 20,
// //     padding: 10,
// //     elevation: 2,
// //     backgroundColor: Colors.primary
// //   },
// //   buttonText: {
// //     color: Colors.black,
// //     fontWeight: 'bold',
// //     textAlign: 'center'
// //   },
// //   mainContainer: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //     ...Margins.mh.mh30,
// //     width: '84%'
// //   },
// //   labelContainer: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //   },
// //   dot: {
// //     backgroundColor: Colors.primary,
// //     width: 5,
// //     height: 5,
// //     ...BorderRadius.br10,
// //     ...Paddings.p.p5,
// //   },
// //   dotGreen: {
// //     backgroundColor: 'green',
// //     width: 5,
// //     height: 5,
// //     ...BorderRadius.br10,
// //     ...Paddings.p.p5
// //   },
// //   labelText: {
// //     color: Colors.black,
// //     ...Margins.mh.mh7,
// //     fontSize: FontSizes.small,
// //   },
// //   containerSelectHour: {
// //     width: '34%',
// //   },
// //   picker: {
// //     height: 50,
// //     color: Colors.white,
// //   },
// //   pickerItemText: {
// //     fontSize: FontSizes.tinymedium,
// //     fontWeight: FontWeights.bold,
// //   },
// //   label: {
// //     fontSize: FontSizes.tinyxsmall,
// //     color: Colors.white,
// //     fontWeight: FontWeights.bold,
// //   },
// //   pickerContainer: {
// //     backgroundColor: Colors.orange,
// //     ...Paddings.p.p8,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// //   btn: {
// //     backgroundColor: Colors.white,
// //     height: 120,
// //     width: '49%',
// //     alignItems: 'center',
// //     justifyContent: 'flex-end',
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.50,
// //     shadowRadius: 3.84,
// //     elevation: 10
// //   },
// //   picker: {
// //     width: 130,
// //     height: 10,
// //     color: Colors.white,
// //   },
// //   pickerTime: {
// //     width: 135,
// //     height: 10,
// //     color: Colors.black,
// //     position: 'relative'
// //   },
// //   pickerDate: {
// //     width: 160,
// //     height: 10,
// //     color: Colors.black,
// //   },
// //   pickerItem: {
// //     fontSize: FontSizes.tinyxsmall,
// //     color: Colors.white,
// //     fontWeight: FontWeights.bold
// //   },
// //   roudtripcontainer: {
// //     ...Margins.mv.mv7,
// //     height: 22,
// //     position: 'absolute',
// //     width: '48%',
// //     backgroundColor: Colors.white,
// //     alignItems: 'center',
// //   },
// //   imageContainer: {
// //     ...Margins.mv.mv7,
// //     height: 22,
// //     position: 'absolute',
// //     width: '60%',
// //     backgroundColor: Colors.white,
// //     alignItems: 'center',
// //   },
// //   icon: {
// //     fontSize: FontSizes.tinyxsmall,
// //     backgroundColor: 'blue'
// //   },
// //   selectedValue: {
// //     ...Margins.mt.mt20,
// //     fontSize: FontSizes.tinyxsmall,
// //     color: Colors.white,
// //   },
// //   input: {
// //     ...Paddings.p.p4,
// //     fontSize: FontSizes.xsmall,
// //     color: Colors.black,
// //     width: '100%'
// //   },
// //   RoundTripView: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     ...Margins.mh.mh15,
// //   },
// //   oneWayView: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     ...Margins.mh.mh15
// //   },
// //   errorInput: {
// //     borderColor: 'red',
// //   },
// //   errorText: {
// //     color: 'red',
// //     fontSize: 12,
// //     marginLeft: 10,
// //   },
// //   buttonContainer: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-around',
// //     alignItems: 'center',
// //   },
// //   confirmButton: {
// //     backgroundColor: Colors.white,
// //   },
// //   activeButton: {
// //     backgroundColor: Colors.primary,
// //     borderColor: Colors.primary,
// //   },
// //   inactiveButton: {
// //     backgroundColor: Colors.white,
// //     borderColor: '#ccc',
// //     ...BorderWidths.bw.bw1,
// //   },
// //   activeText: {
// //     color: Colors.white,
// //   },
// //   inactiveText: {
// //     color: Colors.darkgrey,
// //   },
// //   buttonContainer: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-around',
// //     alignItems: 'center',
// //     ...Margins.mt.mt20,
// //   },
// //   button: {
// //     ...Paddings.pv.pv10,
// //     ...Paddings.ph.ph20,
// //   },
// //   closeButtonHour: {
// //     alignSelf: 'flex-end',
// //     ...Margins.mt.mt10,
// //     ...Margins.mb.mb20,
// //     ...BorderRadius.br20,
// //     ...BorderWidths.bw.bw2,
// //     borderColor: Colors.white,
// //     ...Paddings.p.p5,
// //   },
// //   closeButton: {
// //     backgroundColor: Colors.white,
// //   },
// //   confirmButton: {
// //     backgroundColor: Colors.white,
// //   },
// //   buttonText: {
// //     fontSize: FontSizes.medium,
// //     textAlign: 'center',
// //     color: Colors.black,
// //   },
// //   centeredView: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   modalContentBooking: {
// //     backgroundColor: Colors.lightblue,
// //     borderTopLeftRadius: 10,
// //     borderTopRightRadius: 10,
// //     ...Paddings.pb.pb20,
// //     ...Paddings.ph.ph20,
// //   },
// //   modal: {
// //     justifyContent: 'flex-end',
// //     margin: 0,
// //   },
// //   modalContent: {
// //     backgroundColor: Colors.secondary,
// //     borderTopLeftRadius: 10,
// //     borderTopRightRadius: 10,
// //     ...Paddings.pb.pb20,
// //     ...Paddings.ph.ph20,
// //   },
// //   modalView: {
// //     backgroundColor: Colors.white,
// //     ...BorderRadius.br10,
// //     ...Paddings.p.p20,
// //     shadowColor: '#000',
// //     shadowOffset: {
// //       width: 0,
// //       height: 2,
// //     },
// //     shadowOpacity: 0.25,
// //     shadowRadius: 3.84,
// //     elevation: 5,
// //   },
// //   buttonsContainer: {
// //     borderColor: Colors.darkgrey,
// //     ...Margins.mt.mt10
// //   },
// //   radioButtonTextStandard: {
// //     fontSize: FontSizes.medium,
// //     ...Margins.mh.mh20,
// //     color: Colors.darkgrey,
// //   },
// //   radioButtonText: {
// //     fontSize: FontSizes.medium,
// //     color: Colors.darkgrey,
// //     ...Margins.mh.mh20
// //   },
// //   buttonContainer: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-around',
// //     width: '100%',
// //   },
// //   button: {
// //     width: '50%',
// //     paddingVertical: 5,
// //     borderRadius: 1,
// //   },
// //   closeButton: {
// //     backgroundColor: 'red',
// //   },
// //   buttonText: {
// //     fontSize: FontSizes.medium,
// //     color: Colors.white,
// //     textAlign: 'center',
// //   },
// //   optionContainer: {
// //     width: '49%',
// //     height: 110,
// //     position: 'relative',
// //   },
// //   icon: {
// //     ...Paddings.p.p10,
// //     position: 'relative',
// //   },
// //   overlayIconContainer: {
// //     position: 'absolute',
// //     justifyContent: 'flex-end',
// //     alignItems: 'flex-end',
// //     width: '100%',
// //     height: '100%',
// //     ...Paddings.p.p10,
// //   }
// // });


































// import React, { useState, useRef,useEffect } from 'react';
// import { View, Text, ScrollView, Modal ,TouchableOpacity,Image} from 'react-native';
// import OTTHeader from '../../components/OTTHeader';
// import { Colors, FontSizes, FontWeights, Margins,Paddings,BorderRadius ,BorderWidths} from '../../assets/colors';
// import RoundTripBooking from './RoundTripBooking';
// import OnewayTripBooking from './OnewayTripBooking';
// import styles from './styles'; 
// const BookingScreen = ({ navigation,route }) => {
//   const refRBSheet = useRef();
//   const { selectedzone } = route?.params;
//  console.log('seeee2',selectedzone)
//   const [selectedOption, setSelectedOption] = useState('Roundtrip');
//   const [isModalVisibleHour, setModalVisibleHour] = useState(false);
//   const [selectedHour, setSelectedHour] = useState();
//   const [selectedDate, setSelectedDate] = useState();
//   const [selectedTime, setSelectedTime] = useState();

//   const handleOptionSelect = (option) => {
//     setSelectedOption(option);
//   };
//   const openModalHour = () => {
//     setModalVisibleHour(!isModalVisibleHour);
//   };
//   const closeModalHour = () => {
//     setModalVisibleHour(false);
//   };
//   return (
//     <ScrollView style={{ flex: 1 }}>
//       <OTTHeader navigation={navigation} title={'trusted & trained driver'} />
//       {/* <Modal
//         isVisible={isModalVisibleHour}
//         onBackdropPress={closeModalHour}
//         style={styles.modal}
//       >
//         <View style={styles.modalContentBooking}>
//           <ScrollView contentContainerStyle={styles.scrollViewContent}>
//             <TouchableOpacity onPress={closeModalHour} style={styles.closeButtonHour}>
//               <Ionicons name="close" color={Colors.white} size={24} />
//             </TouchableOpacity>
//             <View>
//               <View style={{ flexDirection: 'row', justifyContent: 'space-between', ...Margins.mh.mh20 }}>
//                 <View style={{ alignItems: 'center' }}>
//                   <Text style={{ color: Colors.white, fontSize: FontSizes.tinymedium }}>My Start & End</Text>
//                   <Text style={{ color: Colors.white, fontSize: FontSizes.tinymedium, ...Margins.mv.mv5 }}>address is<Text style={{ color: Colors.white, fontSize: FontSizes.tinymedium, fontWeight: FontWeights.semiBold }}> same</Text></Text>
//                 </View>
//                 <View style={{ alignItems: 'center' }}>
//                   <Text style={{ color: Colors.white, fontSize: FontSizes.tinymedium }}>My End address is</Text>
//                   <Text style={{ color: Colors.white, fontSize: FontSizes.tinymedium, fontWeight: FontWeights.semiBold, ...Margins.mv.mv5 }}>different</Text>
//                 </View>
//               </View>
//               <View style={{ flexDirection: 'row', justifyContent: 'space-between', ...Paddings.p.p10, alignItems: 'center' }}>
//                 <TouchableOpacity style={{ backgroundColor: Colors.orange, ...Paddings.p.p10, ...BorderRadius.br5, width: '43%', alignItems: 'center' }}>
//                   <Text style={{ color: Colors.white, fontSize: FontSizes.tinymedium, fontWeight: FontWeights.semiBold }}>Round Trip</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={{ backgroundColor: Colors.orange, ...Paddings.p.p10, ...BorderRadius.br5, width: '43%', alignItems: 'center' }}>
//                   <Text style={{ color: Colors.white, fontSize: FontSizes.tinymedium, fontWeight: FontWeights.semiBold }}>OnewayTrip</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </ScrollView>
//         </View>
//       </Modal> */}
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
//               <Text style={[{ color: selectedOption === 'Roundtrip' ? Colors.primary : Colors.primary, position: 'absolute', }]}>
//                 Round Trip
//               </Text>
//               <View style={{ left: 50 }}>
//                 <Image
//                   source={require('../../assets/images/rt_icon.png')}
//                   resizeMode={'cover'}
//                   style={{ width: 22, height: 22, ...BorderWidths.bl.bl1, borderLeftColor: Colors.white }}
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
//                 style={{ height: '56.5%', width: 53.9, ...Margins.mb.mb8, ...Margins.mh.mh5 }}
//               />
//             </View>
//           </TouchableOpacity>
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
//               <Text style={[styles.overlayText, { color: selectedOption === 'Onewaytrip' ? Colors.primary : Colors.primary, position: 'absolute' }]}>
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
//         {selectedOption === 'Onewaytrip'
//           ? <Text style={{ color: Colors.icon, fontSize: FontSizes.xbody, ...Paddings.p.p10, ...Margins.mh.mh30, ...Margins.mt.mt20, fontWeight: FontWeights.regular }}>SELECT YOUR DISTANCE</Text>
//           : <Text style={{ color: Colors.icon, fontSize: FontSizes.xbody, ...Paddings.p.p10, ...Margins.mh.mh30, fontWeight: FontWeights.regular, ...Margins.mt.mt20 }}>SELECT YOUR HOURS</Text>
//         }
//       </View>
//       {selectedOption === 'Roundtrip'
//         ? <RoundTripBooking navigation={navigation} refRBSheet={refRBSheet} openModalHour={openModalHour} selectedzone={selectedzone}/>
//         : <OnewayTripBooking navigation={navigation} refRBSheet={refRBSheet} selectedzone={selectedzone}/>}
//     </ScrollView>
//   );
// };
// export default BookingScreen;



