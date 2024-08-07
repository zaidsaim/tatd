import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CheckScrren = () => {
  const questions = [
    {
      question: 'How can I reschedule my booking?',
      answer: 'To reschedule your booking, you can contact customer support or use the booking portal.'
    },
    {
      question: 'How can I modify my package?',
      answer: 'To modify your package, please visit the package options on our website or app.'
    },
    {
      question: 'How can I change my driver?',
      answer: 'You can change your driver by contacting our support team through the app.'
    },
    {
      question: 'How can I cancel my booking?',
      answer: 'To cancel your booking, go to your booking details and select "Cancel".'
    },
    {
      question: 'How can I get a refund?',
      answer: 'Refunds can be requested through the support section in our app or website.'
    }
  ];

  const Question = ({ question, answer }) => {
    const [isTextVisible, setIsTextVisible] = useState(false);

    const toggleTextVisibility = () => {
      setIsTextVisible(!isTextVisible);
    };

    return (
      <View style={styles.questionContainer}>
        <TouchableOpacity onPress={toggleTextVisibility} style={styles.iconContainer}>
          <Icon name={isTextVisible ? 'expand-less' : 'expand-more'} size={30} color="#000" />
          <Text style={styles.questionText}>{question}</Text>
        </TouchableOpacity>
        {isTextVisible && <Text style={styles.answerText}>{answer}</Text>}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {questions.map((item, index) => (
        <Question key={index} question={item.question} answer={item.answer} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  questionContainer: {
    marginBottom: 20,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  questionText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
  },
  answerText: {
    marginTop: 10,
    fontSize: 14,
    color: 'red',
  },
});

export default CheckScrren;
