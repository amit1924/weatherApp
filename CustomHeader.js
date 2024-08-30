// import React from "react";
// import { View, Text, StyleSheet, Animated } from "react-native";
// import { useState, useEffect } from "react";

// const CustomHeader = ({ title }) => {
//   const [fadeAnim] = useState(new Animated.Value(0)); // Initial opacity

//   useEffect(() => {
//     // Fade in animation
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 1000,
//       useNativeDriver: true,
//     }).start();
//   }, [fadeAnim]);

//   return (
//     <View style={styles.headerContainer}>
//       <Animated.View style={[styles.iconContainer, { opacity: fadeAnim }]}>
//         <View style={styles.icon}>
//           {/* Replace these with actual icons or images */}
//           <Text style={styles.iconText}>☀️</Text>
//           <Text style={styles.iconText}>☁️</Text>
//           <Text style={styles.iconText}>🌙</Text>
//           <Text style={styles.iconText}>🌧️</Text>
//         </View>
//       </Animated.View>
//       {/* <Text style={styles.headerTitle}>{title}</Text> */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   headerContainer: {
//     height: 80,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#000",
//     overflow: "hidden",
//     position: "relative",
//   },
//   iconContainer: {
//     position: "absolute",
//     top: 25,
//     flexDirection: "row",
//     justifyContent: "space-around",
//     width: "100%",
//   },
//   icon: {
//     flexDirection: "row",
//     justifyContent: "center",
//     width: 200,
//   },
//   iconText: {
//     fontSize: 30,
//     color: "#fff",
//     marginHorizontal: 10,
//   },
//   headerTitle: {
//     color: "#fff",
//     fontSize: 24,
//     fontWeight: "bold",
//     textShadowColor: "#000",
//     textShadowOffset: { width: 1, height: 1 },
//     textShadowRadius: 5,
//     zIndex: 1,
//   },
// });

// export default CustomHeader;
import React from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";
import { useState, useEffect } from "react";

const CustomHeader = ({ title }) => {
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial opacity
  const [bounceAnim] = useState(new Animated.Value(1)); // Initial bounce value

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Bounce animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1.2,
          duration: 1500, // Increase duration for slower bounce up
          easing: Easing.bounce,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 1,
          duration: 1500, // Increase duration for slower bounce down
          easing: Easing.bounce,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [fadeAnim, bounceAnim]);

  return (
    <View style={styles.headerContainer}>
      <Animated.View
        style={[
          styles.iconContainer,
          { opacity: fadeAnim, transform: [{ scale: bounceAnim }] },
        ]}
      >
        <View style={styles.icon}>
          <Text style={styles.iconText}>☀️</Text>
          <Text style={styles.iconText}>☁️</Text>
          <Text style={styles.iconText}>🌙</Text>
          <Text style={styles.iconText}>🌧️</Text>
          <Text style={styles.iconText}>🌟</Text>
        </View>
      </Animated.View>
      {/* Uncomment to display title */}
      {/* <Text style={styles.headerTitle}>{title}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    overflow: "hidden",
    position: "relative",
  },
  iconContainer: {
    position: "absolute",
    top: 25,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  icon: {
    flexDirection: "row",
    justifyContent: "center",
    width: 200,
  },
  iconText: {
    fontSize: 30,
    color: "#fff",
    marginHorizontal: 10,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    zIndex: 1,
  },
});

export default CustomHeader;
