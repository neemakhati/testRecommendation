import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchEvents } from './api';

const RandomWorkshopScreen = () => {
  const [randomWorkshop, setRandomWorkshop] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    getRandomWorkshop();
  }, []);

  const handleSelectWorkshop = (workshop) => {
    navigation.navigate('RecommendationScreen', { workshop });
  };

  const getRandomWorkshop = async () => {
    try {
      const events = await fetchEvents();
      if (events.length > 0) {
        const randomIndex = Math.floor(Math.random() * events.length);
        const workshop = events[randomIndex]?.Workshop;
        if (workshop) {
          setRandomWorkshop(workshop);
        } else {
          console.log('Random workshop not found.');
        }
      } else {
        console.log('No workshops available.');
      }
    } catch (error) {
      console.error('Error getting random workshop:', error);
    }
  };

  return (
    <View>
      <Text>Random Workshop:</Text>
      <Text>{randomWorkshop}</Text>
      <Button
        title="Select as Favorite"
        onPress={() => handleSelectWorkshop(randomWorkshop)}
        disabled={!randomWorkshop}
      />
    </View>
  );
};

export default RandomWorkshopScreen;
