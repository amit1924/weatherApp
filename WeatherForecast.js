// import React, { useState, useEffect, useRef } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   Animated,
//   Easing,
//   ScrollView,
//   ImageBackground,
// } from "react-native";
// import axios from "axios";

// const API_KEY = "0aa115121d3e9c1e4b3858ae079694aa";
// const FORECAST_API_URL =
//   "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";

// const WeatherForecast = ({ route }) => {
//   const { city } = route.params;
//   const [forecastData, setForecastData] = useState([]);
//   const [currentForecastIndex, setCurrentForecastIndex] = useState(0);
//   const [backgroundImage, setBackgroundImage] = useState(
//     require("./assets/default.png")
//   );
//   const imageOpacity = useRef(new Animated.Value(0)).current;
//   const [displayText, setDisplayText] = useState("");
//   const typewriterIndex = useRef(0);

//   const textToDisplay = `Future Forecast for ${city}`;

//   useEffect(() => {
//     fetchForecastData(city);
//   }, [city]);

//   useEffect(() => {
//     if (forecastData.length > 0) {
//       const interval = setInterval(() => {
//         setCurrentForecastIndex(
//           (prevIndex) => (prevIndex + 1) % forecastData.length
//         );
//         updateBackgroundImage(
//           forecastData[(currentForecastIndex + 1) % forecastData.length]
//             .weather[0]?.description
//         );
//       }, 5000);

//       return () => clearInterval(interval);
//     }
//   }, [forecastData, currentForecastIndex]);

//   useEffect(() => {
//     Animated.timing(imageOpacity, {
//       toValue: 1,
//       duration: 500,
//       easing: Easing.ease,
//       useNativeDriver: true,
//     }).start();
//   }, [backgroundImage]);

//   useEffect(() => {
//     if (city) {
//       let timer;
//       const typewriterEffect = () => {
//         if (typewriterIndex.current < textToDisplay.length) {
//           setDisplayText(
//             (prev) => prev + textToDisplay[typewriterIndex.current]
//           );
//           typewriterIndex.current += 1;
//           timer = setTimeout(typewriterEffect, 100); // Adjust speed here
//         }
//       };
//       typewriterEffect();

//       return () => clearTimeout(timer);
//     } else {
//       setDisplayText("");
//       typewriterIndex.current = 0;
//     }
//   }, [city]);

//   const fetchForecastData = async (city) => {
//     const apiUrl = `${FORECAST_API_URL}${city}&appid=${API_KEY}`;
//     try {
//       const response = await axios.get(apiUrl);
//       setForecastData(response.data.list);
//       if (response.data.list.length > 0) {
//         updateBackgroundImage(response.data.list[0].weather[0]?.description);
//       }
//     } catch (error) {
//       console.error("Error fetching forecast data:", error);
//     }
//   };

//   const updateBackgroundImage = (description) => {
//     const imageSource = getWeatherImageSource(description);
//     setBackgroundImage(imageSource);
//   };

//   const getWeatherImageSource = (weatherDescription) => {
//     if (!weatherDescription) {
//       return require("./assets/default.png");
//     }

//     const condition = weatherDescription.toLowerCase();
//     if (condition.includes("clear")) {
//       return require("./assets/clear.jpg");
//     } else if (condition.includes("scattered clouds")) {
//       return require("./assets/scat.jpg");
//     } else if (condition.includes("broken clouds")) {
//       return require("./assets/brokenn.jpg");
//     } else if (condition.includes("few clouds")) {
//       return require("./assets/few.jpg");
//     } else if (condition.includes("cloudy") || condition.includes("cloud")) {
//       return require("./assets/cl.jpg");
//     } else if (condition.includes("rain")) {
//       return require("./assets/rain.png");
//     } else if (condition.includes("snow")) {
//       return require("./assets/snow.jpg");
//     } else if (condition.includes("haze") || condition.includes("mist")) {
//       return require("./assets/haze.jpg");
//     } else if (condition.includes("thunderstorm")) {
//       return require("./assets/thunders.jpg");
//     } else if (condition.includes("drizzle")) {
//       return require("./assets/drizzle.jpg");
//     } else if (condition.includes("overcast clouds")) {
//       return require("./assets/overcastt.jpg");
//     } else {
//       return require("./assets/default.png");
//     }
//   };

//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: "center",
//       alignItems: "center",
//     },
//     backgroundImage: {
//       ...StyleSheet.absoluteFillObject,
//       resizeMode: "cover",
//     },
//     header: {
//       fontSize: 28,
//       fontWeight: "bold",
//       marginBottom: 20,
//       color: "yellow",
//       textShadowColor: "blue",
//       textShadowOffset: { width: 2, height: 2 },
//       textShadowRadius: 10,
//       textAlign: "center",
//     },
//     forecastContainer: {
//       width: "90%",
//       borderRadius: 15,
//       padding: 20,
//       alignItems: "center",
//       shadowColor: "#000",
//       shadowOffset: { width: 0, height: 2 },
//       shadowOpacity: 0.25,
//       shadowRadius: 3.84,
//       elevation: 5,
//     },
//     forecastItem: {
//       alignItems: "center",
//     },
//     forecastText: {
//       fontSize: 25,
//       marginBottom: 10,
//       fontFamily: "sans-serif",
//       color: "black", // Base text color
//       textAlign: "center",
//       fontWeight: "500",
//       textShadowColor: "#FFD700", // Bright yellow for a glowing effect
//       textShadowOffset: { width: 0, height: 0 }, // Offset can be zero for a uniform glow
//       textShadowRadius: 10, // Radius of the shadow blur
//     },
//     weatherIcon: {
//       width: 150,
//       height: 150,
//       marginVertical: 15,
//       borderRadius: 10,
//       shadowColor: "#000",
//       shadowOffset: { width: 0, height: 2 },
//       shadowOpacity: 0.3,
//       shadowRadius: 4,
//       elevation: 3,
//     },
//   });

//   return (
//     <View style={styles.container}>
//       <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
//         <Animated.View style={{ ...styles.container, opacity: imageOpacity }}>
//           <ScrollView contentContainerStyle={styles.container}>
//             <Text style={styles.header}>{displayText}</Text>
//             <View style={styles.forecastContainer}>
//               {forecastData.length > 0 ? (
//                 <View style={styles.forecastItem}>
//                   <Text style={styles.forecastText}>
//                     Date: {forecastData[currentForecastIndex].dt_txt}
//                   </Text>
//                   <Text style={styles.forecastText}>
//                     Temperature:{" "}
//                     {forecastData[currentForecastIndex].main.temp.toFixed(0)}°C
//                   </Text>
//                   <Text style={styles.forecastText}>
//                     Weather:{" "}
//                     {forecastData[currentForecastIndex].weather[0]
//                       ?.description || "No description"}
//                   </Text>
//                 </View>
//               ) : (
//                 <Text style={styles.header}>Loading forecast data...</Text>
//               )}
//             </View>
//           </ScrollView>
//         </Animated.View>
//       </ImageBackground>
//     </View>
//   );
// };

// export default WeatherForecast;
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  ScrollView,
  ImageBackground,
} from "react-native";
import axios from "axios";
import { Audio } from "expo-av";
import * as Speech from "expo-speech";

const API_KEY = "0aa115121d3e9c1e4b3858ae079694aa";
const FORECAST_API_URL =
  "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";

const WeatherForecast = ({ route }) => {
  const { city } = route.params;
  const [forecastData, setForecastData] = useState([]);
  const [currentForecastIndex, setCurrentForecastIndex] = useState(0);
  const [backgroundImage, setBackgroundImage] = useState(
    require("./assets/default.png")
  );
  const imageOpacity = useRef(new Animated.Value(0)).current;
  const [displayText, setDisplayText] = useState("");
  const typewriterIndex = useRef(0);

  const textToDisplay = `Future Forecast for ${city}`;

  useEffect(() => {
    fetchForecastData(city);
  }, [city]);

  useEffect(() => {
    if (forecastData.length > 0) {
      const interval = setInterval(() => {
        const nextIndex = (currentForecastIndex + 1) % forecastData.length;
        const description = forecastData[nextIndex].weather[0]?.description;
        const date = forecastData[nextIndex].dt_txt;

        setCurrentForecastIndex(nextIndex);
        updateBackgroundImage(description);
        // playSound();
        speakWeatherDescription(date, description);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [forecastData, currentForecastIndex]);

  useEffect(() => {
    Animated.timing(imageOpacity, {
      toValue: 1,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, [backgroundImage]);

  useEffect(() => {
    if (city) {
      let timer;
      const typewriterEffect = () => {
        if (typewriterIndex.current < textToDisplay.length) {
          setDisplayText(
            (prev) => prev + textToDisplay[typewriterIndex.current]
          );
          typewriterIndex.current += 1;
          timer = setTimeout(typewriterEffect, 100);
        }
      };
      typewriterEffect();

      return () => clearTimeout(timer);
    } else {
      setDisplayText("");
      typewriterIndex.current = 0;
    }
  }, [city]);

  const fetchForecastData = async (city) => {
    const apiUrl = `${FORECAST_API_URL}${city}&appid=${API_KEY}`;
    try {
      const response = await axios.get(apiUrl);
      setForecastData(response.data.list);
      if (response.data.list.length > 0) {
        updateBackgroundImage(response.data.list[0].weather[0]?.description);
      }
    } catch (error) {
      console.error("Error fetching forecast data:", error);
    }
  };

  const updateBackgroundImage = (description) => {
    const imageSource = getWeatherImageSource(description);
    setBackgroundImage(imageSource);
  };

  const getWeatherImageSource = (weatherDescription) => {
    if (!weatherDescription) {
      return require("./assets/default.png");
    }

    const condition = weatherDescription.toLowerCase();
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

  const playSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("./assets/press.mp3")
      );
      await sound.playAsync();
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

  const speakWeatherDescription = (date, description) => {
    if (description && date) {
      const dateTime = new Date(date);
      const options = { weekday: "long", hour: "numeric", minute: "numeric" };
      const formattedDate = dateTime.toLocaleString("en-US", options);
      const speechText = `Forecast for ${formattedDate}: ${description}.`;

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
    backgroundImage: {
      ...StyleSheet.absoluteFillObject,
      resizeMode: "cover",
    },
    header: {
      fontSize: 28,
      fontWeight: "bold",
      marginBottom: 20,
      color: "yellow",
      textShadowColor: "blue",
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 10,
      textAlign: "center",
    },
    forecastContainer: {
      width: "90%",
      borderRadius: 15,
      padding: 20,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    forecastItem: {
      alignItems: "center",
    },
    forecastText: {
      fontSize: 25,
      marginBottom: 10,
      fontFamily: "sans-serif",
      color: "black",
      textAlign: "center",
      fontWeight: "500",
      textShadowColor: "#FFD700",
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 10,
    },
  });

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <Animated.View style={{ ...styles.container, opacity: imageOpacity }}>
          <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>{displayText}</Text>
            <View style={styles.forecastContainer}>
              {forecastData.length > 0 ? (
                <View style={styles.forecastItem}>
                  <Text style={styles.forecastText}>
                    Date: {forecastData[currentForecastIndex].dt_txt}
                  </Text>
                  <Text style={styles.forecastText}>
                    Temperature:{" "}
                    {forecastData[currentForecastIndex].main.temp.toFixed(0)}°C
                  </Text>
                  <Text style={styles.forecastText}>
                    Weather:{" "}
                    {forecastData[currentForecastIndex].weather[0]
                      ?.description || "No description"}
                  </Text>
                </View>
              ) : (
                <Text style={styles.header}>Loading forecast data...</Text>
              )}
            </View>
          </ScrollView>
        </Animated.View>
      </ImageBackground>
    </View>
  );
};

export default WeatherForecast;
