import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GroundView } from './GroundView';
import { HomeRoot } from './HomeRoot';
import { InviteUser } from './InviteUser';
import { Profile } from './Profile';
import { Project } from './Project';
import { ProjectCreate } from './ProjectCreate';
import { Team } from './Team';
import { TeamCreate } from './TeamCreate';
import { HomeStackParamList } from './types';

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

export function HomeScreens() {
  return (
    <HomeStack.Navigator
      initialRouteName="HomeRoot"
      screenOptions={{ headerShown: false }}
    >
      <HomeStack.Screen name="HomeRoot" component={HomeRoot} />
      <HomeStack.Screen name="Profile" component={Profile} />
      <HomeStack.Screen name="Project" component={Project} />
      <HomeStack.Screen name="Team" component={Team} />
      <HomeStack.Screen name="TeamCreate" component={TeamCreate} />
      <HomeStack.Screen name="ProjectCreate" component={ProjectCreate} />
      <HomeStack.Screen name="GroundView" component={GroundView} />
      <HomeStack.Screen name="InviteUser" component={InviteUser} />
    </HomeStack.Navigator>
  );
}
