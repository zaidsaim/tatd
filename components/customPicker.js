import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import RadioButton from './radiobutton';
import { Colors,FontSizes } from '../assets/colors'; // Adjust the path to your FontSizes file
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the icon library

const CustomPicker = ({ selectedValue, onValueChange, items }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (value) => {
    onValueChange(value);
    setModalVisible(false);
  };

  
  return (
    <View style={styles.pickerContainer}>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.pickerButton}>
        <Text style={styles.pickerButtonText}>
          {selectedValue || 'Select Date'}
        </Text>
        <Icon name="chevron-down" size={20} color={Colors.black} style={styles.icon} />
      </TouchableOpacity>
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={items}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <RadioButton
                  label={item.label}
                  checked={selectedValue === item.value}
                  onPress={() => handleSelect(item.value)}
                />
              )}
            />
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    color: Colors.black,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 20,
  },
  pickerButton: {
    padding: 15,
    backgroundColor: Colors.lightGray,
    borderRadius: 5,
    width: 300, // Adjust the width as needed
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pickerButtonText: {
    fontSize: FontSizes.small,
    color: Colors.black,
  },
  icon: {
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 20,
  },
  closeButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  closeButtonText: {
    color: Colors.primary,
    fontSize: FontSizes.small,
  },
});

export default CustomPicker;
