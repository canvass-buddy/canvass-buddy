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
import { ApplicationProvider } from '@ui-kitten/components';
import { createUploadLink } from 'apollo-upload-client';
import Constants from 'expo-constants';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Providers } from './src/Providers';
import { Screens } from './src/Screens';
import { some } from 'lodash';

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem('token');
  if (!some(token)) return;
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  };
});

const uri = (): string => {
  const host =
    Constants.manifest?.debuggerHost?.split(':').shift() ?? 'localhost';

  const port = 4000;

  return `http://${host}:${port}/graphql`;
};

const uploadLink = createUploadLink({
  uri: uri(),
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
            <SafeAreaProvider>
              <Screens />
            </SafeAreaProvider>
          </StacksProvider>
        </Providers>
      </ApolloProvider>
    </ApplicationProvider>
  );
}
