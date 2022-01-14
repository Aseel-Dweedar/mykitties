import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainStackNavigator from "./navigation/NativeStackNavigator";
import Splash from "./screens/Splash";
import { getUser } from "./assets/getUser";

export default function App() {
  const [toRender, setRender] = useState(false);
  // const [user, setUser] = useState(false);

  setTimeout(() => {
    getUser()
      .then((user) => {
        // if (user) setUser(true);
        setRender(true);
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
        <MainStackNavigator />
      </NavigationContainer>
    );
  }
}
