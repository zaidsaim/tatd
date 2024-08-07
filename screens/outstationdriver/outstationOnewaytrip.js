import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import OTTHeader from '../../components/OTTHeader';
import {
  Colors,
  FontSizes,
  FontWeights,
  Paddings,
  Margins,
  BorderWidths,
} from '../../assets/colors';
import {Picker} from '@react-native-picker/picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Button, RadioButton} from 'react-native-paper';
import {Divider} from '@rneui/base';
import Modal from 'react-native-modal';
import moment from 'moment';

import DropShadow from 'react-native-drop-shadow';
import RBSheet from 'react-native-raw-bottom-sheet';
import {refreshAccessToken, validateAccessToken} from '../../utils/validation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../hourlydriver/styles';
import {decodeTokenservice} from '../../api/services/apiService';

const OutstationDriverBookingScreen = ({navigation, selectedzone}) => {
  console.log(selectedzone, 'zzzzzzzzzzzzzz');

  const refRBSheet = useRef();
  const [selectedHour, setSelectedHour] = useState('1');
  const [selectedTime, setSelectedTime] = useState();
  const [selectedTimeOneway, setSelectedTimeOneway] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Roundtrip');
  const [isStandardSelected, setIsStandardSelected] = useState(true);
  const [isLuxurySelected, setIsLuxurySelected] = useState(false);
  const [name, setName] = useState();
  const [mobileNumber, setMobileNumber] = useState('');
  const [pickupAddress, setPickupAddress] = useState();
  const [destination, setDestination] = useState();
  const [selectedOptions, setSelectedOptions] = useState(null);
  const [isStandardOptionSelectedoneway, setIsStandardOptionSelectedoneway] =
    useState(true);
  const [isLuxuryOptionSelectedoneway, setIsLuxuryOptionSelectedoneway] =
    useState(false);
  const [selectedSubOptiononeway, setSelectedSubOptiononeway] =
    useState('Standard-Auto');
  const [selectedMainOptiononeway, setSelectedMainOptiononeway] = useState('');
  const [isStandardOptionSelected, setIsStandardOptionSelected] =
    useState(true);
  const [isLuxuryOptionSelected, setIsLuxuryOptionSelected] = useState(false);
  const [selectedSubOption, setSelectedSubOption] = useState('Standard');
  const [selectedMainOption, setSelectedMainOption] = useState('');

  {
    /*  start mohittttttttttttt*/
  }

  const [selectedDistance, setSelectedDistance] = useState();
  const [kmsData, setKmsData] = useState();
  // const [budgetdata, setBudgetdata] = useState(0);
  const [budgetdata, setBudgetdata] = useState();

  const [displayDate, setDisplayDate] = useState('');
  const [viewDetailsModal, setViewDetailsModal] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [modalVisibleDate, setModalVisibleDate] = useState(false);
  const [modalVisiblecoupon, setModalVisiblecoupon] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [getTime, setGetTime] = useState();
  const [coupondata, setCoupondata] = useState();
  const [editbooking, setEditbooking] = useState();
  const [error, setError] = useState();
  const [buttonNames, setButtonNames] = useState({
    standard: 'Standard',
    luxury: 'Luxury',
  });
  const vehicleType = isStandardOptionSelected
    ? buttonNames.standard
    : buttonNames;
  const [bookingvalidationdata, setBookingvalidationdata] = useState();
  const [initialLoad, setInitialLoad] = useState(true);
  const [decodedToken, setDecodedToken] = useState(null);
  const [selectedDate, setSelectedDate] = useState();
  useEffect(() => {
    getDecodedToken();
  }, []);
  console.log(selectedDate, 'checkdate================11111111');
  useEffect(() => {
    console.log(selectedDate, 'checkdate================1');
    if (initialLoad) {
      getTimeApi(1);
      setInitialLoad(false);
    } else {
      getTimeApi(selectedDate === 'Today' ? 1 : 0);
    }
  }, [selectedDate]);

  const getDecodedToken = async () => {
    try {
      const decoded = await decodeTokenservice();
      if (decoded) {
        setDecodedToken(decoded);
        setMobileNumber(decoded?.data?.mobile_number || '');
      }
    } catch (error) {
      console.error('Error getting decoded token:', error);
    }
  };

  // get date time API start

  // const handleValueChanges = (selectedValue) => {
  //   if (selectedValue === "Today" || selectedValue === "Tomorrow") {
  //     // Send "Today" or "Tomorrow" as it is
  //     console.log("Selected Date:", selectedValue);
  //   } else {
  //     // Handle other dates
  //     console.log("Selected Date:", selectedValue);
  //   }
  //   // Perform any other actions based on the selected value
  // };

  const handleValueChanges = newValue => {
    if (newValue === 'Today') {
      setSelectedDate('Today');
      setDisplayDate('Today');
    } else if (newValue === 'Tomorrow') {
      setSelectedDate('Tomorrow');
      setDisplayDate('Tomorrow');
    } else {
      setSelectedDate(newValue);
      setDisplayDate(newValue);
    }
  };

  useEffect(() => {
    if (initialLoad) {
      getTimeApi(1, 'Today');
      setInitialLoad(false);
    } else {
      const todayFlag = selectedDate === 'Today' ? 1 : 0;
      const date = getDateForApi(selectedDate);
      getTimeApi(todayFlag, date);
    }
  }, [selectedDate]);

  const getDateForApi = selectedDate => {
    if (selectedDate === 'Today') {
      return 'Today';
    } else if (selectedDate === 'Tomorrow') {
      return 'Tomorrow';
    } else {
      return moment(selectedDate, 'ddd, DD MMM').format('YYYY-MM-DD');
    }
  };

  console.log('selctted===========One', selectedDate);
  console.log('selected-----------time', selectedTime);

  const getTimeApi = async todayFlag => {
    try {
      const isValid = await validateAccessToken();
      if (!isValid) {
        await refreshAccessToken();
      }

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
        'https://www.tatd.in/app-api/customer/ondemand/get-time-option-api.php',
        {
          action: 'get_time_slot',
          today_flag: todayFlag,
          current_time: '',
          page: 'incity_roundtrip',
        },
        config,
      );

      if (response.data.status_code === 200) {
        setGetTime(response.data.time_slot_data);
      }
    } catch (err) {
      setError(err.message);
      console.log('Error from Time API:', err.message);
    }
  };

  const generateDates = () => {
    const dates = [];
    const today = new Date();
    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(today.getDate() + 2); // Start from the day after tomorrow
    const oneMonthLater = new Date(today);
    oneMonthLater.setMonth(today.getMonth() + 1);

    for (
      let date = new Date(dayAfterTomorrow);
      date <= oneMonthLater;
      date.setDate(date.getDate() + 1)
    ) {
      dates.push(moment(date).format('ddd, DD MMM'));
    }

    return dates;
  };

  const dates = generateDates();

  const handleValueChangesTime = newValue => {
    setSelectedTime(newValue);
    if (!newValue) {
      setValidationErrors({selectedTime: 'Time is required'});
    } else {
      setValidationErrors({});
    }
  };

  // get date time API end

  const bookingValidation = async () => {
    const isValid = await validateAccessToken();
    if (!isValid) {
      await refreshAccessToken();
    }
    try {
      const userData = await AsyncStorage.getItem('userData');
      const parsedUserData = userData ? JSON.parse(userData) : null;
      const token = parsedUserData ? parsedUserData.jwt : null;
      const bookingvalue = await AsyncStorage.getItem('bookingvalue');
      const bookingvaludata = bookingvalue ? JSON.parse(bookingvalue) : null;
      console.log(
        'bookingdata.booking_validation_id==================',
        bookingvaludata,
      );
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
        'https://www.tatd.in/app-api/customer/ondemand/get-booking-validation-data.php',
        {
          booking_validation_id: bookingvaludata,
        },
        config,
      );
      console.log('booking validation Data:', response.data);
      await AsyncStorage.setItem(
        'bookingnumber',
        JSON.stringify(
          response.data?.single_booking_validation_data?.booking_number,
        ),
      );
      setBookingvalidationdata(response.data);
    } catch (err) {
      setError(err.message);
      console.log('Error from coupon API:', err.message);
    }
  };
  const finalamount = budgetdata?.budget - coupondata?.coupon_value;

  useEffect(() => {
    getKMSApi();
  }, []);

  const getKMSApi = async () => {
    try {
      console.log('Starting KMS API call...');
      const isValid = await validateAccessToken();
      console.log('Access token validation:', isValid);

      if (!isValid) {
        await refreshAccessToken();
        console.log('Access token refreshed');
      }

      const userData = await AsyncStorage.getItem('userData');
      const parsedUserData = userData ? JSON.parse(userData) : null;
      const token = parsedUserData ? parsedUserData.jwt : null;
      const selectcitydata = await AsyncStorage.getItem('selectcityitem');
      console.log('Token:', token);
      console.log('Selected city data:', selectcitydata);

      if (!token) {
        throw new Error('No token found');
      }

      let city;
      let zone;
      console.log('Selected city :', selectcitydata);
      console.log('Selected Item booking:', selectedzone);
      if (selectcitydata === 'Mumbai') {
        city = 'Maharashtra';
        zone = selectcitydata;
      } else if (selectcitydata === 'Delhi/NCR') {
        city = 'Delhi';
        zone = selectedzone;
      } else if (selectcitydata === 'Bangalore') {
        city = 'Karnataka';
        zone = 'Bangalore';
      } else if (selectcitydata === 'Hyderabad') {
        city = 'Telangana';
        zone = 'Hyderabad';
      } else if (selectcitydata === 'Pune') {
        city = 'Maharashtra';
        zone = 'Pune';
      } else if (selectcitydata === 'Delhi') {
        city = selectcitydata;
        zone = selectedzone;
      } else if (selectcitydata === 'Haryana') {
        city = selectcitydata;
        zone = selectedzone;
      } else if (selectcitydata === 'Krnataka') {
        city = selectcitydata;
        zone = selectedzone;
      } else if (selectcitydata === 'Maharashtra') {
        city = selectcitydata;
        zone = selectedzone;
      } else if (selectcitydata === 'Telalangana') {
        city = selectcitydata;
        zone = selectedzone;
      } else if (selectcitydata === 'Uttar Pradesh') {
        city = selectcitydata;
        zone = selectedzone;
      }

      console.log('Final city:', city);
      console.log('Final zone:', zone);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.post(
        'https://www.tatd.in/app-api/customer/ondemand/get-outstation-oneway-kms.php',
        {
          category: 'Private Driver',
          city: city,
          product_type: 'Outstation',
          way: 1,
        },
        config,
      );

      console.log('KMS API response:', response.data);

      if (response.data.status_code === 200) {
        setKmsData(response.data.outstation_oneway_kms_data);
      }
    } catch (err) {
      console.error('Error from KMS API:', err.message);
      setError(err.message);
    }
  };

  useEffect(() => {
    getBudget();
  }, [selectedDistance]);

  const getBudget = async () => {
    const isValid = await validateAccessToken();
    if (!isValid) {
      await refreshAccessToken();
    }
    try {
      const userData = await AsyncStorage.getItem('userData');
      const parsedUserData = userData ? JSON.parse(userData) : null;
      const token = parsedUserData ? parsedUserData.jwt : null;
      const selectcitydata = await AsyncStorage.getItem('selectcityitem');
      if (!token) {
        throw new Error('No token found');
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      let city;
      let zone;
      console.log('Selected city :', selectcitydata);
      console.log('Selected Item booking:', selectedzone);
      if (selectcitydata === 'Mumbai') {
        city = 'Maharashtra';
        zone = selectcitydata;
      } else if (selectcitydata === 'Delhi/NCR') {
        city = 'Delhi';
        zone = selectedzone;
      } else if (selectcitydata === 'Bangalore') {
        city = 'Karnataka';
        zone = 'Bangalore';
      } else if (selectcitydata === 'Hyderabad') {
        city = 'Telangana';
        zone = 'Hyderabad';
      } else if (selectcitydata === 'Pune') {
        city = 'Maharashtra';
        zone = 'Pune';
      } else if (selectcitydata === 'Delhi') {
        city = selectcitydata;
        zone = selectedzone;
      } else if (selectcitydata === 'Haryana') {
        city = selectcitydata;
        zone = selectedzone;
      } else if (selectcitydata === 'Krnataka') {
        city = selectcitydata;
        zone = selectedzone;
      } else if (selectcitydata === 'Maharashtra') {
        city = selectcitydata;
        zone = selectedzone;
      } else if (selectcitydata === 'Telalangana') {
        city = selectcitydata;
        zone = selectedzone;
      } else if (selectcitydata === 'Uttar Pradesh') {
        city = selectcitydata;
        zone = selectedzone;
      } else {
        return;
      }
      const response = await axios.post(
        'https://www.tatd.in/app-api/customer/ondemand/get_budget.php',

        {
          category: 'Private Driver',
          city: city,
          zone: zone,
          product_type: 'Outstation',
          way: 1,
          kms: selectedDistance,
          surge: 0,
        },

        config,
      );
      console.log('Budget Data outStation:', response.data);

      console.log(
        {
          category: 'Private Driver',
          city: city,
          zone: zone,
          product_type: 'Outstation',
          way: 1,
          kms: selectedDistance,
          surge: 0,
        },
        'rrrrrrrrrrrr',
      );

      setBudgetdata(response.data);
    } catch (err) {
      setError(err.message);
      console.log('Error from getBudget API outStation:', err);
    }
  };

  const handleBooking = async () => {
    // way set storage

    await AsyncStorage.setItem('way', JSON.stringify(1));
    // way set storage
    const bookingvalue = await AsyncStorage.getItem('bookingvalue');
    const bookingvaluecheck = bookingvalue ? JSON.parse(bookingvalue) : null;
    console.log('check2222', bookingvaluecheck);
    if (bookingvaluecheck === null || bookingvaluecheck === undefined) {
      confirmBooking();
    } else {
      editBooking();
    }
  };

  const confirmBooking = async () => {
    let errors = {};
    if (!name) errors.name = 'Please Enter Name';
    if (!mobileNumber) errors.mobileNumber = 'Mobile number is required';
    if (!destination) errors.destination = 'Please Enter Address';
    if (!pickupAddress) {
      errors.pickupAddress = 'Please enter complete address';
    } else if (pickupAddress.length <= 16) {
      errors.pickupAddress =
        'Pickup address must be greater than 16 characters';
    }
    if (!selectedDate) errors.selectedDate = 'Please select date';
    if (!selectedTime) errors.selectedTime = 'Please select time';
    if (!selectedDistance) errors.selectedDistance = 'Please select distance';
    if (!selectedSubOptiononeway) {
      errors.selectedSubOptiononeway = 'Vehicle type is required';
      refRBSheet.current.open();
    }

    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    const isValid = await validateAccessToken();
    if (!isValid) {
      await refreshAccessToken();
    }

    try {
      const userData = await AsyncStorage.getItem('userData');
      const parsedUserData = userData ? JSON.parse(userData) : null;
      const token = parsedUserData ? parsedUserData.jwt : null;
      const selectcitydata = await AsyncStorage.getItem('selectcityitem');
      // const parsedDate = moment(selectedDate, 'D MMMM YYYY');
      // const formattedDate = parsedDate.isValid()

      //   ? parsedDate.format('YYYY-MM-DD')
      //   : null;

      const parsedDate =
        selectedDate === 'Today' || selectedDate === 'Tomorrow'
          ? selectedDate
          : moment(selectedDate, 'D MMMM YYYY').isValid()
          ? moment(selectedDate, 'D MMMM YYYY').format('YYYY-MM-DD')
          : null;

      // const formattedDate = parsedDate.isValid()


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
        'https://www.tatd.in/app-api/customer/ondemand/booking_validation.php?action=add',
        {
          action: 'add',
          name: name,
          mobile_number: mobileNumber,
          pickup_address: pickupAddress,
          drop_address: destination,
          city: selectcitydata,
          zone: selectedzone,
          category: 'Private Driver',
          product_type: 'Outstation',
          way: 1,
          coupon_type: coupondata?.trigger_type,
          coupon_code: coupondata?.coupon_code,
          coupon_discount: coupondata?.coupon_value,
          total_price: budgetdata?.budget,
          gst: '50',
          supply_cost: '875',
          hours: 0,
          days: 0,
          kms: selectedDistance,
          end_date: '0000-00-00',
          vehicle_type: 'Vehicle Type',
          car_model: selectedSubOptiononeway,
          pending_amount: '',
          payment_mode: '',
          pay_by: '',
          razor_order_id: '',
          payment_id: '',
          payment_amount: '',
          payment_status: '',
          add_date: '2023-06-17',
          // booking_date: formattedDate,
          booking_date: parsedDate,
          booking_time: selectedTime,
          booking_status: 'Pending',
          booking_oncall_by: 'Customer',
          booking_oncall_by_number: mobileNumber,
          booking_oncall_by_source: 'Customer',
          booking_oncall_by_subsource: '',
        },
        config,
      );



      console.log('====================================');
      console.log( {
        action: 'add',
        name: name,
        mobile_number: mobileNumber,
        pickup_address: pickupAddress,
        drop_address: destination,
        city: selectcitydata,
        zone: selectedzone,
        category: 'Private Driver',
        product_type: 'Outstation',
        way: 1,
        coupon_type: coupondata?.trigger_type,
        coupon_code: coupondata?.coupon_code,
        coupon_discount: coupondata?.coupon_value,
        total_price: budgetdata?.budget,
        gst: '50',
        supply_cost: '875',
        hours: 0,
        days: 0,
        kms: selectedDistance,
        end_date: '0000-00-00',
        vehicle_type: 'Vehicle Type',
        car_model: selectedSubOptiononeway,
        pending_amount: '',
        payment_mode: '',
        pay_by: '',
        razor_order_id: '',
        payment_id: '',
        payment_amount: '',
        payment_status: '',
        add_date: '2023-06-17',
        // booking_date: formattedDate,
        booking_date: parsedDate,
        booking_time: selectedTime,
        booking_status: 'Pending',
        booking_oncall_by: 'Customer',
        booking_oncall_by_number: mobileNumber,
        booking_oncall_by_source: 'Customer',
        booking_oncall_by_subsource: '',
      },"====================================");
      console.log('====================================');


      
      console.log('====================================');
      console.log(parsedDate ,": mohittttt");
      console.log('====================================');


      console.log('booking data:', response.data?.booking_validation_id);
      await AsyncStorage.setItem(
        'bookingvalue',
        JSON.stringify(response.data?.booking_validation_id),
      );
      if (response?.data?.booking_validation_id) {
        bookingValidation();
        navigation.navigate('payment');
      }
    } catch (err) {
      console.error('Error from coupon API:', err.message);
    }
  };

  const editBooking = async () => {
    let errors = {};
    if (!name) errors.name = 'Please Enter Name';
    if (!mobileNumber) errors.mobileNumber = 'Mobile number is required';
    if (!destination) errors.destination = 'Please Enter Address';
    if (!pickupAddress) {
      errors.pickupAddress = 'Please enter complete address';
    } else if (pickupAddress.length <= 16) {
      errors.pickupAddress =
        'Pickup address must be greater than 16 characters';
    }
    if (!selectedDate) errors.selectedDate = 'Please select date';
    if (!selectedTime) errors.selectedTime = 'Please select time';
    if (!selectedSubOptiononeway) {
      errors.selectedSubOptiononeway = 'Vehicle type is required';
      refRBSheet.current.open();
    }
    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    const isValid = await validateAccessToken();
    if (!isValid) {
      await refreshAccessToken();
    }
    try {
      const userData = await AsyncStorage.getItem('userData');
      const parsedUserData = userData ? JSON.parse(userData) : null;
      const token = parsedUserData ? parsedUserData.jwt : null;
      const selectcitydata = await AsyncStorage.getItem('selectcityitem');
      const parsedDate = selectedDate === "Today" || selectedDate === "Tomorrow"
      ? selectedDate
      : moment(selectedDate, 'D MMMM YYYY').isValid()
        ? moment(selectedDate, 'D MMMM YYYY').format('YYYY-MM-DD')
        : null;
      const bookingvalue = await AsyncStorage.getItem('bookingvalue');
      const bookingvaluedata = bookingvalue ? JSON.parse(bookingvalue) : null;
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
        'https://www.tatd.in/app-api/customer/ondemand/booking_validation.php?action=add',
        {
          action: 'edit',
          booking_validation_id: bookingvaluedata,
          name: name,
          mobile_number: mobileNumber,
          pickup_address: pickupAddress,
          drop_address: destination,
          city: selectcitydata,
          zone: selectedzone,
          category: 'Private Driver',
          product_type: 'Outstation',
          way: 1,
          coupon_type: coupondata?.trigger_type,
          coupon_code: coupondata?.coupon_code,
          coupon_discount: coupondata?.coupon_value,
          total_price: budgetdata?.budget,
          gst: '50',
          supply_cost: '875',
          hours: 0,
          days: 0,
          kms: selectedDistance,
          end_date: '0000-00-00',
          vehicle_type: vehicleType,
          car_model: selectedSubOptiononeway,
          pending_amount: '',
          payment_mode: '',
          pay_by: '',
          razor_order_id: '',
          payment_id: '',
          payment_amount: '',
          payment_status: '',
          add_date: '2023-06-17',
          // booking_date: formattedDate,
          booking_date: parsedDate,

          booking_time: selectedTime,
          booking_status: 'Pending',
          booking_oncall_by: 'Customer',
          booking_oncall_by_number: mobileNumber,
          booking_oncall_by_source: 'Customer',
          booking_oncall_by_subsource: '',
        },
        config,
      );


      
      
      console.log('====================================');
      console.log(parsedDate ,": mohittttt");
      console.log('====================================');


      console.log('edit booking data:', response.data);
      setEditbooking(response.data);
      if (response.data.status_code === 200) {
        navigation.navigate('payment');
      }
    } catch (err) {
      setError(err.message);
      console.log('Error from editbooking API:', err.message);
    }
  };

  const selectStandardOptiononeway = () => {
    setIsStandardOptionSelectedoneway(true);
    setIsLuxuryOptionSelectedoneway(false);
    setSelectedMainOptiononeway('Standard');
  };
  const selectLuxuryOptiononeway = () => {
    setIsStandardOptionSelectedoneway(false);
    setIsLuxuryOptionSelectedoneway(true);
    setSelectedMainOptiononeway('Luxury');
  };
  const selectSubOptiononeway = option => {
    setSelectedSubOptiononeway(option);
  };
  const selectStandardOption = () => {
    setIsStandardOptionSelected(true);
    setIsLuxuryOptionSelected(false);
    setSelectedMainOption('Standard');
  };
  const selectLuxuryOption = () => {
    setIsStandardOptionSelected(false);
    setIsLuxuryOptionSelected(true);
    setSelectedMainOption('Luxury');
  };
  const selectSubOption = option => {
    setSelectedSubOption(option);
  };
  const handleOptionSelects = option => {
    setSelectedOption(option);
  };
  const firstHandleSelected = option => {
    setSelectedOptions(option);
  };
  // console.log('selectedOption====', selectedOption);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const closeModal = () => {
    setIsModalVisible(false);
  };
  const handleOptionSelect = option => {
    setSelectedOption(option);
  };
  const handleStandardPress = () => {
    setIsStandardSelected(true);
    setIsLuxurySelected(false);
    setSelectedOption(null);
  };
  const handleLuxuryPress = () => {
    setIsStandardSelected(false);
    setIsLuxurySelected(true);
    setSelectedOption(null);
  };
  const handleOpenModal = option => {
    setModalContent(option);
    toggleModal();
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

  const generateTimesOneway = () => {
    const timesOneway = [];
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
      timesOneway.push(time);
      start.setMinutes(start.getMinutes() + 30);
    }
    return timesOneway;
  };

  const timesOneway = generateTimesOneway();

  const getFormattedDate = date => {
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const dayName = dayNames[date.getDay()];
    const day = date.getDate();
    const month = monthNames[date.getMonth()];

    return `${dayName}, ${day} ${month}`;
  };
  //second
  const getFormattedDateDepart = date => {
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const dayName = dayNames[date.getDay()];
    const day = date.getDate();
    const month = monthNames[date.getMonth()];

    return `${dayName}, ${day} ${month}`;
  };
  //third
  const getFormattedDateReturn = date => {
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const dayName = dayNames[date.getDay()];
    const day = date.getDate();
    const month = monthNames[date.getMonth()];

    return `${dayName}, ${day} ${month}`;
  };

  const generateDatesDepart = () => {
    const datesDepart = [];
    const today = new Date();
    const oneMonthLater = new Date();
    oneMonthLater.setMonth(today.getMonth() + 1);

    for (
      let date = new Date(today);
      date <= oneMonthLater;
      date.setDate(date.getDate() + 1)
    ) {
      datesDepart.push(getFormattedDateDepart(new Date(date)));
    }

    return datesDepart;
  };
  const generateDatesReturn = () => {
    const datesReturn = [];
    const today = new Date();
    const oneMonthLater = new Date();
    oneMonthLater.setMonth(today.getMonth() + 1);

    for (
      let date = new Date(today);
      date <= oneMonthLater;
      date.setDate(date.getDate() + 1)
    ) {
      datesReturn.push(getFormattedDateReturn(new Date(date)));
    }

    return datesReturn;
  };
  const datesDepart = generateDatesDepart();
  const datesReturn = generateDatesReturn();

  const [viewDetailsData, setViewDetailsData] = useState([]);

  useEffect(() => {
    getViewDetailsPopupData();
  }, []);

  const getViewDetailsPopupData = async () => {
    try {
      const isValid = await validateAccessToken();
      if (!isValid) {
        await refreshAccessToken();
      }

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
        'https://www.tatd.in/app-api/customer/ondemand/view-detail-popup-api.php',
        {
          action: 'view_popup',
          product_type: 'Outstation',
          way: 1,
        },
        config,
      );

      console.log(
        response.data.view_detail_data,
        'view Details Pop Data Outstation round',
      );
      if (response.data.status_code === 200) {
        setViewDetailsData(response.data.view_detail_data);
      }
    } catch (err) {
      setError(err.message);
      console.log('Error from View Details:', err.message);
    }
  };

  return (
    <ScrollView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={viewDetailsModal}
          onRequestClose={() => {
            setViewDetailsModal(!viewDetailsModal);
          }}>
          <SafeAreaView style={{flex: 1}}>
            <TouchableWithoutFeedback
              onPress={() => setViewDetailsModal(false)}>
              <View style={{alignItems: 'center', backgroundColor: 'white'}}>
                <View style={{paddingHorizontal: 20}}>
                  {Object.entries(viewDetailsData).map(([title, items]) => (
                    <React.Fragment key={title}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: 'bold',
                          marginBottom: 1,
                          color: 'black',
                          fontFamily: 'Roboto-Medium',
                        }}>
                        {title}
                      </Text>

                      <View>
                        {items.map((item, index) => (
                          <View key={index} style={{flexDirection: 'row'}}>
                            <Ionicons
                              name="chevron-forward"
                              size={17}
                              color="black"
                            />
                            <Text
                              style={{
                                fontSize: FontSizes.xsmall,
                                marginBottom: 8,
                                color: 'black',
                                fontFamily: 'Roboto-Medium',
                              }}>
                              {item}
                            </Text>
                          </View>
                        ))}
                      </View>
                    </React.Fragment>
                  ))}

                  <View
                    style={{
                      borderBottomWidth: 0.3,
                      borderBottomColor: 'black',
                    }}
                  />

                  <TouchableOpacity
                    onPress={() => setViewDetailsModal(false)}
                    style={{
                      backgroundColor: 'white',
                      paddingHorizontal: 15,
                      paddingVertical: 8,
                      borderRadius: 5,
                      alignSelf: 'center',
                      borderColor: 'black',
                      borderWidth: 0.5,
                      marginVertical: 8,
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: 'black',
                        fontFamily: 'Roboto-Medium',
                      }}>
                      Close
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </SafeAreaView>
        </Modal>
        <View style={styles.mainContainer}>
          <View style={styles.labelContainer}>
            <View style={styles.dotGreen} />
            <Text style={styles.labelText}>Distance</Text>
          </View>
          <View style={styles.containerSelectHour}>
            <View style={styles.pickerContainer}>
              {/* mohit */}
              {/* data Print  start mohit*/}

              <Picker
                selectedValue={selectedDistance}
                onValueChange={itemValue => {
                  console.log('Selected Distance:', itemValue);
                  setSelectedDistance(itemValue);
                }}
                style={styles.picker}
                dropdownIconColor="white">
                <Picker.Item
                  label={'Select'}
                  value={''}
                  style={{fontSize: FontSizes.xsmall}}
                />
                {kmsData &&
                  kmsData.map((distance, index) => (
                    <Picker.Item
                      key={index}
                      label={`${distance} km`}
                      value={distance} // Directly using distance as value
                      style={{fontSize: FontSizes.tinymedium}}
                    />
                  ))}
              </Picker>

              {/* data Print  end mohit*/}
              {/* mohit */}
            </View>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            ...Margins.mt.mt25,
          }}>
          {coupondata?.coupon_value ? (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    color: Colors.primary,
                    fontSize: FontSizes.large,
                    fontWeight: FontWeights.regular,
                    ...Margins.ml.ml40,
                  }}>
                  ₹{finalamount}
                </Text>
              </View>
              <Text style={styles.strikethroughText}>
                ₹{budgetdata?.budget}
              </Text>
            </View>
          ) : (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  color: Colors.primary,
                  fontSize: FontSizes.large,
                  fontWeight: FontWeights.regular,
                }}>
                ₹ {budgetdata?.budget ? budgetdata.budget : '0'}
              </Text>
            </View>
          )}
          <TouchableOpacity onPress={() => setViewDetailsModal(true)}>
            <Text style={{color: Colors.primary, fontSize: FontSizes.small}}>
              View Details
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{...Margins.mv.mv30}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              ...Margins.mh.mh15,
            }}>
            <View style={{width: '48%'}}>
              <View
                style={{
                  flexDirection: 'row',
                  ...BorderWidths.bw.bw1,
                  borderColor: Colors.grey,
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    ...Paddings.ph.ph10,
                    alignItems: 'center',
                    ...BorderWidths.br.br1,
                    borderRightColor: Colors.grey,
                  }}>
                  <Ionicons
                    name="person"
                    color={Colors.icon}
                    size={16}
                    style={{alignItems: 'center'}}
                  />
                </View>
                <TextInput
                  style={[
                    styles.input,
                    validationErrors.name && styles.errorInput,
                  ]}
                  onChangeText={name => setName(name)}
                  value={name}
                  placeholder="Name"
                  keyboardType="text"
                  placeholderTextColor={Colors.black}
                  multiline={true}
                  maxHeight={100}
                />
              </View>
              {validationErrors.name && (
                <Text style={[styles.errorText, {fontSize: 9}]}>
                  {validationErrors.name}
                </Text>
              )}
            </View>
            <View
              style={{
                flexDirection: 'row',
                ...BorderWidths.bw.bw1,
                borderColor: Colors.grey,
                width: '49%',
                height: 38,
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  ...Paddings.ph.ph10,
                  alignItems: 'center',
                  ...BorderWidths.br.br1,
                  borderRightColor: Colors.grey,
                }}>
                <Ionicons
                  name="call"
                  color={Colors.icon}
                  size={16}
                  style={{alignItems: 'center'}}
                />
              </View>

              <TextInput
                style={styles.input}
                value={mobileNumber}
                placeholder="Mobile Number"
                placeholderTextColor="black"
                editable={false}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              ...Margins.mt.mt11,
              ...Margins.mh.mh15,
              width: '100%',
            }}>
            <View
              style={{
                ...BorderWidths.bw.bw1,
                borderColor: Colors.grey,
                width: '54%',
                height: 40,
              }}>
              <View
                style={{flexDirection: 'row', width: '100%', height: '100%'}}>
                <View
                  style={{
                    justifyContent: 'center',
                    ...Paddings.ph.ph10,
                    alignItems: 'center',
                    ...BorderWidths.br.br1,
                    borderRightColor: Colors.grey,
                  }}>
                  <MaterialIcons
                    name="calendar-month"
                    color={Colors.icon}
                    size={16}
                    style={{alignItems: 'center'}}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => setModalVisibleDate(true)}
                    style={[
                      styles.pickerDate,
                      {
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      },
                    ]}>
                    <Text
                      style={{color: Colors.black, fontSize: FontSizes.small}}>
                      {displayDate || 'Date'}
                    </Text>
                    <Icon
                      name="arrow-drop-down"
                      size={25}
                      color={Colors.black}
                    />
                  </TouchableOpacity>

                  {/* <Modal
                    transparent={true}
                    visible={modalVisibleDate}
                    onRequestClose={() => setModalVisibleDate(false)}>
                    <View style={styles.modalOverlay}>
                      <View style={styles.modalContainer}>
                        <ScrollView>
                          <RadioButton.Group
                            onValueChange={newValue => {
                              handleValueChanges(newValue);
                              setModalVisibleDate(false);
                            }}
                            value={selectedDate}>
                            <RadioButton.Item
                              label="Today"
                              value="Today"
                              labelStyle={{
                                color: Colors.black,
                                fontSize: FontSizes.body,
                              }}
                              style={{backgroundColor: 'white'}}
                            />
                            <RadioButton.Item
                              label="Tomorrow"
                              value="Tomorrow"
                              labelStyle={{
                                color: Colors.black,
                                fontSize: FontSizes.body,
                              }}
                              style={{backgroundColor: 'white'}}
                            />
                            {Array.isArray(dates) &&
                              dates.map((date, index) => (
                                <RadioButton.Item
                                  key={index}
                                  label={date}
                                  value={date}
                                  labelStyle={{
                                    color: Colors.black,
                                    fontSize: FontSizes.body,
                                  }}
                                  style={{backgroundColor: 'white'}}
                                />
                              ))}
                          </RadioButton.Group>
                        </ScrollView>
                      </View>
                    </View>
                  </Modal> */}
                  <Modal
                    transparent={true}
                    visible={modalVisibleDate}
                    onRequestClose={() => setModalVisibleDate(false)}>
                    <View style={styles.modalOverlay}>
                      <View style={styles.modalContainer}>
                        <ScrollView>
                          <RadioButton.Group
                            onValueChange={newValue => {
                              handleValueChanges(newValue);
                              setModalVisibleDate(false);
                            }}
                            value={displayDate}>
                            <RadioButton.Item
                              label="Today"
                              value="Today"
                              labelStyle={{
                                color: Colors.black,
                                fontSize: FontSizes.body,
                              }}
                              style={{backgroundColor: 'white'}}
                            />
                            <RadioButton.Item
                              label="Tomorrow"
                              value="Tomorrow"
                              labelStyle={{
                                color: Colors.black,
                                fontSize: FontSizes.body,
                              }}
                              style={{backgroundColor: 'white'}}
                            />
                            {Array.isArray(dates) &&
                              dates.map((date, index) => (
                                <RadioButton.Item
                                  key={index}
                                  label={date}
                                  value={date}
                                  labelStyle={{
                                    color: Colors.black,
                                    fontSize: FontSizes.body,
                                  }}
                                  style={{backgroundColor: 'white'}}
                                />
                              ))}
                          </RadioButton.Group>
                        </ScrollView>
                      </View>
                    </View>
                  </Modal>
                </View>
              </View>
              {/* {validationErrors.selectedDate  && (
                <Text style={[styles.errorText, {fontSize: 9,marginLeft: 25}]}>
                  {validationErrors.selectedDate}
                </Text>
              )}
              {validationErrors.selectedTime && (
                <Text style={[styles.errorText, {fontSize: 9, marginLeft: 25}]}>
                  {validationErrors.selectedTime}
                </Text>
              )} */}
              <Text style={[styles.errorText, { fontSize: 9, marginLeft: 25 }]}>
  {validationErrors.selectedDate && validationErrors.selectedTime
    ? `${validationErrors.selectedDate} | ${validationErrors.selectedTime}`
    : validationErrors.selectedDate || validationErrors.selectedTime}
</Text>

            </View>

            <View
              style={{
                width: '35%',
                ...BorderWidths.bw.bw1,
                borderColor: Colors.grey,
                ...Margins.mh.mh10,
              }}>
              <View style={{alignItems: 'center'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    height: 38,
                    alignItems: 'center',
                    width: '100%',
                  }}>
                  <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    style={[
                      styles.pickerDate,
                      {
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      },
                    ]}>
                    <Text
                      style={{color: Colors.black, fontSize: FontSizes.small}}>
                      {selectedTime || 'Time'}
                    </Text>
                    <Icon
                      name="arrow-drop-down"
                      size={25}
                      color={Colors.black}
                      style={{marginHorizontal: 25}}
                    />
                  </TouchableOpacity>

                  <Modal
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}>
                    <View style={styles.modalOverlay}>
                      <View style={styles.modalContainer}>
                        <ScrollView>
                          <RadioButton.Group
                            onValueChange={newValue => {
                              handleValueChangesTime(newValue);
                              setModalVisible(false);
                            }}
                            value={selectedTime}>
                            <RadioButton.Item
                              label="Select Time"
                              value=""
                              labelStyle={{
                                color: Colors.black,
                                fontSize: FontSizes.body,
                              }}
                              style={{backgroundColor: 'white'}}
                            />
                            {getTime &&
                              getTime.map((time, index) => (
                                <RadioButton.Item
                                  key={index}
                                  label={time}
                                  value={time}
                                  labelStyle={{
                                    color: Colors.black,
                                    fontSize: FontSizes.body,
                                  }}
                                  style={{backgroundColor: 'white'}}
                                />
                              ))}
                          </RadioButton.Group>
                        </ScrollView>
                      </View>
                    </View>
                  </Modal>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              ...BorderWidths.bw.bw1,
              borderColor: Colors.grey,
              ...Margins.mh.mh15,
              ...Margins.mt.mt10,
            }}>
            <View
              style={{
                justifyContent: 'center',
                ...Paddings.ph.ph10,
                alignItems: 'center',
                ...BorderWidths.br.br1,
                borderRightColor: Colors.grey,
              }}>
              <MaterialCommunityIcons
                name="map-marker"
                color={Colors.icon}
                size={16}
                style={{alignItems: 'center'}}
              />
            </View>
            <TextInput
              style={[
                styles.input,
                validationErrors.pickupAddress && styles.errorInput,
              ]}
              onChangeText={pickupAddress => setPickupAddress(pickupAddress)}
              value={pickupAddress}
              placeholder="Enter Pickup Address"
              keyboardType="text"
              placeholderTextColor={Colors.black}
              multiline={true}
              maxHeight={100}
            />
          </View>
          {validationErrors.pickupAddress && (
            <Text style={[styles.errorText, {fontSize: 9, marginLeft: 25}]}>
              {validationErrors.pickupAddress}
            </Text>
          )}
          <View
            style={{
              flexDirection: 'row',
              ...Margins.mt.mt11,
              ...Margins.mh.mh15,
              width: '100%',
            }}>
            <View style={{width: '42%', height: 40}}>
              <View
                style={{
                  flexDirection: 'row',
                  ...BorderWidths.bw.bw1,
                  borderColor: Colors.grey,
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    ...Paddings.ph.ph10,
                    alignItems: 'center',
                    ...BorderWidths.br.br1,
                    borderRightColor: Colors.grey,
                  }}>
                  <MaterialCommunityIcons
                    name="map-marker"
                    color={Colors.icon}
                    size={16}
                    style={{alignItems: 'center'}}
                  />
                </View>
                <TextInput
                  style={[
                    styles.input,
                    validationErrors.name && styles.errorInput,
                  ]}
                  onChangeText={destination => setDestination(destination)}
                  value={destination}
                  placeholder="Enter Destination"
                  keyboardType="text"
                  placeholderTextColor={Colors.black}
                  multiline={true}
                  maxHeight={100}
                />
              </View>
              {validationErrors.destination && (
                <Text style={[styles.errorText, {fontSize: 9}]}>
                  {validationErrors.destination}
                </Text>
              )}
            </View>

            <View
              style={{
                flexDirection: 'row',
                ...BorderWidths.bw.bw1,
                borderColor: Colors.grey,
                width: '47%',
                ...Margins.mh.mh10,
                height: 38,
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  ...Paddings.ph.ph10,
                  alignItems: 'center',
                  ...BorderWidths.br.br1,
                  borderRightColor: Colors.grey,
                }}>
                <MaterialCommunityIcons
                  name="car"
                  color={Colors.icon}
                  size={16}
                  style={{alignItems: 'center'}}
                />
              </View>
              <TouchableOpacity
                onPress={() => refRBSheet.current.open()}
                style={{
                  ...Margins.mh.mh10,
                  position: 'absolute',
                  right: 0,
                  left: 0,
                  bottom: 0,
                  top: 0,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: Colors.black,
                    ...Margins.ml.ml30,
                    fontSize: FontSizes.xsmall,
                  }}>
                  {selectedSubOptiononeway ? selectedSubOptiononeway : 'Select'}
                </Text>
                <Ionicons name="caret-down" color={Colors.black} size={14} />
              </TouchableOpacity>
              {/* {validationErrors.selectedSubOption && <Text style={styles.errorText}>{validationErrors.selectedSubOption}</Text>} */}
            </View>
          </View>
        </View>
        {/* rbsheet */}
        <RBSheet
          ref={refRBSheet}
          useNativeDriver={true}
          customStyles={{
            container: {
              justifyContent: 'center',
              alignItems: 'center',
              height: 260,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            },
            wrapper: {
              backgroundColor: 'transparent',
            },
            draggableIcon: {
              backgroundColor: '#000',
            },
          }}
          customModalProps={{
            animationType: 'slide',
            statusBarTranslucent: true,
          }}
          customAvoidingViewProps={{
            enabled: false,
          }}>
          <View style={{...Margins.m.m20}}>
            <TouchableOpacity
              style={{
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                ...Margins.mb.mb20,
              }}
              onPress={() => refRBSheet.current.close()}>
              <Ionicons
                name="close-outline"
                color={Colors.darkgrey}
                size={24}
                style={{alignItems: 'center'}}
              />
            </TouchableOpacity>
            <Divider width={1} />
            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                style={[
                  styles.button,
                  styles.confirmButton,
                  isStandardOptionSelectedoneway
                    ? styles.activeButton
                    : styles.inactiveButton,
                ]}
                onPress={selectStandardOptiononeway}
                labelStyle={
                  isStandardOptionSelectedoneway
                    ? styles.activeText
                    : styles.inactiveText
                }>
                {buttonNames.standard}
              </Button>
              <Button
                mode="contained"
                style={[
                  styles.button,
                  styles.confirmButton,
                  isLuxuryOptionSelectedoneway
                    ? styles.activeButton
                    : styles.inactiveButton,
                ]}
                onPress={selectLuxuryOptiononeway}
                labelStyle={
                  isLuxuryOptionSelectedoneway
                    ? styles.activeText
                    : styles.inactiveText
                }>
                {buttonNames.luxury}
              </Button>
            </View>
            {isStandardOptionSelectedoneway ? (
              <View
                style={{
                  ...BorderWidths.bl.bl1,
                  borderLeftColor: Colors.darkgrey,
                  ...BorderWidths.bb.bb1,
                  borderBottomColor: Colors.darkgrey,
                  ...BorderWidths.br.br1,
                  borderRightColor: Colors.darkgrey,
                }}>
                <TouchableOpacity
                  value="Standard-Manual"
                  status={
                    selectedSubOptiononeway === 'Standard-Manual'
                      ? 'checked'
                      : 'unchecked'
                  }
                  onPress={() => {
                    selectSubOptiononeway('Standard-Manual'),
                      refRBSheet.current.close();
                  }}
                  uncheckedColor={Colors.darkgrey}
                  color={Colors.darkblue}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    ...Margins.m.m10,
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={require('../../assets/images/hatchback.png')}
                      style={{width: 70, height: 30}}
                    />
                    <Text style={styles.radioButtonTextStandard}>Manual</Text>
                  </View>
                  <RadioButton
                    value="Standard-Manual"
                    status={
                      selectedSubOptiononeway === 'Standard-Manual'
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => {
                      selectSubOptiononeway('Standard-Manual'),
                        refRBSheet.current.close();
                    }}
                    uncheckedColor={Colors.darkgrey}
                    color={Colors.darkblue}
                  />
                </TouchableOpacity>
                <Divider width={1} />
                <TouchableOpacity
                  value="Standard-Auto"
                  status={
                    selectedSubOptiononeway === 'Standard-Auto'
                      ? 'checked'
                      : 'unchecked'
                  }
                  onPress={() => {
                    selectSubOptiononeway('Standard-Auto'),
                      refRBSheet.current.close();
                  }}
                  uncheckedColor={Colors.darkgrey}
                  color={Colors.darkblue}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    ...Margins.m.m10,
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={require('../../assets/images/hatchback.png')}
                      style={{width: 70, height: 30}}
                    />
                    <Text style={styles.radioButtonTextStandard}>
                      Automatic
                    </Text>
                  </View>
                  <RadioButton
                    value="Standard-Auto"
                    status={
                      selectedSubOptiononeway === 'Standard-Auto'
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => {
                      selectSubOptiononeway('Standard-Auto'),
                        refRBSheet.current.close();
                    }}
                    uncheckedColor={Colors.darkgrey}
                    color={Colors.darkblue}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <View
                style={{
                  ...BorderWidths.bl.bl1,
                  borderLeftColor: Colors.darkgrey,
                  ...BorderWidths.bb.bb1,
                  borderBottomColor: Colors.darkgrey,
                  ...BorderWidths.br.br1,
                  borderRightColor: Colors.darkgrey,
                }}>
                <TouchableOpacity
                  status={
                    selectedSubOptiononeway === 'Luxury-Manual'
                      ? 'checked'
                      : 'unchecked'
                  }
                  onPress={() => {
                    selectSubOptiononeway('Luxury-Manual'),
                      refRBSheet.current.close();
                  }}
                  uncheckedColor={Colors.darkgrey}
                  color={Colors.darkblue}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    ...Margins.m.m10,
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={require('../../assets/images/hatchback.png')}
                      style={{width: 70, height: 30}}
                    />
                    <Text style={styles.radioButtonTextStandard}>Manual</Text>
                  </View>
                  <RadioButton
                    value="Luxury-Manual"
                    status={
                      selectedSubOptiononeway === 'Luxury-Manual'
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => {
                      selectSubOptiononeway('Luxury-Manual'),
                        refRBSheet.current.close();
                    }}
                    uncheckedColor={Colors.darkgrey}
                    color={Colors.darkblue}
                  />
                </TouchableOpacity>
                <Divider width={1} />
                <TouchableOpacity
                  value="Luxury-Auto"
                  status={
                    selectedSubOptiononeway === 'Luxury-Auto'
                      ? 'checked'
                      : 'unchecked'
                  }
                  onPress={() => {
                    selectSubOptiononeway('Luxury-Auto'),
                      refRBSheet.current.close();
                  }}
                  uncheckedColor={Colors.darkgrey}
                  color={Colors.darkblue}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    ...Margins.m.m10,
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={require('../../assets/images/hatchback.png')}
                      style={{width: 70, height: 30}}
                    />
                    <Text style={styles.radioButtonTextStandard}>
                      Automatic
                    </Text>
                  </View>
                  <RadioButton
                    value="Luxury-Auto"
                    status={
                      selectedSubOptiononeway === 'Luxury-Auto'
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => {
                      selectSubOptiononeway('Luxury-Auto'),
                        refRBSheet.current.close();
                    }}
                    uncheckedColor={Colors.darkgrey}
                    color={Colors.darkblue}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </RBSheet>

        {/* Book Now Button Bottam */}

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            ...Paddings.ph.ph20,
          }}>
          <DropShadow
            style={{
              shadowColor: '#171717',
              shadowOffset: {width: 2, height: 6},
              shadowOpacity: 0.2,
              shadowRadius: 3,
              elevation: 20,
            }}>
            <TouchableOpacity
              onPress={handleBooking}
              // onPress={()=>console.log("pressssssssssss")}
              style={{
                justifyContent: 'center',
                backgroundColor: '#16588e',
                alignItems: 'center',
                ...Paddings.p.p10,
                borderRadius: 5,
                ...Paddings.ph.ph20,
                width: '80%',
                marginBottom: 20,
              }}>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: FontSizes.tinymedium,
                  ...Paddings.ph.ph20,
                  fontWeight: FontWeights.semiBold,
                }}>
                Book Now
              </Text>
            </TouchableOpacity>
          </DropShadow>
        </View>
      </View>
    </ScrollView>
  );
};

export default OutstationDriverBookingScreen;

const styless = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...Margins.mh.mh30,
    width: '84%',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    backgroundColor: Colors.primary,
    width: 5,
    height: 5,
    borderRadius: 10,
    ...Paddings.p.P5,
  },
  dotGreen: {
    backgroundColor: 'green',
    width: 5,
    height: 5,
    borderRadius: 10,
    ...Paddings.p.P5,
  },
  labelText: {
    color: Colors.black,
    ...Margins.mh.mh7,
    fontSize: FontSizes.small,
  },
  containerSelectHour: {
    width: '34%',
  },
  picker: {
    height: 50,
    color: Colors.white,
  },
  pickerItemText: {
    fontSize: FontSizes.tinymedium,
    fontWeight: FontWeights.bold,
  },
  label: {
    fontSize: FontSizes.tinyxsmall,
    color: Colors.white,
    fontWeight: FontWeights.bold,
  },
  pickerContainer: {
    backgroundColor: Colors.orange,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    backgroundColor: Colors.white,
    height: 120,
    width: '49%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 10,
  },
  picker: {
    width: 130,
    height: 10,
    color: Colors.white,
  },
  pickerTime: {
    width: 133,
    height: 10,
    color: Colors.black,
    position: 'relative',
  },
  pickerDate: {
    width: 160,
    height: 10,
    color: Colors.black,
  },
  pickerDateDepart: {
    width: 130,
    height: 10,
    color: Colors.white,
  },
  pickerDateReturn: {
    width: 130,
    height: 10,
    color: Colors.white,
  },
  pickerItem: {
    fontSize: FontSizes.tinyxsmall,
    color: Colors.white,
    fontWeight: FontWeights.bold,
  },
  roudtripcontainer: {
    marginVertical: 7,
    height: 22,
    position: 'absolute',
    width: '48%',
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  imageContainer: {
    marginVertical: 7,
    height: 22,
    position: 'absolute',
    width: '60%',
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  icon: {
    fontSize: FontSizes.tinyxsmall,
    backgroundColor: 'blue',
  },
  selectedValue: {
    ...Margins.mt.mt20,
    fontSize: FontSizes.tinyxsmall,
    color: Colors.white,
  },
  input: {
    ...Paddings.p.p4,
    fontSize: FontSizes.xsmall,
    color: Colors.black,
  },
  RoundTripView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...Margins.mh.mh15,
  },
  oneWayView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...Margins.mh.mh15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: Colors.white,
  },
  activeButton: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  inactiveButton: {
    backgroundColor: Colors.white,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  activeText: {
    color: Colors.white,
  },
  inactiveText: {
    color: Colors.darkgrey,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    ...Margins.mt.mt20,
  },
  button: {
    ...Paddings.pv.pv10,
    ...Paddings.ph.ph20,
  },
  closeButton: {
    backgroundColor: Colors.white,
  },
  confirmButton: {
    backgroundColor: Colors.white,
  },
  buttonText: {
    fontSize: FontSizes.medium,
    textAlign: 'center',
    color: Colors.black,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    ...Paddings.p.p20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonsContainer: {
    borderColor: Colors.darkgrey,
    ...Margins.mt.mt10,
  },
  radioButtonTextStandard: {
    fontSize: FontSizes.medium,
    ...Margins.mh.mh20,
    color: Colors.darkgrey,
  },
  radioButtonText: {
    fontSize: FontSizes.medium,
    color: Colors.darkgrey,
    ...Margins.mh.mh20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    width: '50%',
    ...Paddings.pv.pv5,
    borderRadius: 1,
  },
  closeButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    fontSize: FontSizes.medium,
    color: Colors.white,
    textAlign: 'center',
  },
  optionContainer: {
    width: '49%',
    height: 110,
    position: 'relative',
  },
  icon: {
    ...Paddings.p.p10,
    position: 'relative',
  },
  overlayIconContainer: {
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: '100%',
    height: '100%',
    ...Paddings.p.p10,
  },
});
