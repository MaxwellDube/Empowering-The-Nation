import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView, TextInput, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../screens/RootStackParams';

export interface CourseDetails {
    
    title: string;
    fees: string;
    purpose: string;
    content: string[];
  }


type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  // Data for the courses
  const sixMonthCourses: CourseDetails[] = [
    { 
      title: 'First Aid', 
      fees: 'R1500', 
      purpose: 'To provide first aid awareness and basic life support',
      content: [
        'Wounds and bleeding',
        'Burns and fractures',
        'Emergency scene management',
        'Cardio-Pulmonary Resuscitation (CPR)',
        'Respiratory distress e.g., Choking, blocked airway',
      ]
    },
    { 
      title: 'Sewing', 
      fees: 'R1500', 
      purpose: 'To provide alterations and new garment tailoring services',
      content: [
        'Types of stitches',
        'Threading a sewing machine',
        'Sewing buttons, zips, hems and seams',
        'Alterations',
        'Designing and sewing new garments',
      ]
    },
    { 
      title: 'Landscaping', 
      fees: 'R1500', 
      purpose: 'To provide landscaping services for new and established gardens',
      content: [
        'Indigenous and exotic plants and trees',
        'Fixed structures (fountains, statues, benches, tables, built-in braai)',
        'Balancing of plants and trees in a garden',
        'Aesthetics of plant shapes and colours',
        'Garden layout',
      ]
    },
    { 
      title: 'Life Skills', 
      fees: 'R1500', 
      purpose: 'To provide skills to navigate basic life necessities',
      content: [
        'Opening a bank account',
        'Basic labour law (know your rights)',
        'Basic reading and writing literacy',
        'Basic numeric literacy',
      ]
    },
  ];

  const sixWeekCourses: CourseDetails[] = [
    { 
      title: 'Child Minding', 
      fees: 'R750', 
      purpose: 'To provide basic child and baby care',
      content: [
        'Birth to six-month old baby needs',
        'Seven-month to one year old needs',
        'Toddler needs',
        'Educational toys',
      ]
    },
    { 
      title: 'Cooking', 
      fees: 'R750', 
      purpose: 'To prepare and cook nutritious family meals',
      content: [
        'Nutritional requirements for a healthy body',
        'Types of protein, carbohydrates and vegetables',
        'Planning meals',
        'Preparation and cooking of meals',
      ]
    },
    { 
      title: 'Garden Maintenance', 
      fees: 'R750', 
      purpose: 'To provide basic knowledge of watering, pruning and planting in a domestic garden',
      content: [
        'Water restrictions and the watering requirements of indigenous and exotic plants',
        'Pruning and propagation of plants',
        'Planting techniques for different plant types',
      ]
    },
  ];

  const renderCourseItem = ({ item }: { item: CourseDetails }) => (
    <TouchableOpacity
      style={styles.courseItem}
      onPress={() => navigation.navigate('CourseDetails', { course: item })}
    >
      <Text style={styles.courseTitle}>{item.title}</Text>
      <Text style={styles.courseFees}>Fees: {item.fees}</Text>
      <Text style={styles.courseDescription}>{item.purpose}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView>
        <View style={styles.container}>
            <View style={styles.hero}>
                <Image style={styles.image} source = {require('../assets/books_1.jpg')} />
            </View>
            <View style={styles.searchbarContainer}> 
                <TextInput placeholder='Search' style={styles.searchbar}>
                    

                </TextInput>
            </View>
            
            <Text style={styles.heading}>Empowering the Nation</Text>
            
            <Text style={styles.description}>
                Empowering the Nation offers the following six-month courses:
            </Text>
            <FlatList
                data={sixMonthCourses}
                renderItem={renderCourseItem}
                keyExtractor={(item) => item.title}
                horizontal={true}  // Set the FlatList to scroll horizontally
                showsHorizontalScrollIndicator={false}  // Hide the horizontal scroll indicator
                contentContainerStyle={styles.flatListContainer}  // Optional: Style the FlatList container
            />

            <Text style={styles.description}>
                Empowering the Nation also offers the following six-week short courses:
            </Text>
            <FlatList
                data={sixWeekCourses}
                renderItem={renderCourseItem}
                keyExtractor={(item) => item.title}
                horizontal={true}  // Set the FlatList to scroll horizontally
                showsHorizontalScrollIndicator={false}  // Hide the horizontal scroll indicator
                contentContainerStyle={styles.flatListContainer}  // Optional: Style the FlatList container
            />
            

        
        </View>

    </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    
  },
  heading: {
    fontFamily: 'Iowan Old Style',
    marginTop: 15,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  hero: {
    width: '100%',
    height: 200,
    borderRadius: 15,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 15,

  },
  searchbarContainer: {
    width: '100%',
    height: 65,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchbar: {
    borderRadius: 20,
    padding: 15,
    width: '90%',
    height: '100%',
    backgroundColor: '#dcdcdc',
  },
  description: {
    width: '90%',
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  courseItem: {
    backgroundColor: '#dcdcdc',
    borderRadius: 15,
    padding: 15,
    marginRight: 10,  
    shadowColor: '#d4ffd3',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
    width: 200,  
    marginBottom: 20,
  },
  courseTitle: {
    
    fontSize: 18,
    fontWeight: '600',
    marginTop: 15,
  },
  courseFees: {
    fontSize: 16,
    marginBottom: 5,
  },
  courseDescription: {
    fontSize: 14,
    color: '#555',
  },
  flatListContainer: {
    paddingHorizontal: 5,  
  },
 

});
