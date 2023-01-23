import { NavigationContainer } from '@react-navigation/native';
import { ApplicationProvider, Layout } from '@ui-kitten/components';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Screens } from './src/Screens';
import * as eva from '@eva-design/eva';
import { StacksProvider } from '@mobily/stacks';

export default function Native() {
  return (
    <ApplicationProvider {...eva} theme={eva.dark}>
      <StacksProvider spacing={4}>
        <Layout style={{ height: '100%' }}>
          <SafeAreaProvider>
            <NavigationContainer>
              <Screens />
            </NavigationContainer>
          </SafeAreaProvider>
        </Layout>
      </StacksProvider>
    </ApplicationProvider>
  );
}
