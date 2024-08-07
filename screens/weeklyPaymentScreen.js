import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import OTTHeader from '../components/OTTHeader';
import {
  Colors,
  FontSizes,
  FontWeights,
  Paddings,
  Margins,
  BorderRadius,
  BorderWidths,
} from '../assets/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {KeyboardAvoidingView} from 'react-native';
import Modal from 'react-native-modal';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {validateAccessToken, refreshAccessToken} from '../utils/validation';
import ToggleSwitch from 'toggle-switch-react-native';
import {
  bookingvalidationApi,
  fetchcashOptionApi,
  deleteRadeemApi,
} from '../api/services/apiService';
const WeeklyPaymentScreen = ({navigation, route}) => {
  const {fbId} = route?.params;

  console.log(fbId, 'fbidddddddddd');

  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisibleSecond, setModalVisibleSecond] = useState(false);
  const [email, setEmail] = useState();
  const [number, setNumber] = useState();
  const [firstTextWidth, setFirstTextWidth] = useState(0);
  const [secondTextWidth, setSecondTextWidth] = useState(0);
  const [selectedOption, setSelectedOption] = useState('cash');
  const [redeemdata, setRedeemdata] = useState();
  const [applyradeemdata, setApplyradeemdata] = useState();
  const [isOn, setIsOn] = useState();
  const [bookingvalidationdata, setBookingvalidationdata] = useState();
  const [cashoption, setCashoption] = useState();
  const [error, setError] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const isValid = await validateAccessToken();
    if (!isValid) {
      await refreshAccessToken();
    }
    try {
      await Promise.all([fetchcashOption(), getRadeem(), bookingValidation()]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    Promise.all([
      fetchcashOption(),
      getRadeem(),
      bookingValidation(),
      fetchhomerating(),
      getDeviceInfo(),
    ]).then(() => setRefreshing(false));
  }, []);

  const handleToggle = isOn => {
    setIsOn(isOn);
    if (isOn) {
      applyRadeem();
    } else {
      deleteRadeem();
    }
    console.log('changed to : ', isOn);
  };

  const amounts = [
    bookingvalidationdata?.single_booking_validation_data?.fs_package,
    bookingvalidationdata?.single_booking_validation_data?.chauffeur_service,
    bookingvalidationdata?.single_booking_validation_data?.washing_service,
  ];

  const cashtotalAmount = amounts
    .filter(amount => amount > 0)
    .reduce(
      (acc, amount) =>
        acc +
        amount -
        bookingvalidationdata?.single_booking_validation_data?.coupon_discount,
      '',
    );
  const onlinetotalAmount = amounts
    .filter(amount => amount > 0)
    .reduce(
      (acc, amount) =>
        acc +
        amount -
        bookingvalidationdata?.single_booking_validation_data?.coupon_discount,
      '',
    );
  const getRadeem = async () => {
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
        'https://www.tatd.in/app-api/customer/ondemand/redeem-booking.php?action=get_customer_balance_redeem_amount',
        {
          action: 'get_customer_balance_redeem_amount',
        },
        config,
      );
      console.log('radeem Data get:', response.data);
      setRedeemdata(response.data);
    } catch (err) {
      setError(err.message);
      console.log('Error from radeem API:', err.message);
    }
  };
  const applyRadeem = async () => {
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
        'https://www.tatd.in/app-api/customer/ondemand/redeem-booking.php?action=update_referral_amount',
        {
          action: 'update_referral_amount',
          referral_action: 'add',
          referral_amount: redeemdata?.customer_balance_redeem_amount,
          booking_validation_id: bookingvaludata,
        },
        config,
      );
      bookingValidation();
      //console.log('apply radeem Data:', response.data);
      setApplyradeemdata(response.data);
    } catch (err) {
      setError(err.message);
      console.log('Error from applyradeem API:', err.message);
    }
  };
  const deleteRadeem = async () => {
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
        'https://www.tatd.in/app-api/customer/ondemand/redeem-booking.php?action=update_referral_amount',
        {
          action: 'update_referral_amount',
          referral_action: 'remove',
          referral_amount: redeemdata?.customer_balance_redeem_amount,
          booking_validation_id: bookingvaludata,
        },
        config,
      );
      //console.log('delete radeem Data:', response.data);
      bookingValidation();
      setApplyradeemdata(response.data);
    } catch (err) {
      setError(err.message);
      console.log('Error from deleteradeem API:', err.message);
    }
  };

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
        'bookingdata. booking_validation_id==================',
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
        'https://www.tatd.in/app-api/customer/weekly/get-booking-validation-data.php',
        {
          qb_number: fbId,
        },
        config,
      );
      console.log('payment validation Data:', response.data);
      setBookingvalidationdata(response.data);
    } catch (err) {
      setError(err.message);
      console.log('Error from payment validation API:', err.message);
    }
  };

  const fetchcashOption = async () => {
    setLoading(true);
    const isValid = await validateAccessToken();
    if (!isValid) {
      await refreshAccessToken();
    }
    try {
      const data = await fetchcashOptionApi();
      console.log('fetch data:', data);
      setCashoption(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };


  const openModal = () => {
    setModalVisible(!isModalVisible);
  };
  const openModalSecond = () => {
    setModalVisibleSecond(!isModalVisibleSecond);
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  const handleCloseSecond = () => {
    setModalVisibleSecond(false);
  };
  const referimage = require('../assets/images/referr.png');
  console.log(
    'check========price',
    bookingvalidationdata?.single_booking_validation_data?.coupon_discount,
  );

  return (
    <View
      style={{flex: 1}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <OTTHeader navigation={navigation} title={'trusted & trained driver'} />
      {redeemdata?.customer_balance_redeem_amount > 0 &&
      bookingvalidationdata?.single_booking_validation_data?.coupon_code ===
        '' ? (
        <View
          style={{
            ...Margins.mt.mt10,
            borderColor: Colors.grey,
            ...BorderWidths.bw.bw3,
            ...Margins.m.m15,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              ...Margins.m.m10,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image source={referimage} style={{width: 30, height: 30}} />
              <View style={{marginHorizontal: 20}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      color: Colors.black,
                      fontSize: FontSizes.medium,
                      fontWeight: FontWeights.semiBold,
                    }}>
                    Redeem Referral
                  </Text>
                  <View
                    style={{
                      backgroundColor: Colors.primary,
                      ...Margins.mh.mh10,
                      ...BorderRadius.br5,
                      ...Paddings.ph.ph5,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{color: Colors.white, fontSize: FontSizes.small}}>
                      Rs {redeemdata.customer_balance_redeem_amount}
                    </Text>
                  </View>
                  <View style={{...Margins.ml.ml20}}>
                    <ToggleSwitch
                      isOn={isOn}
                      onColor={Colors.primary}
                      offColor={Colors.grey}
                      labelStyle={{color: 'black', fontWeight: '600'}}
                      size="small"
                      onToggle={handleToggle}
                    />
                  </View>
                </View>
                <Text
                  style={{
                    color: Colors.darkgrey,
                    fontSize: FontSizes.xtiny,
                    ...Margins.mt.mt5,
                  }}>
                  Redeem your referral rewards now !
                </Text>
              </View>
            </View>
          </View>
        </View>
      ) : null}
      <View style={styles.scrollContainer}>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={openModal}
            onLayout={event => {
              const {width} = event.nativeEvent.layout;
              setFirstTextWidth(width);
            }}>
            <Text style={styles.text}>+ Add GST details to get 5% Input</Text>
          </TouchableOpacity>
          <View style={[styles.underline, {width: firstTextWidth}]} />
        </View>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={openModalSecond}
            onLayout={event => {
              const {width} = event.nativeEvent.layout;
              setSecondTextWidth(width);
            }}>
            <Text style={styles.text}>
              + Add your email to receive Driver Background Report
            </Text>
          </TouchableOpacity>
          <View style={[styles.underline, {width: secondTextWidth}]} />
        </View>
        <Modal
          isVisible={isModalVisibleSecond}
          onBackdropPress={handleCloseSecond}
          style={styles.modal}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={handleCloseSecond}
              style={styles.closeButton}>
              <Ionicons name="close" color={Colors.white} size={24} />
            </TouchableOpacity>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              <View
                style={{
                  backgroundColor: Colors.white,
                  ...Paddings.pt.pt10,
                  ...BorderRadius.br5,
                }}>
                <Text
                  style={{
                    color: Colors.black,
                    fontSize: FontSizes.tiny,
                    ...Margins.mh.mh10,
                    ...Margins.mt.mt5,
                  }}>
                  Your family or friends will auto receive information about
                  your driver
                </Text>
                <Text
                  style={{
                    color: Colors.black,
                    fontSize: FontSizes.tiny,
                    ...Margins.mh.mh10,
                    ...Margins.mt.mt5,
                  }}>
                  via tat d smart Safety Shield.
                </Text>
                <View style={{...Margins.mv.mv20}}>
                  <Text
                    style={{
                      color: Colors.black,
                      fontSize: FontSizes.tiny,
                      ...Margins.mh.mh10,
                      ...Margins.mt.mt5,
                    }}>
                    - Driver Background Report Via Email
                  </Text>
                  <Text
                    style={{
                      color: Colors.black,
                      fontSize: FontSizes.tiny,
                      ...Margins.mh.mh10,
                      ...Margins.mt.mt5,
                    }}>
                    - 3 Reference of driver Via Email
                  </Text>
                  <Text
                    style={{
                      color: Colors.black,
                      fontSize: FontSizes.tiny,
                      ...Margins.mh.mh10,
                      ...Margins.mt.mt5,
                    }}>
                    - Ongoing Trip Status Via SMS
                  </Text>
                </View>
              </View>
              <Text style={styles.title}>Edit Email Details</Text>
              <KeyboardAvoidingView behavior="padding">
                <TextInput
                  style={styles.input}
                  onChangeText={email => setEmail(email)}
                  value={email}
                  placeholder="Enter email"
                  placeholderTextColor={Colors.black}
                />
                <TextInput
                  style={styles.input}
                  onChangeText={number => setNumber(number)}
                  value={number}
                  placeholder="Alternate Number (family or friend)"
                  keyboardType="numeric"
                  placeholderTextColor={Colors.black}
                />
              </KeyboardAvoidingView>
              <TouchableOpacity style={styles.confirmButton}>
                <Text style={styles.confirmButtonText}>Confirm and Save</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </Modal>
        {/* //second */}
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={closeModal}
          style={styles.modal}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Ionicons name="close" color={Colors.white} size={24} />
            </TouchableOpacity>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              <Text style={styles.title}>Edit GST Details</Text>
              <KeyboardAvoidingView behavior="padding">
                <TextInput
                  style={styles.input}
                  onChangeText={email => setEmail(email)}
                  value={email}
                  placeholder="Test"
                  placeholderTextColor={Colors.black}
                />
                <TextInput
                  style={styles.input}
                  onChangeText={number => setNumber(number)}
                  value={number}
                  placeholder="Test"
                  keyboardType="numeric"
                  placeholderTextColor={Colors.black}
                />
              </KeyboardAvoidingView>
              <TouchableOpacity style={styles.confirmButton}>
                <Text style={styles.confirmButtonText}>Confirm and Save</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </Modal>
        <View style={{backgroundColor: Colors.mediumgrey, ...Paddings.pt.pt10}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                backgroundColor: Colors.white,
                flexDirection: 'row',
                alignItems: 'center',
                ...BorderRadius.br20,
                marginHorizontal: 5,
              }}>
              <MaterialIcons
                name="check"
                color={Colors.darkgrey}
                style={{fontWeight: FontWeights.bold}}
              />
            </View>
            <Text style={{color: Colors.white, fontSize: FontSizes.xsmall}}>
              Free cancellation up to 1 hour before schedule time;
            </Text>
          </View>
          <View style={{...Margins.mh.mh20, ...Margins.mv.mv5}}>
            <Text style={{color: Colors.white, fontSize: FontSizes.xsmall}}>
              otherwise cancellation of 100 Rs will applies to block;
            </Text>
            <Text
              style={{
                color: Colors.white,
                fontSize: FontSizes.xsmall,
                ...Margins.mb.mb10,
                ...Margins.mv.mv5,
              }}>
              driver schedule;
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            ...Margins.mh.mh15,
            ...Margins.mt.mt20,
          }}>
          <Text
            style={{
              color: Colors.black,
              fontSize: FontSizes.medium,
              fontWeight: FontWeights.bold,
            }}>
            Payment options
          </Text>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              borderWidth: 1,
              borderColor: Colors.darkgrey,
              ...BorderRadius.br5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: Colors.black,
                ...Paddings.p.p5,
                ...Paddings.ph.ph10,
              }}>
              Back
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.radioContainer}>
          {cashoption?.cash_access == 1 ? (
            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => setSelectedOption('cash')}>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.radioCircle}>
                  {selectedOption === 'cash' && (
                    <View style={styles.selectedRb} />
                  )}
                </View>
                <View>
                  <Text style={styles.radioText}>Pay Cash</Text>
                  <Text style={styles.radioTextCash}>
                    Pay at the end of trip
                  </Text>
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.radioText}>₹{cashtotalAmount}</Text>
              </View>
            </TouchableOpacity>
          ) : (
            ''
          )}
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => setSelectedOption('online')}>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.radioCircle}>
                {selectedOption === 'online' && (
                  <View style={styles.selectedRb} />
                )}
              </View>
              <View style={{}}>
                <Text style={styles.radioText}>Pay Online</Text>
                <Text style={styles.radioTextCash}>Make full payment now</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.radioText}>₹{onlinetotalAmount}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{...Margins.mv.mv10}}>
          {selectedOption === 'cash' ? (
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 0.7, y: 0}}
              colors={['#126bb0', '#044e87']}
              style={styles.linearGradient}>
              <TouchableOpacity
                style={styles.buttonContent}
                onPress={() =>
                  navigation.navigate('FlexibleTermsCondition', {
                    item: selectedOption,
                    priceamount: onlinetotalAmount,
                    fbId :fbId
                  })
                }>
                <Text style={styles.buttonText}>BOOK NOW</Text>
                <Text style={styles.buttonText}>₹{onlinetotalAmount}</Text>
              </TouchableOpacity>
            </LinearGradient>
          ) : (
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 0.7, y: 0}}
              colors={['#126bb0', '#044e87']}
              style={styles.linearGradient}>
              <TouchableOpacity
                style={styles.buttonContent}
                onPress={() =>
                  navigation.navigate('FlexibleTermsCondition', {
                    item: selectedOption,
                    priceamount: onlinetotalAmount,
                  })
                }>
                <Text style={styles.buttonText}>PAY NOW</Text>
                <Text style={styles.buttonText}>₹{onlinetotalAmount}</Text>
              </TouchableOpacity>
            </LinearGradient>
          )}
        </View>
      </View>
    </View>
  );
};

export default WeeklyPaymentScreen;

const styles = StyleSheet.create({
  openButton: {
    backgroundColor: '#0981bd',
    ...Paddings.p.p10,
    alignItems: 'center',
    ...Margins.m.m20,
    ...BorderRadius.br5,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#0981bd',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Paddings.pb.pb20,
    ...Paddings.ph.ph20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    ...Margins.mt.mt20,
    ...Margins.mb.mb20,
    ...BorderRadius.br20,
    ...BorderWidths.bw.bw2,
    borderColor: Colors.white,
    ...Paddings.p.p5,
  },
  scrollViewContent: {},
  card: {
    backgroundColor: Colors.white,
    ...BorderRadius.br5,
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
    color: Colors.white,
    fontSize: FontSizes.xlarge,
    fontWeight: FontWeights.bold,
    ...Margins.mt.mt20,
  },
  confirmButton: {
    backgroundColor: Colors.darkgrey,
    alignItems: 'center',
    ...Paddings.p.p10,
    ...BorderRadius.br5,
    ...Margins.mv.mv20,
  },
  confirmButtonText: {
    color: Colors.white,
    fontSize: FontSizes.tinymedium,
  },
  overlay: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    maxHeight: '80%',
  },
  container: {
    alignItems: 'flex-end',
    ...Margins.mb.mb10,
    justifyContent: 'flex-end',
    ...Margins.mh.mh15,
  },
  text: {
    color: Colors.darkblue,
    fontSize: FontSizes.small,
  },
  input: {
    height: 40,
    marginVertical: 8,
    ...Paddings.p.p10,
    backgroundColor: Colors.white,
    color: Colors.black,
    ...BorderRadius.br5,
    width: '100%',
  },
  underline: {
    height: 1,
    backgroundColor: Colors.primary,
    ...Margins.mt.mt2,
  },
  radioContainer: {
    justifyContent: 'space-around',
    ...Margins.mh.mh15,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...Margins.mt.m20,
  },
  radioCircle: {
    height: 20,
    width: 20,
    ...BorderRadius.br10,
    ...BorderWidths.bw.bw2,
    borderColor: Colors.darkblue,
    alignItems: 'center',
    justifyContent: 'center',
    ...Margins.mr.mr10,
  },
  selectedRb: {
    width: 10,
    height: 10,
    ...BorderRadius.br5,
    backgroundColor: Colors.darkblue,
  },
  radioText: {
    fontSize: FontSizes.tinymedium,
    color: Colors.black,
    fontWeight: FontWeights.medium,
  },
  radioTextCash: {
    fontSize: FontSizes.small,
    color: Colors.darkgrey,
  },
  linearGradient: {
    ...Paddings.pl.pl15,
    ...Paddings.pr.pr15,
    ...BorderRadius.br5,
    ...Margins.m.m30,
    ...BorderRadius.br20,
  },
  buttonText: {
    fontSize: FontSizes.medium,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    fontWeight: FontWeights.semiBold,
    color: Colors.white,
    backgroundColor: 'transparent',
  },
  scrollContainer: {
    justifyContent: 'flex-end',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  linearGradient: {
    ...Paddings.pl.pl15,
    ...Paddings.pr.pr15,
    ...BorderRadius.br5,
    ...Margins.m.m20,
    ...BorderRadius.br20,
    ...Paddings.p.p10,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
