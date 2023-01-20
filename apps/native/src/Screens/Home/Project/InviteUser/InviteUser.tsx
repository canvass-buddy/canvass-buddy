import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import { ProlejectStackParamList } from "../types";

export function InviteUser({
  navigation,
}: NativeStackScreenProps<ProlejectStackParamList, "InviteUser">) {
  return (
    <View>
      <Text>Invite User</Text>
    </View>
  );
}
