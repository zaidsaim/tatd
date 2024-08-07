import axios from "axios";
import { VERSION_CHECK_URL,RATING_HOME_URL } from "../url/baseUrl";
import endpoint from "../endpoint";
import { jwtDecode } from 'jwt-decode';
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
export const versionCheckApi = async (app_type,user_type) => {
    const response = await axios.post(VERSION_CHECK_URL, {app_type,  user_type });
    return response.data;
  };

export const ratingHomeApi = async () => {
  const response = await endpoint.get('customer-rating-api.php?action=home_page_single_rating');
  return response.data;
};

export const frequncyApi = async () => {
    try {
      const response = await endpoint.post('faq/customer-faq-api.php', {
        action: 'customer_faq',
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching FAQ data:', error);
      throw error;
    }
  };

  export const homeratingApi = async () => {
    try {
      const response = await endpoint.get('rating-and-reviews/customer-rating-api.php?action=home_page_single_rating');
      return response.data;
    } catch (error) {
      console.error('Error fetching homerating data:', error);
      throw error;
    }
  };

  export const ratingreview = async () => {
    try {
      const response = await endpoint.get('rating-and-reviews/customer-rating-api.php?action=rating_and_review_page');
      return response.data;
    } catch (error) {
      console.error('Error from rating review:', error);
      throw error;
    }
  };

  export const sendratingApi = async (remarks) => {
    try {
      const response = await endpoint.post('tickets-customer-api.php?action=add_customer_ticket_rating_review_page', {
        action: 'add_customer_ticket_rating_page',
        remarks: remarks,
      });
      return response.data;
    } catch (error) {
      console.error('Error from sendrating api:', error);
      throw error;
    }
  };

  export const openticketApi = async () => {
    try {
      const response = await endpoint.post('myride/tickets-customer-api.php', {
        action: "open_ticket",
      });
      return response.data;
    } catch (error) {
      console.error('Error from openticket api:', error);
      throw error;
    }
  };
  
  export const showSingleTicketdataApi = async (ticketId) => {
    try {
      const response = await endpoint.post('myride/tickets-customer-api.php', {
        action:"show_single_ticket_data",
        ticket_id:ticketId
          });
      return response.data;
    } catch (error) {
      console.error('Error from showsingleticketdata api:', error);
      throw error;
    }
  };
  
  export const showcustomerticketApi = async () => {
    try {
      const response = await endpoint.post('myride/tickets-customer-api.php', {
        action:"show_customer_ticket",
          });
      return response.data.tickets;
    } catch (error) {
      console.error('Error from showcustomer api:', error);
      throw error;
    }
  };
  
  export const checkBookingidApi = async (tbooking_id) => {
    try {
      const response = await endpoint.post('myride/tickets-customer-api.php', {
        action: "check_booking_number",
        tbooking_id: tbooking_id
          });
      return response.data;
    } catch (error) {
      console.error('Error from checkbooking api:', error);
      throw error;
    }
  };
 
  export const  createCustomerTicketApi = async (remarks,tbooking_id) => {
    try {
      const response = await endpoint.post('myride/tickets-customer-api.php', {
        action: "create_customer_ticket",
       remarks: remarks,
      tbooking_id: tbooking_id
          });
      return response.data;
    } catch (error) {
      console.error('Error from create ticket api:', error);
      throw error;
    }
  };

  export const  fetchcityApi = async () => {
    try {
      const response = await endpoint.post('city/get_city.php');
      return response.data;
    } catch (error) {
      console.error('Error from create ticket api:', error);
      throw error;
    }
  };

  export const  fetchzoneApi = async (selectedItem) => {
    let city;
    let zone;
    console.log('Selected Item:', selectedItem);
    if (selectedItem === "Mumbai") {
      city = "Maharashtra";
      zone = selectedItem;
    } else if (selectedItem === "Delhi/NCR") {
      city = selectedItem;
    } else {
      city = selectedItem;
    }
    try {
      const response = await endpoint.post('city/get_zones.php', {
        city: city,
        zone: zone,
      },);
      return response.data;
    } catch (error) {
      console.error('Error from create ticket api:', error);
      throw error;
    }
  };
 
  export const bookingvalidationApi = async () => {
    const bookingvalue = await AsyncStorage.getItem('bookingvalue');
    const bookingvaludata = bookingvalue ? JSON.parse(bookingvalue) : null;
    console.log('bookingdata.booking_validation_id==================', bookingvaludata)
    try {
      const response = await endpoint.post('get-booking-validation-data.php',  
        {
          booking_validation_id: bookingvaludata,
        }
      );
      await AsyncStorage.setItem(
        'bookingnumber',
        JSON.stringify(
          response.data?.single_booking_validation_data?.booking_number,
        ),
      );
      console.log('booking validation data from bookingpage',response.data)
      return response.data;
    } catch (error) {
      console.error('Error from checkbooking api:', error);
      throw error;
    }
  };
 
  export const decodeTokenservice = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      const parsedUserData = userData ? JSON.parse(userData) : null;
      const token = parsedUserData ? parsedUserData.jwt : null;
  
      if (token) {
        const decoded = jwtDecode(token);
        return decoded;
      } else {
        console.log('No token found');
        return null;
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      throw error; // Optional: rethrow the error if you want to handle it elsewhere
    }
  };

  export const getonewaytripkmApi = async () => {
    const selectcitydata = await AsyncStorage.getItem('selectcityitem');
    try {
      let city;
      console.log('Selected city :', selectcitydata);
      if (selectcitydata === 'Mumbai') {
        city = 'Maharashtra';
      } else if (selectcitydata === 'Delhi/NCR') {
        city = 'Delhi';
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
      } else if (selectcitydata === 'Haryana') {
        city = selectcitydata;
      } else if (selectcitydata === 'Krnataka') {
        city = selectcitydata;
      } else if (selectcitydata === 'Maharashtra') {
        city = selectcitydata;
      } else if (selectcitydata === 'Telalangana') {
        city = selectcitydata;
      } else if (selectcitydata === 'Uttar Pradesh') {
        city = selectcitydata;
      } else {
        return;
      }
      const response = await endpoint.post('ondemand/get-incity-oneway-kms.php',  {
        category: 'Private Driver',
        city: city,
        product_type: 'Incity',
        way: 1,
      },);
      return response.data;
    } catch (error) {
      console.error('Error from checkbooking api:', error);
      throw error;
    }
  };

  export const getCouponApi = async () => {
    try {
      const response = await endpoint.get('ondemand/get_coupon_discount.php',);
      return response.data;
    } catch (error) {
      console.error('Error from checkbooking api:', error);
      throw error;
    }
  };

  export const getBudgetonewayApi = async (selectedzone,selectedDistance) => {
    const selectcitydata = await AsyncStorage.getItem('selectcityitem');
    // const selectcitydata = selectcitydatas ? JSON.parse(selectcitydatas) : null;
    try {
      let city;
      let zone;
      console.log('Selected city :', selectcitydata);
      console.log('Selected Item booking:::::', selectedzone);
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
      const response = await endpoint.post('ondemand/get_budget.php', {
        category: 'Private Driver',
        city: city,
        zone: zone,
        product_type: 'Incity',
        way: 1,
        kms: selectedDistance,
        surge: 0,
      },);
      return response.data;
    } catch (error) {
      console.error('Error from getbudget api:', error);
      throw error;
    }
  };

export const confirmBookingonewayApi = async (
  name,
  mobileNumber,
  pickupAddress,
  destination,
  selectedzone,
  coupondata,
  budgetdata,
  selectedDistance,
  selectedSubOptiononeway,
  selectedTime,
  selectedDate,
  errors,
  refRBSheet,
  vehicleType
) => {
  console.log('selectedSubOptiononeway:', name);
  
  // Perform validation
  if (!name) errors.name = 'Please Enter Name';
  if (!mobileNumber) errors.mobileNumber = 'Mobile number is required';
  if (!destination) errors.destination = 'Please Enter Address';
  if (!pickupAddress) {
    errors.pickupAddress = 'Please enter complete address';
  } else if (pickupAddress.length <= 16) {
    errors.pickupAddress = 'Pickup address must be greater than 16 characters';
  }
  if (!selectedDate) errors.selectedDate = 'Please select date';
  if (!selectedTime) errors.selectedTime = 'Please select time';
  if (!selectedSubOptiononeway) {
    errors.selectedSubOptiononeway = 'Vehicle type is required';
    if (refRBSheet && refRBSheet.current) {
      refRBSheet.current.open();
    }
  }
  if (Object.keys(errors).length > 0) {
    return { errors };
  }
  console.log('selectedSubOptiononeway:', selectedSubOptiononeway);
  try {
    console.log('selectedSubOptiononeway: 2222222', selectedSubOptiononeway);
    const selectcitydata = await AsyncStorage.getItem('selectcityitem');
    const parsedDate = moment(selectedDate, 'D MMMM YYYY');
    const formattedDate = parsedDate.isValid() ? parsedDate.format('YYYY-MM-DD') : null;

    const response = await endpoint.post('ondemand/booking_validation.php?action=add', {
      action: 'add',
      name: name,
      mobile_number: mobileNumber,
      pickup_address: pickupAddress,
      drop_address: destination,
      city: selectcitydata,
      zone: selectedzone,
      category: 'Private Driver',
      product_type: 'Incity',
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
      booking_date: formattedDate,
      booking_time: selectedTime,
      booking_status: 'Pending',
      booking_oncall_by: 'Customer',
      booking_oncall_by_number: mobileNumber,
      booking_oncall_by_source: 'Customer',
      booking_oncall_by_subsource: '',
    });

    console.log('rescheck:', response.data);

    const bookingValidationId = response.data?.booking_validation_id;
    if (bookingValidationId) {
      await AsyncStorage.setItem('bookingvalue', JSON.stringify(bookingValidationId));
    } else {
      console.error('Booking validation ID is undefined');
    }

    return response.data;
  } catch (error) {
    console.error('Error from checkbooking api:', error);
    throw error;
  }
};

export const editBookingonewayApi = async (
  
  name,
  mobileNumber,
  pickupAddress,
  destination,
  selectedzone,
  coupondata,
  budgetdata,
  selectedDistance,
  selectedSubOptiononeway,
  selectedTime,
  selectedDate,
  errors,
  refRBSheet,
  vehicleType
) => {
  console.log('selectedSubOptiononeway:', name);
  
  // Perform validation
  if (!name) errors.name = 'Please Enter Name';
  if (!mobileNumber) errors.mobileNumber = 'Mobile number is required';
  if (!destination) errors.destination = 'Please Enter Address';
  if (!pickupAddress) {
    errors.pickupAddress = 'Please enter complete address';
  } else if (pickupAddress.length <= 16) {
    errors.pickupAddress = 'Pickup address must be greater than 16 characters';
  }
  if (!selectedDate) errors.selectedDate = 'Please select date';
  if (!selectedTime) errors.selectedTime = 'Please select time';
  if (!selectedSubOptiononeway) {
    errors.selectedSubOptiononeway = 'Vehicle type is required';
    if (refRBSheet && refRBSheet.current) {
      refRBSheet.current.open();
    }
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  console.log('selectedSubOptiononeway:', selectedSubOptiononeway);

  try {
    console.log('selectedSubOptiononeway: 2222222', selectedSubOptiononeway);
    const selectcitydata = await AsyncStorage.getItem('selectcityitem');
    const parsedDate = moment(selectedDate, 'D MMMM YYYY');
    const formattedDate = parsedDate.isValid() ? parsedDate.format('YYYY-MM-DD') : null;
    const bookingvalue = await AsyncStorage.getItem('bookingvalue');
    const bookingvaluedata = bookingvalue ? JSON.parse(bookingvalue) : null;
    const response = await endpoint.post('ondemand/booking_validation.php?action=add', 
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
        product_type: 'Incity',
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
        car_model:  selectedSubOptiononeway,
        pending_amount: '',
        payment_mode: '',
        pay_by: '',
        razor_order_id: '',
        payment_id: '',
        payment_amount: '',
        payment_status: '',
        add_date: '2023-06-17',
        booking_date: formattedDate,
        booking_time: selectedTime,
        booking_status: 'Pending',
        booking_oncall_by: 'Customer',
        booking_oncall_by_number: mobileNumber,
        booking_oncall_by_source: 'Customer',
        booking_oncall_by_subsource: '',
      },
    );

    console.log('rescheck:', response.data);

    const bookingValidationId = response.data?.booking_validation_id;
    if (bookingValidationId) {
      await AsyncStorage.setItem('bookingvalue', JSON.stringify(bookingValidationId));
    } else {
      console.error('Booking validation ID is undefined');
    }

    return response.data;
  } catch (error) {
    console.error('Error from editbooking api:', error);
    throw error;
  }
};
  
export const fetchcashOptionApi = async () => {
  try {
    const response = await endpoint.get('ondemand/get-cash-access-booking.php'
    );
    console.log('dat afrom catch optiondata',response.data)
    return response.data;
  } catch (error) {
    console.error('Error from fetch cashoption api:', error);
    throw error;
  }
};

export const deleteRadeemApi = async () => {
  const bookingvalue = await AsyncStorage.getItem('bookingvalue');
  const bookingvaludata = bookingvalue ? JSON.parse(bookingvalue) : null;
  try {
    const response = await endpoint.get('ondemand/redeem-booking.php?action=update_referral_amount',
      {
        action:"update_referral_amount",
        referral_action:"remove",
        referral_amount:redeemdata?.customer_balance_redeem_amount,
        booking_validation_id:bookingvaludata
        }
    );
    console.log('delete radeem api',response.data)
    return response.data;
  } catch (error) {
    console.error('Error from deleter radeem api:', error);
    throw error;
  }
};


export const loginWithOtpVerify = async(mobile,otp,) => {
  
  try {
    const response = await endpoint.post('login/verify-otp-login.php',{
  mobile:mobile,
  otp:otp
    });
    console.log('data:', response.data);
    if (data.status_code === 200) {
      await AsyncStorage.setItem('userData', JSON.stringify(response?.data));
      const storedUserData = await AsyncStorage.getItem('userData');
  if (storedUserData) {
    const userData = JSON.parse(storedUserData);
    console.log('Stored User Data:', userData);
  }
      navigation.navigate('home', { mobile }); 
    }
  } catch (error) {
    console.error('error:', error);
  
  }
};


export const getEnquiryApi = async () => {
  
  try {
    const response = await endpoint.post('pages/get-page-details.php',
      {
        action:"make_an_enquiry",  
        }
    );
   // console.log('enquiry api',response.data)
    return response.data;
  } catch (error) {
    console.error('Error from enquiry api:', error);
    throw error;
  }
};

export const getPrivacyApi = async () => {
  try {
    const response = await endpoint.post('pages/get-page-details.php',
      {
        action:"privacy_policy",  
        }
    );
    console.log('privacy policy api',response.data)
    return response.data;
  } catch (error) {
    console.error('Error from privacy policy api:', error);
    throw error;
  }
};