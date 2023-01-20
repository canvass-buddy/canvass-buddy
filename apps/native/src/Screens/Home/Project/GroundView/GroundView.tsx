import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import { ProlejectStackParamList } from "../types";

export function GroundView({
  navigation,
}: NativeStackScreenProps<ProlejectStackParamList, "GroundView">) {
  return (
    <View>
      <Text>Ground View</Text>
    </View>
  );
}
