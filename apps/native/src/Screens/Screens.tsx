import {
  DefaultTheme,
  LinkingOptions,
  NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@ui-kitten/components';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../Providers';
import { Home } from './Tabs/Home';
import { Login } from './Login';
import { SignUp } from './SignUp';
import { TabsScreens } from './Tabs/Tabs';
import { RootStackParamList } from './types';
import { graphql } from '../__generated__';
import { useQuery } from '@apollo/client';

const Stack = createNativeStackNavigator<RootStackParamList>();

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['localhost'],
  config: {
    screens: {
      Tabs: {
        path: '/',
      },
      Login: '/login',
      SignUp: '/signup',
    },
  },
};

const SCREENS_QUERY = graphql(/* GraphQL */ `
  query ScreensQuery {
    user {
      id
    }
  }
`);

export function Screens() {
  const { token, isLoadingToken } = useAuth();
  const theme = useTheme();

  const { data, refetch, loading } = useQuery(SCREENS_QUERY, {});

  useEffect(() => {
    refetch();
  }, [token]);

  if (isLoadingToken || loading) return <></>;

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
          {data?.user?.id ? (
            <Stack.Screen name="Tabs" component={TabsScreens} />
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
