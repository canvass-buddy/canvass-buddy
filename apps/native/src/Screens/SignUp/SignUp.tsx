import { Column, Columns, Stack } from '@mobily/stacks';
import { useNavigation } from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { Button, Input, Layout, TopNavigation } from '@ui-kitten/components';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../types';

export function SignUp({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'SignUp'>) {
  const onLogin = () => navigation.push('Login');
  const onSignUp = () => navigation.push('Home');
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title="Sign Up" alignment="center" />
      <Layout style={{ flexGrow: 1 }}>
        <Stack space={4} padding={4}>
          <Input placeholder="Username" />
          <Input placeholder="Password" />
          <Columns defaultWidth="1/2" space={4}>
            <Column>
              <Button appearance="outline" status="basic" onPress={onLogin}>
                Login
              </Button>
            </Column>
            <Column>
              <Button onPress={onSignUp}>Sign Up</Button>
            </Column>
          </Columns>
        </Stack>
      </Layout>
    </SafeAreaView>
  );
}
