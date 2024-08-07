import React from 'react';
import { View, Text ,Image, StyleSheet} from 'react-native';
import OTTDarkBackHeader from '../../components/OTTDarkBackHeader';
import { Colors } from '../../assets/colors';
const WeeklyConfirmDriver = ({navigation}) => {
  return (
    <View>
        <OTTDarkBackHeader navigation={navigation}/>
      <Text style={{color:Colors.primary,padding:10,marginTop:10}}>Weekly Driver<Text style={{color:Colors.black,fontWeight:'700'}}> Booked</Text></Text>
      <View style={{backgroundColor:Colors.primary,padding:10,borderRadius:5,marginHorizontal:10 }}>
        <View style={{flexDirection:'row',justifyContent:'space-between',
            backgroundColor:Colors.white,paddingVertical:15,alignItems:'center',borderRadius:5}}>
           <Text style={{color:'red',marginHorizontal:5,fontWeight:'700'}}>1 Days | <Text style={{color:Colors.primary,}}>Rs 1032 | Cash</Text></Text>
           <View style={{flexDirection:'row',alignItems:'center'}}>
           <Image source={require('../../assets/images/carblue.png')} style={styles.iconImage} />
                <Text style={{color:Colors.primary,marginHorizontal:5}}>Manual-Sedan</Text>
            </View>
        </View>
        <Text style={{marginVertical:5,color:Colors.white,fontSize:16}}>Noida</Text>
        <Text style={{marginTop:5}}>13 Jul</Text>
        <View style={{backgroundColor:Colors.secondary,width:'18%',marginVertical:15,alignItems:'center',padding:5,borderRadius:5}}>
            <Text style={{color:Colors.black,fontSize:12}}>435788</Text>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:30}}>
            <View>
                <Text style={{color:Colors.white,fontSize:20}}>Rs 1032 <Text style={{color:Colors.white,fontSize:12}}>12 Hours/day</Text></Text>
            </View>
            <View style={{backgroundColor:Colors.white,borderRadius:3,paddingHorizontal:15,padding:5}}>
                <Text style={{color:Colors.primary}}>Cancel</Text>
            </View>
        </View>
      </View>
    </View>
  );
}

export default WeeklyConfirmDriver;


const styles=StyleSheet.create({
    iconImage: {
        width: 15,
        height: 15,
      },
})
