import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
  useColorScheme,
} from "react-native";
import WeatherForecast from './WeatherForecast'
import axios from "axios";

const API_KEY = "37acc46646715d87002d2f94f7389db2";
const API_URL =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const getWeatherImageSource = (weatherCondition) => {
  if (weatherCondition === "clear") {
    return require("./assets/clear.jpg");
  } else if (weatherCondition === "broken clouds") {
    return require("./assets/broken.jpg")
  } else if (weatherCondition === "clouds") {
    return require("./assets/cloud.jpg");
 ;
  } else if (weatherCondition === "clear sky") {
    return require("./assets/clear.jpg");
  } else if (weatherCondition === "rain") {
    return require("./assets/rain.jpg");
  } else if (weatherCondition === "haze") {
    return require("./assets/haze.jpg");
  } else if (weatherCondition === "mist") {
    return require("./assets/mist.jpg");
  } else if (weatherCondition === "snow") {
    return require("./assets/snow.jpg");
  } else if (weatherCondition === "sunny") {
    return require("./assets/sunny.jpg");

  } else if (weatherCondition === "thunderstorm") {
    return require("./assets/thunders.jpg");
  } else if (weatherCondition === "drizzle") {
    return require("./assets/drizzle.jpg");
  } else {
    return require("./assets/cloudss.jpg"); // Default image for other conditions
  }
};

// const weatherImages = {
//   clear: require('./assets/clear.jpg'),
//   clouds: require('./assets/cloud.jpg'),
//   rain: require('./assets/rainy.jpg'),
//   // Add more images for other weather conditions if needed
// };

const App = () => {
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === "dark");
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [showFlash, setShowFlash] = useState(false);
  const [showForecast, setShowForecast] = useState(false);


  const toggleColorScheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const fetchWeatherData = async () => {
    try {
      setShowFlash(true); // Set the flash effect to true
      const response = await axios.get(API_URL + city + `&appid=${API_KEY}`);
      setWeatherData(response.data);
      setShowForecast(true); 
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setShowFlash(false); // Set the flash effect back to false
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    overlayContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      // backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    header: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 10,
      color: "black",
    },
    input: {
      width: 300,
      height: 40,
      borderWidth: 1,
      borderColor: "gray",
      borderRadius: 8,
      paddingHorizontal: 10,
      marginBottom: 10,
      color: "white",
      backgroundColor: "#1E1E1E",
    },
    button: {
      backgroundColor: "blue",
      padding: 10,
      borderRadius: 8,
    },
    buttonText: {
      color: "white",
      textAlign: "center",
      fontSize: 16,
    },
    weatherContainer: {
      marginTop: 20,
      alignItems: "center",
    },
    weatherImage: {
      width: 100,
      height: 100,
      marginBottom: 10,
    },
    text: {
      fontSize: 23,
      marginBottom: 10,
      color: showFlash ?"orangered":"yellow",
      textShadowColor: "rgba(0, 0, 0, 0.5)",
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 10,
      // Add glowing effect
      backgroundColor: "rgba(255, 74, 80, 0.2)",
      borderRadius: 5,
      padding: 5,
      // Add LED-like shadow
      shadowColor: "rgba(0, 255, 0, 0.8)",
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 10,
    },
    // modeButton: {
    //   position: 'absolute',
    //   top: 0,
    //   right: 0,
    //   marginTop: 20,
    //   marginRight: 20,
    // },

    // modeButtonText: {
    //   color: 'black',
    //   fontSize: 16,
    // },
  });

  return (
    <ImageBackground
      source={
        getWeatherImageSource(weatherData?.weather[0].main.toLowerCase()) ||
        require("./assets/sunn.jpg")
      }
      style={[
        styles.container,
        // { backgroundColor: isDarkMode ? "#121212" : "white" },
      ]}
      resizeMode="cover"
    >
      <View style={styles.overlayContainer}>
        <TouchableOpacity style={styles.modeButton} onPress={toggleColorScheme}>
          {/* <Text style={styles.modeButtonText}>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</Text> */}
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
            {/* <Image source={weatherImages[weatherData.weather[0].main.toLowerCase()]} style={styles.weatherImage} /> */}
            <Text style={styles.text}>Temperature: {weatherData.main.temp.toFixed(0)}°C</Text>

            <Text style={styles.text}>
              Weather: {weatherData.weather[0].description}
            </Text>
            <Text style={styles.text}>
              Humidity: {weatherData.main.humidity}%
            </Text>
            <Text style={styles.text}>
  Wind Speed: {Math.round(weatherData.wind.speed * 3.6)} km/hr
</Text>
          </View>
        )}
        {showForecast && <WeatherForecast city={city} />}
      </View>
    </ImageBackground>
  );
};

export default App;
