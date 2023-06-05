import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchEvents } from './api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/FontAwesome'; 

const RandomWorkshopScreen = () => {
  const [randomWorkshops, setRandomWorkshops] = useState([]);
  const [selectedWorkshops, setSelectedWorkshops] = useState([]);
  const navigation = useNavigation();
  
  useEffect(() => {
    getRandomWorkshops();
  }, []);

  const handleSelectWorkshop = (workshop) => {
    navigation.navigate('RecommendationScreen', { workshop });
  };

  const getRandomWorkshops = async () => {
    try {
      const events = await fetchEvents();
      if (events.length > 0) {
        const randomIndices = getRandomIndices(events.length, 20);
        const workshops = randomIndices.map((index) => events[index]).filter(Boolean);
        if (workshops.length > 0) {
          setRandomWorkshops(workshops);
        } else {
          console.log('Random workshops not found.');
        }
      } else {
        console.log('No workshops available.');
      }
    } catch (error) {
      console.error('Error getting random workshops:', error);
    }
  };

  const getRandomIndices = (max, count) => {
    const indices = [];
    while (indices.length < count) {
      const randomIndex = Math.floor(Math.random() * max);
      if (!indices.includes(randomIndex)) {
        indices.push(randomIndex);
      }
    }
    return indices;
  };

  const isWorkshopSelected = (workshop) => {
    return selectedWorkshops.includes(workshop);
  };

  const handleFavoriteWorkshop = (workshop) => {
    const isSelected = selectedWorkshops.includes(workshop);
    const updatedSelectedWorkshops = isSelected
      ? selectedWorkshops.filter((selected) => selected !== workshop)
      : [...selectedWorkshops, workshop];
    setSelectedWorkshops(updatedSelectedWorkshops);
  
    if (!isSelected) {
      navigation.navigate('RecommendationScreen', { selectedWorkshops: updatedSelectedWorkshops });
    }
  };
  
  const starMappings = {
    1: 'star',
    2: 'star',
    3: 'star',
    4: 'star',
    5: 'star',
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {randomWorkshops.map((workshop, index) => (
        <View key={index} style={styles.cardContainer}>
          <Image source={{ uri: workshop.Images }} style={styles.image} resizeMode="contain" />
          <View style={styles.textContainer}>
            <Text style={styles.workshopText}>{workshop.Workshop}</Text>
            <Text style={styles.collegeText}>{workshop.College}</Text>
            <View style={styles.ratingContainer}>
                {Array(workshop.Ratings)
                  .fill()
                  .map((_, index) => (
                    <Icon key={index} name={starMappings[workshop.Ratings]} style={styles.starIcon} />
                  ))}
                </View>

            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={() => handleFavoriteWorkshop(workshop.Workshop)}
            >
              <Icon
                name={isWorkshopSelected(workshop.Workshop) ? 'heart' : 'heart-outline'}
                size={20}
                color={isWorkshopSelected(workshop.Workshop) ? 'red' : '#333333'}
              />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
    padding: 8,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
  },
  workshopText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  collegeText: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 8,
  },
  favoriteButton: {
    marginLeft: 'auto',
    padding: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  
  starIcon: {
    color: 'gold',
    fontSize: 20,
  },
});

export default RandomWorkshopScreen;
