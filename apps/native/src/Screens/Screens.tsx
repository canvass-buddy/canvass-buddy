import {
  DefaultTheme,
  LinkingOptions,
  NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@ui-kitten/components';
import React from 'react';
import { useAuth } from '../Providers';
import { Home } from './Home';
import { Login } from './Login';
import { SignUp } from './SignUp';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['localhost'],
  config: {
    screens: {
      Home: {
        path: '/',
      },
      Login: '/login',
      SignUp: '/signup',
    },
  },
};

export function Screens() {
  const { token, isLoadingToken } = useAuth();
  const theme = useTheme();

  if (isLoadingToken) return <></>;

  return (
    <NavigationContainer
      linking={linking}
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: theme['background-basic-color-1'],
        },
      }}
    >
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        {token ? (
          <Stack.Screen name="Home" component={Home} />
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
