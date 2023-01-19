import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "ui";
import { HomeStackParamList } from "../types";

export function HomeRoot({ navigation }: NativeStackScreenProps<HomeStackParamList, 'HomeRoot'>) {
  return (
    <SafeAreaView>
      <Text>Home Root</Text>
      <Button text="Profile" onClick={() => navigation.push('Profile')} />
      <Button text="Project" onClick={() => navigation.push('Project')} />
      <Button text="Team" onClick={() => navigation.push('Team')} />
      <Button text="Team Create" onClick={() => navigation.push('TeamCreate')} />
    </SafeAreaView>
  )
}
