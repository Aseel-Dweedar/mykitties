import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../assets/colors/colors";

function Splash() {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>MY KITTIES</Text>
      <Text style={styles.secondText}>Track Your Cats</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 40,
    fontFamily: "sans-serif",
  },
  secondText: {
    color: "gray",
    fontSize: 22,
    fontFamily: "sans-serif",
  },
});

export default Splash;
