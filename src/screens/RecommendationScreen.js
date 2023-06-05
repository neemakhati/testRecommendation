import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ScrollView, Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getRecommendations } from './RecommendationService';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const RecommendationScreen = ({ route, navigation }) => {
  const { workshop } = route.params;
  const [recommendations, setRecommendations] = useState([]);
  const starMappings = {
    1: 'star',
    2: 'star',
    3: 'star',
    4: 'star',
    5: 'star',
  };
  useEffect(() => {
    const fetchRecommendations = async () => {
      if (route?.params?.selectedWorkshops) {
        try {
          const selectedWorkshops = route.params.selectedWorkshops;
          const allRecommendations = [];
  
          for (const workshop of selectedWorkshops) {
            const fetchedRecommendations = await getRecommendations(workshop);
            const topRecommendations = fetchedRecommendations.slice(0, 5);
            allRecommendations.push(...topRecommendations);
          }
  
          setRecommendations(allRecommendations);
        } catch (error) {
          console.error('Error fetching recommendations:', error);
        }
      }
    };
  
    fetchRecommendations();
  }, [route?.params?.selectedWorkshops]);
  
  
  
      const handleCardPress = (workshop) => {
            navigation.navigate('DisplayScreen', { workshop });
          };
  return (
    
    <ScrollView contentContainerStyle={styles.container}>
         <View>
             {recommendations.map((recommendation, index) => (
              <TouchableOpacity
                key={index}
                style={styles.cardContainer}
                onPress={() => handleCardPress(recommendation)}
              >
                <Text style={styles.workshopText}>{recommendation.Workshop}</Text>
                <Text style={styles.collegeText}>{recommendation.College}</Text>
                <Image source={{ uri: recommendation.Images }} style={styles.image} resizeMode="contain" />
                <View style={styles.ratingContainer}>
                {Array(recommendation.Ratings)
                  .fill()
                  .map((_, index) => (
                    <Icon key={index} name={starMappings[recommendation.Ratings]} style={styles.starIcon} />
                  ))}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center', // Add textAlign property to center the heading
  },
  cardContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
    padding: 16,
  },
  workshopText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#333333',
    textAlign: 'center', // Add textAlign property to center the workshop name
  },
  collegeText: {
    fontSize: 16,
    marginBottom: 2,
    color: '#333333',
    textAlign: 'center', // Add textAlign property to center the workshop name
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginTop: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Add justifyContent property to center the star icon
    marginTop: 8,
  },
  starIcon: {
    color: 'gold',
    fontSize: 25,
    marginRight: 2,
  },
});



export default RecommendationScreen;
