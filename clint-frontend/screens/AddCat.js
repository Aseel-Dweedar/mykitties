import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import colors from "../assets/colors/colors";
import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";
import { FontAwesome5 } from '@expo/vector-icons';

const AddService = (props) => {

  const { submitCat, backToProfile } = props;

  const [catName, setCatName] = useState("");
  const [breed, setBreed] = useState("");
  const [description, setDescription] = useState("");

  const onChangeCatName = (value) => {
    setCatName(value);
  };

  const onChangeBreed = (value) => {
    setBreed(value);
  };

  const onChangeDescription = (value) => {
    setDescription(value);
  };

  const onSubmitCat = () => {
    if (description && catName && breed) {
      submitCat(catName, breed, description);
    } else {
      alert("Please Fill All Fields!");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.InputContainer}>
        <Text style={styles.text}>Add Cat</Text>
        <FontAwesome5 style={{ marginVertical: 20 }} name="cat" size={45} color={colors.secondary} />
        <Text style={styles.labelText} >Cat Name</Text>
        <InputField
          placeholder="name"
          name="paw"
          onChangeText={onChangeCatName}
          value={catName}
        />
        <Text style={styles.labelText}>Cat Breed</Text>
        <InputField placeholder="breed" name="paw" onChangeText={onChangeBreed} value={breed} />
        <Text style={styles.labelText}>Cat Description</Text>
        <TextInput
          style={styles.descriptionStyle}
          name="newspaper-o"
          onChangeText={onChangeDescription}
          value={description}
        />
      </View>

      <View style={styles.btnContainer}>
        <CustomButton title="Submit" btn={styles.btn} btnText={styles.btnText} onPress={onSubmitCat} />
        <CustomButton
          title="Back"
          btn={{ ...styles.btn, backgroundColor: colors.lightGray }}
          btnText={styles.btnText}
          onPress={() => backToProfile()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
  },
  InputContainer: {
    alignItems: "center",
    width: "90%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    color: colors.lightGray,
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  descriptionStyle: {
    backgroundColor: colors.lightGray,
    padding: 5,
    marginVertical: 10,
    width: "100%",
    height: 100,
    justifyContent: "flex-start",
    textAlignVertical: 'top'
  },
  labelText: {
    color: colors.lightGray,
    marginTop: 10,
  },
  btnContainer: {
    width: "100%",
    marginTop: 30
  },
  btn: {
    backgroundColor: colors.secondary,
    margin: 10,
  },
  btnText: {
    color: colors.primary,
  },
});

export default AddService;
