import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Animated, Easing } from 'react-native';
import axios from 'axios';
// import TypeWriter from 'react-native-typewriter'
// ... (other imports)
// import TypewriterEffect from './TypewriterEffect'; 

// ... (rest of the code)



// const BACKGROUND = '#263238'
const WHITE = '#ffffff'
const PINK = '#c2185b'

// ... (API_KEY and FORECAST_API_URL definitions remain the same)
const API_KEY = '0aa115121d3e9c1e4b3858ae079694aa';
const FORECAST_API_URL = 'https://api.openweathermap.org/data/2.5/forecast?units=metric&q=';


const WeatherForecast = ({ city }) => {
  const [forecastData, setForecastData] = useState([]);
  const [currentForecastIndex, setCurrentForecastIndex] = useState(0);
  const rotationValue = new Animated.Value(0);

  useEffect(() => {
    fetchForecastData(city);
  }, [city]);

  useEffect(() => {
    // Automatically update forecast index every 5 seconds
    const interval = setInterval(() => {
      if (forecastData.length > 0) {
        setCurrentForecastIndex((prevIndex) =>
          (prevIndex + 1) % forecastData.length
        );
        // Rotate the card on each update
        rotateCard();
      }
    }, 5000);

    return () => clearInterval(interval); // Clear interval on component unmount

  }, [forecastData]);

  const fetchForecastData = async (city) => {
    const apiUrl = `${FORECAST_API_URL}${city}&appid=${API_KEY}`;

    try {
      const response = await axios.get(apiUrl);
      setForecastData(response.data.list);
    } catch (error) {
      console.error('Error fetching forecast data:', error);
    }
  };

  const rotateCard = () => {
    Animated.timing(rotationValue, {
      toValue: 1,
      duration: 500, // Animation duration in milliseconds
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      // Reset the rotation value
      rotationValue.setValue(0);
    });
  };

  // ...

  const getWeatherImageSource = (weatherDescription) => {
    const condition = weatherDescription.toLowerCase();
  
    if (condition.includes('clear')) {
      return require('./assets/clear.jpg');
    } else if (condition.includes('broken clouds') || condition.includes('clouds')) {
      return require('./assets/cloud.jpg');
    } else if (condition.includes('rain')) {
      return require('./assets/rain.jpg');
    } else if (condition.includes('haze') || condition.includes('mist')) {
      return require('./assets/haze.jpg');
    } else if (condition.includes('snow')) {
      return require('./assets/snow.jpg');
    } else if (condition.includes('thunderstorm')) {
      return require('./assets/thunders.jpg');
    } else if (condition.includes('drizzle')) {
      return require('./assets/drizzle.jpg');
    } else {
      return require('./assets/cloudss.jpg'); // Default image for other conditions
    }
  };
  

  // Calculate the interpolated rotation value
  const interpolatedRotation = rotationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  return (
    <View style={styles.container}>
     <Text style={styles.header}>Future Forecast</Text>
      <View style={styles.forecastContainer}>
        {forecastData.length > 0 ? (
          <Animated.View
            style={[
              styles.forecastItem,
              { transform: [{ rotate: interpolatedRotation }] },
            ]}
          >
            <Image
              source={getWeatherImageSource(
                forecastData[currentForecastIndex].weather[0].description
              )}
              style={styles.weatherIcon}
            />
            <Text style={styles.forecastText}>
              Date: {forecastData[currentForecastIndex].dt_txt}
            </Text>
            <Text style={styles.forecastText}>
              Temperature: {forecastData[currentForecastIndex].main.temp.toFixed(0)}°C
            </Text>
            <Text style={styles.forecastText}>
              Weather: {forecastData[currentForecastIndex].weather[0].description}
            </Text>
          </Animated.View>
        ) : (
          <Text style={styles.header}>Loading forecast data...</Text>
        )}
      
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:50,
    
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
marginTop:50,
    color: '#0A0A0A',
  },
  forecastContainer: {
    width: '80%',
    // backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 10,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  forecastItem: {
    alignItems: 'center',
  },
  forecastText: {
    fontSize: 22,
    marginBottom: 20,
    color: 'red',
    textAlign:'center',
    fontWeight:'bold'
  },
  weatherIcon: {
    width: 100,
    height: 100,
    marginTop:50
  },
  // typeWriterText: {
  //   color: WHITE,
  //   fontSize: 24,
  // },
  // typeWriterCursorText: {
  //   color: PINK,
  //   fontSize: 24,
  // },
});

export default WeatherForecast;
