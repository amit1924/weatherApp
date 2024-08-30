// App.js or AppNavigator.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import WeatherForecast from "./WeatherForecast";
import CustomHeader from "./CustomHeader";
import { StatusBar } from "react-native";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar
        barStyle="light-content" // Adjust based on your theme
        backgroundColor="transparent" // Make status bar background transparent
        translucent // Allow content to be displayed under the status bar
      />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          header: ({ navigation, route, options }) => (
            <CustomHeader title={route.name} />
          ),
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="WeatherForecast" component={WeatherForecast} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
