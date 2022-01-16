import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Text, ActivityIndicator, TextInput, Modal } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../assets/colors/colors";
import axios from "axios";
import UserProfileData from "../components/UserProfileData";
import CatsList from "../components/CatsList";
import CustomButton from "../components/CustomButton";
import InputField from "../components/InputField";
import AddCat from "./AddCat";

const API_URL = process.env.API_URL;

const Profile = ({ navigation, route }) => {

  const [catsList, setCatsList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [addCatRender, setAddCatRender] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [catName, setCatName] = useState("");
  const [breed, setBreed] = useState("");
  const [description, setDescription] = useState("");
  const [catId, setCatId] = useState("");
  const [user, setUser] = useState(route.params.user._id);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${API_URL}/cat`, {
        headers: {
          authorization: `Bearer ${route.params.user.token}`,
        },
      })
      .then((axiosRes) => {
        setCatsList(() => axiosRes.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        alert("An error happens!! please try again later!");
      });
  }, [route.params.user._id]);


  const deleteCat = (catId) => {
    axios
      .delete(`${API_URL}/cat/${catId}`, {
        headers: {
          authorization: `Bearer ${route.params.user.token}`,
        },
      })
      .then((axiosRes) => {
        setCatsList(axiosRes.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitCat = (name, breed, description) => {
    let reqBody = { name, description, breed };
    axios
      .post(`${API_URL}/cat`, reqBody, {
        headers: {
          authorization: `Bearer ${route.params.user.token}`,
        },
      })
      .then((axiosRes) => {
        setAddCatRender(false);
        setCatsList(axiosRes.data);
      })
      .catch((err) => {
        alert("An error happens!! please try again later");
      });
  };

  const updateCat = () => {
    let reqBody = { name: catName, description: description, breed: breed };
    axios
      .put(`${API_URL}/cat/${catId}`, reqBody, {
        headers: {
          authorization: `Bearer ${route.params.user.token}`,
        },
      })
      .then((axiosRes) => {
        setCatsList(axiosRes.data);
        setModalVisible(false);
      })
      .catch((err) => {
        alert("An error happens!! please try again later");
      });
  };

  const showModal = (cat) => {
    setCatName(cat.name);
    setBreed(cat.breed);
    setDescription(cat.description);
    setCatId(cat._id);
    setModalVisible(true);
  }


  const onChangeCatName = (value) => {
    setCatName(value);
  };

  const onChangeBreed = (value) => {
    setBreed(value);
  };

  const onChangeDescription = (value) => {
    setDescription(value);
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem("user");
      navigation.navigate("SignIn");
    } catch (e) {
      console.log(e);
    }
  };

  const goToAddCat = () => {
    setAddCatRender(true);
  };

  const backToProfile = () => {
    setAddCatRender(false);
  }

  if (addCatRender) {
    return <AddCat submitCat={submitCat} backToProfile={backToProfile} />
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <TouchableOpacity style={styles.logOutContainer} onPress={signOut}>
          <FontAwesome name="sign-out" size={22} color={colors.secondary} />
          <Text style={styles.logOutText}>Sign-Out</Text>
        </TouchableOpacity>
        {user && <UserProfileData user={route.params.user} />}
      </View>
      <View style={styles.catsContainer}>
        {isLoading ? <ActivityIndicator color={colors.secondary} size="large" /> : <CatsList showModal={showModal} deleteCat={deleteCat} catsList={catsList} />}
        <CustomButton
          title="Add Cat"
          btn={{ backgroundColor: colors.secondary, width: "100%", marginBottom: 40 }} btnText={styles.btnText}
          onPress={goToAddCat}
        />
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.inputContainer} >
              <Text style={styles.modalText}>Edit your cat</Text>
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
            <View style={styles.btnContainer}>
              <CustomButton title="Cancel" btn={{ width: "40%", backgroundColor: colors.primary }}
                btnText={{ color: colors.secondary }} onPress={() => setModalVisible(!modalVisible)} />
              <CustomButton
                title="Update"
                btn={styles.btn} btnText={styles.btnText}
                onPress={updateCat}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
    paddingTop: 50,
    backgroundColor: colors.lightGray,
  },
  profileContainer: {
    flex: 1,
    paddingHorizontal: 30,
  },
  logOutContainer: {
    flexDirection: "row",
    padding: 7,
    marginBottom: 10,
    backgroundColor: colors.primary,
    borderRadius: 15,
    alignItems: "center",
    alignSelf: "flex-end",
  },
  logOutText: {
    color: colors.lightGray,
    marginLeft: 10,
  },
  catsContainer: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: colors.primary,
    padding: 20,
    flex: 2,
    justifyContent: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: `${colors.lightGray}90`
  },
  modalView: {
    margin: 20,
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    width: "90%",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: colors.lightGray,
    fontSize: 20
  },
  inputContainer: {
    width: "100%",
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
  btnContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  btn: {
    backgroundColor: colors.secondary,
    width: "40%",
  },
  btnText: {
    color: colors.primary,
  },
});

export default Profile;
