// import React, { useState, useEffect } from 'react';
// import { ScrollView, Image, View, Text } from 'react-native';
// import { getRecommendations } from './RecommendationService';

// const RecommendationScreen = ({ route }) => {
//   const { workshop } = route.params;
//   const [recommendations, setRecommendations] = useState([]);

//   useEffect(() => {
//     const fetchRecommendations = async () => {
//       const fetchedRecommendations = await getRecommendations(workshop);
//       setRecommendations(fetchedRecommendations);
//     };

//     fetchRecommendations();
//   }, [workshop]);

//   return (
//     <ScrollView>
//     <View>
//       <Text>Top recommendations for {workshop}:</Text>
//       {recommendations.map((recommendation, index) => (
//         <View key={index}>
//           <Text>Workshop: {recommendation.Workshop}</Text>
//           <Text>College: {recommendation.College}</Text>
//           <Text>Ratings: {recommendation.Ratings}</Text>
//           <Text>Description: {recommendation.Description}</Text>
//           <Image source={{ uri: recommendation.Images }} style={{ width: 300, height: 120 }} />
//         </View>
//       ))}
//     </View>
//     </ScrollView>
//   );
// };

// export default RecommendationScreen;


import React, { useState, useEffect } from 'react';
import { ScrollView, Image, View, Text, StyleSheet } from 'react-native';
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
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        {recommendations.map((recommendation, index) => (
          <View key={index} style={styles.cardContainer}>
            <Text style={styles.workshopText}>Workshop: {recommendation.Workshop}</Text>

            <Image source={{ uri: recommendation.Images }} style={styles.image} resizeMode="contain" />
          </View>
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

