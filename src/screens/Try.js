import React from "react";
import { Image, ScrollView, View, Text, StyleSheet } from "react-native";
import dataset from "./dataset.json";
import stringSimilarity from 'string-similarity';

function getRecommendations(workshop, topN = 25) {
  // Load the dataset (assuming you have it in a JSON format)
  const dataset = require('./dataset.json');

  // Recommendation code here (using the string-similarity library)
  const genre = dataset.find(({ Workshop }) => Workshop === workshop)?.Genre;

  const similarWorkshops = dataset
    .filter(({ Genre, Ratings }) => Genre === genre && Ratings >=0 ) // Filter by same genre and high ratings (change the threshold as needed)
    .sort((a, b) => b.Ratings - a.Ratings)
    .slice(0, topN)
    .map(({ Workshop, College, Ratings, Description, Images }) => ({
      Workshop,
      College,
      Ratings,
      Description,
      Images: Images, // Replace "Images" with the correct property name for image URL in your dataset
    }));

  // Return the top similar workshops as an array of objects
  return similarWorkshops;
}
export default function Try() {
    const workshop = "Java Script Workshop"; // Replace with the workshop of interest
    const recommendations = getRecommendations(workshop);
    
    return (
      <ScrollView>
      <View>
        <Text style={styles.title}>Top recommendations for {workshop}:</Text>
        {recommendations.map((recommendation, index) => (
          <View key={index} style={styles.recommendationContainer}>
            <Text style={styles.Workshop}>{recommendation.Workshop}</Text>
            <Text style={styles.College}>{recommendation.College}</Text>
            <Text style={styles.Ratings}>{recommendation.Ratings}</Text>
            <Text style={styles.Description}>{recommendation.Description}</Text>
            <Image source={{ uri: recommendation.Images }} style={{ width: 300, height: 120 }} />
          </View>
        ))}
      </View>
      </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      padding: 20,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    recommendationContainer: {
      marginBottom: 20,
    },
    workshop: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    college: {
      fontSize: 14,
      marginBottom: 5,
    },
    ratings: {
      fontSize: 14,
      marginBottom: 5,
    },
    description: {
      fontSize: 14,
      marginBottom: 5,
    },
    image: {
      width: 50,
      height: 90,
    },
  });
