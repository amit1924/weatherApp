import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  useColorScheme,
  Animated,
  Easing,
} from "react-native";
import axios from "axios";
import { Audio } from "expo-av";
import * as Speech from "expo-speech";

const API_KEY = "37acc46646715d87002d2f94f7389db2";
const API_URL =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const getWeatherImageSource = (weatherCondition) => {
  const condition = weatherCondition?.toLowerCase() || "";
  if (condition.includes("clear")) {
    return require("./assets/clear.jpg");
  } else if (condition.includes("scattered clouds")) {
    return require("./assets/scat.jpg");
  } else if (condition.includes("broken clouds")) {
    return require("./assets/brokenn.jpg");
  } else if (condition.includes("few clouds")) {
    return require("./assets/few.jpg");
  } else if (condition.includes("cloudy") || condition.includes("cloud")) {
    return require("./assets/cl.jpg");
  } else if (condition.includes("rain")) {
    return require("./assets/rain.png");
  } else if (condition.includes("snow")) {
    return require("./assets/snow.jpg");
  } else if (condition.includes("haze") || condition.includes("mist")) {
    return require("./assets/haze.jpg");
  } else if (condition.includes("thunderstorm")) {
    return require("./assets/thunders.jpg");
  } else if (condition.includes("drizzle")) {
    return require("./assets/drizzle.jpg");
  } else if (condition.includes("overcast clouds")) {
    return require("./assets/overcastt.jpg");
  } else {
    return require("./assets/default.png");
  }
};

const HomeScreen = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === "dark");
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [showFlash, setShowFlash] = useState(false);

  const bounceAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (error) {
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1.2,
          duration: 200,
          easing: Easing.bounce,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 1,
          duration: 200,
          easing: Easing.bounce,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [error]);

  const toggleColorScheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const playPressSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("./assets/press.mp3")
      );
      await sound.playAsync();
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

  const fetchWeatherData = async () => {
    try {
      setShowFlash(true);
      setError(null); // Clear previous errors

      // Play the notification sound
      await playPressSound();

      const response = await axios.get(API_URL + city + `&appid=${API_KEY}`);
      setWeatherData(response.data);

      // Call the function to speak the weather data
      speakWeatherData(response.data);
    } catch (error) {
      setError("City not found or error occurred. Please try again.");
      setWeatherData(null); // Clear previous weather data
    } finally {
      setShowFlash(false);
    }
  };

  const getRecommendation = (weather, temp, humidity, windSpeed) => {
    if (weather.includes("rain") || weather.includes("thunderstorm")) {
      return "It's raining outside. Better to stay at home or carry an umbrella if you need to go out.";
    } else if (weather.includes("snow")) {
      return "Snowfall is expected. Wear warm clothes and be careful if going outside.";
    } else if (weather.includes("clear")) {
      if (temp > 30) {
        return "It's very hot outside. Stay hydrated and use sunscreen or carry an umbrella if going out.";
      } else if (temp < 10) {
        return "It's clear but cold. Wear a warm jacket.";
      } else {
        return "The weather is clear. It's a great day to go outside!";
      }
    } else if (weather.includes("cloud") || weather.includes("overcast")) {
      return "It's cloudy. You can go outside, but it might feel a bit gloomy.";
    } else if (weather.includes("haze") || weather.includes("mist")) {
      return "Visibility might be low due to haze or mist. Drive carefully.";
    } else if (humidity > 80) {
      return "The humidity is high. Stay hydrated and dress in light clothing.";
    } else if (windSpeed > 40) {
      return "It's very windy. Secure any loose items outside.";
    } else {
      return "The weather conditions are moderate. You can decide based on your preferences.";
    }
  };

  const speakWeatherData = (data) => {
    if (data) {
      const maxTemp = data.main.temp_max.toFixed(0);
      const minHumidity = data.main.humidity;
      const description = data.weather[0]?.description || "No description";
      const windSpeed = Math.round(data.wind.speed * 3.6); // Convert m/s to km/hr

      const recommendation = getRecommendation(
        description.toLowerCase(),
        maxTemp,
        minHumidity,
        windSpeed
      );

      const speechText = `In ${city}, the maximum temperature is ${maxTemp} degrees Celsius, the humidity is ${minHumidity} percent, the weather is ${description}, and the wind speed is ${windSpeed} kilometers per hour. ${recommendation}`;

      Speech.speak(speechText, {
        language: "en",
        pitch: 1,
        rate: 1,
      });
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
      backgroundColor: isDarkMode
        ? "rgba(0, 0, 0, 0.5)"
        : "rgba(255, 255, 255, 0.5)",
      padding: 20,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    modeButton: {
      position: "absolute",
      top: 40,
      right: 20,
      padding: 10,
      borderRadius: 20,
      backgroundColor: isDarkMode ? "#ffffff" : "#000000",
    },
    header: {
      fontSize: 30,
      fontWeight: "bold",
      marginBottom: 20,
      color: isDarkMode ? "#ffffff" : "#000000",
    },
    input: {
      width: "90%",
      height: 50,
      backgroundColor: "#fff",
      borderRadius: 10,
      paddingHorizontal: 15,
      marginBottom: 20,
      fontSize: 18,
      borderColor: "#ccc",
      borderWidth: 1,
    },
    button: {
      backgroundColor: "#2196F3",
      padding: 15,
      borderRadius: 10,
      width: "90%",
      alignItems: "center",
      marginVertical: 10,
    },
    buttonText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "bold",
    },
    weatherContainer: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      padding: 20,
      borderRadius: 10,
      width: "90%",
      alignItems: "center",
      marginTop: 20,
    },
    text: {
      fontSize: 18,
      color: "#ffffff",
      marginBottom: 5,
    },
    navigateButton: {
      backgroundColor: "#FF5722",
      padding: 15,
      borderRadius: 10,
      width: "90%",
      alignItems: "center",
      marginVertical: 10,
    },
    errorContainer: {
      backgroundColor: "rgba(255, 0, 0, 0.7)",
      padding: 20,
      borderRadius: 10,
      width: "90%",
      alignItems: "center",
      marginTop: 20,
    },
    errorText: {
      fontSize: 18,
      color: "#ffffff",
      fontWeight: "bold",
    },
  });

  return (
    <ImageBackground
      source={
        weatherData?.weather?.[0]?.main
          ? getWeatherImageSource(weatherData.weather[0].main.toLowerCase())
          : require("./assets/default.png")
      }
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlayContainer}>
        <TouchableOpacity style={styles.modeButton} onPress={toggleColorScheme}>
          <Text style={{ color: isDarkMode ? "#000000" : "#ffffff" }}>
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </Text>
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
        {error && (
          <Animated.View
            style={[
              styles.errorContainer,
              { transform: [{ scale: bounceAnim }] },
            ]}
          >
            <Text style={styles.errorText}>{error}</Text>
          </Animated.View>
        )}
        {weatherData && (
          <View style={styles.weatherContainer}>
            <Text style={styles.text}>
              Temperature: {weatherData.main.temp.toFixed(0)}°C
            </Text>
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
        {weatherData && (
          <TouchableOpacity
            style={styles.navigateButton}
            onPress={() => navigation.navigate("WeatherForecast", { city })}
          >
            <Text style={styles.buttonText}>View Hourly Forecast</Text>
          </TouchableOpacity>
        )}
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;
