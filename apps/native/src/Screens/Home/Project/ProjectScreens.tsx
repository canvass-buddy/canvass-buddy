import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GroundView } from "./GroundView";
import { InviteUser } from "./InviteUser";
import { ProjectRoot } from "./ProjectRoot/ProjectRoot";
import { ProlejectStackParamList } from "./types";

const ProjectStack = createNativeStackNavigator<ProlejectStackParamList>();

export function ProjectScreens() {
  return (
    <ProjectStack.Navigator
      initialRouteName="ProjectRoot"
      screenOptions={{ headerShown: false }}
    >
      <ProjectStack.Screen name="ProjectRoot" component={ProjectRoot} />
      <ProjectStack.Screen name="InviteUser" component={InviteUser} />
      <ProjectStack.Screen name="GroundView" component={GroundView} />
    </ProjectStack.Navigator>
  );
}
