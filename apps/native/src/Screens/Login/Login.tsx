import { useNavigation } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "ui";
import { RootStackParamList } from "../types";

export function Login({}: NativeStackScreenProps<RootStackParamList, "Login">) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <SafeAreaView>
      <Button
        text="Login"
        onClick={() => {
          navigation.push("Home");
        }}
      />
      <Button
        text="Sign Up"
        onClick={() => {
          navigation.push("SignUp");
        }}
      />
    </SafeAreaView>
  );
}
