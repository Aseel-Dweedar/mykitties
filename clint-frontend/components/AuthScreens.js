import React from "react";
import { StyleSheet, View, Text } from "react-native";
import colors from "../assets/colors/colors";

const AuthScreens = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.welcome}>WELCOME !</Text>
      </View>
      <View style={styles.mainBody}>{props.children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 3.5,
    backgroundColor: colors.primary,
  },
  topSection: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary
  },
  mainBody: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: colors.lightGray,
    width: "100%",
    flex: 2.5,
    justifyContent: "center",
    alignItems: "center",
  },
  welcome: {
    color: "white",
    fontSize: 30,
  },
});

export default AuthScreens;
