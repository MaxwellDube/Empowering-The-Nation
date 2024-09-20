import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, ScrollView } from 'react-native';

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

const ApplyScreen = () => {
  // Define state for storing user input and calculations
  const [name, setName] = useState('');
  const [selectedCourses, setSelectedCourses] = useState<number[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [total, setTotal] = useState<number | null>(null);

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
        <Text style={styles.title}>Apply for Courses</Text>

        <View style={styles.discounts}>
            <Text>• One course – no discount</Text>
            <Text>• Two courses – 5% discount</Text>
            <Text>• Three courses – 10% discount</Text>
            <Text>• More than three courses – 15% discount</Text>
        </View>

        <View style={styles.inputContainer}>
            <TextInput
                placeholder="Enter Your Name"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />

        </View>

        

        <Text>Select Courses:</Text>
        {coursesData.map(course => (
            <TouchableOpacity
            key={course.id}
            onPress={() => handleCourseSelection(course.id)}
            style={[
                styles.courseItem,
                selectedCourses.includes(course.id) && styles.selectedCourse,
            ]}
            >
            <Text>{course.name}</Text>
            <Text>Price: R{course.price}</Text>
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
                <Text>Courses Selected:</Text>
                {selectedCourses.map(id => {
                    const course = coursesData.find(c => c.id === id);
                    return <Text key={id}>{course?.name}</Text>;
                })}
                <Text>Total Fee (with discount & VAT): R{total}</Text>
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
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  discounts: {
    borderRadius: 20,
    padding: 15,
    width: '90%',
    height: 'auto',
    backgroundColor: '#dcdcdc'
  },
  inputContainer: {
    width: '100%',
    height: 65,
    marginTop: 15,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderRadius: 20,
    padding: 15,
    width: '90%',
    height: '100%',
    backgroundColor: '#dcdcdc',
  },
  courseItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
  },
  selectedCourse: {
    backgroundColor: '#d0f0c0',
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
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
    backgroundColor: 'white',
    padding: 35,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 16,
  },
  buttonClose: {
    backgroundColor: 'green',
  },
});

export default ApplyScreen;
