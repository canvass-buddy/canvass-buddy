import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import { HomeStackParamList } from "../types";

export function TeamCreate({}: NativeStackScreenProps<HomeStackParamList, 'TeamCreate'>) {
  return (
    <View>
      <Text>Team Create</Text>
    </View>
  )
}
