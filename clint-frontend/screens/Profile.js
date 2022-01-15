import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import colors from "../assets/colors/colors";
import axios from "axios";
import UserProfileData from "../components/UserProfileData";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CatsList from "../components/CatsList";
import CustomButton from "../components/CustomButton";
import AddCat from "./AddCat";

const API_URL = process.env.API_URL;

const Profile = ({ navigation, route }) => {

  const user = route.params.user;

  const [catsList, setCatsList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [addCatRender, setAddCatRender] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${API_URL}/cat`, {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      })
      .then((axiosRes) => {
        setIsLoading(false);
        setCatsList(() => axiosRes.data);
      })
      .catch((err) => {
        setIsLoading(false);
        alert("An error happens!! please try again later!");
      });
  }, []);


  const deleteCat = (catId) => {
    axios
      .delete(`${API_URL}/cat/${catId}`, {
        headers: {
          authorization: `Bearer ${user.token}`,
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
          authorization: `Bearer ${user.token}`,
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

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem("user");
      navigation.navigate("SignIn")
    } catch (e) {
      console.log(e);
    }
  };

  const goToAddCat = () => {
    setAddCatRender(true);
  };

  if (addCatRender) {
    return <AddCat submitCat={submitCat} />
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <TouchableOpacity style={styles.logOutContainer} onPress={signOut}>
          <FontAwesome name="sign-out" size={22} color={colors.secondary} />
          <Text style={styles.logOutText}>Sign-Out</Text>
        </TouchableOpacity>
        {user && <UserProfileData user={user} />}
      </View>
      <View style={styles.catsContainer}>
        {isLoading ? <ActivityIndicator color={colors.secondary} size="large" /> : <CatsList deleteCat={deleteCat} catsList={catsList} />}
      </View>
      <CustomButton
        title="Add Cat"
        btn={styles.btn} btnText={styles.btnText}
        onPress={goToAddCat}
      />
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
    justifyContent: "center"
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
