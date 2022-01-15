import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import Profile from "../screens/Profile";
import AddCat from "../screens/AddCat";

const Stack = createNativeStackNavigator();

const MainStackNavigator = (props) => {

  const { moveTo, user } = props;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={moveTo}
    >
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="Profile" component={Profile} initialParams={user} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="AddCat" component={AddCat} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;