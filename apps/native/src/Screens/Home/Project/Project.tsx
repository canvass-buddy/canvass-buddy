import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import { HomeStackParamList } from "../types";
import { ProjectScreens } from "./ProjectScreens";

export function Project({}: NativeStackScreenProps<HomeStackParamList, 'Project'>) {
  return <ProjectScreens />;
}
