import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import colors from "../assets/colors/colors";

const UserProfileData = (props) => {

  const { firstName, lastName, username, phone, email } = props.user;

  return (
    <View>
      <Text style={styles.fullName}>{`${firstName} ${lastName}`}</Text>
      <Text style={styles.text}>{username}</Text>
      <Text style={styles.text}>{phone}</Text>
      <Text style={styles.text}>{email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  fullName: {
    fontWeight: "bold",
    fontSize: 20,
    color: colors.primary,
    marginBottom: 4,
  },
  text: {
    color: colors.primary,
    marginBottom: 10,
  },
});

export default UserProfileData;
