import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, useColorScheme } from 'react-native';
import axios from 'axios';

const API_KEY = '37acc46646715d87002d2f94f7389db2';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const weatherImages = {
  clear: require('./assets/clear.jpg'),
  clouds: require('./assets/cloud.jpg'),
  rain: require('./assets/rainy.jpg'),
  snow: require('./assets/snow.webp'),
  thunderstorm: require('./assets/thunder.jpg'),
  haze: require('./assets/haze.jpg'),
  mist: require('./assets/haze.jpg'),
  sunny: require('./assets/sunn.jpg'),
};
const App = () => {
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const toggleColorScheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(API_URL + city + `&appid=${API_KEY}`);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDarkMode ? '#121212' : 'white',
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: isDarkMode ? 'white' : 'black',
    },
    input: {
      width: 300,
      height: 40,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 8,
      paddingHorizontal: 10,
      marginBottom: 10,
      color: isDarkMode ? 'white' : 'black',
      backgroundColor: isDarkMode ? '#1E1E1E' : 'white',
    },
    button: {
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 8,
    },
    buttonText: {
      color: 'white',
      textAlign: 'center',
      fontSize: 16,
    },
    weatherContainer: {
      marginTop: 20,
      alignItems: 'center',
    },
    weatherImage: {
      width: 100,
      height: 100,
      marginBottom: 10,
    },
    text: {
      fontSize: 18,
      marginBottom: 10,
      color: isDarkMode ? 'white' : 'black',
    },
    modeButton: {
      position: 'absolute',
      top:45 ,
      right: 10,
    },
    modeButtonText: {
      color: isDarkMode ? 'white' : 'black',
      fontSize: 16,
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.modeButton} onPress={toggleColorScheme}>
        <Text style={styles.modeButtonText}>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Weather Forecast</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={city}
        onChangeText={setCity}
      />
      <TouchableOpacity style={styles.button} onPress={fetchWeatherData}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
      {weatherData && (
        <View style={styles.weatherContainer}>
 <Image source={weatherImages[weatherData.weather[0].main.toLowerCase()]} style={styles.weatherImage} />
    {/* Rest of your code */}
          <Text style={styles.text}>Temperature: {weatherData.main.temp}°C</Text>
          <Text style={styles.text}>Weather: {weatherData.weather[0].description}</Text>
          <Text style={styles.text}>Humidity: {weatherData.main.humidity}%</Text>
          <Text style={styles.text}>Wind Speed: {weatherData.wind.speed} m/s</Text>
        </View>
      )}
    </View>
  );
};

export default App;
