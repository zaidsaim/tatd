
import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions, ScrollView, } from 'react-native';
import OTTHeader from '../../components/OTTHeader';
import { Colors, FontSizes } from '../../assets/colors';
import DropShadow from "react-native-drop-shadow";
import { popularData,newStates } from '../../utils/data';
const { width } = Dimensions.get('window');
const numColumns = 2;
const buttonWidth = (width - 40) / numColumns;
const MonthlyCityDriverScreen = ({ navigation }) => {
  const ButtonItem = ({ title }) => (
    <DropShadow style={{
      shadowColor: '#171717',
      shadowOffset: { width: 2, height: 6 },
      shadowOpacity: 0.2,
      shadowRadius: 3, elevation: 3,
    }}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('monthlyzone')}>
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
          <Text style={{ color: Colors.darkblue,fontSize:FontSizes.xlarge, fontWeight: 'bold', marginTop: 20, marginHorizontal: 15 }}>Popular Cities</Text>
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
          <Text style={{ color: Colors.darkblue,fontSize:FontSizes.xlarge, fontWeight: 'bold', marginTop: 20, marginHorizontal: 15 }}>Newly Added States</Text>
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

export default MonthlyCityDriverScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    width: buttonWidth,
    height: 60,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    color: Colors.black,
    margin: 5,
  },
  buttonText: {
    color: Colors.black,
    fontSize: FontSizes.small,
  },
});







