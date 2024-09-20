import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../screens/RootStackParams' 

type ContactUsNavigationProp = StackNavigationProp<RootStackParamList, 'ContactUs'>;

export default function ContactUsScreen() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleFormSubmit = () => {
    console.log(`Name: ${name}, Message: ${message}`);
    alert('Message sent successfully!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Contact Us</Text>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
      />

      <Text style={styles.label}>Message:</Text>
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="Enter your message"
        multiline
      />

      <Button title="Send Message" onPress={handleFormSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  label: { fontSize: 16, marginBottom: 10 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingLeft: 8 },
});
