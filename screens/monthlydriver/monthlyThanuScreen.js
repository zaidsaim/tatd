import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import OTTDarkBackHeader from '../../components/OTTDarkBackHeader';
import { Colors } from '../../assets/colors';
import { Divider } from '@rneui/themed';
const MonthlyThanuScreen = ({navigation}) => {
  return (
    <View style={{flex:1,backgroundColor:Colors.white}}>
          <OTTDarkBackHeader navigation={navigation} />
    <View style={styles.card}>
        <View style={{alignItems:'center',justifyContent:'center'}}>
        <View style={styles.cardImage}>
      <Image
      source={require('../../assets/images/icon_logo.png')}
     resizeMode={'cover'}
    style={styles.image}
    />
    </View>
    </View>
    <View style={styles.viewTatd}>
    <Text style={styles.tatd}>TAT D</Text>
    <Text style={styles.trustedText}>trusted & trained driver</Text>
    </View>
      <View style={styles.cardContent}>
      <View style={styles.viewTatd}>
        <Text style={styles.title}>Thanks, you're all set</Text>
        </View>
        <View style={styles.viewDescription}>
        <Text style={styles.description}>terms of services sent at your email id.</Text>
        <View style={styles.divider} />
        <Text style={styles.descriptionBottom}>One of our representatives will call you soon.</Text>
        </View>
      </View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  card: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
   paddingBottom:30,
    marginTop:50,
    marginHorizontal:18
  },
  image: {
 
    width:25,
    height:25,
    shadowRadius: 1
  },
  cardImage:{
    shadowRadius: 1,
     width:60,
     height:60,
    elevation: 5,
  borderRadius:30,
  alignItems:'center',
    justifyContent:'center',
    backgroundColor:'white',
    marginTop:-20
  },
  cardContent: {
    padding: 15,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.grey,
    width: '100%',
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.black,
  },
  tatd: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 5,
    color: 'grey',
   
  },
  tatdTitle: {
    fontSize: 18,
    fontWeight: '500',
   
    color: Colors.black,
   
  },
  trustedText:{
 color:Colors.secondary,
 fontSize:12
  },
  viewTatd:{
     alignItems:'center',
    justifyContent:'center'
  },
  description: {
    fontSize: 14,
    color: 'grey',
   fontWeight:'400'
  },
  descriptionBottom: {
    fontSize: 12,
    color: Colors.black,
   
  },
  viewDescription:{
 alignItems:'center',
    justifyContent:'center'
  }
});

export default MonthlyThanuScreen;
