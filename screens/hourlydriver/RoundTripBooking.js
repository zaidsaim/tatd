import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import OTTHeader from '../../components/OTTHeader';
import {
  Colors,
  FontSizes,
  FontWeights,
  Paddings,
  Margins,
  BorderRadius,
  BorderWidths,
} from '../../assets/colors';
import {Picker} from '@react-native-picker/picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Button, RadioButton} from 'react-native-paper';
import {Divider} from '@rneui/base';
import DropShadow from 'react-native-drop-shadow';
import RBSheet from 'react-native-raw-bottom-sheet';
import Modal from 'react-native-modal';
import styles from './styles';
import axios from 'axios';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {refreshAccessToken, validateAccessToken} from '../../utils/validation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {decodeTokenservice, getCouponApi} from '../../api/services/apiService';
import {getCityAndZone} from '../../utils/apiutlis';
const RoundTripBooking = ({
  navigation,
  refRBSheet,
  selectedzone,
  openModalHour,
  isModalVisibleHour,
  activateOnewayTripPage,
  closeModalHour
}) => {
  console.log('seleeeeeeeeeeeeee', selectedzone);
  const [editbooking, setEditbooking] = useState();
  const [modalVisiblecoupon, setModalVisiblecoupon] = useState(false);
  const [selectedHour, setSelectedHour] = useState();
  const [decodedToken, setDecodedToken] = useState(null);
  const [selectedDate, setSelectedDate] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [budgetdata, setBudgetdata] = useState();
  
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [pickupAddress, setPickupAddress] = useState('');
  const [isStandardOptionSelectedoneway, setIsStandardOptionSelectedoneway] =
    useState(true);
  const [isLuxuryOptionSelectedoneway, setIsLuxuryOptionSelectedoneway] =
    useState(false);
  const [selectedSubOption, setSelectedSubOption] = useState();
  const [selectedSubOptiononeway, setSelectedSubOptiononeway] =
    useState('Standard-Auto');
  const [isStandardOptionSelected, setIsStandardOptionSelected] =
    useState(true);
  const [isLuxuryOptionSelected, setIsLuxuryOptionSelected] = useState(false);
  const [selectedMainOptiononeway, setSelectedMainOptiononeway] = useState('');
  const [buttonNames, setButtonNames] = useState({
    standard: 'Standard',
    luxury: 'Luxury',
  });
  const [selectedMainOption, setSelectedMainOption] = useState('');
  const [bookingdata, setBookingdata] = useState();
  const [coupondata, setCoupondata] = useState();
  const [selectedOption, setSelectedOption] = useState('Roundtrip');
  const [bookingvalidationdata, setBookingvalidationdata] = useState();
  const [validationErrors, setValidationErrors] = useState({});
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [getTime, setGetTime] = useState([]);
  const [viewDetailsModal, setViewDetailsModal] = useState(false);
  const [modalVisibleDate, setModalVisibleDate] = useState(false);
  const [displayDate, setDisplayDate] = useState('');
  const dateObject = new Date();
  
  const selectStandardOptiononeway = () => {
    setIsStandardOptionSelectedoneway(true);
    setIsLuxuryOptionSelectedoneway(false);
    setSelectedMainOptiononeway('Standard');
  };
  const selectLuxuryOptiononeway = () => {
    setIsStandardOptionSelected(false);
    setIsLuxuryOptionSelectedoneway(true);
    setSelectedMainOption('Luxury');
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
  const handleOptionSelect = option => {
    setSelectedOption(option);
  };

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

  const formattedDate = `${dateObject.getFullYear()}-${String(
    dateObject.getMonth() + 1,
  ).padStart(2, '0')}-${String(dateObject.getDate()).padStart(2, '0')}`;
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
    const options = {weekday: 'short', day: '2-digit', month: 'short'};
    return date.toLocaleDateString('en-US', options);
  };
  const handleValueChange = (value) => {
    setSelectedHour(value);

    if (value === '1' || value === '2') {
      openModalHour();
    } else {
      closeModalHour();
    }

    // Example validation
    if (!value) {
      setValidationErrors({ selectedHour: 'Hour is required' });
    } else {
      setValidationErrors({});
    }
  };
  const handleValueChangesTime = newValue => {
    setSelectedTime(newValue);
    if (!newValue) {
      setValidationErrors({selectedTime: 'Time is required'});
    } else {
      setValidationErrors({});
    }
  };

  useEffect(() => {
    getBudget();
  }, [selectedHour]);
  useEffect(() => {
    getCoupon();
    getDecodedToken();
    fetchBookingData();
  }, []);

  const fetchBookingData = async () => {
    try {
      const bookingvalue = await AsyncStorage.getItem('bookingvalue');
      console.log('bookingvalue============', bookingvalue);
      if (bookingvalue !== null) {
        const parsedBookingValue = JSON.parse(bookingvalue);
        setName(
          parsedBookingValue?.single_booking_validation_data?.name || name,
        );
        setPickupAddress(
          parsedBookingValue?.single_booking_validation_data?.pickup_address ||
            pickupAddress,
        );
        setSelectedSubOption(
          parsedBookingValue?.single_booking_validation_data?.car_model ||
            selectedSubOption,
        );
        setSelectedTime(
          parsedBookingValue?.single_booking_validation_data?.selectedTime ||
            selectedTime,
        );
        setSelectedDate(
          parsedBookingValue?.single_booking_validation_data?.booking_date ||
            selectedDate,
        );
      }
    } catch (error) {
      console.error('Error fetching booking data:', error);
    }
  };

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
          product_type: 'Incity',
          way: 2,
          hours: selectedHour,
        },
        config,
      );
      console.log('Budget Data:', response.data);
      setBudgetdata(response.data);
    } catch (err) {
      setError(err.message);
      console.log('Error from getBudget API roundTrip incity:', err);
    }
  };

  // const getBudget = async () => {
  //   const isValid = await validateAccessToken();
  //   if (!isValid) {
  //     await refreshAccessToken();
  //   }
  //   try {
  //     const userData = await AsyncStorage.getItem('userData');
  //     const parsedUserData = userData ? JSON.parse(userData) : null;
  //     const token = parsedUserData ? parsedUserData.jwt : null;
  //     const selectcitydata = await AsyncStorage.getItem('selectcityitem');
  //     if (!token) {
  //       throw new Error("No token found");
  //     }
  //     const config = {
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //         'Content-Type': 'application/json',
  //       },
  //     };
  //     const selectedzone = "Some selected zone"; // You should replace this with the actual selected zone data
  //     const location = getCityAndZone(selectcitydata, selectedzone);
  //     if (!location) {
  //       console.error('Invalid city data:', selectcitydata);
  //       return;
  //     }
  //     const { city, zone } = location;
  //     const response = await axios.post('https://www.tatd.in/app-api/customer/ondemand/get_budget.php', {
  //       category: 'Private Driver',
  //       city: city,
  //       zone: zone,
  //       product_type: 'Incity',
  //       way: 2,
  //       hours: selectedHour,
  //     }, config);

  //     console.log(city, "final city");
  //     console.log('Budget Data:', response.data);
  //     setBudgetdata(response.data);
  //   } catch (err) {
  //     setError(err.message);
  //     console.log('Error from getBudget API:', err);
  //   }
  // };

  const getCoupon = async () => {
    setLoading(true);
    const isValid = await validateAccessToken();
    if (!isValid) {
      await refreshAccessToken();
    }
    try {
      const response = await getCouponApi();
      if (response?.user_coupon_data?.coupon_value > 0) {
        setModalVisiblecoupon(true);
      }
      setCoupondata(response?.user_coupon_data);
      console.log('Coupon Data roundtrip:', response);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const vehicleType = isStandardOptionSelected
    ? buttonNames.standard
    : buttonNames.luxury;
  const finalamount = budgetdata?.budget - coupondata?.coupon_value;

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

  const handleBooking = async () => {
    // way set storage

    await AsyncStorage.setItem('way', JSON.stringify(2));
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
    if (!mobileNumber) errors.mobileNumber = 'Please enter mobile number';
    if (!pickupAddress) {
      errors.pickupAddress = 'Please Enter complete address';
    } else if (pickupAddress.length <= 16) {
      errors.pickupAddress =
        'Pickup address must be greater than 16 characters';
    }
    if (!selectedDate) errors.selectedDate = 'Please Select date';
    if (!selectedTime) errors.selectedTime = 'Please Select time';
    if (!selectedSubOption) {
      errors.selectedSubOption = 'Vehicle type is required';
      refRBSheet.current.open();
    }
    if (!selectedHour) errors.selectedHour = 'please Select hours';

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
      const parsedDate =
        selectedDate === 'Today' || selectedDate === 'Tomorrow'
          ? selectedDate
          : moment(selectedDate, 'D MMMM YYYY').isValid()
          ? moment(selectedDate, 'D MMMM YYYY').format('YYYY-MM-DD')
          : null;
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
          drop_address: '',
          city: selectcitydata,
          zone: selectedzone,
          category: 'Private Driver',
          product_type: 'Incity',
          way: 2,
          coupon_type: coupondata?.trigger_type,
          coupon_code: coupondata?.coupon_code,
          coupon_discount: coupondata?.coupon_value,
          total_price: budgetdata?.budget,
          gst: '50',
          supply_cost: '875',
          hours: selectedHour,
          days: 0,
          kms: 0,
          end_date: '0000-00-00',
          vehicle_type: 'Vehicle Type',
          car_model: selectedSubOption,
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
      console.log(parsedDate,": mohittttt");
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
    if (!mobileNumber) errors.mobileNumber = 'Please enter mobile number';
    if (!pickupAddress) {
      errors.pickupAddress = 'Please Enter complete address';
    } else if (pickupAddress.length <= 16) {
      errors.pickupAddress =
        'Pickup address must be greater than 16 characters';
    }

    if (!selectedDate) errors.selectedDate = 'Please Select date';
    if (!selectedTime) errors.selectedTime = 'Please Select time';
    if (!selectedSubOption) {
      errors.selectedSubOption = 'Vehicle type is required';
      refRBSheet.current.open();
    }
    // if (!selectedHour) errors.selectedHour = "please select hours";

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
      const parsedDate =
        selectedDate === 'Today' || selectedDate === 'Tomorrow'
          ? selectedDate
          : moment(selectedDate, 'D MMMM YYYY').isValid()
          ? moment(selectedDate, 'D MMMM YYYY').format('YYYY-MM-DD')
          : null;
      const bookingvalue = await AsyncStorage.getItem('bookingvalue');
      const bookingvaluedata = bookingvalue ? JSON.parse(bookingvalue) : null;

      console.log(bookingvaluedata, "vvvvvid");
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
          drop_address: '',
          city: selectcitydata,
          zone: selectedzone,
          category: 'Private Driver',
          product_type: 'Incity',
          way: 2,
          coupon_type: coupondata?.trigger_type,
          coupon_code: coupondata?.coupon_code,
          coupon_discount: coupondata?.coupon_value,
          total_price: budgetdata?.budget,
          gst: '50',
          supply_cost: '875',
          hours: selectedHour,
          days: 0,
          kms: 0,
          end_date: '0000-00-00',
          vehicle_type: vehicleType,
          car_model: selectedSubOption,
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
      console.log({parsedDate} ,": mohittttt");
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

  // const handleValueChanges = newValue => {
  //   if (newValue === 'Today') {
  //     setSelectedDate(moment().format('YYYY-MM-DD'));
  //     setDisplayDate('Today');
  //   } else if (newValue === 'Tomorrow') {
  //     setSelectedDate(moment().add(1, 'days').format('YYYY-MM-DD'));
  //     setDisplayDate('Tomorrow');
  //   } else {
  //     setSelectedDate(newValue);
  //     setDisplayDate(newValue);
  //   }
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

  console.log('selctted===========round', selectedDate);

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

  const [viewDetailsData, setViewDetailsData] = useState([]);
  // const [viewDetailsData, setViewDetailsData] = useState({
  //   Pricing: [],
  //   'Things to know': [],
  // });
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
          product_type: 'Incity',
          way: 2,
        },
        config,
      );

      console.log(
        response.data.view_detail_data,
        'view Details Pop Data incity round',
      );
      if (response.data.status_code === 200) {
        setViewDetailsData(response.data.view_detail_data);
      }
    } catch (err) {
      setError(err.message);
      console.log('Error from View Details:', err.message);
    }
  };

  // View details Popup api end

  // console.log('selctted===========date', selectedDate);
  console.log('selected-----------time', selectedTime);
  return (
    <View style={{flex: 1}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisiblecoupon}
        onRequestClose={() => {
          setModalVisiblecoupon(!modalVisiblecoupon);
        }}>
        <View style={styles.modalView}>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text
              style={{
                color: Colors.primary,
                ...Paddings.p.p10,
                fontSize: FontSizes.medium,
                ...FontWeights.bold,
              }}>
              Congradulations!
            </Text>
            <Text style={{color: Colors.darkgrey, fontSize: FontSizes.small}}>
              ₹{coupondata?.coupon_value} Coupon Code Applied Sucessfully Have a
            </Text>
            <Text
              style={{
                color: Colors.darkgrey,
                fontSize: FontSizes.small,
                ...Margins.mv.mv5,
              }}>
              greate day!
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.secondary,
                justifyContent: 'center',
                alignItems: 'center',
                ...Margins.mv.mv10,
                ...BorderRadius.br5,
                ...Paddings.p.p10,
                ...Paddings.ph.ph30,
              }}
              onPress={() => {
                setModalVisiblecoupon(!modalVisiblecoupon);
              }}>
              <Text style={{color: Colors.black}}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        visible={isModalVisibleHour}
        onBackdropPress={closeModalHour}
        style={styles.modal}>
        <View style={styles.modalContentBooking}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <TouchableOpacity
              onPress={closeModalHour}
              style={styles.closeButtonHour}>
              <Ionicons name="close" color={Colors.white} size={24} />
            </TouchableOpacity>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  ...Margins.mh.mh20,
                }}>
                <View style={{alignItems: 'center'}}>
                  <Text
                    style={{
                      color: Colors.white,
                      fontSize: FontSizes.tinymedium,
                    }}>
                    My Start & End
                  </Text>
                  <Text
                    style={{
                      color: Colors.white,
                      fontSize: FontSizes.tinymedium,
                      ...Margins.mv.mv5,
                    }}>
                    address is
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: FontSizes.tinymedium,
                        fontWeight: FontWeights.semiBold,
                      }}>
                      {' '}
                      same
                    </Text>
                  </Text>
                </View>
                <View style={{alignItems: 'center'}}>
                  <Text
                    style={{
                      color: Colors.white,
                      fontSize: FontSizes.tinymedium,
                    }}>
                    My End address is
                  </Text>
                  <Text
                    style={{
                      color: Colors.white,
                      fontSize: FontSizes.tinymedium,
                      fontWeight: FontWeights.semiBold,
                      ...Margins.mv.mv5,
                    }}>
                    different
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  ...Paddings.p.p10,
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={closeModalHour}
                  style={{
                    backgroundColor: Colors.orange,
                    ...Paddings.p.p10,
                    ...BorderRadius.br5,
                    width: '43%',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: Colors.white,
                      fontSize: FontSizes.tinymedium,
                      fontWeight: FontWeights.semiBold,
                    }}>
                    Round Trip
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: Colors.orange,
                    ...Paddings.p.p10,
                    ...BorderRadius.br5,
                    width: '43%',
                    alignItems: 'center',
                  }}
                  onPress={activateOnewayTripPage}>
                  <Text
                    style={{
                      color: Colors.white,
                      fontSize: FontSizes.tinymedium,
                      fontWeight: FontWeights.semiBold,
                    }}>
                    OnewayTrip
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
      {/* view details modal start */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={viewDetailsModal}
        onRequestClose={() => {
          setViewDetailsModal(!viewDetailsModal);
        }}>
        <SafeAreaView style={{flex: 1}}>
          <TouchableWithoutFeedback onPress={() => setViewDetailsModal(false)}>
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

      {/* view details modal end */}

      <View style={styles.mainContainer}>
        <View style={styles.labelContainer}>
          <View style={styles.dot} />
          <Text style={styles.labelText}>Hours</Text>
        </View>
        <View style={styles.containerSelectHour}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedHour}
              onValueChange={handleValueChange}
              style={styles.picker}
              dropdownIconColor={Colors.white}>
              <Picker.Item
                label={'Select'}
                value={''}
                style={{fontSize: FontSizes.xsmall}}
              />
              {Array.from({length: 12}, (_, i) => (
                <Picker.Item
                  key={i + 1}
                  label={`${i + 1} Hour`}
                  value={`${i + 1}`}
                  style={{fontSize: FontSizes.xsmall}}
                />
              ))}
            </Picker>
          </View>
        </View>
        {/* {validationErrors.selectedHour && <Text style={styles.errorText}>{validationErrors.selectedHour}</Text>} */}
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
            <Text style={styles.strikethroughText}>₹{budgetdata?.budget}</Text>
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
      <View style={{...Margins.mv.mv35}}>
        <View
          style={{
            flexDirection: 'row',
            ...BorderWidths.bw.bw1,
            borderColor: Colors.grey,
            ...Margins.mh.mh15,
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
            style={[styles.input, validationErrors.name && styles.errorInput]}
            onChangeText={name => setName(name)}
            value={name}
            placeholder="Name"
            keyboardType="text"
            placeholderTextColor={Colors.black}
            multiline={true}
            maxHeight={100}
          />
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
            <View style={{...Margins.mh.mh20}}>
              <View style={{}}>
                <TouchableOpacity
                  style={{
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    ...Margins.mb.mb10,
                  }}
                  onPress={() => refRBSheet.current.close()}>
                  <Ionicons
                    name="close-outline"
                    color={Colors.darkgrey}
                    size={24}
                    style={{alignItems: 'center'}}
                  />
                </TouchableOpacity>
                <View style={styles.buttonsContainer}>
                  <View style={styles.buttonContainer}>
                    <Button
                      mode="contained"
                      style={[
                        styles.button,
                        styles.confirmButton,
                        isStandardOptionSelected
                          ? styles.activeButton
                          : styles.inactiveButton,
                      ]}
                      onPress={selectStandardOption}
                      labelStyle={
                        isStandardOptionSelected
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
                        isLuxuryOptionSelected
                          ? styles.activeButton
                          : styles.inactiveButton,
                      ]}
                      onPress={selectLuxuryOption}
                      labelStyle={
                        isLuxuryOptionSelected
                          ? styles.activeText
                          : styles.inactiveText
                      }>
                      {buttonNames.luxury}
                    </Button>
                  </View>
                  {isStandardOptionSelected ? (
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
                          selectedSubOption === 'Standard-Manual'
                            ? 'checked'
                            : 'unchecked'
                        }
                        onPress={() => {
                          selectSubOption('Standard-Manual'),
                            refRBSheet.current.close();
                        }}
                        size={5}
                        uncheckedColor={Colors.darkgrey}
                        color={Colors.darkblue}
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          ...Margins.m.m10,
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Image
                            source={require('../../assets/images/hatchback.png')}
                            style={{width: 70, height: 30}}
                          />
                          <Text style={styles.radioButtonTextStandard}>
                            Manual
                          </Text>
                        </View>
                        <RadioButton
                          value="Standard-Manual"
                          status={
                            selectedSubOption === 'Standard-Manual'
                              ? 'checked'
                              : 'unchecked'
                          }
                          onPress={() => {
                            selectSubOption('Standard-Manual'),
                              refRBSheet.current.close();
                          }}
                          size={5}
                          uncheckedColor={Colors.darkgrey}
                          color={Colors.darkblue}
                        />
                      </TouchableOpacity>
                      <Divider width={1} />
                      <TouchableOpacity
                        value="Standard-Auto"
                        status={
                          selectedSubOption === 'Standard-Auto'
                            ? 'checked'
                            : 'unchecked'
                        }
                        onPress={() => {
                          selectSubOption('Standard-Auto'),
                            refRBSheet.current.close();
                        }}
                        uncheckedColor={Colors.darkgrey}
                        color={Colors.darkblue}
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          ...Margins.m.m10,
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Image
                            source={require('../../assets/images/hatchback.png')}
                            style={{width: 70, height: 30}}
                          />
                          <Text style={styles.radioButtonText}>Automatic</Text>
                        </View>
                        <RadioButton
                          value="Standard-Auto"
                          status={
                            selectedSubOption === 'Standard-Auto'
                              ? 'checked'
                              : 'unchecked'
                          }
                          onPress={() => {
                            selectSubOption('Standard-Auto'),
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
                        value="Luxury-Manual"
                        status={
                          selectedSubOption === 'Luxury-Manual'
                            ? 'checked'
                            : 'unchecked'
                        }
                        onPress={() => {
                          selectSubOption('Luxury-Manual'),
                            refRBSheet.current.close();
                        }}
                        uncheckedColor={Colors.darkgrey}
                        color={Colors.darkblue}
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          ...Margins.m.m10,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Image
                            source={require('../../assets/images/hatchback.png')}
                            style={{width: 70, height: 30}}
                          />
                          <Text style={styles.radioButtonTextStandard}>
                            Manual
                          </Text>
                        </View>
                        <RadioButton
                          value="Luxury-Manual"
                          status={
                            selectedSubOption === 'Luxury-Manual'
                              ? 'checked'
                              : 'unchecked'
                          }
                          onPress={() => {
                            selectSubOption('Luxury-Manual'),
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
                          selectedSubOption === 'Luxury-Auto'
                            ? 'checked'
                            : 'unchecked'
                        }
                        onPress={() => {
                          selectSubOption('Luxury-Auto'),
                            refRBSheet.current.close();
                        }}
                        uncheckedColor={Colors.darkgrey}
                        color={Colors.darkblue}
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          ...Margins.m.m10,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Image
                            source={require('../../assets/images/hatchback.png')}
                            style={{
                              width: 70,
                              height: 30,
                              justifyContent: 'flex-end',
                            }}
                          />
                          <Text style={styles.radioButtonText}>Automatic</Text>
                        </View>
                        <RadioButton
                          value="Luxury-Auto"
                          status={
                            selectedSubOption === 'Luxury-Auto'
                              ? 'checked'
                              : 'unchecked'
                          }
                          onPress={() => {
                            selectSubOption('Luxury-Auto'),
                              refRBSheet.current.close();
                          }}
                          uncheckedColor={Colors.darkgrey}
                          color={Colors.darkblue}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </RBSheet>
        </View>
        {validationErrors.name && (
          <Text style={[styles.errorText, {fontSize: 9, marginLeft: 25}]}>
            {validationErrors.name}
          </Text>
        )}
        <View
          style={{
            flexDirection: 'row',
            ...Margins.mv.mv15,
            ...Margins.mh.mh15,
            width: '100%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              ...BorderWidths.bw.bw1,
              borderColor: Colors.grey,
              width: '44%',
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
              keyboardType="numeric"
              placeholderTextColor={Colors.black}
              editable={false}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              ...BorderWidths.bw.bw1,
              borderColor: Colors.grey,
              width: '45%',
              ...Margins.mh.mh10,
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
                  fontSize: FontSizes.small,
                }}>
                {selectedSubOption ? selectedSubOption : 'Manual-Standard'}
              </Text>
              <Ionicons name="caret-down" color={Colors.black} size={14} />
            </TouchableOpacity>
            {/* {validationErrors.selectedSubOption && <Text style={styles.errorText}>{validationErrors.selectedSubOption}</Text>} */}
          </View>
          {validationErrors.selectedSubOption && (
            <Text style={[styles.errorText, , {fontSize: 12}]}>
              {validationErrors.selectedSubOption}
            </Text>
          )}
        </View>

        <View
          style={{
            flexDirection: 'row',
            ...BorderWidths.bw.bw1,
            borderColor: Colors.grey,
            ...Margins.mh.mh15,
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
          <Text style={[styles.errorText, , {fontSize: 10, marginLeft: 25}]}>
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
          <View
            style={{
              ...BorderWidths.bw.bw1,
              borderColor: Colors.grey,
              width: '54%',
              height: 40,
            }}>
            <View style={{flexDirection: 'row', width: '100%', height: '100%'}}>
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
                  <Icon name="arrow-drop-down" size={25} color={Colors.black} />
                </TouchableOpacity>

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
            {validationErrors.selectedDate && (
              <Text style={[styles.errorText, {fontSize: 9}]}>
                {validationErrors.selectedDate}
              </Text>
            )}
            {validationErrors.selectedTime && (
              <Text style={[styles.errorText, {fontSize: 9, marginLeft: 10}]}>
                {validationErrors.selectedTime}
              </Text>
            )}
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
      </View>
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
            style={{
              justifyContent: 'center',
              backgroundColor: '#16588e',
              alignItems: 'center',
              ...Paddings.p.p10,
              borderRadius: 5,
              ...Paddings.ph.ph20,
              width: '80%',
              marginBottom: 10,
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
  );
};

export default RoundTripBooking;
