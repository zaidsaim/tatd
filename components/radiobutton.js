import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Colors,FontSizes  } from '../assets/colors'; // Adjust the path to your Colors file
// Adjust the path to your FontSizes file

const RadioButton = ({ label, checked, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={[styles.radio, checked && styles.radioChecked]}>
        {checked && <View style={styles.radioInner} />}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  radio: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioChecked: {
    borderColor: Colors.primary, // Adjust the color as needed
  },
  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary, // Adjust the color as needed
  },
  label: {
    fontSize: FontSizes.small,
    color: Colors.black,
  },
});

export default RadioButton;
