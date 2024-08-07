import React, { useEffect, useState,useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, RefreshControl, ScrollView, KeyboardAvoidingView, TextInput,FlatList,ActivityIndicator } from 'react-native';
import OTTHeader from '../components/OTTHeader';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DropShadow from "react-native-drop-shadow";
import Modal from "react-native-modal";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Colors, FontSizes, FontWeights ,Paddings,Margins} from '../assets/colors';
import { refreshAccessToken,validateAccessToken } from '../utils/validation';
import { checkBookingidApi, createCustomerTicketApi, frequncyApi ,openticketApi, showSingleTicketdataApi,showcustomerticketApi} from '../api/services/apiService';
const GetSupportScreen = ({ navigation }) => {
  const [isTextVisible, setIsTextVisible] = useState(false);
  const [isTextVisibleSecond, setIsTextVisibleSecond] = useState(false);
  const [visibleIndex, setVisibleIndex] = useState(null);
  const [isTextVisibleTwo, setIsTextVisibleTwo] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisibleSecond, setModalVisibleSecond] = useState(false);
  const [visibleIndexSecond, setVisibleIndexSecond] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);
  const [tbooking_id,setTbooking_id]=useState()
  const [remarks,setRemarks]=useState()
  const [customerdata,setCustomerdata]=useState()
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null);
  const [bookingError, setBookingError] = useState('');
  const [isPaymentVisible, setIsPaymentVisible] = useState(false);
  const [paymentVisibleIndex, setPaymentVisibleIndex] = useState(null);
  const [faqData, setFaqData] = useState(null);
  const [singleticketdata,setSingleticketdata]=useState()
  const [modalVisibles, setModalVisibles] = useState(false);
  const [openticketdata,setOpenticketdata]=useState()
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [checkid,setCheckid]=useState()
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    
    const isValid = await validateAccessToken();
    if (!isValid) {
      await refreshAccessToken();
    }
    setLoading(true);
    try {
      await Promise.all([fetchFaq(), showCustomerTicket(),openTicket()]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    Promise.all([fetchFaq(), showCustomerTicket(),  openTicket()]).then(() => setRefreshing(false));
  }, []);

 
  const fetchFaq = async () => {
    try {
      const data = await frequncyApi();
      setFaqData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };


  // const checkBookingid = async () => {
  //   const isValid = await validateAccessToken();
  //   if (!isValid) {
  //     await refreshAccessToken();
  //   }
  //   try {
  //     const userData = await AsyncStorage.getItem('userData');
  //     const parsedUserData = userData ? JSON.parse(userData) : null;
  //     const token = parsedUserData ? parsedUserData.jwt : null;
  //     if (!token) {
  //       throw new Error("No token found");
  //     }
  //     const config = {
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //       },
  //     };
  //     const response = await axios.post('https://www.tatd.in/app-api/customer/myride/tickets-customer-api.php', {
  //       action: "check_booking_number",
  //       tbooking_id: tbooking_id
  //     }, config);
  //     createCustomerTicket()
  //    console.log('checkbookingid====response', response.data);
  //   } catch (err) {
  //     setError(err.message);
  //     console.log('error from ticket api=============', err);
  //     return false;
  //   }
  // };

  // const createCustomerTicket = async () => {
  //   const isValid = await validateAccessToken();
  //   if (!isValid) {
  //     await refreshAccessToken();
  //   }
  //   try {
  //     const userData = await AsyncStorage.getItem('userData');
  //     const parsedUserData = userData ? JSON.parse(userData) : null;
  //     const token = parsedUserData ? parsedUserData.jwt : null;
  //     if (!token) {
  //       throw new Error("No token found");
  //     }
  //     const config = {
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //       },
  //     };
  //     const response = await axios.post('https://www.tatd.in/app-api/customer/myride/tickets-customer-api.php', {
  //       action: "create_customer_ticket",
  //       remarks: remarks,
  //       tbooking_id: tbooking_id,
  //     }, config);
  //     console.log('ticket====response', response.data);
  //     if(response.data.status_code === "200"){
  //       showSingleTicketdata()
  //     }
  //     setResponse(response.data);
  //   } catch (err) {
  //     setError(err.message);
  //     console.log('error from ticket api=============', err);
  //   }
  // };

//   const showCustomerTicket = async () => {
//     const isValid = await validateAccessToken();
//     if (!isValid) {
//       await refreshAccessToken();
//     }
//     try {
//       const userData = await AsyncStorage.getItem('userData');
//       const parsedUserData = userData ? JSON.parse(userData) : null;
//       const token = parsedUserData ? parsedUserData.jwt : null;
//       if (!token) {
//         throw new Error("No token found");
//       }
//       const config = {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       };
//     const response = await axios.post('https://www.tatd.in/app-api/customer/myride/tickets-customer-api.php', {
//     action:"show_customer_ticket"
//       }, config);
//     console.log('showcustomerticket====response',response.data.tickets)
//     // console.log('customerdata',response.data.tickets)
//      setCustomerdata(response.data.tickets);
//     } catch (err) {
//       setError(err.message);
//       console.log('error from showcustomerticket api=============',err)
//     } 
// };

// const showSingleTicketdata = async (ticketId) => {
//   const isValid = await validateAccessToken();
//   if (!isValid) {
//     await refreshAccessToken();
//   }
//   try {
//     const userData = await AsyncStorage.getItem('userData');
//     const parsedUserData = userData ? JSON.parse(userData) : null;
//     const token = parsedUserData ? parsedUserData.jwt : null;
//     if (!token) {
//       throw new Error("No token found");
//     }
//     const config = {
//       headers: {
//         'Authorization': `Bearer ${token}`,
//       },
//     };
//   const response = await axios.post('https://www.tatd.in/app-api/customer/myride/tickets-customer-api.php', {
//   action:"show_single_ticket_data",
//   ticket_id:ticketId
//     }, config);
//   //console.log('showgingleticket====response',response.data)
//    setSingleticketdata(response.data)
//     setModalVisibles(true);
//   } catch (err) {
//     setError(err.message);
//     console.log('error from showsingleticket api=============',err)
//   } 
// };

const checkBookingid = async () => {
  const isValid = await validateAccessToken();
  if (!isValid) {
    await refreshAccessToken();
  }
  try {
    const data = await checkBookingidApi(tbooking_id);
    setCheckid(data)
    createCustomerTicket()
  } catch (error) {
    setError(error.message);
  } 
}; 


const createCustomerTicket = async () => {
  const isValid = await validateAccessToken();
  if (!isValid) {
    await refreshAccessToken();
  }
  try {
    const data = await createCustomerTicketApi(remarks,tbooking_id);
    if(data.status_code === "200"){
      showSingleTicketdata()
    }
    setResponse(response.data);
  } catch (error) {
    setError(error.message);
  } 
}; 

const showCustomerTicket = async (ticketId) => {
  try {
    const data = await showcustomerticketApi(ticketId);
    setCustomerdata(data);
  } catch (error) {
    setError(error.message);
  } 
}; 

const showSingleTicketdata = async (ticketId) => {
  const isValid = await validateAccessToken();
  if (!isValid) {
    await refreshAccessToken();
  }
  try {
    const data = await showSingleTicketdataApi(ticketId);
    setSingleticketdata(data)
    setModalVisibles(true);
  } catch (error) {
    setError(error.message);
  } 
}; 

const openTicket = async () => {
  try {
    const data = await openticketApi();
    setOpenticketdata(data)
  } catch (error) {
    setError(error.message);
  } 
}; 
// const openTicket = async () => {
//   const isValid = await validateAccessToken();
//   if (!isValid) {
//     await refreshAccessToken();
//   }
//   try {
//     const userData = await AsyncStorage.getItem('userData');
//     const parsedUserData = userData ? JSON.parse(userData) : null;
//     const token = parsedUserData ? parsedUserData.jwt : null;
//     if (!token) {
//       throw new Error("No token found");
//     }
//     const config = {
//       headers: {
//         'Authorization': `Bearer ${token}`,
//       },
//     };
//   const response = await axios.post('https://www.tatd.in/app-api/customer/myride/tickets-customer-api.php', {
//   action: "open_ticket",
//     }, config);
//   // console.log('openticket====response',response.data)
//    setOpenticketdata(response.data)
//   } catch (err) {
//     setError(err.message);
//     console.log('error from openticket api=============',err)
//   } 
// };
const toggleTextVisibilityTwo = () => {
  setIsTextVisibleTwo(!isTextVisibleTwo);
};
const toggleTextVisibility = (index) => {
  setVisibleIndex(visibleIndex === index ? null : index);
};
const togglePaymentVisibility = () => {
  setIsPaymentVisible(!isPaymentVisible);
};
const togglePaymentFaqVisibility = (index) => {
  setPaymentVisibleIndex(paymentVisibleIndex === index ? null : index);
};
const bookingFaqs = faqData?.faq_data?.filter(faq => faq.faq_header === "Booking Modifications Support");
const paymentFaqs = faqData?.faq_data?.filter(faq => faq.faq_header === "Payment Related Support");
  const toggleTextVisibilitySecondText = (index) => {
    setVisibleIndexSecond(visibleIndexSecond === index ? null : index);
  };
  const toggleTextVisibilitySecond = () => {
    setIsTextVisibleSecond(!isTextVisibleSecond);
  };
  const toggleTextVisibilitytwo = () => {
    setIsTextVisible(!isTextVisible);
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
 
  const renderItem=({item}) =>{
    return(
      <TouchableOpacity onPress={() => showSingleTicketdata(item.id)}>
      <View
      style={
        {
          flexDirection: 'row', ...Margins.mh.mh15, borderBottomWidth: 1, borderBottomColor: Colors.grey,
          borderRightWidth: 1, borderRightColor: Colors.grey, borderLeftWidth: 1, borderLeftColor: Colors.grey,
        }}>
      <View style={{ flex: 1, height: 40, borderRightWidth: 1, borderRightColor: Colors.grey, ...Paddings.ph.ph5 }} >
        <Text style={{ ...Paddings.pt.pt9, color: Colors.black, ...Paddings.ph.ph5 ,fontSize:FontSizes.xsmall}}>{item.id}</Text>
      </View>
      <View style={{ flex: 3, height: 40, borderRightWidth: 1, borderRightColor: Colors.grey, ...Paddings.ph.ph5 }} >
        <Text style={{ ...Paddings.p.p9, color: Colors.black, ...Paddings.ph.ph5,fontSize:FontSizes.xsmall }}>{item.timestamp}</Text>
      </View>
      <View style={{ flex: 1, height: 40, ...Paddings.ph.ph10, }} >
        <View style={[styles.closedButton, {
                      backgroundColor: item.status === 'Closed' ? Colors.secondary : Colors.primary,
                    },]}>
          <Text style={[styles.closestatusBtn,{color:item.status == 'Open' ? Colors.white : Colors.black}]}>{item.status}</Text>
        </View>
      </View>
    </View>
    </TouchableOpacity>
    )
  }

 
  return (
    <ScrollView style={{ flex: 1, backgroundColor: Colors.white }}  refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
      <OTTHeader navigation={navigation} title={'trusted & trained driver'} />
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={closeModal}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={closeModal} style={styles.closeButtonStyle}>
            <Ionicons name="close" color={Colors.white} size={24} />
          </TouchableOpacity>
          <ScrollView>
            <Text style={styles.title}>Create Ticket</Text>
            <KeyboardAvoidingView behavior="padding">
              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Booking Number</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(tbooking_id) => setTbooking_id(tbooking_id)}
                  value={tbooking_id}
                  placeholder="Share Booking Number (Optional)"
                  placeholderblack={Colors.darkgrey}
                  keyboardType='numeric'
                />
                 {/* {bookingError ? <Text style={styles.errorText}>{bookingError}</Text> :  null } */}
              </View>
              <View style={styles.inputWrapper}>
                <Text style={styles.label}>
                  Description
                </Text>
                <TextInput
                  style={styles.inputSecond}
                  onChangeText={(remarks) => setRemarks(remarks)}
                  value={remarks}
                  placeholder="Please provide detailed information about your issue. We will promptly address your inquiry."
                  keyboardType="text"
                  placeholderblack={Colors.darkgrey}
                  multiline={true}
                />
              </View>
            </KeyboardAvoidingView>
            <TouchableOpacity style={styles.confirmButton} onPress={checkBookingid}>
              <Text style={styles.confirmButtonText}>Create</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
      {faqData && (
        <View style={{backgroundColor:'white'}} >
          <View style={{ backgroundColor: Colors.white,marginVertical:10, }}>
            <View style={styles.containerHiddenText}>
              <TouchableOpacity onPress={toggleTextVisibilityTwo}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', ...Margins.mh.mh10, ...Paddings.pt.pt20, ...Margins.mb.mb10, alignItems: 'center' }}>
                  <Text style={{ color: '#333', fontSize: FontSizes.tinymedium, fontWeight: FontWeights.bold }}>{bookingFaqs[0]?.faq_header}</Text>
                  <Icon name={isTextVisibleTwo ? 'remove' : 'add'} size={14} color={Colors.darkblue} />
                </View>
              </TouchableOpacity>
              {isTextVisibleTwo && bookingFaqs.map((faq, index) => (
                <View key={index} style={styles.questionContainer}>
                  <TouchableOpacity onPress={() => toggleTextVisibility(index)} style={styles.iconContainer}>
                    <Text style={styles.questionText}>{faq?.faq_question}</Text>
                    <Icon name={visibleIndex === index ? 'remove' : 'add'} size={14} color={Colors.darkblue} style={{ ...Margins.mh.mh10 }} />
                  </TouchableOpacity>
                  {visibleIndex === index && <Text style={styles.answerText}>{faq?.faq_answer}</Text>}
                </View>
              ))}
            </View>
          </View>
          <View style={{ backgroundColor: Colors.white, }}>
            <View style={styles.containerHiddenText}>
              <TouchableOpacity onPress={togglePaymentVisibility}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', ...Margins.mh.mh10, ...Paddings.pt.pt20, ...Margins.mb.mb10, alignItems: 'center' }}>
                  <Text style={{ color: '#333', fontSize: FontSizes.tinymedium, fontWeight: FontWeights.bold }}>{paymentFaqs[0]?.faq_header}</Text>
                  <Icon name={isPaymentVisible ? 'remove' : 'add'} size={14} color={Colors.darkblue} />
                </View>
              </TouchableOpacity>
              {isPaymentVisible && paymentFaqs.map((faq, index) => (
                <View key={index} style={styles.questionContainer}>
                  <TouchableOpacity onPress={() => togglePaymentFaqVisibility(index)} style={styles.iconContainer}>
                    <Text style={styles.questionText}>{faq?.faq_question}</Text>
                    <Icon name={paymentVisibleIndex === index ? 'remove' : 'add'} size={14} color={Colors.darkblue} style={{ ...Margins.mh.mh10 }} />
                  </TouchableOpacity>
                  {paymentVisibleIndex === index && <Text style={styles.answerText}>{faq?.faq_answer}</Text>}
                </View>
              ))}
            </View>
          </View>
        </View>
      )}
      <DropShadow style={{
        shadowColor: '#171717',
        shadowOffset: { width: 2, height: 6 },
      }}>
       {
        openticketdata?.status_code === "200" ? 
        <View style={styles.showticketcontainer}>
        <Text style={{color:Colors.black,...Paddings.ph.ph7,...Margins.mv.mv5,fontSize:FontSizes.tinymedium}}>{openticketdata.ticket_message}</Text>
        </View>
        :
        <TouchableOpacity onPress={openModal} style={{ backgroundColor: 'hsl(195, 85%, 41%)', alignItems: 'center', ...Paddings.p.p15, marginBottom: 15, borderRadius: 5, width: '92%', ...Margins.mh.mh15, marginTop: 25 }}>
        <Text style={{ color: Colors.white, fontSize: FontSizes.medium, ...Paddings.ph.ph10 }}>Create Ticket</Text>
        </TouchableOpacity>
       }
      </DropShadow>
      <View>
        <View
          style={
            {
              flexDirection: 'row', ...Margins.mh.mh15, borderTopWidth: 1, borderTopColor: Colors.grey, borderBottomWidth: 1, borderBottomColor: Colors.grey,
              borderRightWidth: 1, borderRightColor: Colors.grey, borderLeftWidth: 1, borderLeftColor: Colors.grey
            }}>
          <View style={{ flex: 1, height: 30, borderRightWidth: 1, borderRightColor: Colors.grey, ...Paddings.ph.ph5 }} >
            <Text style={{ ...Paddings.p.p5, color: Colors.black }}>Ticket ID</Text>
          </View>
          <View style={{ flex: 3, height: 30, borderRightWidth: 1, borderRightColor: Colors.grey, ...Paddings.ph.ph5 }} >
            <Text style={{ ...Paddings.p.p5, color: Colors.black }}>Created Date</Text>
          </View>
          <View style={{ flex: 1, height: 30, ...Paddings.ph.ph10 }} >
            <Text style={{ ...Paddings.p.p5, color: Colors.black}}>Status</Text>
          </View>
        </View>
        <View>
        <FlatList
        data={customerdata}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <View>
      <Modal
        isVisible={modalVisibles}
        onBackdropPress={closeModal}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginVertical:15}}>
          <Text style={{color:Colors.black,marginHorizontal:10}}>Ticket Details</Text>
          <TouchableOpacity onPress={() => setModalVisibles(false)} style={styles.closeButtonStyle}>
            <Ionicons name="close" color={Colors.white} size={24} />
          </TouchableOpacity>
          </View>
        
          <ScrollView>
         
          {singleticketdata ? (
        <View>
        <View
        style={
          {
            flexDirection: 'row', ...Margins.mh.mh15, borderBottomWidth: 1, borderBottomColor: Colors.grey,
            borderLeftWidth: 1, borderLeftColor: Colors.grey,borderTopWidth:1,borderTopColor:Colors.grey
          }}>
        <View style={{ flex: 2, height: 40, borderRightWidth: 1, borderRightColor: Colors.grey, ...Paddings.ph.ph5 }} >
          <Text style={{ ...Paddings.pt.pt9, color:Colors.black, ...Paddings.ph.ph5 ,fontSize:FontSizes.xsmall}}>Ticket ID:</Text>
        </View>
        <View style={{ flex: 3, height: 40, borderRightWidth: 1, borderRightColor: Colors.grey, ...Paddings.ph.ph5 }} >
          <Text style={{ ...Paddings.p.p9, color:Colors.black, ...Paddings.ph.ph5,fontSize:FontSizes.xsmall }}>{singleticketdata.id}</Text>
        </View>
      </View>
        <View
        style={
          {
            flexDirection: 'row', ...Margins.mh.mh15, borderBottomWidth: 1, borderBottomColor: Colors.grey,
            borderLeftWidth: 1, borderLeftColor: Colors.grey,
          }}>
        <View style={{ flex: 2, height: 40, borderRightWidth: 1, borderRightColor: Colors.grey, ...Paddings.ph.ph5 }} >
          <Text style={{ ...Paddings.pt.pt9, color:Colors.black, ...Paddings.ph.ph5 ,fontSize:FontSizes.xsmall}}>Created Date:</Text>
        </View>
        <View style={{ flex: 3, height: 40, borderRightWidth: 1, borderRightColor: Colors.grey, ...Paddings.ph.ph5 }} >
          <Text style={{ ...Paddings.p.p9, color:Colors.black, ...Paddings.ph.ph5,fontSize:FontSizes.xsmall }}>{singleticketdata.timestamp}</Text>
        </View>
        </View>
        <View
        style={
          {
            flexDirection: 'row', ...Margins.mh.mh15, borderBottomWidth: 1, borderBottomColor: Colors.grey,
           borderLeftWidth: 1, borderLeftColor: Colors.grey,
          }}>
        <View style={{ flex: 2, height: 40, borderRightWidth: 1, borderRightColor: Colors.grey, ...Paddings.ph.ph5 }} >
          <Text style={{ ...Paddings.pt.pt9, color:Colors.black, ...Paddings.ph.ph5 ,fontSize:FontSizes.xsmall}}>Booking No:</Text>
        </View>
        <View style={{ flex: 3, height: 40, borderRightWidth: 1, borderRightColor: Colors.grey, ...Paddings.ph.ph5 }} >
          <Text style={{ ...Paddings.p.p9, color:Colors.black, ...Paddings.ph.ph5,fontSize:FontSizes.xsmall }}>{singleticketdata.booking_id}</Text>
        </View>
        </View>
        <View
        style={
          {
            flexDirection: 'row', ...Margins.mh.mh15, borderBottomWidth: 1, borderBottomColor: Colors.grey,
             borderLeftWidth: 1, borderLeftColor: Colors.grey,
          }}>
        <View style={{ flex: 2, height: 40, borderRightWidth: 1, borderRightColor: Colors.grey, ...Paddings.ph.ph5 }} >
          <Text style={{ ...Paddings.pt.pt9, color:Colors.black, ...Paddings.ph.ph5 ,fontSize:FontSizes.xsmall}}>Status:</Text>
        </View>
        <View style={{ flex: 3, height: 40, borderRightWidth: 1, borderRightColor: Colors.grey, ...Paddings.ph.ph5 }} >
          <Text style={{ ...Paddings.p.p9, color:Colors.black, ...Paddings.ph.ph5,fontSize:FontSizes.xsmall }}>{singleticketdata.ticket_status}</Text>
        </View>
        </View>
        <View
        style={
          {
            flexDirection: 'row', ...Margins.mh.mh15, borderBottomWidth: 1, borderBottomColor: Colors.grey,
           borderLeftWidth: 1, borderLeftColor: Colors.grey,
          }}>
        <View style={{ flex: 2, height: 40, borderRightWidth: 1, borderRightColor: Colors.grey, ...Paddings.ph.ph5 }} >
          <Text style={{ ...Paddings.pt.pt9, color:Colors.black, ...Paddings.ph.ph5 ,fontSize:FontSizes.xsmall}}>Description:</Text>
        </View>
        <View style={{ flex: 3, height: 40, borderRightWidth: 1, borderRightColor: Colors.grey, ...Paddings.ph.ph5 }} >
          <Text style={{ ...Paddings.p.p9, color:Colors.black, ...Paddings.ph.ph5,fontSize:FontSizes.xsmall }}>{singleticketdata.internal_communication}</Text>
        </View>
        </View>
        <View
        style={
          {
            flexDirection: 'row', ...Margins.mh.mh15, borderBottomWidth: 1, borderBottomColor: Colors.grey,borderLeftWidth: 1, borderLeftColor: Colors.grey,
            backgroundColor:Colors.primary
          }}>
        <View style={{ flex: 2, height: 40, borderRightWidth: 1, borderRightColor: Colors.grey, ...Paddings.ph.ph5 }} >
          <Text style={{ ...Paddings.pt.pt9, color:Colors.white, ...Paddings.ph.ph5 ,fontSize:FontSizes.xsmall}}>Response:</Text>
        </View>
        <View style={{ flex: 3, height: 40, borderRightWidth: 1, borderRightColor: Colors.grey, ...Paddings.ph.ph5 }} >
          <Text style={{ ...Paddings.p.p9, color:Colors.white, ...Paddings.ph.ph5,fontSize:FontSizes.xsmall }}>{singleticketdata.closure_by} We are here to</Text>
        </View>
        </View>
        <View
        style={
          {
            flexDirection: 'row', ...Margins.mh.mh15, borderBottomWidth: 1, borderBottomColor: Colors.grey,
            borderLeftWidth: 1, borderLeftColor: Colors.grey,
          }}>
        <View style={{ flex: 2, height: 40, borderRightWidth: 1, borderRightColor: Colors.grey, ...Paddings.ph.ph5 }} >
          <Text style={{ ...Paddings.pt.pt9, color:Colors.black, ...Paddings.ph.ph5 ,fontSize:FontSizes.xsmall}}>Closure Date:</Text>
        </View>
        <View style={{ flex: 3, height: 40, borderRightWidth: 1, borderRightColor: Colors.grey, ...Paddings.ph.ph5 }} >
          <Text style={{ ...Paddings.p.p9, color:Colors.black, ...Paddings.ph.ph5,fontSize:FontSizes.xsmall }}>{singleticketdata.closure_timestamp}</Text>
        </View>
        </View>
      </View>
          ) : (
            <Text>Loading...</Text>
          )}
          </ScrollView>
        </View>
      </Modal>
        {/* // */}
          {/* <Modal
        visible={modalVisibles}
        
        onRequestClose={() => setModalVisibles(false)}
        style={styles.modal}
      >
        <ScrollView style={styles.modalContent}>
          <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginVertical:15}}>
          <Text style={{color:Colors.black,marginHorizontal:10}}>Ticket Details</Text>
          <TouchableOpacity onPress={() => setModalVisibles(false)} style={styles.closeButtonCreate}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          </View>
          {singleticketdata ? (
        <View>
        <View
        style={
          {
            flexDirection: 'row', ...Margins.mh.mh15, borderBottomWidth: 1, borderBottomColor: Colors.grey,
            borderLeftWidth: 1, borderLeftColor: Colors.grey,borderTopWidth:1,borderTopColor:Colors.grey
          }}>
        <View style={{ flex: 2, height: 40, borderRightWidth: 1, borderRightColor: Colors.grey, ...Paddings.ph.ph5 }} >
          <Text style={{ ...Paddings.pt.pt9, color:Colors.black, ...Paddings.ph.ph5 ,fontSize:FontSizes.xsmall}}>Ticket ID:</Text>
        </View>
        <View style={{ flex: 3, height: 40, borderRightWidth: 1, borderRightColor: Colors.grey, ...Paddings.ph.ph5 }} >
          <Text style={{ ...Paddings.p.p9, color:Colors.black, ...Paddings.ph.ph5,fontSize:FontSizes.xsmall }}>{singleticketdata.id}</Text>
        </View>
      </View>
        <View
        style={
          {
            flexDirection: 'row', ...Margins.mh.mh15, borderBottomWidth: 1, borderBottomColor: Colors.grey,
            borderLeftWidth: 1, borderLeftColor: Colors.grey,
          }}>
        <View style={{ flex: 2, height: 40, borderRightWidth: 1, borderRightColor: Colors.grey, ...Paddings.ph.ph5 }} >
          <Text style={{ ...Paddings.pt.pt9, color:Colors.black, ...Paddings.ph.ph5 ,fontSize:FontSizes.xsmall}}>Created Date:</Text>
        </View>
        <View style={{ flex: 3, height: 40, borderRightWidth: 1, borderRightColor: Colors.grey, ...Paddings.ph.ph5 }} >
          <Text style={{ ...Paddings.p.p9, color:Colors.black, ...Paddings.ph.ph5,fontSize:FontSizes.xsmall }}>{singleticketdata.timestamp}</Text>
        </View>
        </View>
        <View
        style={
          {
            flexDirection: 'row', ...Margins.mh.mh15, borderBottomWidth: 1, borderBottomColor: Colors.grey,
           borderLeftWidth: 1, borderLeftColor: Colors.grey,
          }}>
        <View style={{ flex: 2, height: 40, borderRightWidth: 1, borderRightColor: Colors.grey, ...Paddings.ph.ph5 }} >
          <Text style={{ ...Paddings.pt.pt9, color:Colors.black, ...Paddings.ph.ph5 ,fontSize:FontSizes.xsmall}}>Booking No:</Text>
        </View>
        <View style={{ flex: 3, height: 40, borderRightWidth: 1, borderRightColor: Colors.grey, ...Paddings.ph.ph5 }} >
          <Text style={{ ...Paddings.p.p9, color:Colors.black, ...Paddings.ph.ph5,fontSize:FontSizes.xsmall }}>{singleticketdata.booking_id}</Text>
        </View>
        </View>
        <View
        style={
          {
            flexDirection: 'row', ...Margins.mh.mh15, borderBottomWidth: 1, borderBottomColor: Colors.grey,
             borderLeftWidth: 1, borderLeftColor: Colors.grey,
          }}>
        <View style={{ flex: 2, height: 40, borderRightWidth: 1, borderRightColor: Colors.grey, ...Paddings.ph.ph5 }} >
          <Text style={{ ...Paddings.pt.pt9, color:Colors.black, ...Paddings.ph.ph5 ,fontSize:FontSizes.xsmall}}>Status:</Text>
        </View>
        <View style={{ flex: 3, height: 40, borderRightWidth: 1, borderRightColor: Colors.grey, ...Paddings.ph.ph5 }} >
          <Text style={{ ...Paddings.p.p9, color:Colors.black, ...Paddings.ph.ph5,fontSize:FontSizes.xsmall }}>{singleticketdata.ticket_status}</Text>
        </View>
        </View>
        <View
        style={
          {
            flexDirection: 'row', ...Margins.mh.mh15, borderBottomWidth: 1, borderBottomColor: Colors.grey,
           borderLeftWidth: 1, borderLeftColor: Colors.grey,
          }}>
        <View style={{ flex: 2, height: 40, borderRightWidth: 1, borderRightColor: Colors.grey, ...Paddings.ph.ph5 }} >
          <Text style={{ ...Paddings.pt.pt9, color:Colors.black, ...Paddings.ph.ph5 ,fontSize:FontSizes.xsmall}}>Description:</Text>
        </View>
        <View style={{ flex: 3, height: 40, borderRightWidth: 1, borderRightColor: Colors.grey, ...Paddings.ph.ph5 }} >
          <Text style={{ ...Paddings.p.p9, color:Colors.black, ...Paddings.ph.ph5,fontSize:FontSizes.xsmall }}>{singleticketdata.internal_communication}</Text>
        </View>
        </View>
        <View
        style={
          {
            flexDirection: 'row', ...Margins.mh.mh15, borderBottomWidth: 1, borderBottomColor: Colors.grey,borderLeftWidth: 1, borderLeftColor: Colors.grey,
            backgroundColor:Colors.primary
          }}>
        <View style={{ flex: 2, height: 40, borderRightWidth: 1, borderRightColor: Colors.grey, ...Paddings.ph.ph5 }} >
          <Text style={{ ...Paddings.pt.pt9, color:Colors.white, ...Paddings.ph.ph5 ,fontSize:FontSizes.xsmall}}>Response:</Text>
        </View>
        <View style={{ flex: 3, height: 40, borderRightWidth: 1, borderRightColor: Colors.grey, ...Paddings.ph.ph5 }} >
          <Text style={{ ...Paddings.p.p9, color:Colors.white, ...Paddings.ph.ph5,fontSize:FontSizes.xsmall }}>{singleticketdata.closure_by} We are here to</Text>
        </View>
        </View>
        <View
        style={
          {
            flexDirection: 'row', ...Margins.mh.mh15, borderBottomWidth: 1, borderBottomColor: Colors.grey,
            borderLeftWidth: 1, borderLeftColor: Colors.grey,
          }}>
        <View style={{ flex: 2, height: 40, borderRightWidth: 1, borderRightColor: Colors.grey, ...Paddings.ph.ph5 }} >
          <Text style={{ ...Paddings.pt.pt9, color:Colors.black, ...Paddings.ph.ph5 ,fontSize:FontSizes.xsmall}}>Closure Date:</Text>
        </View>
        <View style={{ flex: 3, height: 40, borderRightWidth: 1, borderRightColor: Colors.grey, ...Paddings.ph.ph5 }} >
          <Text style={{ ...Paddings.p.p9, color:Colors.black, ...Paddings.ph.ph5,fontSize:FontSizes.xsmall }}>{singleticketdata.closure_timestamp}</Text>
        </View>
        </View>
      </View>
          ) : (
            <Text>Loading...</Text>
          )}
        
        </ScrollView>
      </Modal> */}
      </View>
      </View>
      </View>
    </ScrollView>
  );
}

export default GetSupportScreen;

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closestatusBtn:{
    paddingHorizontal: 1,fontSize:FontSizes.xsmall
  },
 container: {
    
    padding: 20,
    backgroundColor: '#fff',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  modalContainer: {
    height:300,
   
    backgroundColor:Colors.white
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  closeButtonText: {
    color:Colors.black,
    fontSize: 16,
    marginHorizontal:10
  },
  closedButton:{
    ...Paddings.pt.pt5, height: '70%', 
    ...Margins.mv.mv6,
     borderRadius: 3,
     alignItems: 'center' ,
     
  },
  closeButtonStyle: {
    alignSelf: 'flex-end',
    ...Margins.mt.mt10,
    ...Margins.mb.mb10,
   backgroundColor:Colors.grey,
    ...Paddings.p.p5,
    borderRadius:30,
    ...Margins.mh.mh15
  },
  errorText: {
    color: Colors.red,
    marginTop: 5,
  },
  closeButton: {
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.white,
    ...Paddings.p.p5,
    backgroundColor: Colors.darkgrey
  },
  inputWrapper: {
    ...Margins.mb.mb20,
    position: 'relative',
  },
  label: {
    position: 'absolute',
    top: -10,
    backgroundColor: Colors.white,
    fontSize: FontSizes.tinymedium,
    color: Colors.darkgrey,
  },
  confirmButton: {
    backgroundColor: '#007AFF',
    alignItems: 'center',
   ...Paddings.p.p10,
    borderRadius: 5,
   ...Margins.mv.mv20,
  },
  confirmButtonText: {
    color: Colors.white,
    fontSize: FontSizes.tinymedium,
  },
  title: {
    color: Colors.darkgrey,
    fontSize: FontSizes.xlarge,
    fontWeight:FontWeights.regular,
    ...Margins.mb.mb20
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Paddings.pb.pb20,
    ...Paddings.ph.ph20,
  },
  input: {
    height: 50,
    ...Paddings.pt.pt10,
    ...Margins.mt.mt20,
    ...Paddings.p.p10,
    backgroundColor: Colors.black,
    color: Colors.white,
    borderRadius: 5,
    width: '100%'
  },
  inputSecond: {
    height: 120,
    ...Margins.mt.mt20,
    ...Paddings.p.p10,
    backgroundColor: Colors.black,
    color: Colors.white,
    borderRadius: 5,
    width: '100%',
    fontSize: FontSizes.tinymedium,
    textAlignVertical: 'top',
  },
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
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  containerHiddenText: {
    backgroundColor: '#f7f7f7',
    ...Margins.mh.mh15,
    borderRadius: 5,
    borderColor: '#e0e0e0',
    borderWidth: 1
  },
  showticketcontainer:{
    backgroundColor: '#f7f7f7',
    ...Margins.mh.mh15,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    ...Margins.mt.mt25,
    ...Margins.mb.mb10
  },
  containerHiddenTextTwo: {
    backgroundColor: '#f7f7f7',
    ...Margins.mh.mh15,
    borderRadius: 5,
    ...Margins.mt.mt10,
    borderColor: '#e0e0e0',
    borderWidth: 1
  },
  textHidden: {
    ...Margins.mt.mt20,
    fontSize: FontSizes.body,
    color: '#000',
  },
  containerText: {
    backgroundColor: '#f7f7f7',
    borderRadius: 10
  },
  questionContainer: {
    ...Margins.mb.mb10
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  questionText: {
    ...Margins.ml.ml10,
    fontSize: FontSizes.tinymedium,
    fontWeight: FontWeights.bold ,
    color: Colors.black,
  },
  answerText: {
    ...Margins.mt.mt10,
    fontSize: FontSizes.small,
    color: '#666',
    ...Margins.mh.mh10,
    letterSpacing: 0.2,
    paddingVertical: 5
  },
  container: {
    flex: 1,
   ...Paddings.p.p20,
  },
})