import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ScrollView, Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getRecommendations } from './RecommendationService';

const RecommendationScreen = ({ route, navigation }) => {
  const { workshop } = route.params;
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
        const fetchRecommendations = async () => {
          if (route?.params?.workshop) {
            try {
              const fetchedRecommendations = await getRecommendations(workshop);
                  setRecommendations(fetchedRecommendations);
            } catch (error) {
              console.error('Error fetching recommendations:', error);
            }
          }
        };
    
        fetchRecommendations();
      }, [workshop]);
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
                <Text style={styles.workshopText}>Workshop: {recommendation.Workshop}</Text>
                <Image source={{ uri: recommendation.Images }} style={styles.image} resizeMode="contain" />
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cardContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
    padding: 16,
  },
  workshopText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginTop: 8,
  },
});

export default RecommendationScreen;
