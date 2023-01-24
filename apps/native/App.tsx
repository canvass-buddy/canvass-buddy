import './src/i18n';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import * as eva from '@eva-design/eva';
import { StacksProvider } from '@mobily/stacks';
import { NavigationContainer } from '@react-navigation/native';
import { ApplicationProvider, Layout } from '@ui-kitten/components';
import Constants from 'expo-constants';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Screens } from './src/Screens';

const client = new ApolloClient({
  uri: `http://${Constants.manifest?.debuggerHost
    ?.split(':')
    .shift()}:4000/graphql`,
  cache: new InMemoryCache(),
});

export default function Native() {
  return (
    <ApplicationProvider {...eva} theme={eva.dark}>
      <ApolloProvider client={client}>
        <StacksProvider spacing={4}>
          <Layout style={{ height: '100%' }}>
            <SafeAreaProvider>
              <NavigationContainer>
                <Screens />
              </NavigationContainer>
            </SafeAreaProvider>
          </Layout>
        </StacksProvider>
      </ApolloProvider>
    </ApplicationProvider>
  );
}
