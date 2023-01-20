import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { HomeScreens } from "./HomeScreens";

export function Home({}: NativeStackScreenProps<RootStackParamList>) {
  return <HomeScreens />;
}
