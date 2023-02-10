import './src/i18n';

import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  concat,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import * as eva from '@eva-design/eva';
import { StacksProvider } from '@mobily/stacks';
import { NavigationContainer } from '@react-navigation/native';
import { ApplicationProvider, Layout } from '@ui-kitten/components';
import Constants from 'expo-constants';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Screens } from './src/Screens';
import { Providers } from './src/Providers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createUploadLink } from 'apollo-upload-client';

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(async () => {
    const token = await AsyncStorage.getItem('token');
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  });
  return forward(operation);
});

const link = new HttpLink({
  uri: `http://${Constants.manifest?.debuggerHost
    ?.split(':')
    .shift()}:4000/graphql`,
});

const uploadLink = createUploadLink({
  uri: `http://${Constants.manifest?.debuggerHost
    ?.split(':')
    .shift()}:4000/graphql`,
});

const client = new ApolloClient({
  link: ApolloLink.from([authMiddleware, uploadLink]),
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
