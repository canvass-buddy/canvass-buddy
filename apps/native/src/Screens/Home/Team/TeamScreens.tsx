import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ProjectCreate } from './ProjectCreate';
import { TeamRoot } from './TeamRoot';
import { TeamStackParamList } from './types';

const TeamStack = createNativeStackNavigator<TeamStackParamList>();

export function TeamScreens() {
  return (
    <TeamStack.Navigator
      initialRouteName="TeamRoot"
      screenOptions={{ headerShown: false }}
    >
      <TeamStack.Screen name="TeamRoot" component={TeamRoot} />
      <TeamStack.Screen name="ProjectCreate" component={ProjectCreate} />
    </TeamStack.Navigator>
  );
}
