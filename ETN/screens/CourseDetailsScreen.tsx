// CourseDetailsScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
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

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{course.title}</Text>
      <Text style={styles.fees}>Fees: {course.fees}</Text>
      <Text style={styles.details}>{course.content}</Text>
      <View style={styles.BtnContainer}>
        <TouchableOpacity style={styles.contactUsBtn} onPress={() => navigation.navigate("Apply")}>
            <Text>GO</Text>
            
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  fees: {
    fontSize: 18,
    marginBottom: 10,
  },
  details: {
    fontSize: 16,
  },
  BtnContainer: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    position: 'static',
  },
  contactUsBtn: {
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    borderRadius: 15,
    shadowColor: '#000',
    elevation: 3,
    
  }
});
