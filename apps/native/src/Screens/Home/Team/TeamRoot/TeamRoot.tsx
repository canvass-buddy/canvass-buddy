import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "ui";
import { TeamStackParamList } from "../types";

export function TeamRoot({
  navigation,
}: NativeStackScreenProps<TeamStackParamList, "TeamRoot">) {
  return (
    <SafeAreaView>
      <Text>Team Root</Text>
      <Button
        text="Project Create"
        onClick={() => navigation.push("ProjectCreate")}
      />
    </SafeAreaView>
  );
}
