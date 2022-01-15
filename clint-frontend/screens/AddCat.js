import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import colors from "../assets/colors/colors";
import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";
import { FontAwesome5 } from '@expo/vector-icons';

const AddService = (props) => {

  const { submitCat } = props;

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
        <View style={styles.titleCont}>
          <FontAwesome5 name="cat" size={24} color={colors.secondary} />
          <Text style={styles.text}>Add Cat :</Text>
        </View>
        <InputField
          placeholder="name"
          name="paw"
          onChangeText={onChangeCatName}
          value={catName}
        />
        <InputField placeholder="breed" name="paw" onChangeText={onChangeBreed} value={breed} />
        <TextInput
          style={styles.descriptionStyle}
          name="newspaper-o"
          onChangeText={onChangeDescription}
          value={description}
        />
      </View>
      <CustomButton title="Submit" btn={styles.btn} btnText={styles.btnText} onPress={onSubmitCat} />
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
    marginTop: 30,
    alignItems: "center",
    width: "90%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleCont: {
    marginVertical: 20,
    flexDirection: "row",
  },
  text: {
    color: colors.lightGray,
    fontSize: 20,
    marginHorizontal: 10,
  },
  descriptionStyle: {
    backgroundColor: colors.lightGray,
    padding: 5,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    height: 100,
  },
  btn: {
    backgroundColor: colors.secondary,
    width: "50%",
    marginVertical: 20,
  },
  btnText: {
    color: colors.primary,
  },
});

export default AddService;
