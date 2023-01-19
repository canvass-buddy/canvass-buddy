import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Home } from "./Home";
import { Login } from "./Login";
import { SignUp } from "./SignUp";
import { RootStackParamList } from "./types";


const Stack = createNativeStackNavigator<RootStackParamList>();

export function Screens() {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown:false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  )
}
