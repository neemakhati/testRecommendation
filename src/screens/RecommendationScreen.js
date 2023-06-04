import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { getRecommendations } from './RecommendationService';

const RecommendationScreen = ({ route }) => {
  const { workshop } = route.params;
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const fetchedRecommendations = await getRecommendations(workshop);
      setRecommendations(fetchedRecommendations);
    };

    fetchRecommendations();
  }, [workshop]);

  return (
    <View>
      <Text>Top recommendations for {workshop}:</Text>
      {recommendations.map((recommendation, index) => (
        <View key={index}>
          <Text>Workshop: {recommendation.Workshop}</Text>
          <Text>College: {recommendation.College}</Text>
          <Text>Ratings: {recommendation.Ratings}</Text>
        </View>
      ))}
    </View>
  );
};

export default RecommendationScreen;
