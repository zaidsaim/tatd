import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  Colors,
  FontSizes,
  FontWeights,
  Paddings,
  Margins,
  BorderRadius,
  BorderWidths,
} from '../assets/colors';
import {Button} from '@rneui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {validateAccessToken, refreshAccessToken} from '../utils/validation';
const FlexibleTermsCondition = ({navigation, route}) => {
  const [bookingvalidationdata, setBookingvalidationdata] = useState();
  const [updatecashdata, setUpdatecashdata] = useState();
  const [createbooking, setCreatebooking] = useState();
  const [error, setError] = useState();
  const [onlinecashdata, setOnlinecashdata] = useState();
  const [bookinfo, setBookinfo] = useState({});

  const {item, priceamount, fbId} = route?.params;
  const [termsData, setTermsData] = useState();

  console.log(fbId, priceamount, item, 'fbIdfbIdfbIdfbIdfbIdfbIdfbIdfbId tc');

  //   useEffect(() => {
  //     bookingValidation();
  //   }, []);

  useEffect(() => {
    getViewDetailsPopupData();
  }, []);

  const getViewDetailsPopupData = async () => {
    try {
      const isValid = await validateAccessToken();
      if (!isValid) {
        await refreshAccessToken();
      }

      const value = await AsyncStorage.getItem('way');
      const way = value ? JSON.parse(value) : null;
      const productType = await AsyncStorage.getItem('product_type');
      const userData = await AsyncStorage.getItem('userData');
      const parsedUserData = userData ? JSON.parse(userData) : null;
      const token = parsedUserData ? parsedUserData.jwt : null;

      console.log('====================================>>>>==');
      console.log(way, productType);
      console.log('====================================>>>>==');

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
        'https://www.tatd.in/app-api/customer/ondemand/accept-terms-detail-popup-api.php',
        {
          action: 'accept_terms',
          product_type: productType,
          //   way: way,
          subscription_id: 'fs',
        },
        config,
      );

      console.log(response.data, 'Terms & condition Api Response');
      if (response.data.status_code == 200) {
        setTermsData(response?.data.accept_details_data);
      }
    } catch (err) {
      setError(err.message);
      console.log('Error from Terms & condition Api', err.message);
    }
  };

  //   const bookingValidation = async () => {
  //     const isValid = await validateAccessToken();
  //     if (!isValid) {
  //       await refreshAccessToken();
  //     }
  //     try {
  //       const userData = await AsyncStorage.getItem('userData');
  //       const parsedUserData = userData ? JSON.parse(userData) : null;
  //       const token = parsedUserData ? parsedUserData.jwt : null;
  //       const bookingvalue = await AsyncStorage.getItem('bookingvalue');
  //       const bookingvaludata = bookingvalue ? JSON.parse(bookingvalue) : null;
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
  //         'https://www.tatd.in/app-api/customer/ondemand/get-booking-validation-data.php',
  //         {
  //           booking_validation_id: bookingvaludata,
  //         },
  //         config,
  //       );
  //       console.log('termscondition validation Data:', response.data);

  //       setBookingvalidationdata(response.data);
  //       setBookinfo(bookingvalidationdata?.payment_page_data);
  //     } catch (err) {
  //       setError(err.message);
  //       console.log('Error from payment validation API:', err.message);
  //     }
  //   };

  //   console.log('item====', item);

  const updateCash = async () => {
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
        'https://www.tatd.in/app-api/customer/weekly/update_cash_option_booking_validation.php',

        {
            qb_number: fbId,
          action: 'update_cash_option_booking_validation',
          chauffeur_service: 0,
          washing_service: 0,
          budget: priceamount,
          coupon_discount: 0,
          surge: 0,
          //     "qb_number" : "122222",

          //   chauffeur_service:
          //     bookingvalidationdata?.single_booking_validation_data
          //       ?.chauffeur_service,
          //   washing_service:
          //     bookingvalidationdata?.single_booking_validation_data
          //       ?.washing_service,
          //   budget: bookingvalidationdata?.single_booking_validation_data?.budget,
          //   coupon_discount:
          //     bookingvalidationdata?.single_booking_validation_data
          //       ?.coupon_discount,
          //   surge: bookingvalidationdata?.single_booking_validation_data?.surge,
        },

        config,
      );

      console.log('update cash Data:', response.data);
      if (response.data.status_code === 200) {
        createBooking();
      }
    } catch (err) {
      setError(err.message);
      console.log('Error from updatecash API:', err.message);
    }
  };

  const onlineCash = async () => {
    console.log('dar===============');
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
        '1',
        bookingvalidationdata?.single_booking_validation_data
          ?.chauffeur_service,
      );
      console.log(
        '2',
        bookingvalidationdata?.single_booking_validation_data?.washing_service,
      );
      console.log(
        '3',
        bookingvalidationdata?.single_booking_validation_data?.budget,
      );
      console.log(
        '4',
        bookingvalidationdata?.single_booking_validation_data?.coupon_discount,
      );
      console.log(
        '5',
        bookingvalidationdata?.single_booking_validation_data?.surge,
      );
      console.log('6', bookingvaludata);
      console.log(
        '7',
        bookingvalidationdata?.single_booking_validation_data?.payment_amount,
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
        'https://www.tatd.in/app-api/customer/payment/create-order-id.php',
        {
          action: 'create_order',
          chauffeur_service:
            bookingvalidationdata?.single_booking_validation_data
              ?.chauffeur_service,
          washing_service:
            bookingvalidationdata?.single_booking_validation_data
              ?.washing_service,
          budget: bookingvalidationdata?.single_booking_validation_data?.budget,
          coupon_discount:
            bookingvalidationdata?.single_booking_validation_data
              ?.coupon_discount,
          surge: bookingvalidationdata?.single_booking_validation_data?.surge,
          booking_validation_id: bookingvaludata,
          payment_amount: 184,
          discount_price: 0,
          pending_amount: 0,
        },
        config,
      );
      console.log('online cash Data:', response.data);
      if (response.data.status_code === 200) {
        navigation.navigate('PaymentRajorpayScreen', {
          priceamount: priceamount,
          iteminfo: bookinfo,
        });
      }
      setOnlinecashdata(response.data);
    } catch (err) {
      setError(err.message);
      console.log('Error from online cashAPI:', err.message);
    }
  };
  const createBooking = async () => {
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
        'https://www.tatd.in/app-api/customer/ondemand/create-booking-by-qb-number.php',
        {
          action: 'create_booking_from_validation',
         
          chauffeur_service: 0,
          washing_service: 0,
          budget: priceamount,
          coupon_discount: 0,
          surge: 0,
          qb_number: fbId,
        },
      
        config,
      );
      console.log('create booking Data:', response.data);
      await AsyncStorage.setItem(
        'bookingidvalue',
        JSON.stringify(response.data?.subscription_id),
      );
      if (response.data.status_code === 200) {
        navigation.navigate('FlexibleThankYou', {fsId : response.data?.subscription_id});
      }
      setCreatebooking(response.data);
    } catch (err) {
      setError(err.message);
      console.log('Error from createbookin API:', err.message);
    }
  };

  const handleBookingSelect = async () => {
    if (item === 'cash') {
      updateCash();
    } else {
      onlineCash();
    }
  };
  return (
    <View style={styles.shadowCard}>
      <ScrollView>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              color: Colors.black,
              fontSize: FontSizes.large,
              fontWeight: FontWeights.bold,
            }}>
            {termsData?.heading}
          </Text>
          <TouchableOpacity
            style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}
            onPress={() => navigation.goBack()}>
            <Ionicons
              name="close-outline"
              color={Colors.darkgrey}
              size={24}
              style={{alignItems: 'center'}}
            />
          </TouchableOpacity>
        </View>
        <View style={{...Margins.mv.mv10}}>
          {termsData?.terms_data.map((term, index) => (
            <View
              key={index}
              style={{marginTop: index > 0 ? Margins.mt.mt10 : 0}}>
              <Text style={styles.termsText}>{`${index + 1}. ${term}`}</Text>
            </View>
          ))}
        </View>
        <View style={styles.mainContainer}></View>
      </ScrollView>
      <View style={styles.cardFooter}>
        <Button
          title="Cancel"
          buttonStyle={{
            backgroundColor: Colors.white,
            borderColor: Colors.black,
            ...BorderWidths.bw.bw1,
          }}

          titleStyle={styles.cancelButtonText}
          onPress={() => navigation.goBack()}
        />
        <Button
          title="Accept"
          buttonStyle={{backgroundColor: Colors.primary}}
          onPress={handleBookingSelect}
          titleStyle={styles.acceptButtonText}
        />
      </View>
    </View>
  );
};

export default FlexibleTermsCondition;
const styles = StyleSheet.create({
  buttonText: {
    fontSize: FontSizes.medium,
    color: Colors.white,
    fontWeight: FontWeights.bold,
  },
  shadowCard: {
    flex: 1,
    backgroundColor: Colors.white,
    ...Paddings.p.p20,
    ...BorderRadius.br10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    ...Margins.mh.mh10,
    ...Margins.mt.mt20,
    ...Margins.mb.mb20,
  },
  termsHeader: {
    fontSize: FontSizes.body,
    fontWeight: FontWeights.bold,
    ...Margins.mb.mb10,
  },
  termsText: {
    fontSize: FontSizes.tinymedium,
    color: '#333',
    width: '100%',
  },
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    ...Paddings.p.p20,
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: Colors.white,
    ...BorderRadius.br10,
    ...Paddings.p.p20,
    width: '100%',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 2,
  },
  cardTitle: {
    fontSize: FontSizes.body,
    fontWeight: FontWeights.bold,
    ...Margins.mb.mb10,
  },
  cardContent: {
    fontSize: FontSizes.medium,
    ...Margins.mb.mb20,
  },
  cardFooter: {
    ...Margins.mt.mt10,
    ...Paddings.pt.pt10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...Margins.mh.mh30,
    right: 0,
    left: 0,
  },
  cancelButtonText: {
    color: Colors.black,
    ...Margins.mh.mh20,
    fontSize: FontSizes.medium,
  },
  acceptButtonText: {
    color: Colors.white,
    ...Margins.mh.mh20,
    fontSize: FontSizes.medium,
  },
});
