// import React from "react";
// import { Text, StyleSheet } from "react-native";

// const HomeScreen = () => {
//   return <Text style={styles.text}>HomeScreen</Text>;
// };

// const styles = StyleSheet.create({
//   text: {
//     fontSize: 30,
//   },
// });

// export default HomeScreen;

import React from 'react';
import { View, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Button
        title="Select Workshop"
        onPress={() => navigation.navigate('Workshop')}
      />
    </View>
  );
};

export default HomeScreen;
