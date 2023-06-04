// import { createAppContainer } from "react-navigation";
// import { createStackNavigator } from "react-navigation-stack";
// import HomeScreen from "./src/screens/HomeScreen";
// import Try from "./src/screens/Try";

// const navigator = createStackNavigator(
//   {
//     Try : Try,
//   },
//   {
//     initialRouteName: "Try",
//     defaultNavigationOptions: {
//       title: "App",
//     },
//   }
// );

// export default createAppContainer(navigator);
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import RandomWorkshopScreen from "./src/screens/RandomWorkshopScreen";
import RecommendationScreen from './src/screens/RecommendationScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="RandomWorkshopScreen" component={RandomWorkshopScreen} options={{ title: "Random Workshop" }} />
        <Stack.Screen name="RecommendationScreen" component={RecommendationScreen} options={{ title: "Workshop Recommendation" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
