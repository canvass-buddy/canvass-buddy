import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../types";
import { TeamScreens } from "./TeamScreens";

export function Team({}: NativeStackScreenProps<HomeStackParamList, "Team">) {
  return <TeamScreens />;
}
