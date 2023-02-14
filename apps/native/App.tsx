import './src/i18n';

import {
  ApolloClient,
  ApolloProvider,
  from,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import * as eva from '@eva-design/eva';
import { StacksProvider } from '@mobily/stacks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { ApplicationProvider, Layout } from '@ui-kitten/components';
import { createUploadLink } from 'apollo-upload-client';
import Constants from 'expo-constants';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Providers } from './src/Providers';
import { Screens } from './src/Screens';

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem('token');
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  };
});

const uploadLink = createUploadLink({
  uri: `http://${Constants.manifest?.debuggerHost
    ?.split(':')
    .shift()}:4000/graphql`,
});

const client = new ApolloClient({
  link: from([authLink, uploadLink]),
  cache: new InMemoryCache(),
});

export default function Native() {
  return (
    <ApplicationProvider {...eva} theme={eva.dark}>
      <ApolloProvider client={client}>
        <Providers>
          <StacksProvider spacing={4}>
            <Layout style={{ height: '100%' }}>
              <SafeAreaProvider>
                <NavigationContainer>
                  <Screens />
                </NavigationContainer>
              </SafeAreaProvider>
            </Layout>
          </StacksProvider>
        </Providers>
      </ApolloProvider>
    </ApplicationProvider>
  );
}
