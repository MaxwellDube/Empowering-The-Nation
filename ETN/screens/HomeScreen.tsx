import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView, Image, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../screens/RootStackParams';

export interface CourseDetails {
  title: string;
  fees: string;
  purpose: string;
  content: string[];
  backgroundImage: any;
}


type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [selectedScreen, setSelectedScreen] = useState<string | null>(null);

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
      ],
      backgroundImage: require('../assets/first-aid.jpg') // Add this
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
      ],
      backgroundImage: require('../assets/Sewing.jpg') // Add this
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
      ],
      backgroundImage: require('../assets/Landscaping.jpg') // Add this
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
      ],
      backgroundImage: require('../assets/books_1.jpg') // Add this
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
      ],
      backgroundImage: require('../assets/child-minding.jpg') // Add this
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
      ],
      backgroundImage: require('../assets/cooking.jpg') // Add this
    },
    { 
      title: 'Garden Maintenance', 
      fees: 'R750', 
      purpose: 'To provide basic knowledge of watering, pruning and planting in a domestic garden',
      content: [
        'Water restrictions and the watering requirements of indigenous and exotic plants',
        'Pruning and propagation of plants',
        'Planting techniques for different plant types',
      ],
      backgroundImage: require('../assets/gardening.jpg') // Add this
    },
  ];

  const handleScreenChange = (value: string) => {
    setSelectedScreen(value);
    if (value) {
      navigation.navigate(value as keyof RootStackParamList); // Type assertion here
    }
  };

  const renderCourseItem = ({ item }: { item: CourseDetails }) => (
    <TouchableOpacity
      style={styles.courseItem}
      onPress={() => navigation.navigate('CourseDetails', { course: item })}
    >
      <ImageBackground source={item.backgroundImage} style={styles.imageBackground} imageStyle={{ borderRadius: 15 }}>
        <Text style={styles.courseTitle}>{item.title}</Text>
        <Text style={styles.courseFees}>Fees: {item.fees}</Text>
        <Text style={styles.courseDescription}>{item.purpose}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );

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
        <View style={styles.hero}>
          <Image style={styles.image} source={require('../assets/hero-img.jpg')} />
        </View>

        <Text style={styles.heading}>Empowering the Nation</Text>
        

        <Text style={styles.description}>Empowering the Nation offers the following six-month courses:</Text>
        <FlatList
          data={sixMonthCourses}
          renderItem={renderCourseItem}
          keyExtractor={(item) => item.title}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContainer}
        />

        <Text style={styles.description}>Empowering the Nation also offers the following six-week short courses:</Text>
        <FlatList
          data={sixWeekCourses}
          renderItem={renderCourseItem}
          keyExtractor={(item) => item.title}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContainer}
        />

        <View style={styles.BackBtnContainer}>
          <TouchableOpacity style={styles.BackBtn} onPress={() => navigation.navigate('ContactUs')}>
            <Text style={{ color: '#fff' }}>Contact Us</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: "#0d2e09",
    
  },
  heading: {
    fontFamily: 'Iowan Old Style',
    marginTop: 15,
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '40%',
    color: '#fff',
    backgroundColor: '#7BD859',
    marginVertical: 20,
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
  imageBackground: {
    flex: 1,
    padding: 10,
  },
  description: {
    width: '90%',
    color: '#fff',
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  courseItem: {
    color: '#fff',  
    borderRadius: 15,
    marginRight: 10,  
    shadowColor: '#d4ffd3',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
    width: 200,
    height: 150,  
    marginBottom: 20,
  },
  courseTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 15,
  },
  courseFees: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
  },
  courseDescription: {
    fontSize: 14,
    color: '#888',
  },
  flatListContainer: {
    paddingHorizontal: 5,  
  },
  BackBtnContainer: {
    marginTop: 20,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  BackBtn: {
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

});
