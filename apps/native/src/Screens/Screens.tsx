import {
  DefaultTheme,
  LinkingOptions,
  NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@ui-kitten/components';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../Providers';
import { Home } from './Home';
import { Login } from './Login';
import { SignUp } from './SignUp';
import { TabsScreens } from './Tabs/Tabs';
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
    <SafeAreaView style={{ width: '100%', height: '100%' }}>
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
            <Stack.Screen name="Home" component={TabsScreens} />
          ) : (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="SignUp" component={SignUp} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
