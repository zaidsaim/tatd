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
  ActivityIndicator
} from 'react-native';
import OTTHeader from '../../components/OTTHeader';
import {
  Colors,
  FontSizes,
  Paddings,
  Margins,
  FontWeights,
} from '../../assets/colors';
import {Picker} from '@react-native-picker/picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DropShadow from 'react-native-drop-shadow';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  fetchdaysApi,
  fetchhoursApi,
  fetchsalaryApi,
} from '../../api/services/apiService';
import {refreshAccessToken, validateAccessToken} from '../../utils/validation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RadioButton} from 'react-native-paper';
import axios from 'axios';
import { BorderWidths } from '../../assets/colors';
const MonthlyBookingScreen = ({navigation, route}) => {
  const {selectedzone} = route?.params;
  const [name, setName] = useState();
  const [mobileNumber, setMobileNumber] = useState();
  const [email, setEmail] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [textColor, setTextColor] = useState(Colors.darkgrey);
  const [iconColor, setIconColor] = useState(Colors.darkgrey);
  const [daysdata, setDaysdata] = useState();
  const [selectedday, setSelectedday] = useState();
  const [modalVisibleDays, setModalVisibleDays] = useState(false);
  const [selectedHours, setSelectedHours] = useState();
  const [hoursdata, setHoursdata] = useState();
  const [modalVisibleHours, setModalVisibleHours] = useState(false);
  const [selectedSalary, setSelectedSalary] = useState();
  const [salarydata, setSalarydata] = useState();
  const [modalVisibleSalary, setModalVisibleSalary] = useState(false);
  const [selectCityData, setSelectCityData] = useState();
  const [validationErrors, setValidationErrors] = useState({});
  const [error, setError] = useState();
  const [viewDate, setViewData] = useState();
  const [loading, setLoading] = useState();
  const [insertdata,setInsertdata]=useState()
  const days = Array.from({length: 5}, (_, i) => `${26 - i} days`);
  const Hours = Array.from({length: 5}, (_, i) => `${12 - i} Hours`);

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


  useEffect(() => {
    fetchgetDays();
  }, [selectedday]);
  useEffect(() => {
    fetchsalaryApis();
  }, [selectedHours, selectedday]);

  useEffect(()=>{
    fetchViewDetails()
  },[])
  const fetchgetDays = async () => {
    setLoading(true);
    const isValid = await validateAccessToken();
    if (!isValid) {
      await refreshAccessToken();
    }
    try {
      const userData = await AsyncStorage.getItem('userData');
      const parsedUserData = userData ? JSON.parse(userData) : null;
      const token = parsedUserData ? parsedUserData.jwt : null;
      const selectcitydata = await AsyncStorage.getItem('selectcityitem');

      const city = String(selectcitydata);
      console.log('============city', city);
      const sanitizedSelectedDay = selectedday
        ? String(selectedday).replace(' Days', '').trim()
        : '';

      if (!token) {
        throw new Error('No token found');
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      const postData = {
        action: 'get_working_days',
        category: 'Private Driver',
        product_type: 'Permanent',
        city: city,
      };

      const response = await axios.post(
        'https://www.tatd.in/app-api/customer/monthly/get-working-days-api.php',
        postData,
        config,
      );
      const extractedDays = response?.data?.working_days_data.map(
        item => Object.values(item)[0],
      );
      setDaysdata(extractedDays);
      console.log('response from days api=========', response.data);
      if (response.data.status_code === 200) {
        fetchHoursApis();
      }
      return response.data;
    } catch (error) {
      console.error('Error from fetch days API:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const fetchHoursApis = async () => {
    setLoading(true);
    const isValid = await validateAccessToken();
    if (!isValid) {
      await refreshAccessToken();
    }
    try {
      const userData = await AsyncStorage.getItem('userData');
      const parsedUserData = userData ? JSON.parse(userData) : null;
      const token = parsedUserData ? parsedUserData.jwt : null;
      const selectcitydata = await AsyncStorage.getItem('selectcityitem');

      const city = String(selectcitydata);
      const sanitizedSelectedDay = selectedday
        ? String(selectedday).replace(' Days', '').trim()
        : '';
      console.log('=========sanitizedSelectedDay=======', sanitizedSelectedDay);
      if (!token) {
        throw new Error('No token found');
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      const postData = {
        action: 'get_working_hours',
        category: 'Private Driver',
        product_type: 'Permanent',
        city: city,
        working_days: sanitizedSelectedDay,
      };

      const response = await axios.post(
        'https://www.tatd.in/app-api/customer/monthly/get-working-hours-api.php',
        postData,
        config,
      );
      const extractedHours = response?.data?.working_hours_data.map(
        item => Object.values(item)[0],
      );
      if (response.data.status_code === 200) {
        fetchsalaryApis();
      }
      console.log('response from hours api', response.data);
      setHoursdata(extractedHours);
      return response.data;
    } catch (error) {
      console.error('Error from fetch hours API:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const fetchsalaryApis = async () => {
    setLoading(true);
    try {
      const isValid = await validateAccessToken();
      if (!isValid) {
        await refreshAccessToken();
      }

      const userData = await AsyncStorage.getItem('userData');
      const parsedUserData = userData ? JSON.parse(userData) : null;
      const token = parsedUserData ? parsedUserData.jwt : null;
      const selectcitydata = await AsyncStorage.getItem('selectcityitem');

      const city = String(selectcitydata);
      console.log('selectedHours===========', selectedHours);
      const sanitizedSelectedDay = selectedday
        ? String(selectedday).replace(' Days', '').trim()
        : '';
      const hour = selectedHours
        ? String(selectedHours).replace(' Hours', '').trim()
        : '';

      console.log('city=======fromsalary', city);
      console.log('hour=======hour', hour);
      console.log(
        'sanitizedSelectedDay=======sanitizedSelectedDay',
        sanitizedSelectedDay,
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

      const postData = {
        action: 'get_working_hours',
        category: 'Private Driver',
        product_type: 'Permanent',
        city: city,
        working_days: sanitizedSelectedDay,
        working_hours: hour,
      };

      const response = await axios.post(
        'https://www.tatd.in/app-api/customer/monthly/get-salary-api.php',
        postData,
        config,
      );

      if (response?.data?.salary_data) {
        const extractedSalary = response.data.salary_data.map(
          item => Object.values(item)[0],
        );
        setSalarydata(extractedSalary);
        console.log('salary========response', response.data);
        return response.data;
      } else {
        console.error('No salary data found in response:', response.data);
        return null;
      }
    } catch (error) {
      console.error('Error from salary API:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const fetchViewDetails = async () => {
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
      const params = {
        action: 'view_popup',
      };
      const response = await axios.post(
        'https://www.tatd.in/app-api/customer/monthly/view-detail-popup-api.php',
       params,
        config
      );
      console.log('viewdetails==========', response);
      setViewData(response.data);
 
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error('Authorization error, please check your token.');
      } else {
        console.error(
          'Error from view API:',
          error.response ? error.response.data : error.message,
        );
      }
      throw error;
    }
  };

  const insetData = async () => {
    let errors = {};
    if (!name) errors.name = 'Please Enter Name';
    if (!mobileNumber) errors.mobileNumber = 'Please Enter Number';
    if (!selectedHours) errors.selectedHours = 'Please Enter Hours';
    if (!selectedday) errors.selectedday = 'Please select day';
    if (!salarydata) errors.salarydata = 'Please select salary';
    if (!email) errors.email = 'Please Enter email';
    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    const isValid = await validateAccessToken();
    if (!isValid) {
      await refreshAccessToken();
    }

    setLoading(true);

    try {
      const userData = await AsyncStorage.getItem('userData');
      const parsedUserData = userData ? JSON.parse(userData) : null;
      const token = parsedUserData ? parsedUserData.jwt : null;
      console.log('==========salaryemail', email);

      const sanitizedSelectedDay = selectedday
        ? String(selectedday).replace(' Days', '').trim()
        : '';
      const sanitizedSelectedSalary = salarydata
        ? String(salarydata[0]).replace(/[\[\]"Rs\s]/g, '').trim()
        : '';

      if (!token) {
        throw new Error('No token found');
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const body = {
        hours: selectedHours,
        days: sanitizedSelectedDay,
        total_price: 5000,
        product: 'Private Driver',
        sub_product: 'Private Driver',
        zone: selectedzone,
        salary: sanitizedSelectedSalary,
        name: name,
        mobile_number: mobileNumber,
        email: email,
      };

      const response = await axios.post(
        'https://www.tatd.in/app-api/customer/monthly/insert-permanent-driver-api.php',
        body,
        config,
      );
      console.log('Response from insert API check:', response.data);
      setInsertdata(response.data);

      if (response.data.status_code == 200) {
        navigation.navigate('monthlythanku');
      }
    } catch (error) {
      console.log(
        'Error from insert API:',
        error.response ? error.response.data : error.message,
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };


      // const insetData = async () => {
      //   let errors = {};
      //   if (!name) errors.name = 'Please Enter Name';
      //   if (!mobileNumber) errors.mobileNumber = 'Please Enter Number';
      //   if (!selectedHours) errors.selectedHours = 'Please Enter Hours'; 
      //   if (!selectedday) errors.selectedday = 'Please select day';
      //   if (!salarydata) errors.salarydata = 'Please select salary';
      //   if (!email) errors.email = 'Please Enter email';
      //   setValidationErrors(errors);
    
      //   if (Object.keys(errors).length > 0) {
      //     return;
      //   }

      //   const isValid = await validateAccessToken();
      //   if (!isValid) {
      //     await refreshAccessToken();
      //   }   
      //   try {
      //     const userData = await AsyncStorage.getItem('userData');
      //     const parsedUserData = userData ? JSON.parse(userData) : null;
      //     const token = parsedUserData ? parsedUserData.jwt : null;
      //     console.log('==========salaryemail', email)
      //     const sanitizedSelectedDay = selectedday
      //     ? String(selectedday).replace(' Days', '').trim()
      //     : '';
      //     const sanitizedSelectedSalary = salarydata
      //     ? String(salarydata[0]).replace(/[\[\]"Rs\s]/g, '').trim()
      //     : '';
      //     if (!token) {
      //       throw new Error('No token found');
      //     }
      //     const config = {
      //       headers: {
      //         Authorization: `Bearer ${token}`,
      //         'Content-Type': 'application/json',
      //       },
      //     };
    
      //     const body = {
      //       hours: selectedHours,
      //       days: sanitizedSelectedDay,
      //       total_price: 5000,
      //       product: 'Private Driver',
      //       sub_product: 'Private Driver',
      //       zone: selectedzone,
      //       salary: sanitizedSelectedSalary,
      //       name: name,
      //       mobile_number: mobileNumber,
      //       email: email,
      //     };
    
      //     const response = await axios.post(
      //       ' https://www.tatd.in/app-api/customer/monthly/insert-permanent-driver-api.php',
      //       body,
      //       config,
      //     );
      //     console.log('Response from insert API check:', response.data);
      //     setInsertdata(response.data)
      //     if(response.data.status_code == 200){
      //       navigation.navigate('monthlythanku')
      //     }
      //   } catch (error) {
      //     console.log(
      //       'Error from insert API:',
      //       error.response ? error.response.data : error.message,
      //     );
      //     throw error;
      //   }
      // };
    

  // const fetchgetHours = async () => {
  //   const isValid = await validateAccessToken();
  //   if (!isValid) {
  //     await refreshAccessToken();
  //   }
  //   const selectcitydata = await AsyncStorage.getItem('selectcityitem')
  //   city = String(selectcitydata);
  //   try {
  //     const data = await fetchhoursApi(city,daysdata);
  //     console.log('checkHours', data);

  //     const extractedHours = data?.working_hours_data.map(item => Object.values(item)[0]);
  //     fetchgetSalary()
  //     setHoursdata(extractedHours);

  //   } catch (error) {
  //     setError(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const fetchgetSalary = async () => {
  //   const isValid = await validateAccessToken();
  //   if (!isValid) {
  //     await refreshAccessToken();
  //   }

  //   try {
  //     const selectcitydata = await AsyncStorage.getItem('selectcityitem')
  //     city = String(selectcitydata);
  //     const data = await fetchsalaryApi(city,daysdata,hoursdata);
  //     console.log('salryy===========', data);
  //     const extractedSalary = data?.salary_data.map(item => Object.values(item)[0]);
  //     setSalarydata(extractedSalary);
  //   } catch (error) {
  //     setError(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleValueChangesDays = newValue => {
    setSelectedday(newValue);
  };
  const handleValueChangesHour = newValue => {
    setSelectedHours(newValue);
  };
  const handleValueChangesSalary = newValue => {
    setSelectedSalary(newValue);
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
              ...Margins.mv.mv15,
            }}>
            <Text style={styles.titleStyle}>Key Benefits</Text>
            <TouchableOpacity onPress={closeModal}>
              <Ionicons name="close" color={Colors.grey} size={22} />
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={{backgroundColor: Colors.white, ...Margins.mh.mh15}}>
              <View
                style={{
                  borderRadius: 5,
                  backgroundColor: Colors.lightgrey,
                  flexDirection: 'row',
                  alignItems: 'center',
                  ...Margins.ml.ml15,
                }}>
                <View
                  style={{left: -20, position: 'absolute', ...Margins.mr.mr20}}>
                  <Image
                    source={require('../../assets/images/first_icon.png')}
                    resizeMode={'cover'}
                    style={styles.imageStyle}
                  />
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
                   {viewDate?.view_detail_data[0].title}
                  </Text>
                  <Text
                    style={{color: Colors.primary, fontSize: FontSizes.xtiny}}>
                     {viewDate?.view_detail_data[0].description}
                  </Text>
               
                </View>
              </View>
            </View>
            <View
              style={{
                backgroundColor: Colors.white,
                ...Margins.mh.mh15,
                ...Margins.mv.mv10,
              }}>
              <View
                style={{
                  borderRadius: 5,
                  backgroundColor: Colors.lightgrey,
                  flexDirection: 'row',
                  alignItems: 'center',
                  ...Margins.ml.ml15,
                }}>
                <View
                  style={{left: -20, position: 'absolute', ...Margins.mr.mr20}}>
                  <Image
                    source={require('../../assets/images/secound_icon.png')}
                    resizeMode={'cover'}
                    style={styles.imageStyle}
                  />
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
                    {viewDate?.view_detail_data[0].title}
                  </Text>
                  <Text
                    style={{color: Colors.primary, fontSize: FontSizes.xtiny}}>
                {viewDate?.view_detail_data[0].description}
                  </Text>
                 
                </View>
              </View>
            </View>
            <View style={{backgroundColor: Colors.white, ...Margins.mh.mh15}}>
              <View
                style={{
                  borderRadius: 5,
                  backgroundColor: Colors.lightgrey,
                  flexDirection: 'row',
                  alignItems: 'center',
                  ...Margins.ml.ml15,
                }}>
                <View
                  style={{left: -20, position: 'absolute', ...Margins.mr.mr20}}>
                  <Image
                    source={require('../../assets/images/third_icon.png')}
                    resizeMode={'cover'}
                    style={styles.imageStyle}
                  />
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
                   {viewDate?.view_detail_data[0].title}
                  </Text>
                  <Text
                    style={{color: Colors.primary, fontSize: FontSizes.xtiny}}>
                {viewDate?.view_detail_data[0].description}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                backgroundColor: Colors.white,
                ...Margins.mh.mh15,
                ...Margins.mv.mv10,
              }}>
              <View
                style={{
                  borderRadius: 5,
                  backgroundColor: Colors.lightgrey,
                  flexDirection: 'row',
                  alignItems: 'center',
                  ...Margins.ml.ml15,
                }}>
                <View
                  style={{left: -20, position: 'absolute', ...Margins.mr.mr20}}>
                  <Image
                    source={require('../../assets/images/forth_icon.png')}
                    resizeMode={'cover'}
                    style={styles.imageStyle}
                  />
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
                     {viewDate?.view_detail_data[0].title}
                  </Text>
                  <Text
                    style={{color: Colors.primary, fontSize: FontSizes.xtiny}}>
                {viewDate?.view_detail_data[0].description}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{backgroundColor: Colors.white, ...Margins.mh.mh15}}>
              <View
                style={{
                  borderRadius: 5,
                  backgroundColor: Colors.lightgrey,
                  flexDirection: 'row',
                  alignItems: 'center',
                  ...Margins.ml.ml15,
                }}>
                <View
                  style={{left: -20, position: 'absolute', ...Margins.mr.mr20}}>
                  <Image
                    source={require('../../assets/images/five_icon.png')}
                    resizeMode={'cover'}
                    style={styles.imageStyle}
                  />
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
                    {viewDate?.view_detail_data[0].title}
                  </Text>
                  <Text
                    style={{color: Colors.primary, fontSize: FontSizes.xtiny}}>
                     {viewDate?.view_detail_data[0].description}
                  </Text>
                 
                </View>
              </View>
            </View>
            <View
              style={{
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                ...Margins.m.m15,
              }}>
              <Text style={{color: Colors.black, fontSize: FontSizes.small}}>
                Prices shown are GST inclusive
              </Text>
            </View>
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
            <Text style={styles.loginText}>Permanent Driver</Text>
          </View>
        </View>
      </View>
      <View style={{flex: 1}}>
        <View>
          <Text
            style={{
              color: Colors.icon,
              fontSize: FontSizes.xbody,
              ...Paddings.p.p10,
              ...Margins.mh.mh30,
              fontWeight: FontWeights.regular,
              ...Margins.mt.mt5,
              ...Margins.mb.mb15,
            }}>
            SHARE YOUR REQUIRMENT
          </Text>
          <View style={styles.mainContainer}>
            <View style={styles.labelContainer}>
              <View style={styles.dot} />
              <Text style={styles.labelText}>For Working Days in Month?</Text>
            </View>
            <View style={styles.containerSelectHour}>
              <View style={{}}>
                <TouchableOpacity
                  onPress={() => setModalVisibleDays(true)}
                  style={styles.pickerContainer}>
                  <Text
                    style={{
                      color: Colors.white,
                      fontSize: FontSizes.small,
                      marginHorizontal: 2,
                    }}>
                    {selectedday || 'Working Days?'}
                  </Text>
                  <Icon
                    name="arrow-drop-down"
                    size={20}
                    color={Colors.white}
                    style={{marginRight: 5}}
                  />
                </TouchableOpacity>
              </View>
              <Modal
                transparent={true}
                visible={modalVisibleDays}
                onRequestClose={() => setModalVisibleDays(false)}>
                <View style={styles.modalOverlay}>
                  <View style={styles.modalContainer}>
                    <ScrollView>
                      <RadioButton.Group
                        onValueChange={newValue => {
                          handleValueChangesDays(newValue);
                          setModalVisibleDays(false);
                        }}
                        value={selectedday}>
                        <RadioButton.Item
                          label="Working Days"
                          value=""
                          labelStyle={{
                            color: Colors.black,
                            fontSize: FontSizes.body,
                          }}
                          style={{backgroundColor: 'white'}}
                        />
                        {Array.isArray(daysdata) &&
                          daysdata.map((day, index) => (
                            <RadioButton.Item
                              key={index}
                              label={day}
                              value={day}
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
          <View style={styles.mainContainer}>
            <View style={styles.labelContainer}>
              <View style={styles.dot} />
              <Text style={styles.labelText}>Daily Driver Hours</Text>
            </View>
            <View style={styles.containerSelectHour}>
              <View style={{}}>
                <TouchableOpacity
                  onPress={() => setModalVisibleHours(true)}
                  style={styles.pickerContainer}>
                  <Text
                    style={{
                      color: Colors.white,
                      fontSize: FontSizes.small,
                      marginHorizontal: 5,
                    }}>
                    {selectedHours || 'Daily Hours?'}
                  </Text>
                  <Icon
                    name="arrow-drop-down"
                    size={20}
                    color={Colors.white}
                    style={{marginHorizontal: 5}}
                  />
                </TouchableOpacity>
              </View>
              <Modal
                transparent={true}
                visible={modalVisibleHours}
                onRequestClose={() => setModalVisibleHours(false)}>
                <View style={styles.modalOverlay}>
                  <View style={styles.modalContainer}>
                    <ScrollView>
                      <RadioButton.Group
                        onValueChange={newValue => {
                          handleValueChangesHour(newValue);
                          setModalVisibleHours(false);
                        }}
                        value={selectedHours}>
                        <RadioButton.Item
                          label="Daily Hours"
                          value=""
                          labelStyle={{
                            color: Colors.black,
                            fontSize: FontSizes.body,
                          }}
                          style={{backgroundColor: 'white'}}
                        />
                        {Array.isArray(hoursdata) &&
                          hoursdata.map((hour, index) => (
                            <RadioButton.Item
                              key={index}
                              label={hour}
                              value={hour}
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
          <View style={styles.mainContainer}>
            <View style={styles.labelContainer}>
              <View style={styles.dot} />
              <Text style={styles.labelText}>I Will Offer Salary?</Text>
            </View>
            <View style={styles.containerSelectHour}>
              <View style={{}}>
                <TouchableOpacity
                  onPress={() => setModalVisibleSalary(true)}
                  style={styles.pickerContainer}>
                  <Text
                    style={{
                      color: Colors.white,
                      fontSize: FontSizes.small,
                      marginHorizontal: 5,
                    }}>
                    {selectedSalary}
                  </Text>
                  <Icon
                    name="arrow-drop-down"
                    size={20}
                    color={Colors.white}
                    style={{marginHorizontal: 2}}
                  />
                </TouchableOpacity>
              </View>
              <Modal
                transparent={true}
                visible={modalVisibleSalary}
                onRequestClose={() => setModalVisibleSalary(false)}>
                <View style={styles.modalOverlay}>
                  <View style={styles.modalContainer}>
                    <ScrollView>
                      <RadioButton.Group
                        onValueChange={newValue => {
                          handleValueChangesSalary(newValue);
                          setModalVisibleSalary(false);
                        }}
                        value={selectedSalary}>
                       
                        {Array.isArray(salarydata) &&
                          salarydata.map((salary, index) => (
                            <RadioButton.Item
                              key={index}
                              label={salary}
                              value={salary}
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
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              ...Margins.mt.mt35,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  color: Colors.primary,
                  fontSize: FontSizes.large,
                  fontWeight: FontWeights.regular,
                  ...Margins.mh.mh10,
                }}>
                ₹5000
              </Text>
              <Text
                style={{
                  color: Colors.darkgrey,
                  fontSize: FontSizes.small,
                  fontWeight: FontWeights.semiBold,
                  ...Margins.mt.mt5,
                }}>
                12 Months
              </Text>
            </View>
            <TouchableOpacity onPress={openModal}>
              <Text
                style={{
                  color: Colors.primary,
                  fontSize: FontSizes.small,
                  ...Margins.mt.mt10,
                  ...Paddings.pl.pl30,
                }}>
                View Package Benefits
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{}}>

            <View style={{...Margins.mv.mv25}}>
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
<View>
            <TextInput
              style={styles.input}
              onChangeText={mobileNumber => setMobileNumber(mobileNumber)}
              value={mobileNumber}
              placeholder="Mobile Number"
              placeholderTextColor="black"
              
            />
            {validationErrors.mobileNumber && (
          <Text style={[styles.errorText, , {fontSize: 10,marginHorizontal:10}]}>
            {validationErrors.mobileNumber}
          </Text>
        )}
          </View>
          </View>
          </View>
        <View
          style={{
            flexDirection: 'row',
            ...BorderWidths.bw.bw1,
            borderColor: Colors.grey,
            ...Margins.mh.mh15,
            ...Margins.mt.mt10
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
              name="email"
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
            onChangeText={email => setEmail(email)}
            value={email}
            placeholder="Enter Your Email"
            keyboardType="text"
            placeholderTextColor={Colors.black}
            multiline={true}
            maxHeight={100}
          />
        </View>
        {validationErrors.email && (
          <Text style={[styles.errorText, , {fontSize: 10, marginLeft: 25}]}>
            {validationErrors.email}
          </Text>
        )}
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('drivertermsscreen')}
          style={styles.card}>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              onPress={handlePress}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={[styles.textTerms, {color: textColor}]}>
                Terms & Conditions and Refund Policy
              </Text>
              <MaterialCommunityIcons
                name="chevron-right"
                color={iconColor}
                size={16}
                style={{...Margins.ml.ml8}}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
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
              onPress={insetData}
              style={{
                justifyContent: 'center',
                backgroundColor: '#16588e',
                alignItems: 'center',
                ...Paddings.p.p10,
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
                Email Proposal
              </Text>
            </TouchableOpacity>
          </DropShadow>
        </View>
      </View>
    </ScrollView>
  );
};
//onPress={()=>navigation.navigate('monthlythanku')}
export default MonthlyBookingScreen;

const styles = StyleSheet.create({
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
     marginHorizontal:10
  },
  pickerContainer: {
    backgroundColor: Colors.orange,
    ...Paddings.p.p2,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 3,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: 'white',

    padding: 20,
    elevation: 2,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    backgroundColor: 'red',
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginHorizontal: 10,
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

  card: {
    marginHorizontal: '12%',
    ...Paddings.p.p5,
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
    width:'100%'
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
    ...Paddings.p.P20,
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
    ...Margins.mh.mh20,
    borderLeftColor: Colors.primary,
    borderRadius: 2,
  },
  header: {
    backgroundColor: Colors.primary,
    height: 100,
    justifyContent: 'space-between',
    borderRadius: 7,
    borderColor: Colors.primary,
  },
  roudtripcontainer: {
    marginVertical: 7,
    height: 20,
    width: '78%',
    backgroundColor: Colors.white,
  },
  roudtripText: {
    position: 'absolute',
    color: Colors.primary,
    marginLeft: 5,
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
