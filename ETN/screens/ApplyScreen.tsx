import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from './RootStackParams';
import { StackNavigationProp } from '@react-navigation/stack';

// Define the available courses
const coursesData = [
  { id: 1, name: 'First Aid', price: 1500 },
  { id: 2, name: 'Sewing', price: 1500 },
  { id: 3, name: 'Landscaping', price: 1500 },
  { id: 4, name: 'Life Skills', price: 1500 },
  { id: 5, name: 'Child Minding', price: 750 },
  { id: 6, name: 'Cooking', price: 750 },
  { id: 7, name: 'Garden Maintenance', price: 750 },
];

type CourseDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Apply'>;

const ApplyScreen = () => {
  // Define state for storing user input and calculations
  const [name, setName] = useState('');
  const [selectedCourses, setSelectedCourses] = useState<number[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [total, setTotal] = useState<number | null>(null);
  const navigation = useNavigation<CourseDetailsScreenNavigationProp>();

  // Toggle course selection
  const handleCourseSelection = (courseId: number) => {
    setSelectedCourses(prev =>
      prev.includes(courseId) ? prev.filter(id => id !== courseId) : [...prev, courseId]
    );
  };

  // Calculate total fee with discount and VAT
  const calculateTotal = () => {
    let totalFee = 0;
    selectedCourses.forEach(id => {
      const course = coursesData.find(c => c.id === id);
      if (course) totalFee += course.price;
    });

    let discount = 0;
    if (selectedCourses.length === 2) discount = 0.05;
    else if (selectedCourses.length === 3) discount = 0.1;
    else if (selectedCourses.length > 3) discount = 0.15;

    const discountedFee = totalFee - (totalFee * discount);
    const finalTotal = discountedFee + (discountedFee * 0.15); // Add 15% VAT
    setTotal(finalTotal);
    setModalVisible(true);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Apply for Courses</Text>
          <TouchableOpacity style={styles.BackBtn} onPress={() => navigation.navigate("Home")}>
              <Text style={styles.text}>Back</Text>
                
          </TouchableOpacity>
        </View>
        

        <View style={styles.inputContainer}>
          <View style={styles.discounts}>
              <Text style={styles.text}>• One course – no discount</Text>
              <Text style={styles.text}>• Two courses – 5% discount</Text>
              <Text style={styles.text}>• Three courses – 10% discount</Text>
              <Text style={styles.text}>• More than three courses – 15% discount</Text>
          </View>
        </View>

        <Text style={styles.title} >Select Courses:</Text>
        {coursesData.map(course => (
            <TouchableOpacity
            key={course.id}
            onPress={() => handleCourseSelection(course.id)}
            style={[
                styles.courseItem,
                selectedCourses.includes(course.id) && styles.selectedCourse,
            ]}
            >
            <Text style={styles.text}>{course.name}</Text>
            <Text style={styles.text}>Price: R{course.price}</Text>
            </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.button} onPress={calculateTotal}>
            <Text style={styles.buttonText}>Calculate Fee</Text>
        </TouchableOpacity>

        {/* Modal to display the total fee */}
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalView}>
                <Text style={styles.modalText}>Name: {name}</Text>
                <Text style={styles.modalText}>Courses Selected:</Text>
                {selectedCourses.map(id => {
                    const course = coursesData.find(c => c.id === id);
                    return <Text style={styles.courseItem} key={id}>{course?.name}</Text>;
                    
                })}
                <Text style={styles.modalText}>Total Fee (with discount & VAT): R{total}</Text>
                <TouchableOpacity
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(false)}
                >
                    <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
            </View>
        </Modal>
      </View>

    </ScrollView>
    
  );
};

// Styles for the screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#0d2e09",
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'

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
  discounts: {
    borderRadius: 20,
    margin: 10,
    padding: 15,
    width: '90%',
    height: 'auto',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  inputContainer: {
    width: '100%',
    marginTop: 15,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  courseItem: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  selectedCourse: {
    backgroundColor: '#d0f0c0',
  },
  button: {
    backgroundColor: '#7BD859',
    padding: 10,
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    backgroundColor: "#0d2e09",
    padding: 35,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 16,
  },
  buttonClose: {
    backgroundColor: '#7BD859',
  },
});

export default ApplyScreen;
