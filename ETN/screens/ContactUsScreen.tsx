import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../screens/RootStackParams' 

type ContactUsNavigationProp = StackNavigationProp<RootStackParamList, 'ContactUs'>;


export default function ContactUsScreen() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [selectedScreen, setSelectedScreen] = useState<string | null>(null);
  const navigation = useNavigation<ContactUsNavigationProp>();

  const handleFormSubmit = () => {
    console.log(`Name: ${name}, Message: ${message}`);
    alert('Message sent successfully!');
  };

  const handleScreenChange = (value: string) => {
    setSelectedScreen(value);
    if (value) {
      navigation.navigate(value as keyof RootStackParamList); // Type assertion here
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Dropdown for navigating to different screens */}
        <Picker
          selectedValue={selectedScreen}
          onValueChange={(itemValue) => handleScreenChange(itemValue as string)}
          style={styles.picker}
        >
          <Picker.Item label="MENU" value={null} />
          <Picker.Item label="Home" value="Home" />
          <Picker.Item label="Contact Us" value="ContactUs" />
          <Picker.Item label="Apply" value="Apply" />
        </Picker>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Contact Us</Text>
          <TouchableOpacity style={styles.BackBtn} onPress={() => navigation.goBack()}>
              <Text style={styles.text}>Back</Text>    
          </TouchableOpacity>
        </View>
        <View style={styles.card}>
          <Text style={styles.heading}>Phone Number: 063 456 3818</Text>
          <Text style={styles.heading}>Email Address: ETN@Gmail.com</Text>
          <Text style={styles.heading}>Physical Address: The Quadrant, 146 Campground Rd, Newlands, Cape Town, 7708</Text>

        </View>
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
        <View style={styles.SendMsgBtnContainer}>
          <TouchableOpacity style={styles.SendMsgBtn} onPress={() => navigation.navigate("ContactUs")}>
              <Text style={{color: '#fff'}}>Send Message</Text>       
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#0d2e09",
  },
  picker: {
    height: 40,
    width: '40%',
    color: '#fff',
    backgroundColor: '#7BD859',
    marginVertical: 20,
  },

  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  BackBtn: {
    width: 100,
    height: 40,
    color: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D14B4D',
    borderRadius: 15,
    shadowColor: '#000',
    elevation: 3,
   },
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  text: {
    color: '#fff',
  },
  card: {
    marginTop: 0,
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    color: '#fff',
    padding: 10,
    borderRadius: 10,
    height: 300,
  },
  heading: 
  { fontSize: 24, 
    color: '#fff',
    fontWeight: 'bold', 
    marginBottom: 20,
  },
  label: { 
    color: '#fff',
    fontSize: 16, 
    marginBottom: 10 
  },
  input: 
  { height: 40, 
    borderRadius: 10,
    borderColor: 'gray', 
    borderWidth: 1, 
    marginBottom: 20, 
    paddingLeft: 8 
  },

  SendMsgBtnContainer: {
    marginTop: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  SendMsgBtn: {
    width: 200,
    height: 40,
    color: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7BD859',
    borderRadius: 15,
    shadowColor: '#000',
    elevation: 3,
  },
});
