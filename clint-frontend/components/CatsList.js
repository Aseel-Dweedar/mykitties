import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from '@expo/vector-icons';
import colors from "../assets/colors/colors";

const CatsList = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>MY KITTIES</Text>
      <ScrollView style={{ width: "100%" }}>
        {props.catsList && props.catsList.length ? (
          props.catsList.map((cat, index) => {
            return (
              <View key={index} style={styles.oneCat}>
                <View style={styles.textContainer}>
                  <Text style={styles.catName}>{`${cat.name} - ${cat.breed}`}</Text>
                  <Text style={styles.text}>{cat.description}</Text>
                </View>
                <View style={styles.iconsContainer}>
                  <TouchableOpacity onPress={() => props.showModal(cat)} style={{ marginRight: 7 }}>
                    <Feather name="edit-3" size={22} color={colors.secondary} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => props.deleteCat(cat._id)}>
                    <MaterialIcons name="delete" size={22} color={colors.secondary} />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
        ) : (
          <Text style={{ color: colors.lightGray, textAlign: "center" }}>YOUR CATS LIST IS EMPTY !!</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginBottom: 25,
  },
  mainText: {
    color: colors.lightGray,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  oneCat: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 7,
    backgroundColor: colors.lightGray,
    padding: 7,
    borderRadius: 5,
  },
  textContainer: {
    maxWidth: "80%",
    padding: 5
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  catName: {
    fontWeight: "bold",
    fontSize: 15,
    color: colors.primary,
    marginBottom: 4,
  },
  text: {
    color: colors.primary,
  },
});

export default CatsList;
