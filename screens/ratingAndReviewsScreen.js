
import React, { useEffect, useState ,useCallback} from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, ActivityIndicator, TouchableOpacity, RefreshControl,  } from 'react-native';
import OTTHeader from '../components/OTTHeader';
import { Colors, FontSizes } from '../assets/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import { validateAccessToken,refreshAccessToken } from '../utils/validation';
import { sendratingApi,ratingreview } from '../api/services/apiService';
const RatingAndReviewsScreen = ({ navigation }) => {
  const [feedback, setFeedback] = useState('');
  const [datas, setDatas] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sendrating, setSendrating]=useState()
  const [remarks,setRemarks]=useState()
  const [refreshing, setRefreshing] = useState(false);
 
 
  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    const isValid = await validateAccessToken();
    if (!isValid) {
      await refreshAccessToken();
    }
    try {
      await Promise.all([fetchratingreview(setDatas, setError, setLoading)]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData().then(() => setRefreshing(false));
  }, []);
  
  const fetchratingreview = async (setDatas,setError,setLoading) => {
    try {
      const data = await ratingreview();
      setDatas(data?.rating_and_review_page);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const sendratingdata = async (remarks, setSendrating, setError, setLoading) => {
    setLoading(true); // Ensure loading state is set to true at the beginning
    try {
      const data = await sendratingApi(remarks);
      console.log('Data received:', data);
      setSendrating(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    await sendratingdata(remarks, setSendrating, setError, setLoading);
  };
  // const fetchRatingData = async () => {
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
  //     const response = await axios.get('https://www.tatd.in/app-api/customer/rating-and-reviews/customer-rating-api.php?action=rating_and_review_page', config);
  //     setDatas(response.data?.rating_and_review_page);
  //   } catch (err) {
  //     console.error('Error fetching rating data:', err);
  //     setError(err.message);
  //   } 
  // };

  const sendRating = async () => {
    const isValid = await validateAccessToken();
    if (!isValid) {
      await refreshAccessToken();
    }
    try {
      const userData = await AsyncStorage.getItem('userData');
      const parsedUserData = userData ? JSON.parse(userData) : null;
      const token = parsedUserData ? parsedUserData.jwt : null;
      if (!token) {
        throw new Error("No token found");
      }
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };
      const response = await axios.post('https://www.tatd.in/app-api/customer/tickets-customer-api.php?action=add_customer_ticket_rating_review_page', {
        action: "add_customer_ticket_rating_page",
        remarks:remarks,
      }, config);
      console.log('sendapi data=============',response.data)
      setSendrating(response.data);
    } catch (err) {
      setError(err.message);
    } 
  };

  const renderItems = ({ item }) => {
    const formattedDate = format(new Date(item.add_date), 'dd MMM, yyyy');
    return (
      <View style={{ backgroundColor: Colors.secondary, height: 170, marginHorizontal: 15, borderRadius: 10,marginVertical:5 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 15, alignItems: 'center', }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ backgroundColor: Colors.primary, width: 35, height: 35, borderRadius: 18, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: Colors.white, fontSize: FontSizes.tinymedium }}>R</Text>
            </View>
            <Text style={{ color: Colors.black, fontSize: FontSizes.tinymedium, marginHorizontal: 10 }}>{item.customer_name}</Text>
          </View>
          <Text style={{ color: Colors.black, fontSize: FontSizes.tinymedium }}>{item.zone}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginHorizontal: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialIcons name="star" size={14} color={Colors.primary} />
            <MaterialIcons name="star" size={14} color={Colors.primary} />
            <MaterialIcons name="star" size={14} color={Colors.primary} />
            <MaterialIcons name="star" size={14} color={Colors.primary} />
            <MaterialIcons name="star" size={14} color={Colors.primary} />
          </View>
          <Text style={{ color: Colors.black, fontSize: FontSizes.tinymedium, marginHorizontal: 15 }}>{formattedDate}</Text>
        </View>
        <Text style={{ color: Colors.black, fontSize: FontSizes.tinymedium, marginHorizontal: 15, marginTop: 10 }}>{item.message}</Text>
      </View>
    );
  };


  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <OTTHeader navigation={navigation} title={'trusted & trained driver'} />
      <View style={{ backgroundColor: Colors.secondary, margin: 15, borderRadius: 10 ,flexDirection:'row',alignItems:'center'}}>
        <TextInput
          style={styles.input}
          onChangeText={(remarks) =>setRemarks(remarks)}
          value={remarks}
          placeholder="Type your feedback here..."
          keyboardType="default"
          placeholderTextColor={Colors.black}
          numberOfLines={3}
          multiline={true}
        />
          <TouchableOpacity onPress={sendRating} style={{ backgroundColor: Colors.white,width:40,height:40 ,marginTop:20,borderRadius:20,alignItems:'center',justifyContent:'center'}}>
            <Feather name="send" size={20} color={Colors.primary} />
          </TouchableOpacity>
      </View>
<View style={{flex:1}}>
      <FlatList
        data={datas}
        renderItem={renderItems}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      </View>
    </View>
  );
}

export default RatingAndReviewsScreen;

const styles = StyleSheet.create({
  input: {
    paddingTop:20,
    borderRadius: 5,
    marginHorizontal: 12,
    marginTop: 12,
    color: Colors.black,
    padding: 5,
    backgroundColor: Colors.white,
    width: '75%',
    marginBottom:15
  },
  inputNumber: {
    height: 40,
    margin: 12,
    padding: 10,
    backgroundColor: Colors.white,
    borderRadius: 5,
    width: '75%'
  },
  numberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
