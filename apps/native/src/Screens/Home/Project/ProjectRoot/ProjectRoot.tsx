import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import { Button } from "ui";
import { ProlejectStackParamList } from "../types";

export function ProjectRoot({
  navigation,
}: NativeStackScreenProps<ProlejectStackParamList, "ProjectRoot">) {
  return (
    <View>
      <Text>Project Root</Text>
      <Button
        text="Ground View"
        onClick={() => navigation.push("GroundView")}
      />
      <Button
        text="Invite User"
        onClick={() => navigation.push("InviteUser")}
      />
    </View>
  );
}
