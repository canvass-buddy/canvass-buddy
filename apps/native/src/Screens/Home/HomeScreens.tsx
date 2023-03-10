import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { GroundView } from './GroundView';
import { HomeRoot } from './HomeRoot';
import { InviteUser } from './InviteUser';
import { Profile } from './Profile';
import { Project } from './Project';
import { ProjectCreate } from './ProjectCreate';
import { Team } from './Team';
import { TeamCreate } from './TeamCreate';
import { HomeStackParamList } from './types';

const HomeStack = createSharedElementStackNavigator<HomeStackParamList>();

export function HomeScreens() {
  return (
    <HomeStack.Navigator
      initialRouteName="HomeRoot"
      screenOptions={{ headerShown: false }}
    >
      <HomeStack.Screen name="HomeRoot" component={HomeRoot} />
      <HomeStack.Screen name="Profile" component={Profile} />
      <HomeStack.Screen
        name="Project"
        component={Project}
        sharedElements={(route) => {
          return [`project.${route.params.id}.title`];
        }}
      />
      <HomeStack.Screen
        name="Team"
        component={Team}
        sharedElements={(route, to) => {
          if (
            to.name !== 'Team' &&
            to.name !== 'HomeRoot' &&
            to.name !== 'InviteUser'
          )
            return [];
          return [`team.${route.params.id}.image`];
        }}
      />
      <HomeStack.Screen name="TeamCreate" component={TeamCreate} />
      <HomeStack.Screen name="ProjectCreate" component={ProjectCreate} />
      <HomeStack.Screen name="GroundView" component={GroundView} />
      <HomeStack.Screen name="InviteUser" component={InviteUser} />
    </HomeStack.Navigator>
  );
}
