import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import { HomeStackParamList } from "../types";

export function Profile({}: NativeStackScreenProps<
  HomeStackParamList,
  "Profile"
>) {
  return (
    <View>
      <Text>Profile</Text>
    </View>
  );
}
