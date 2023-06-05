import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const DisplayScreen = ({ route }) => {
  const workshop = route.params?.workshop;

  return (
    <View style={styles.container}>
      
      <View style={styles.card}>
        <Image source={{ uri: workshop.Images }} style={styles.image} resizeMode="contain" />
        <Text style={styles.title}>{workshop.Workshop}</Text>
        <Text style={styles.text}>{workshop.College}</Text>
        <Text style={styles.description}>"{workshop.Description}"</Text>
        <Text style={styles.description}>"{workshop.Ratings}"</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 2,
    elevation: 3,
  },
  image: {
    width: width - 40,
    height: (width - 40) * 0.5,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333333',
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    color: '#666666',
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    marginTop: 10,
    color: '#444444',
    textAlign: 'center',
  },
});

export default DisplayScreen;
