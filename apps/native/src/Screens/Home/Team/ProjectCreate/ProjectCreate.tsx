import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TeamStackParamList } from "../types";

export function ProjectCreate({ navigation }: NativeStackScreenProps<TeamStackParamList, 'ProjectCreate'>) {
  return (
    <SafeAreaView>
      <Text>Project Create</Text>
    </SafeAreaView>
  )
}
