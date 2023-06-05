import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import RandomWorkshopScreen from "./src/screens/RandomWorkshopScreen";
import RecommendationScreen from './src/screens/RecommendationScreen';
import DisplayScreen from './src/screens/DisplayScreen';
import MapScreen from './src/screens/MapScreen';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="RandomWorkshopScreen" component={RandomWorkshopScreen} options={{ title: "Random Workshop" }} />
        <Stack.Screen name="RecommendationScreen" component={RecommendationScreen} options={{ title: "Workshop Recommendation" }} />
        <Stack.Screen name="DisplayScreen" component={DisplayScreen} />
        <Stack.Screen name="MapScreen" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
