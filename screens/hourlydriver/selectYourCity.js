

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import OTTHeader from '../../components/OTTHeader';
import { Colors, FontSizes, FontWeights, Paddings, Margins, BorderRadius, BorderWidths } from '../../assets/colors';
import DropShadow from "react-native-drop-shadow";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { validateAccessToken, refreshAccessToken } from '../../utils/validation';
import { fetchcityApi } from '../../api/services/apiService';
const { width } = Dimensions.get('window');
const numColumns = 2;
const buttonWidth = (width - 40) / numColumns;

const SelectYourCity = ({ navigation ,route}) => {
  const [cityData, setCityData] = useState([]);
  const [newStatesData, setNewStatesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {navcheck} = route?.params
  console.log('navcheck==============',navcheck)
  useEffect(() => {
    fetchDataSelect();
  }, []);


  const fetchDataSelect = async () => {
    setLoading(true);
    const isValid = await validateAccessToken();
    if (!isValid) {
      await refreshAccessToken();
    }
    try {
      const cityResponse = await fetchcityApi();
      setCityData(cityResponse.popular_cities || []);
      setNewStatesData(cityResponse.popular_states || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePress = async (item) => {
    try {
      await AsyncStorage.setItem('selectcityitem', item);
  
      if (navcheck === 'A' && (item === 'Bangalore' || item === 'Pune' || item === 'Hyderabad')) {
        navigation.navigate('booking', { selectedItem: item, navcheck: navcheck });
      } else if (navcheck === 'B' && (item === 'Bangalore' || item === 'Pune' || item === 'Hyderabad')) {
        navigation.navigate('outstationbooking', { selectedItem: item, navcheck: navcheck });
      } else if (navcheck === 'C' && (item === 'Bangalore' || item === 'Pune' || item === 'Hyderabad')) {
        navigation.navigate('monthlybooking', { selectedItem: item, navcheck: navcheck });
      } else if (navcheck === 'D' && (item === 'Bangalore' || item === 'Pune' || item === 'Hyderabad')) {
        navigation.navigate('weeklybooking', { selectedItem: item, navcheck: navcheck });
      } else {
        navigation.navigate('hourlyzone', { selectedItem: item, navcheck: navcheck });
      }
    } catch (error) {
      console.error('Error storing selected item:', error);
    }
  };
  

  const ButtonItem = ({ title, onPress }) => (
    <DropShadow style={{
      shadowColor: '#171717',
      shadowOffset: { width: 2, height: 6 },
      shadowOpacity: 0.2,
      shadowRadius: 3, elevation: 3,
    }}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </DropShadow>
  );

  const renderCityItem = ({ item }) => <ButtonItem title={item} onPress={() => handlePress(item)} />;
  const renderStateItem = ({ item }) => <ButtonItem title={item} onPress={() => handlePress(item)} />;

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: Colors.white }}>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="small" color={Colors.primary} />
        </View>
      ) : (
        <View>
          <OTTHeader navigation={navigation} title={'trusted & trained driver'} />
          <Text style={styles.sectionHeader}>Popular Cities</Text>
          <FlatList
            data={cityData}
            renderItem={renderCityItem}
            keyExtractor={item => (item.city_id ? item.city_id.toString() : Math.random().toString())}
            numColumns={numColumns}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.container}
          />
          <Text style={styles.sectionHeader}>Newly Added States</Text>
          <FlatList
            data={newStatesData}
            renderItem={renderStateItem}
            keyExtractor={item => (item.state_id ? item.state_id.toString() : Math.random().toString())}
            numColumns={numColumns}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.container}
          />
        </View>
      )}
    </ScrollView>
  );
}

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
  sectionHeader: {
    color: Colors.darkblue,
    fontSize: FontSizes.xlarge,
    fontWeight: FontWeights.bold,
    ...Margins.mt.mt20,
    ...Margins.mh.mh15,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:'100%'
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
  },
});

export default SelectYourCity;
