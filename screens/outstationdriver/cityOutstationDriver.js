import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions, ScrollView, } from 'react-native';
import OTTHeader from '../../components/OTTHeader';
import { Colors, FontSizes, FontWeights ,Paddings,Margins,BorderRadius,BorderWidths} from '../../assets/colors';
import DropShadow from "react-native-drop-shadow";
import { popularData, newStates } from '../../utils/data';
const { width } = Dimensions.get('window');
const numColumns = 2;
const buttonWidth = (width - 40) / numColumns;

//zoneoutstationdriver
const CityOutstationDriver = ({ navigation }) => {
  const ButtonItem = ({ title }) => (
    <DropShadow style={{
      shadowColor: '#171717',
      shadowOffset: { width: 2, height: 6 },
      shadowOpacity: 0.2,
      shadowRadius: 3, elevation: 3,
    }}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('zoneoutstationdriver')}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </DropShadow>
  );

  //   <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('zone')}>
  //   <Text style={styles.buttonText}>{title}</Text>
  // </TouchableOpacity>
  const popularCities = ({ item }) => {
    return (
      <ButtonItem title={item.title} />
    )
  }
  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <OTTHeader navigation={navigation} title={'trusted & trained driver'} />
      <ScrollView style={{ flex: 1, }}>
        <View>
          <Text style={{ color: Colors.darkblue, fontSize: FontSizes.xlarge, fontWeight: FontWeights.bold, ...Margins.mt.mt20, ...Margins.mh.mh15 }}>Popular Cities</Text>
        </View>
        <FlatList
          data={popularData}
          renderItem={popularCities}
          keyExtractor={item => item.id}
          numColumns={numColumns}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.container}
        />
        <View>
          <Text style={{ color: Colors.darkblue, fontSize: FontSizes.xlarge, fontWeight: FontWeights.bold, ...Margins.mt.mt20, ...Margins.mh.mh15 }}>Newly Added States</Text>
          <FlatList
            data={newStates}
            renderItem={popularCities}
            keyExtractor={item => item.id}
            numColumns={numColumns}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.container}
          />
        </View>
      </ScrollView>
    </View>
  );
}
export default CityOutstationDriver;
const styles = StyleSheet.create({
  container: {
   ...Paddings.p.p10,
  },
  row: {
    justifyContent: 'space-between',
    ...Margins.mb.mb10,
  },
  button: {
    width: buttonWidth,
    height: 60,
    backgroundColor: Colors.white,
   ...BorderWidths.bw.bw1,
    borderColor: Colors.grey,
  ...BorderRadius.br5,
    alignItems: 'center',
    justifyContent: 'center',
    color: Colors.black,
    ...Margins.m.m5,
  },
  buttonText: {
    color: Colors.black,
    fontSize: FontSizes.small,
  },
});
