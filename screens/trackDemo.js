import React , {useState} from 'react';
import { View, Text,StyleSheet,TouchableOpacity,Image, ScrollView,TextInput} from 'react-native';
import OTTHeader from '../components/OTTHeader';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../assets/colors';
import DropShadow from 'react-native-drop-shadow';
import DashedLine from 'react-native-dashed-line';
import { Divider , Input,} from '@rneui/base';
import Modal from "react-native-modal";
import Ionicons  from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
const TrackDemo = ({navigation}) => {
  const [feedback,setFeedback]=useState()
  const [activePage, setActivePage] = useState('Current');
  const [selectedOption, setSelectedOption] = useState('changeplan');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisibleBooking, setModalVisibleBooking] = useState(false);
 
  const openModalFeedback = () => {
    setModalVisibleFeedback(!isModalVisibleFeedback);
  };
  const closeModalFeedback = () => {
      setModalVisibleFeedback(false);
    };
    const [isModalVisibleFeedback, setModalVisibleFeedback] = useState(false);
  const openModal = () => {
    setModalVisible(!isModalVisible);
  };
  const closeModal = () => {
      setModalVisible(false);
    };
    const openModalBooking = () => {
      setModalVisibleBooking(!isModalVisibleBooking);
    };
    const closeModalBooking = () => {
        setModalVisibleBooking(false);
      };
  const renderContent = () => {
    if (activePage === 'Current') {
      return (
        <View style={styles.pageContainer}>
                       <Modal 
    isVisible={isModalVisibleFeedback} 
    onBackdropPress={closeModalFeedback}
    style={styles.modal}
  >
    <View style={styles.modalContentBooking}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <TouchableOpacity onPress={closeModalFeedback} style={styles.closeButton}>
        <Ionicons name="close" color={'white'} size={24} />
      </TouchableOpacity>
       <View style={{backgroundColor:Colors.secondary,borderRadius:10}}>
        <View style={{flexDirection:'row',alignItems:'center',margin:20}}>
       <TextInput
        style={styles.input}
        onChangeText={(feedback)=>setFeedback(feedback)}
        value={feedback}
        placeholder="Type your feedback here..."
        keyboardType="text"
        placeholderTextColor={'black'}
        numberOfLines={3}
        multiline={true}
      />
       <View style={{backgroundColor:Colors.white,borderRadius:30,padding:10,marginTop:20,marginHorizontal:5}}>
      <Feather  name="send" size={20} color={Colors.primary} />
      </View>
       </View>
       </View>
      </ScrollView>
    </View>
  </Modal>
              <Modal 
    isVisible={isModalVisibleBooking} 
    onBackdropPress={closeModalBooking}
    style={styles.modal}
  >
    <View style={styles.modalContent}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
       <View style={{backgroundColor:Colors.secondary}}>
        <View style={{backgroundColor:Colors.primary,padding:10,flexDirection:'row',justifyContent:'space-between',
          marginTop:20,alignItems:'center',borderRadius:5}}>
        <Text style={{color:'white',fontSize:18}}>BOOKING STATUS</Text>
        <TouchableOpacity onPress={closeModalBooking} style={{backgroundColor:Colors.white,borderRadius:20}}>
        <Ionicons name="close" color={'black'} size={28} />
        </TouchableOpacity>
        </View>
        <View style={{borderWidth:1,borderColor:Colors.black,borderRadius:5,marginTop:10}}>
          <View style={{marginHorizontal:10,marginVertical:10}}>
        <View style={{flexDirection:'row',justifyContent:'space-between',marginVertical:10,alignItems:'center'}}>
          <Text style={{color:'black',fontSize:14,fontWeight:'600'}}>Booking Confirmed</Text>
          <Text style={{color:'black',fontSize:14,fontWeight:'600'}}>02:42 PM</Text>
        </View>
        <Text style={{color:'black',fontSize:14,fontWeight:'600'}}>Driver Assigned</Text>
        <Text style={{color:'black',fontSize:14,fontWeight:'600',marginVertical:15}}>Driver on the Way</Text>
        <Text style={{color:'black',fontSize:14,fontWeight:'600'}}>Driver Reached</Text>
        <Text style={{color:'black',fontSize:14,fontWeight:'600',marginVertical:15}}>Trip Started</Text>
        <Text style={{color:'black',fontSize:14,fontWeight:'600',marginBottom:10}}>Trip Ended</Text>
       </View>
       </View>
       </View>
      </ScrollView>
    </View>
  </Modal>
            <Modal 
    isVisible={isModalVisible} 
    onBackdropPress={closeModal}
    style={styles.modal}
  >
    <View style={styles.modalContent}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={{alignItems:'center',}}>
          <Text style={styles.title}>Cancel Booking?</Text>
          </View>
          <View style={styles.radioContainer}>
          <View style={styles.firstRadioContainer}>
                     <Text style={styles.radioText}>Change in plan</Text>
                     <TouchableOpacity
                    style={styles.radioButton}
                    onPress={() => setSelectedOption('changeplan')}>
                    <View style={styles.radioCircle}>
                        {selectedOption === 'changeplan' && <View style={styles.selectedRb} />}
                    </View>
                </TouchableOpacity>
                </View>
                <View style={styles.firstRadioContainer}>
                <Text style={styles.radioText}>Driver rewusted to cancel</Text>
                <TouchableOpacity
                    style={styles.radioButton}
                    onPress={() => setSelectedOption('driverrequstedcancel')}
                >
                    <View style={styles.radioCircle}>
                        {selectedOption === 'driverrequstedcancel' && <View style={styles.selectedRb} />}
                    </View>
                </TouchableOpacity>
                </View>
                <View style={styles.firstRadioContainer}>
                <Text style={styles.radioText}>Driver is unreachable</Text>
                <TouchableOpacity
                    style={styles.radioButton}
                    onPress={() => setSelectedOption('driverunrechable')}
                >
                    <View style={styles.radioCircle}>
                        {selectedOption === 'driverunrechable' && <View style={styles.selectedRb} />}
                    </View>
                </TouchableOpacity>
                </View>
                <Divider width={1} color={Colors.white} style={{marginTop:10}}/>
                <Input
      placeholder='Tell us your suggestion...'
      style={{marginTop:30,fontSize:14}}
    />
<View style={{marginHorizontal:30}}>
  <Text style={{color:'black'}}>Your words makes tat d a better</Text>
  <Text style={{color:'black'}}>place. You are the influence</Text>
</View>
            </View>
           
          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-evenly',marginTop:15}}>
          <TouchableOpacity style={styles.noButton}>
            <Text style={styles.noTextButton}>No</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          </View>
      </ScrollView>
    </View>
  </Modal>

  <View style={{}}>
<View style={{}}>
          <Image
            source={require('../assets/images/my_current_rides.jpg')}
            style={styles.image}
          />
          </View>
          <View style={{alignItems:'center'}}>
          <Text style={{color:Colors.black,fontSize:16,fontWeight:'500'}}>No Active Bookings</Text>
          <TouchableOpacity style={{backgroundColor:Colors.primary,padding:5,paddingHorizontal:30,marginTop:20,fontSize:12,
           borderRadius:3
          }}>
            <Text style={{color:Colors.white}}>Book Now</Text>
          </TouchableOpacity>
        </View>
        </View>
      
           {/* <View style={[styles.card,]}>
     <Text style={{color:'black'}}>Booking ID: #428377</Text>
     <View style={{borderColor:'grey',borderWidth:1,marginTop:10,borderRadius:5}}>
      <Text style={{color:Colors.primary,margin:5}}>Driver details will be shared here shortly. or at</Text>
      <Text style={{color:Colors.primary,marginHorizontal:5,marginBottom:25}}>least 60 minutes before the scheduled time.</Text>
     </View>
     <TouchableOpacity onPress={openModalFeedback} style={{justifyContent:'flex-end',alignItems:'flex-end',marginVertical:5,flexDirection:'row'}}>
      <View>
      <Text style={{color:Colors.primary,fontSize:16}}>Need Help ?</Text>
      <View style={{borderWidth:1.2,borderColor:Colors.primary,color:'solid'}}/>
      </View>
      <MaterialCommunityIcons name="arrow-right-thick" color={Colors.primary}size={18} />
     </TouchableOpacity>
     <View style={{
    borderStyle: 'dotted',
    borderWidth: 1,
    borderRadius: 1,
    marginVertical:5
  }}/>
     <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      <Text style={{color:'black',fontSize:16}}>
        Sheduled Time:
      </Text>
      <Text style={{color:'black',fontSize:16}}>
        05:15 PM,29 Jun 2024
      </Text>
     </View>
     <View style={{
    borderStyle: 'dotted',
    borderWidth: 1,
    borderRadius: 1,
    marginVertical:5
  }}/>
     <View  style={{flexDirection:'row',justifyContent:'space-between'}}>
      <Text style={{color:'black',fontSize:16}}>
        Incity:
      </Text>
      <Text style={{color:'black',fontSize:16}}>
        5 Hours
      </Text>
     </View>
     <View style={{
    borderStyle: 'dotted',
    borderWidth: 1,
    borderRadius: 1,
    marginVertical:5
  }}>
</View>
     <View  style={{flexDirection:'row',justifyContent:'space-between'}}>
      <Text style={{color:'black',fontSize:16}}>
        Package & Price:
      </Text>
      <View style={{flexDirection:'row'}}>
      <Text style={{color:'black',fontWeight:'800',fontSize:16}}>
      ₹510
      </Text>
      </View>
     </View>
     <View style={{
    borderStyle: 'dotted',
    borderWidth: 1,
    borderRadius: 1,
    marginVertical:5
  }}/>

     <View  style={{flexDirection:'row',justifyContent:'space-between'}}>
      <Text style={{color:'black',fontSize:16}}>
        Grand Total:
      </Text>
      <View style={{flexDirection:'row'}}>
      <Text style={{color:'black',fontWeight:'800',fontSize:16}}>
      ₹510
      </Text>
      </View>
     </View>
     <View style={{flexDirection:'row',justifyContent:'space-between',marginVertical:10,marginTop:20}}>
     <TouchableOpacity style={[styles.cardButton,]} onPress={openModal}>
        <Text style={{color:Colors.black,fontWeight:'800'}}>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.cardButton,]} onPress={openModalBooking}>
        <Text style={{color:Colors.black,fontWeight:'800'}}>Reschedule</Text>
      </TouchableOpacity>
     </View>
   
    
      <TouchableOpacity style={[styles.cardButtons,]} onPress={()=>navigation.navigate('acceptride')}>
        <Text style={{color:Colors.black,fontWeight:'800'}}>Track</Text>
      </TouchableOpacity>
     </View> */}
    </View>
    
      );
    } else if (activePage === 'History') {
      return (
        <ScrollView>
       
      
        <View style={{backgroundColor:'#b7cbdc',marginHorizontal:15,marginVertical:15,borderBottomLeftRadius:10,borderBottomRightRadius:10}}>
         <View style={{backgroundColor:'#e8eaeb',flexDirection:'row',justifyContent:'space-between',padding:5,borderBottomLeftRadius:10,borderBottomRightRadius:10,alignItems:'center'}}>
           <View>
             <Text style={{color:Colors.black,fontWeight:'600',fontSize:14,marginBottom:3}}>20 Jun, 2024 <Text style={{color:'grey',fontWeight:'900',fontSize:20}}>|</Text> 15:15 PM</Text>
           </View>
           <View style={{backgroundColor:'#75c519',borderRadius:30,padding:4}}>
           <MaterialCommunityIcons name='check-bold' color={'white'} style={{fontWeight:'bold'}} size={12}/>
           </View>
         </View>
         <View style={{marginHorizontal:10,marginTop:10}}>
           <Text style={{color:Colors.black}}>Booking ID 414259</Text>
         </View>
         <View style={{flexDirection:'row',marginTop:20,marginHorizontal:10,alignItems:'center'}}>
         <Text style={{color:Colors.black,fontSize:22,fontWeight:'800'}}>₹510</Text>
         </View>
         <View>
           <Text style={{color:Colors.black,marginTop:5,marginHorizontal:10}}>Package - 5 Hours</Text>
         </View>
       
       <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:10}}>
     <View style={styles.verifyButtonContainer}>
               <DropShadow style={styles.shadowStyle}>
                 <TouchableOpacity onPress={() => navigation.navigate('home')} style={styles.verifyButton}>
                 <Text style={{color: 'orange',fontWeight:'500'}}>Book Again</Text>
                 </TouchableOpacity>
               </DropShadow>
             </View>
       <View style={styles.verifyButtonContainer}>
               <DropShadow style={styles.shadowStyle}>
                 <TouchableOpacity onPress={() => navigation.navigate('home')} style={styles.verifyButtons}>
                 <MaterialIcons name="star" size={16} color='#16588e' />
                 <Text style={{color: Colors.primary, marginLeft: 4,fontWeight:'500'}}>4 | GOOD</Text>
                 </TouchableOpacity>
               </DropShadow>
             </View>
         </View>
        </View>
        <View>
       
      
       <View style={{backgroundColor:'#b7cbdc',marginHorizontal:15,marginBottom:15,borderBottomLeftRadius:10,borderBottomRightRadius:10}}>
        <View style={{backgroundColor:'#e8eaeb',flexDirection:'row',justifyContent:'space-between',padding:5,borderBottomLeftRadius:10,borderBottomRightRadius:10,alignItems:'center'}}>
          <View >
            <Text style={{color:Colors.black,fontWeight:'600',fontSize:14,marginBottom:3}}>20 Jun, 2024 <Text style={{color:'grey',fontWeight:'900',fontSize:20}}>|</Text> 15:15 PM</Text>
          </View>
          <View style={{backgroundColor:'#75c519',borderRadius:30,padding:4}}>
          <MaterialCommunityIcons name='check-bold' color={'white'} style={{fontWeight:'bold'}} size={12}/>
          </View>
        </View>
        <View style={{marginHorizontal:10,marginTop:10}}>
          <Text style={{color:Colors.black}}>Booking ID 414259</Text>
        </View>
        <View style={{flexDirection:'row',marginTop:20,marginHorizontal:10,alignItems:'center'}}>
        <Text style={{color:Colors.black,fontSize:22,fontWeight:'800'}}>₹510</Text>
        </View>
        <View>
          <Text style={{color:Colors.black,marginTop:5,marginHorizontal:10}}>Package - 5 Hours</Text>
        </View>
      
      <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:10}}>
    <View style={styles.verifyButtonContainer}>
              <DropShadow style={styles.shadowStyle}>
                <TouchableOpacity onPress={() => navigation.navigate('home')} style={styles.verifyButton}>
                <Text style={{color: 'orange',fontWeight:'500'}}>Book Again</Text>
                </TouchableOpacity>
              </DropShadow>
            </View>
      <View style={styles.verifyButtonContainer}>
              <DropShadow style={styles.shadowStyle}>
                <TouchableOpacity onPress={() => navigation.navigate('rating')} style={styles.ratingButton}>
                <Text style={{color: Colors.black, marginLeft: 4,fontWeight:'500'}}>Rate Experience</Text>
                </TouchableOpacity>
              </DropShadow>
            </View>
        </View>
       </View>
       </View>
        </ScrollView>
      );
    }
  };

  return (
  <View style={{flex:1,backgroundColor:'white'}}>
     <OTTHeader navigation={navigation} title={'trusted & trained driver'}/>
   
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            activePage === 'Current' && styles.activeButton
          ]}
          onPress={() => setActivePage('Current')}
        >
          <Text style={styles.buttonText}>Current</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            activePage === 'History' && styles.activeButton
          ]}
          onPress={() => setActivePage('History')}
        >
          <Text style={styles.buttonText}>History</Text>
        </TouchableOpacity>
      </View>
      {renderContent()}
    </View>

  );
}


export default TrackDemo;


const styles=StyleSheet.create({
  verifyButtonContainer: {
    justifyContent: 'space-between',
    marginVertical: 30,
  },
  shadowStyle: {
    shadowColor: '#171717',
    shadowOffset: { width: 2, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 20,
  },
  verifyButton: {
    justifyContent:'space-between',
    backgroundColor: Colors.white,
    alignItems: 'center',
    padding: 11,
    borderRadius: 5,
    paddingHorizontal:30,
 borderColor:'orange',
 borderWidth:1
  },
  verifyButtons: {
    flexDirection:'row',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    alignItems: 'center',
    padding: 11,
    borderRadius: 5,
  paddingHorizontal:30,
 borderColor:Colors.primary,
 borderWidth:1
  },
  ratingButton: {
    flexDirection:'row',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    alignItems: 'center',
    padding: 11,
    borderRadius: 5,
  paddingHorizontal:15,
 borderColor:Colors.black,
 borderWidth:1
  },

  //
  container: {
   flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  buttonContainer: {
    marginHorizontal:15,
    padding:10,
    backgroundColor:'#edecf1',
    flexDirection:'row',
    borderRadius:3,
    marginTop:10
  },
  button: {
    paddingHorizontal:60,
    borderRadius:3,
    padding:7
  },
  activeButton: {
    backgroundColor: 'white',
    paddingHorizontal:50,
    alignItems:'center'
  },
  buttonText: {
    color: 'black'
  },
  pageContainer: {
  backgroundColor:'white',
    
    flex:1
  },
  pageText: {
    fontSize: 24,
    color: 'black'
  },
  modalContentBooking: {
    backgroundColor: Colors.lightblue,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  //
  pageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  input: {
    borderRadius:5,
    
    marginVertical:30,
    color:'black',
      padding: 10,
      backgroundColor:'white',
      width:'85%'
    },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
   
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.8, 
    shadowRadius: 3,
    elevation: 15, 
  },
  cardButton: {
    alignItems:'center',
    backgroundColor: 'white',
    borderRadius: 10,
    width:'46%',
    padding: 15,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.8, 
    shadowRadius: 3, 
    elevation: 12,
    borderColor:'grey',
    borderWidth:1
  },
  cardButtons: {
  
    backgroundColor: 'white',
    borderRadius: 10,
   alignItems:'center',
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.8, 
    shadowRadius: 3,
    elevation: 12,
    borderColor:'grey',
    borderWidth:1 
  },
  //
  openButton: {
    backgroundColor: '#0981bd',
    padding: 10,
    alignItems: 'center',
    margin: 20,
    borderRadius: 5,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: Colors.secondary,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'white',
    padding: 5,
  },
  scrollViewContent: {
    // paddingBottom: 40,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
  },
  text: {
    color: 'black',
    fontSize: 10,
    marginBottom: 5,
  },
  infoList: {
    marginVertical: 20,
  },
  listItem: {
    color: 'black',
    fontSize: 10,
    marginBottom: 5,
  },
  title: {
    color: Colors.black,
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
  },

  noTextButton: {
    color:'black',
    fontSize: 14,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 14,
  },
  cancelButton:{
 backgroundColor:Colors.primary,
 padding:10,
 width:'25%',
 borderRadius:5,
  alignItems:'center'
  },
noButton:{
backgroundColor:Colors.white,
padding:10,
width:'25%',
borderRadius:5,
alignItems:'center'
},
selectedRb: {
width: 10,
height: 10,
borderRadius: 5,
backgroundColor: '#2c9dd1',
},
  radioContainer: {
   
   justifyContent:'space-between',
    marginHorizontal: 15,
    marginTop:25
},
firstRadioContainer:{
 flexDirection:'row',
 justifyContent:'space-between',
  marginVertical:12,
 alignItems:'center'
},
secondRadioContainer:{
  flexDirection:'row',
  justifyContent:'space-between',
   alignItems:'center'
 },
radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
   
},
radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#2c9dd1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
},

radioText: {
    fontSize: 14,
    color: '#000',
    fontWeight:'500'
},
radioTextCash:{
    fontSize: 12,
    color: 'grey',
},
})


