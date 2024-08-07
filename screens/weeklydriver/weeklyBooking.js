import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
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
import Modal from 'react-native-modal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, RadioButton} from 'react-native-paper';
import {Divider} from '@rneui/base';
import DropShadow from 'react-native-drop-shadow';
import RBSheet from 'react-native-raw-bottom-sheet';
import {refreshAccessToken, validateAccessToken} from '../../utils/validation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {decodeTokenservice} from '../../api/services/apiService';
const WeeklyBookingScreen = ({navigation, selectedzone}) => {
  const refRBSheet = useRef();
  const [name, setName] = useState();
  const [mobileNumber, setMobileNumber] = useState();
  const [pickupAddress, setPickupAddress] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [textColor, setTextColor] = useState(Colors.grey);
  const [iconColor, setIconColor] = useState(Colors.grey);
  const [decodedToken, setDecodedToken] = useState(null);

  const [selectedTime, setSelectedTime] = useState();

  const [qbNumber, setQbNumber] = useState();

  const [totalPrice, setTotalPrice] = useState(0);
  const [hoursData, setHoursData] = useState();

  const [isStandardOptionSelectedoneway, setIsStandardOptionSelectedoneway] =
    useState(true);
  const [isLuxuryOptionSelectedoneway, setIsLuxuryOptionSelectedoneway] =
    useState(false);
  const [selectedSubOptiononeway, setSelectedSubOption] =
    useState('Vehicle Type');
  const [carInfo, setCarInfo] = useState({
    car_model: '',
    vehicle_type: 'Vehicle Type',
  });

  const [validationErrors, setValidationErrors] = useState('');

  const selectStandardOptiononeway = () => {
    setIsStandardOptionSelectedoneway(true);
    setIsLuxuryOptionSelectedoneway(false);
  };

  const selectLuxuryOptiononeway = () => {
    setIsStandardOptionSelectedoneway(false);
    setIsLuxuryOptionSelectedoneway(true);
  };

  const selectSubOptiononeway = option => {
    setSelectedSubOption(option);

    const [transmission, vehicleType] = option.split('-');
    const carModel = transmission === 'Manual' ? 'Manual' : 'Automatic';

    setCarInfo({
      car_model: carModel,
      vehicle_type: vehicleType,
    });

    refRBSheet.current.close();
  };

  const generateTimes = () => {
    const times = [];
    const start = new Date(0, 0, 0, 5, 0);
    const end = new Date(0, 0, 0, 23, 0);

    while (start <= end) {
      const hours = start.getHours();
      const minutes = start.getMinutes();
      const period = hours >= 12 ? 'PM' : 'AM';
      const adjustedHours = hours % 12 || 12;
      const formattedTime = `${adjustedHours}:${
        minutes < 10 ? '0' : ''
      }${minutes} ${period}`;
      const valueTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
      times.push({label: formattedTime, value: valueTime});
      start.setMinutes(start.getMinutes() + 30);
    }
    return times;
  };

  const times = generateTimes();

  const handlePress = () => {
    setTextColor(Colors.black);
    setIconColor(Colors.black);
  };
  const openModal = () => {
    setModalVisible(!isModalVisible);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  // /////////////////////////////////////////

  const [dates, setDates] = useState([]);
  const [dates2, setDates2] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedHours, setSelectedHours] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [currentWeekData, setCurrentWeekData] = useState([]);
  const [nextWeekData, setNextWeekData] = useState([]);
  const [budgetData, setBudgetData] = useState(0);
  const [viewDetailsData, setViewDetailsData] = useState(null);
  const [error, setError] = useState(null);

  const imagesView = [
    {icon: require('../../assets/images/first_icon.png')},
    {icon: require('../../assets/images/secound_icon.png')},
    {icon: require('../../assets/images/third_icon.png')},
    {icon: require('../../assets/images/forth_icon.png')},
    {icon: require('../../assets/images/five_icon.png')},
    {icon: require('../../assets/images/six_icon.png')},
    {icon: require('../../assets/images/seventh_icon.png')},
  ];

  useEffect(() => {
    getWeeklyHours();
    getCuurentDays();
    ViewDetailsApi();
    getDecodedToken();
  }, []);

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

  useEffect(() => {
    getBudgetApi();
  }, [selectedHours, selectedDay]);

  const getDates = (overrideDates = []) => {
    const dates = [];
    const today = new Date();
    today.setDate(today.getDate() + 1);

    if (overrideDates.length > 0) {
      overrideDates.forEach((overrideDate, index) => {
        const date = new Date(overrideDate);
        const day = date.toLocaleDateString('en-US', {weekday: 'short'});
        const formattedDate = date.toLocaleString('en-US', {
          day: '2-digit',
          month: 'short',
        });
        dates.push({day: index + 1, date: formattedDate, dayOfWeek: day});
      });
    }
    // else {
    //   for (let i = 0; i < 12; i++) {
    //     const date = new Date(today);
    //     date.setDate(today.getDate() + i);
    //     const day = date.toLocaleDateString('en-US', {weekday: 'short'});
    //     const formattedDate = date.toLocaleString('en-US', {
    //       day: '2-digit',
    //       month: 'short',
    //     });
    //     dates.push({day: i + 1, date: formattedDate, dayOfWeek: day});
    //   }
    // }
    return dates;
  };

  const handleSelectDate = date => {
    let updatedDates;

    if (selectedDates.includes(date)) {
      updatedDates = selectedDates.filter(item => item !== date);
    } else {
      updatedDates = [...selectedDates, date];
    }

    setSelectedDates(updatedDates);
    setSelectedDay(updatedDates.length);
  };

  const getWeeklyHours = async () => {
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
        'https://www.tatd.in/app-api/customer/weekly/get-weekly-hours.php',
        {
          action: 'get_hours',
        },
        config,
      );

      setHoursData(response.data?.hours_data);
    } catch (err) {
      setError(err.message);
      console.log('Error from Get Hours API:', err.message);
    }
  };

  const getCuurentDays = async () => {
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
        'https://www.tatd.in/app-api/customer/weekly/get-current-week-next-week-dates-api.php',
        {
          action: 'get_week_data',
        },
        config,
      );

      setCurrentWeekData(prevData => {
        if (prevData.length === 0) {
          return response.data.current_week_data;
        }
        return prevData;
      });

      setNextWeekData(prevData => {
        if (prevData.length === 0) {
          return response.data.next_week_data;
        }
        return prevData;
      });

      console.log(response.data, 'dates REsponse API');

      setDates(getDates(response.data.current_week_data));
      setDates2(getDates(response.data.next_week_data));
    } catch (err) {
      setError(err.message);
      console.log('Error from get Current Days API:', err.message);
    }
  };

  const ViewDetailsApi = async () => {
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
        'https://www.tatd.in/app-api/customer/weekly/view-detail-popup-api.php',
        {
          action: 'view_popup',
        },
        config,
      );

      setViewDetailsData(response.data.view_detail_data['Key Benefits']);
    } catch (err) {
      setError(err.message);
      console.log('Error from View Details API:', err.message);
    }
  };

  const getBudgetApi = async () => {
    if (!selectedHours && !selectedDay) return;

    try {
      const isValid = await validateAccessToken();
      if (!isValid) {
        await refreshAccessToken();
      }

      const userData = await AsyncStorage.getItem('userData');
      const parsedUserData = userData ? JSON.parse(userData) : null;
      const token = parsedUserData ? parsedUserData.jwt : null;
      const selectcitydata = await AsyncStorage.getItem('selectcityitem');

      console.log(token, 'jwtttttttt');

      const city = String(selectcitydata);
      // console.log('============city', city);

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
        'https://www.tatd.in/app-api/customer/weekly/get-weekly-budget-api.php',
        {
          action: 'get_budget',
          hours: selectedHours,
          total_days: selectedDay,
          city: city,
        },
        config,
      );

      console.log(response.data.package_oneday_price, 'budget Responce API');

      setBudgetData(response.data.package_oneday_price);

      if (!selectedHours || !selectedDay) {
        setTotalPrice(0);
      } else {
        setTotalPrice(response.data.package_oneday_price * selectedDay);
      }
    } catch (err) {
      setError(err.message);
      console.log('Error from Budget API:', err.message);
    }
  };

  const handleBooking = async () => {
    if (!selectedHours) {
      Alert.alert('Please Select Hours');
      // setValidationErrors('Please Select Hours');
      return;
    } else if (!selectedDay) {
      Alert.alert('Please Choose the Dates');
      // setValidationErrors('Please Choose the Dates');
      return;
    }
    if (!name) {
      Alert.alert('Please Enter Your Name');
      return;
    } else if (!pickupAddress) {
      Alert.alert('Please Enter Pickup Address');
      return;
    } else if (!carInfo.car_model) {
      // Alert.alert('Please choose Vehicle Type');
      refRBSheet.current.open();
      return;
    } else if (!selectedTime) {
      Alert.alert('Please Choose THhe Booking Time');
      return;
    }
    // way set storage

    await AsyncStorage.setItem('way', JSON.stringify(2));
    // way set storage

    try {
      const isValid = await validateAccessToken();
      if (!isValid) {
        await refreshAccessToken();
      }

      const userData = await AsyncStorage.getItem('userData');
      const parsedUserData = userData ? JSON.parse(userData) : null;
      const token = parsedUserData ? parsedUserData.jwt : null;

      const selectcitydata = await AsyncStorage.getItem('selectcityitem');
      const ccccc = String(selectcitydata);

      // const dateStatus = Array(selectedDates.length).fill(1);
      const dateStatus = Array(selectedDay).fill(1);
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
      // console.log('Selected city :', ccccc);
      // console.log('Selected Item booking:', selectedzone);
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

      console.log(
        'insert Dataaaaa :',
        name,
        mobileNumber,
        pickupAddress,
        city,
        selectedTime,
        totalPrice,
        budgetData,
        selectedDay,
        selectedDates,
        // dayArray,
        zone,
        dateStatus,
      );

      const response = await axios.post(
        'https://www.tatd.in/app-api/customer/weekly/weekly-booking-booking-validation.php',
        // {
        //   action: 'create_flexible_booking_step_1',
        //   mobile_number: '1234567890',
        //   date: ['2024-08-03', '2024-08-04'],
        //   day: ['Monday', 'Tuesday'],
        //   time: '10:00',
        //   hours: 8,
        //   total_price: 2000,
        //   status: [1, 1],
        //   zone: 'Zone 1',
        //   name: 'John Doe',
        //   pickup_address: '123 Street Name',
        // car_model: 'Toyota',
        // vehicle_type: 'SUV',
        //   package_price: 2000,
        //   package_oneday_price: 1000,
        //   city: 'Delhi',
        //   booking_oncall_by: 'Customer',
        //   booking_oncall_by_number: '7503387985',
        //   booking_oncall_by_source: 'Customer',
        //   booking_oncall_by_subsource: '',
        // },

        {
          action: 'create_flexible_booking_step_1',
          mobile_number: mobileNumber,
          date: selectedDates,
          day: selectedDates,
          time: selectedTime,
          hours: selectedHours,
          total_price: totalPrice,
          status: dateStatus,
          zone: 'Maharashtra',
          name: name,
          pickup_address: pickupAddress,
          car_model: carInfo.car_model,
          vehicle_type: carInfo.vehicle_type,

          package_price: totalPrice,
          package_oneday_price: budgetData,
          city: city,
          booking_oncall_by: 'Customer',
          booking_oncall_by_number: mobileNumber,
          booking_oncall_by_source: 'Customer',
          booking_oncall_by_subsource: '',
        },

        config,
      );

      console.log(
        {
          action: 'create_flexible_booking_step_1',
          mobile_number: mobileNumber,
          date: selectedDates,
          day: selectedDates,
          time: selectedTime,
          hours: selectedHours,
          total_price: totalPrice,
          status: dateStatus,
          zone: 'Maharashtra',
          name: name,
          pickup_address: pickupAddress,
          // car_model: 'Toyota',
          car_model: carInfo.car_model,

          vehicle_type: carInfo.vehicle_type,
          package_price: totalPrice,
          package_oneday_price: budgetData,
          city: city,
          booking_oncall_by: 'Customer',
          booking_oncall_by_number: mobileNumber,
          booking_oncall_by_source: 'Customer',
          booking_oncall_by_subsource: '',
        },
        'final Dataaaaaaaaa',
      );

      setQbNumber(response.data.qb_number);

      console.log(response.data, 'Handle booking Response Data');

      navigation.navigate('WeeklyPaymentScreen', {
        fbId: response.data.qb_number,
      });
    } catch (err) {
      setError(err.message);
      console.log('Error from handle Booking API:', err.message);
    }
  };

  const firstRow = dates;

  const secondRow = dates2;

  const renderItem = ({item}) => {
    const isSelected = selectedDates.includes(item.date);
    return (
      <TouchableOpacity
        style={[styles.item, isSelected && styles.selectedItem]}
        onPress={() => handleSelectDate(item.date)}>
        {isSelected ? (
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                ...Paddings.p2,
                alignItems: 'center',
                borderWidth: 2,
                borderColor: Colors.white,
                borderRadius: 10,
              }}>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text style={[styles.text, isSelected && styles.selectedText]}>
                  {item.dayOfWeek}
                </Text>
              </View>
              <View
                style={[styles.viewBtn, isSelected && styles.activeViewBtn]}
              />
            </View>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text style={[styles.textTwo, isSelected && styles.selectedText]}>
                {item.date}
              </Text>
            </View>
          </View>
        ) : (
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                ...Paddings.p2,
                alignItems: 'center',
                borderWidth: 2,
                borderColor: Colors.white,
                borderRadius: 10,
              }}>
              <View
                style={[styles.viewBtn, isSelected && styles.activeViewBtn]}
              />
              <Text style={[styles.text, isSelected && styles.selectedText]}>
                {item.dayOfWeek}
              </Text>
            </View>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text style={[styles.textTwo, isSelected && styles.selectedText]}>
                {item.date}
              </Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: Colors.white}}>
      <OTTHeader navigation={navigation} title={'trusted & trained driver'} />
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={closeModal}
        style={styles.modalStyle}>
        <View style={styles.modalContentStyle}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              ...Margins.mh.mh20,
              alignItems: 'center',
              marginVertical: 15,
            }}>
            <Text style={styles.titleStyle}>Key Benefits</Text>
            <TouchableOpacity onPress={closeModal}>
              <Ionicons name="close" color={Colors.grey} size={22} />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {viewDetailsData &&
              viewDetailsData.map((item, index) => (
                <View
                  key={index}
                  r
                  style={{
                    backgroundColor: Colors.white,
                    ...Margins.mh.mh15,
                    ...(index !== 0 && index % 2 === 1 ? Margins.mv.mv10 : {}),
                  }}>
                  <View
                    style={{
                      borderRadius: 5,
                      backgroundColor: Colors.lightgrey,
                      flexDirection: 'row',
                      alignItems: 'center',
                      ...Margins.ml.ml15,
                    }}>
                    {/* Display image corresponding to the current item */}
                    <View
                      style={{
                        left: -20,
                        position: 'absolute',
                        ...Margins.mr.mr20,
                      }}>
                      {/* Ensure imagesView has enough images */}
                      {imagesView[index] && (
                        <Image
                          source={imagesView[index].icon}
                          resizeMode={'cover'}
                          style={styles.imageStyle}
                        />
                      )}
                    </View>
                    <View
                      style={{
                        ...Margins.mh.mh25,
                        ...Margins.mt.mt10,
                        ...Margins.mb.mb10,
                      }}>
                      <Text
                        style={{
                          color: Colors.primary,
                          fontSize: FontSizes.xsmall,
                          fontWeight: FontWeights.bold,
                        }}>
                        {item.title}
                      </Text>
                      <Text
                        style={{
                          color: Colors.primary,
                          fontSize: FontSizes.xtiny,
                        }}>
                        {item.description}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            <TouchableOpacity
              onPress={closeModal}
              style={{
                borderWidth: 1,
                borderColor: Colors.grey,
                ...Paddings.p.p5,
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: '40%',
              }}>
              <Text style={{color: Colors.black}}>Close</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
      <View style={styles.loginContainer}>
        <View style={styles.header}>
          <View style={styles.roudtripcontainer}>
            <Text style={styles.roudtripText}>Book Driver For A Week</Text>
            <View style={styles.iconContainer}>
              <Image
                source={require('../../assets/images/rt_icon.png')}
                resizeMode={'cover'}
                style={styles.icon}
              />
            </View>
          </View>
          <View style={styles.loginTextContainer}>
            <Text style={styles.loginText}>Weekly Driver</Text>
          </View>
        </View>
      </View>
      <View style={{flex: 1}}>
        <View style={{...Margins.mt.mt25}}>
          <View style={styles.mainContainer}>
            <View style={styles.labelContainer}>
              <View style={styles.dot} />
              <Text style={styles.labelText}>Select Daily Hours</Text>
            </View>
            <View style={styles.containerSelectHour}>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedHours}
                  onValueChange={itemValue => setSelectedHours(itemValue)}
                  style={styles.pickerDateReturn}
                  dropdownIconColor={Colors.white}
                  itemStyle={{color: Colors.white, fontSize: FontSizes.tiny}}>
                  <Picker.Item
                    label={'Select Hours'}
                    value={''}
                    style={{
                      fontSize: FontSizes.small,
                      color: Colors.white,
                      // backgroundColor :"orange"
                    }}
                    labelStyle={{
                      fontSize: FontSizes.body,

                      backgroundColor: 'orange',
                    }}
                  />
                  {hoursData &&
                    hoursData.map((hours, index) => (
                      <Picker.Item
                        key={index}
                        label={`${hours} Hours`}
                        value={hours}
                        style={{
                          color: Colors.white,
                          fontSize: FontSizes.small,
                          flex: 1,
                          // backgroundColor :"orange"
                        }}
                      />
                    ))}
                </Picker>
              </View>
            </View>
          </View>
          <View>
            <View></View>
          </View>
          <View style={styles.container}>
            <View style={styles.row}>
              <FlatList
                data={firstRow}
                keyExtractor={item => item.day.toString()}
                renderItem={renderItem}
                numColumns={7}
                scrollEnabled={false}
              />
            </View>
            <View style={styles.row}>
              <FlatList
                data={secondRow}
                keyExtractor={item => item.day.toString()}
                renderItem={renderItem}
                numColumns={7}
                scrollEnabled={false}
              />
            </View>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              ...Margins.mv.mv50,
            }}>
            <Text
              style={{
                color: Colors.primary,
                fontSize: FontSizes.large,
                fontWeight: FontWeights.regular,
                ...Margins.mh.mh10,
              }}>
              ₹ {totalPrice}
            </Text>
            <TouchableOpacity onPress={openModal}>
              <Text
                style={{
                  color: Colors.primary,
                  fontSize: FontSizes.small,
                  ...Margins.mt.mt3,
                }}>
                View Details
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              ...Margins.mh.mh15,
            }}>
            <View
              style={{
                flexDirection: 'row',
                borderWidth: 1,
                borderColor: Colors.grey,
                width: '48%',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  ...Paddings.ph.ph10,
                  alignItems: 'center',
                  borderRightWidth: 1,
                  borderRightColor: Colors.grey,
                }}>
                <Ionicons
                  name="person"
                  color={Colors.icon}
                  size={16}
                  style={{alignItems: 'center'}}
                />
              </View>
              <>
                <TextInput
                  style={styles.input}
                  onChangeText={name => setName(name)}
                  value={name}
                  placeholder="Name"
                  keyboardType="text"
                  placeholderTextColor={Colors.black}
                />
              </>
              {/* <>
                <Text style={{color: 'red'}}>{validationErrors}</Text>
              </> */}
            </View>

            <View
              style={{
                flexDirection: 'row',
                borderWidth: 1,
                borderColor: Colors.grey,
                width: '49%',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  ...Paddings.ph.ph10,
                  alignItems: 'center',
                  borderRightWidth: 1,
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
          </View>

          <View
            View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 25,
            }}>
            <Text style={{color: 'red'}}>{validationErrors}</Text>

            <Text style={{color: 'red', marginRight: 50}}>
              {validationErrors}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: Colors.grey,
              ...Margins.mh.mh15,
              ...Margins.mt.mt15,
            }}>
            <View
              style={{
                justifyContent: 'center',
                ...Paddings.ph.ph10,
                alignItems: 'center',
                borderRightWidth: 1,
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
              style={styles.input}
              onChangeText={e => setPickupAddress(e)}
              value={pickupAddress}
              placeholder="Enter Pickup Address"
              keyboardType="text"
              placeholderTextColor={Colors.black}
            />
          </View>
          <>
            <Text style={{color: 'red', marginLeft: 25}}>
              {validationErrors}
            </Text>
          </>
        </View>
        <View
          style={{
            flexDirection: 'row',
            ...Margins.mh.mh15,
            width: '93%',
            ...Margins.mt.mt15,
          }}>
          <View
            style={{
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: Colors.grey,
              width: '50%',
              height: 40,
            }}>
            <View
              style={{
                justifyContent: 'center',
                ...Paddings.ph.ph10,
                alignItems: 'center',
                borderRightWidth: 1,
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
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: Colors.black,
                  ...Margins.mr.mr15,
                  fontSize: FontSizes.small,
                  ...Margins.mh.mh5,
                }}>
                {selectedSubOptiononeway}
              </Text>
              <Ionicons
                name="caret-down"
                color="black"
                size={12}
                style={{
                  right: 0,
                  position: 'absolute',

                  alignItems: 'flex-end',
                  justifyContent: 'flex-end',
                }}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: Colors.grey,
              ...Margins.mh.mh10,
              width: '46%',
            }}>
            <View
              style={{
                justifyContent: 'center',
                ...Paddings.ph.ph10,
                alignItems: 'center',
                borderRightWidth: 1,
                borderRightColor: Colors.grey,
              }}>
              <MaterialCommunityIcons
                name="clock"
                color={Colors.icon}
                size={16}
              />
            </View>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              {/* <Picker
                selectedValue={selectedTime}
                onValueChange={itemValue => setSelectedTime(itemValue)}
                style={styles.pickerTime}
                dropdownIconColor={Colors.black}
                itemStyle={{color: Colors.black, fontSize: FontSizes.xsmall}}>
                <Picker.Item
                  label={'Time'}
                  value={''}
                  style={{fontSize: FontSizes.xsmall}}
                />
                {times.map((time, index) => (
                  <Picker.Item
                    key={index}
                    label={time}
                    value={time}
                    style={{
                      color: Colors.white,
                      fontSize: FontSizes.tinymedium,
                    }}
                  />
                ))}
              </Picker>
              {selectedTime === '' && (
                <Text style={styles.placeholderText}>time</Text>
              )} */}

              <Picker
                selectedValue={selectedTime}
                onValueChange={itemValue => setSelectedTime(itemValue)}
                style={styles.pickerTime}
                dropdownIconColor={Colors.black}
                itemStyle={{color: Colors.black, fontSize: FontSizes.xsmall}}>
                <Picker.Item
                  label={'Select Time'}
                  value={''}
                  style={{
                    fontSize: FontSizes.xsmall,
                    // backgroundColor :"grey"
                  }}
                />
                {times.map((time, index) => (
                  <Picker.Item
                    key={index}
                    label={time.label}
                    value={time.value}
                    style={{
                      color: Colors.white,
                      fontSize: FontSizes.tinymedium,
                      // backgroundColor :"grey"
                    }}
                  />
                ))}
              </Picker>
              {selectedTime === '' && (
                <Text style={styles.placeholderText}>time</Text>
              )}
            </View>
          </View>
        </View>
        <>
          <Text style={{color: 'red', marginLeft: 25}}>{validationErrors}</Text>
        </>

        {/* RBsheetstart */}

        <RBSheet
          ref={refRBSheet}
          useNativeDriver={true}
          customStyles={{
            container: {
              justifyContent: 'center',
              alignItems: 'center',
              height: 300,
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
                color={Colors.grey}
                size={24}
                style={{alignItems: 'center'}}
              />
            </TouchableOpacity>

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
                Manual
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
                Automatic
              </Button>
            </View>
            {isStandardOptionSelectedoneway ? (
              <View
                style={{
                  borderLeftWidth: 1,
                  borderLeftColor: Colors.grey,
                  borderBottomWidth: 1,
                  borderBottomColor: Colors.grey,
                  borderRightWidth: 1,
                  borderRightColor: Colors.grey,
                }}>
                <TouchableOpacity
                  value="Manual-Hatchback"
                  status={
                    selectedSubOptiononeway === 'Manual-Hatchback'
                      ? 'checked'
                      : 'unchecked'
                  }
                  onPress={() => {
                    selectSubOptiononeway('Manual-Hatchback'),
                      refRBSheet.current.close();
                  }}
              
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
                      Hatchback
                    </Text>
                  </View>
                  <RadioButton
                    value="Manual-Hatchback"
                    status={
                      selectedSubOptiononeway === 'Manual-Hatchback'
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => {
                      selectSubOptiononeway('Manual-Hatchback'),
                        refRBSheet.current.close();
                    }}
                    uncheckedColor={Colors.darkgrey}
                    color={Colors.darkblue}
                  />
                </TouchableOpacity>
                <Divider width={1} />
                <TouchableOpacity
                  value="Manual-Sedan"
                  status={
                    selectedSubOptiononeway === 'Manual-Sedan'
                      ? 'checked'
                      : 'unchecked'
                  }
                  onPress={() => {
                    selectSubOptiononeway('Manual-Sedan'),
                      refRBSheet.current.close();
                  }}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    ...Margins.m.m10,
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={require('../../assets/images/sedan.png')}
                      style={{width: 70, height: 30}}
                    />
                    <Text style={styles.radioButtonTextStandard}>Sedan</Text>
                  </View>
                  <RadioButton
                    value="Manual-Sedan"
                    status={
                      selectedSubOptiononeway === 'Manual-Sedan'
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => {
                      selectSubOptiononeway('Manual-Sedan'),
                        refRBSheet.current.close();
                    }}
                    uncheckedColor={Colors.darkgrey}
                    color={Colors.darkblue}
                  />
                </TouchableOpacity>
                <Divider width={1} />
                <TouchableOpacity
                  value="Manual-SUV"
                  status={
                    selectedSubOptiononeway === 'Manual-SUV'
                      ? 'checked'
                      : 'unchecked'
                  }
                  onPress={() => {
                    selectSubOptiononeway('Manual-SUV'),
                      refRBSheet.current.close();
                  }}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    ...Margins.m.m10,
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={require('../../assets/images/suv.png')}
                      style={{width: 70, height: 30}}
                    />
                    <Text style={styles.radioButtonTextStandard}>SUV</Text>
                  </View>
                  <RadioButton
                    value="Manual-SUV"
                    status={
                      selectedSubOptiononeway === 'Manual-SUV'
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => {
                      selectSubOptiononeway('Manual-SUV'),
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
                  borderLeftWidth: 1,
                  borderLeftColor: Colors.grey,
                  borderBottomWidth: 1,
                  borderBottomColor: Colors.grey,
                  borderRightWidth: 1,
                  borderRightColor: Colors.grey,
                }}>
                <TouchableOpacity
                  value="Automatic-Hatchback"
                  status={
                    selectedSubOptiononeway === 'Automatic-Hatchback'
                      ? 'checked'
                      : 'unchecked'
                  }
                  onPress={() => {
                    selectSubOptiononeway('Automatic-Hatchback'),
                      refRBSheet.current.close();
                  }}
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
                      Hatchback
                    </Text>
                  </View>
                  <RadioButton
                    value="Automatic-Hatchback"
                    status={
                      selectedSubOptiononeway === 'Automatic-Hatchback'
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => {
                      selectSubOptiononeway('Automatic-Hatchback'),
                        refRBSheet.current.close();
                    }}
                    uncheckedColor={Colors.darkgrey}
                    color={Colors.darkblue}
                  />
                </TouchableOpacity>
                <Divider width={1} />
                <TouchableOpacity
                  value="Automatic-Sedan"
                  status={
                    selectedSubOptiononeway === 'Automatic-Sedan'
                      ? 'checked'
                      : 'unchecked'
                  }
                  onPress={() => {
                    selectSubOptiononeway('Automatic-Sedan'),
                      refRBSheet.current.close();
                  }}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    ...Margins.m.m10,
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={require('../../assets/images/sedan.png')}
                      style={{width: 70, height: 30}}
                    />
                    <Text style={styles.radioButtonTextStandard}>Sedan</Text>
                  </View>
                  <RadioButton
                    value="Automatic-Sedan"
                    status={
                      selectedSubOptiononeway === 'Automatic-Sedan'
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => {
                      selectSubOptiononeway('Automatic-Sedan'),
                        refRBSheet.current.close();
                    }}
                    uncheckedColor={Colors.darkgrey}
                    color={Colors.darkblue}
                  />
                </TouchableOpacity>
                <Divider width={1} />
                <TouchableOpacity
                  value="Automatic-SUV"
                  status={
                    selectedSubOptiononeway === 'Automatic-SUV'
                      ? 'checked'
                      : 'unchecked'
                  }
                  onPress={() => {
                    selectSubOptiononeway('Automatic-SUV'),
                      refRBSheet.current.close();
                  }}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    ...Margins.m.m10,
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={require('../../assets/images/suv.png')}
                      style={{width: 70, height: 30}}
                    />
                    <Text style={styles.radioButtonTextStandard}>SUV</Text>
                  </View>
                  <RadioButton
                    value="Automatic-SUV"
                    status={
                      selectedSubOptiononeway === 'Automatic-SUV'
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => {
                      selectSubOptiononeway('Automatic-SUV'),
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

        {/* Display selected car info */}
        {/* <View style={{marginTop: 20}}>
          <Text style={{color: 'red'}}>
            Selected Car Model: {carInfo.car_model}
          </Text>
          <Text style={{color: 'red'}}>
            Selected Vehicle Type: {carInfo.vehicle_type}
          </Text>
        </View> */}

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
            <TouchableOpacity
              // onPress={() => navigation.navigate('weeklyconfirmdriver')}
              onPress={handleBooking}
              style={{
                justifyContent: 'center',
                backgroundColor: '#16588e',
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
                Book Now
              </Text>
            </TouchableOpacity>
          </DropShadow>
        </View>
      </View>
    </ScrollView>
  );
};

export default WeeklyBookingScreen;

const styles = StyleSheet.create({
  viewBtn: {
    backgroundColor: Colors.grey,
    borderRadius: 5,
    ...Paddings.p.p5,
  },
  activeViewBtn: {
    backgroundColor: Colors.white,
    borderRadius: 5,
    ...Paddings.p.p5,
  },
  container: {
    ...Paddings.pt.pt50,
    ...Paddings.ph.ph15,
    backgroundColor: Colors.white,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...Margins.mb.mb5,
  },
  item: {
    width: 43,
    height: 43,
    ...Margins.mh.mh2,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
  },
  selectedItem: {
    backgroundColor: Colors.primary,
    borderColor: '#0056b3',
    color: Colors.white,
  },
  text: {
    fontSize: FontSizes.tinyxsmall,
    color: Colors.black,
    alignItems: 'center',
  },
  textTwo: {
    fontSize: FontSizes.tinyxsmall,
    color: Colors.black,
    ...Margins.mt.mt5,
  },
  priceText: {
    fontSize: FontSizes.large,
    fontWeight: FontWeights.bold,
  },
  selectedText: {
    color: Colors.white,
  },
  titleStyle: {
    color: Colors.primary,
    fontSize: FontSizes.tinymedium,
    fontWeight: FontWeights.bold,
  },
  imageStyle: {
    width: 40,
    height: 35,
  },
  modalStyle: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContentStyle: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Paddings.pb.pb20,
  },
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
    ...Paddings.p.p5,
  },
  dotGreen: {
    backgroundColor: 'green',
    width: 5,
    height: 5,
    borderRadius: 10,
    ...Paddings.p.p5,
  },
  labelText: {
    color: Colors.black,
    marginHorizontal: 7,
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
    backgroundColor: 'orange',
    ...Paddings.p.p8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    marginHorizontal: '12%',
    ...Paddings.p.p3,
    borderRadius: 10,
    elevation: 3,
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  textTerms: {
    fontSize: FontSizes.small,
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
    position: 'absolute',
    left: 0,
    right: 20,
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
    ...Margins.mv.mv7,
    height: 22,
    position: 'absolute',
    width: '48%',
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  imageContainer: {
    ...Margins.mv.mv7,
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
    sborderColor: '#ccc',
    borderWidth: 1,
  },
  activeText: {
    color: Colors.white,
  },
  inactiveText: {
    color: Colors.grey,
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
    borderColor: Colors.grey,
    ...Margins.mt.mt10,
  },
  radioButtonTextStandard: {
    fontSize: FontSizes.medium,
    ...Margins.mh.mh20,
    color: Colors.grey,
  },
  radioButtonText: {
    fontSize: FontSizes.medium,
    color: Colors.grey,
    ...Margins.mh.mh20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    width: '50%',
    paddingVertical: 5,
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
  //
  loginContainer: {
    ...Margins.mt.mt20,
    ...Margins.mh.mh15,
    borderBottomWidth: 2,
    borderLeftColor: Colors.primary,
    borderRightColor: Colors.primary,
    borderBottomColor: Colors.primary,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderRadius: 3,
  },
  header: {
    backgroundColor: Colors.primary,
    height: 100,
    justifyContent: 'space-between',

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
    ...Margins.mb.mb10,
  },
  loginText: {
    color: Colors.white,
    fontWeight: FontWeights.regular,
    fontSize: FontSizes.xlarge,
  },
});
