

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import OTTHeader from '../../components/OTTHeader';
import { Divider, Image } from '@rneui/base';
import { Colors, FontSizes, FontWeights, Paddings, Margins, BorderRadius, BorderWidths } from '../../assets/colors';
import DropShadow from 'react-native-drop-shadow';
import { validateAccessToken, refreshAccessToken } from '../../utils/validation';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchzoneApi } from '../../api/services/apiService';

const { width } = Dimensions.get('window');
const containerWidth = width * 0.4;

const SelectYourZone = ({ navigation, route }) => {
  const { selectedItem, navcheck } = route.params;
  const [zone, setZones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [condition, setCondition] = useState(navcheck); // Use navcheck to set the initial condition

  const handleNavigation = (item) => {
    switch (condition) {
      case 'A':
        navigation.navigate('booking', { selectedzone: item });
        break;
      case 'B':
        navigation.navigate('outstationbooking', { selectedzone: item });
        break;
      case 'C':
        navigation.navigate('monthlybooking', { selectedzone: item });
        break;
      case 'D':
        navigation.navigate('weeklybooking', { selectedzone: item });
        break;
      default:
        console.error('Unknown condition:', condition);
    }
  };
  useEffect(() => {
    fetchZoneData(selectedItem);
  }, [selectedItem]);
  
  const fetchZoneData = async (selectedItem) => {
    setLoading(true);
    const isValid = await validateAccessToken();
    if (!isValid) {
      await refreshAccessToken();
    }
    try {
      const cityResponse = await fetchzoneApi(selectedItem);
      console.log('Zone Data:', cityResponse);
      setZones(cityResponse?.zones || cityResponse?.zone_lists || []);
      setLoading(false);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {
        loading ? (
          <View style={styles.loadingView}>
            <ActivityIndicator size="small" color={Colors.primary} />
          </View>
        ) : (
          <View>
            <OTTHeader navigation={navigation} title="Trusted & Trained Driver" />
            <ScrollView>
              <View style={styles.innerContainer}>
                <View style={styles.headerContainer}>
                  <View style={[styles.textDividerContainer, { width: containerWidth }]}>
                    <Text style={styles.headerText}>Select Your Zone</Text>
                    <Divider width={2} color={Colors.primary} style={styles.divider} />
                  </View>
                  {
                    zone.map((item) => (
                      <DropShadow
                        key={item.id}
                        style={{
                          shadowColor: '#171717',
                          shadowOffset: { width: 2, height: 6 },
                          shadowOpacity: 0.2,
                          shadowRadius: 3,
                          elevation: 20,
                        }}
                      >
                        <TouchableOpacity style={styles.item} onPress={() => handleNavigation(item)}>
                          <Text style={styles.text}>{item}</Text>
                          <Image source={require('../../assets/images/arrow-right-tatd.png')} style={{ width: 15, height: 15 }} />
                        </TouchableOpacity>
                      </DropShadow>
                    ))
                  }
                </View>
              </View>
            </ScrollView>
          </View>
        )
      }
    </View>
  );
};

export default SelectYourZone;

const styles = StyleSheet.create({
  loadingView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  innerContainer: {
    flex: 1,
    ...Margins.m.m20,
    ...BorderWidths.bw.bw2,
    borderColor: Colors.primary,
    ...BorderRadius.br10,
    ...Margins.mv.mv50,
  },
  headerContainer: {
    ...Paddings.p.p10,
    borderColor: Colors.primary,
    ...Margins.mv.mv40,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...Paddings.p.p15,
    ...Margins.mv.mv8,
    ...BorderWidths.bw.bw1,
    borderColor: '#ccc',
    ...BorderRadius.br8,
    ...Margins.mh.mh20,
    backgroundColor: Colors.primary,
    alignItems: 'center',
  },
  text: {
    fontSize: FontSizes.tinymedium,
    color: Colors.white,
    fontWeight: FontWeights.semiBold,
  },
  textDividerContainer: {
    alignItems: 'center',
    ...Margins.mh.mh20,
    ...Margins.mb.mb10,
  },
  headerText: {
    fontSize: FontSizes.body,
    color: Colors.primary,
    textAlign: 'center',
    width: '100%',
    fontWeight: FontWeights.bold,
  },
  divider: {
    ...Margins.mt.mt10,
    width: '100%',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
