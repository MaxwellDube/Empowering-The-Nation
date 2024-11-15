import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from '../screens/RootStackParams'

    
export interface CourseDetails {
    title: string;
    fees: string;
    purpose: string;
    content: string[];
  }

type CourseDetailsScreenRouteProp = RouteProp<RootStackParamList, 'CourseDetails'>;
type CourseDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CourseDetails'>;

export default function CourseDetailsScreen() {
  const navigation = useNavigation<CourseDetailsScreenNavigationProp>();
  const route = useRoute<CourseDetailsScreenRouteProp>();
  const course = route.params.course;
  const [selectedScreen, setSelectedScreen] = useState<string | null>(null);

  const handleScreenChange = (value: string) => {
    setSelectedScreen(value);
    if (value) {
      navigation.navigate(value as keyof RootStackParamList); // Type assertion here
    }
  };

  return (
    <ScrollView style={styles.scroll}>
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
        <View style={styles.card}>
          <Text style={styles.title}>{course.title}</Text>
          <View style={styles.BtnContainer}>
            <Text style={styles.fees}>Price:  {course.fees}</Text>
            <TouchableOpacity style={styles.ApplyBtn} onPress={() => navigation.navigate("Apply")}>
                <Text style={styles.details}>Apply Now</Text> 
            </TouchableOpacity>
          </View> 
          <Text style={styles.fees}>Content:</Text>
          <Text style={styles.details}>{course.content}</Text>
        </View>
        <View style={styles.BackBtnContainer}>
            <TouchableOpacity style={styles.BackBtn} onPress={() => navigation.goBack()}>
                <Text style={styles.details}>Back</Text> 
            </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    padding: 20,
    backgroundColor: "#0d2e09",
  },
  container: {
    flex: 1,
    padding: 5,
  },
  picker: {
    height: 50,
    width: '40%',
    color: '#fff',
    backgroundColor: '#7BD859',
    marginVertical: 20,
  },
  card: {
    marginTop: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    color: '#fff',
    padding: 10,
    borderRadius: 10,
    height: 400,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  fees: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  details: {
    color: '#fff',
    fontSize: 16,
  },
  BtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ApplyBtn: {
    width: 100,
    height: 40,
    color: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7BD859',
    borderRadius: 15,
    shadowColor: '#000',
    elevation: 3,
  },
  BackBtnContainer: {
    marginTop: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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
});
