import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainStackNavigator from "./navigation/NativeStackNavigator";
import Splash from "./screens/Splash";
import { getUser } from "./assets/getUser";

export default function App() {
  const [toRender, setRender] = useState(false);
  const [moveTo, setMoveTo] = useState("SignIn");
  const [user, setUser] = useState(null);

  setTimeout(() => {
    getUser()
      .then((user) => {
        setRender(true);
        if (user != null) {
          setMoveTo("Profiles");
          setUser(user);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, 1000);

  if (!toRender) {
    return <Splash />;
  } else {
    return (
      <NavigationContainer>
        <MainStackNavigator moveTo={moveTo} user={{ user }} />
      </NavigationContainer>
    );
  }
}
