import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Splash from "./screens/Splash";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import Profile from "./screens/Profile";

const Stack = createNativeStackNavigator();

export default function App() {
  const [toRender, setRender] = useState(false);
  const [moveTo, setMoveTo] = useState("SignIn");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        let jsonValue = await AsyncStorage.getItem("user");
        if (jsonValue) {
          jsonValue = JSON.parse(jsonValue);
          setUser(jsonValue);
          setMoveTo("Profile");
        }
        setRender(true);
      } catch (e) {
        console.log(e);
      }
    }
    getUser();
  }, []);

  if (!toRender) {
    return <Splash />;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={moveTo}
        >
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="Profile" component={Profile} initialParams={{ user }} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
