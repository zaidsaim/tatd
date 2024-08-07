import React from 'react';
import { View, Text, StyleSheet,ScrollView, Image, TouchableOpacity } from 'react-native';
import OTTHeader from '../../components/OTTHeader';
import { Colors, FontSizes } from '../../assets/colors';
import DropShadow from "react-native-drop-shadow";
const DriverTermsScreen = ({ navigation }) => {
  return (
    <ScrollView style={{ flex: 1 ,backgroundColor:Colors.white}}>
      <OTTHeader navigation={navigation} title={'trusted & trained driver'} />
      <View style={styles.loginContainer}>
      <View style={styles.header}>
          <View style={styles.roudtripcontainer}>
            <Text style={styles.roudtripText}>
              Trusted & Trained Driver
            </Text>
            <View style={styles.iconContainer}>
              <Image
                source={require('../../assets/images/rt_icon.png')}
                resizeMode={'cover'}
                style={styles.icon}
              />
            </View>
          </View>
          <View style={styles.loginTextContainer}>
            <Text style={styles.loginText}>Terms & Conditions</Text>
          </View>
        </View>
        </View>
          <View style={{ flex: 1 }}>
            <View style={{marginVertical:15}}>
          <Text style={styles.textterms}>We provide dedicated & experienced drivers from the nearby</Text>
         <View style={{flexDirection:'row',marginHorizontal:15}}>
          <Text style={{fontSize:FontSizes.small,color:Colors.black,}}>areas to operate</Text>
          <Text style={{color:Colors.black,fontSize:FontSizes.xsmall,fontWeight:'800'}}> Manual/Automatic & Hatchback/ Sedan/</Text>
          </View>
          <View style={{flexDirection:'row',marginHorizontal:15}}>
          <Text style={{fontSize:FontSizes.xsmall,color:Colors.black,fontWeight:'800'}}>SUV.</Text>
          <Text style={{fontSize:FontSizes.small,color:Colors.black,}}> The salary of drivers is based on the skillset, experience,</Text>
          </View>
            <Text style={styles.textterms}>working days, Hours of usage. We shortlist candidates as per</Text>
            <Text style={styles.textterms}>Custome preferesnce & send them for trial. Kindly</Text>
            <Text style={styles.textterms}>acknowledge the below terms of services to proceed further.</Text>
            </View>
         <Text style={{color:'blacl',fontSize:FontSizes.tinymedium,marginHorizontal:15,marginBottom:5}}>Benefits</Text>
         <Text style={styles.textterms}>1. 12 Months Replacement Period</Text>
         <Text style={styles.textterms}>2. Replacement in 2 days</Text>
         <Text style={styles.textterms}>3. Background Verified | Trained Driver</Text>
         <Text style={styles.textterms}>4. Exclusive Customer Support</Text>
         <Text style={styles.textterms}>5. GST Input Tax Credit</Text>
         <Text style={{color:Colors.black,fontSize:FontSizes.tinymedium,margin:15,marginBottom:25}}>Terms of services</Text>
         <View style={{flexDirection:'row',marginHorizontal:15}}>
         <Text style={{fontSize:FontSizes.small,color:Colors.black}}>Charges for the services are</Text>
          <Text  style={{fontSize:FontSizes.small,color:Colors.black,fontWeight:'800'}}> Rs 5000 </Text>
          <Text  style={{fontSize:FontSizes.small,color:Colors.black}}> for scouting drivers for</Text>
          </View>
          <View style={{flexDirection:'row',marginHorizontal:15}}>
         <Text style={{fontSize:FontSizes.small,color:Colors.black}}>you as per the requirment</Text>
         <Text style={{fontSize:FontSizes.xsmall,color:Colors.black,fontWeight:'800'}}> Payment is to be made within 3</Text>
         </View>
         <View style={{flexDirection:'row',marginHorizontal:15}}>
         <Text style={{fontSize:FontSizes.xsmall,color:Colors.black,fontWeight:'800'}}>days of starting services.</Text>
          <Text style={{fontSize:FontSizes.small,color:Colors.black}}>We provide a replacement period of</Text>
          </View>
         <Text style={styles.textterms}>12 months in which you can replace your driver thricely.</Text>
       
         <View style={{marginBottom:10}}>
         <Text style={styles.textterms}>if in case of driver got the better opportunity or he doesn't</Text>
         <Text style={styles.textterms}>want to operate with you, we provide a replacement of driver</Text>
         <Text style={styles.textterms}>within 48 Hour's</Text>
         </View>
         <View style={{marginBottom:10}}>
         <Text style={styles.textterms}>Court Record, License, Aadhar verification report of the driver</Text>
         <Text style={styles.textterms}>will be submitted to you.</Text>
         </View>
         <View>
         <Text style={styles.textterms}>In case of any damage to the vehicle or any violation of traffic</Text>
         <Text style={styles.textterms}>laws or any unlawful activity performed by the driver against</Text>
         <Text style={styles.textterms}>the indian constitution, The information must be reported to</Text>
         <Text style={styles.textterms}>support@tatd.in by the customer in writing at the same time</Text>
         <Text style={styles.textterms}>of the incident. Charges will be recovered from the driver's</Text>
         <Text style={styles.textterms}>payout up to Rs 2000. tat d will not be responsible in case of</Text>
         <Text style={styles.textterms}>delayed challans or delayed reporting cases by customers.</Text>
         </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20,marginVertical:30 ,marginTop:50}}>
              <DropShadow style={{
                shadowColor: '#171717',
                shadowOffset: { width: 2, height: 6 },
                shadowOpacity: 0.2,
                shadowRadius: 3, elevation: 20,
              }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ justifyContent: 'center', backgroundColor: '#16588e', alignItems: 'center', padding: 10, borderRadius: 5, paddingHorizontal: 20, width: '80%', }}>
                  <Text style={{ color: Colors.white, fontSize: FontSizes.tinymedium, paddingHorizontal: 20, fontWeight: '700' }}>Close</Text>
                </TouchableOpacity>
              </DropShadow>
            </View>
          </View>
    </ScrollView>
  );
};

export default DriverTermsScreen;

const styles = StyleSheet.create({

  loginContainer: {
    marginTop: 15,
    marginHorizontal:15,
    borderRadius:2 ,
  },
  header: {
    backgroundColor: Colors.primary,
    height: 100,
    justifyContent: 'space-between',
    borderRadius:7 ,
    borderColor:Colors.primary,
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
    marginLeft:5
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
    marginBottom:10,
  },
  loginText: {
    color: Colors.white,
    fontWeight:'400',
    fontSize:FontSizes.xlarge
  },
  textterms:{
    fontSize:FontSizes.small,
    color:Colors.black,
    marginHorizontal:15
   }
});





