import { Column, Columns, Stack } from '@mobily/stacks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Input, Layout, TopNavigation } from '@ui-kitten/components';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../types';

export function Login({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Login'>) {
  const onLogin = () => navigation.push('Home');
  const onSignUp = () => navigation.push('SignUp');
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title="Login" alignment="center" />
      <Layout style={{ flexGrow: 1 }}>
        <Stack space={4} padding={4}>
          <Input placeholder="Username" />
          <Input placeholder="Password" />
          <Columns defaultWidth="1/2" space={4}>
            <Column>
              <Button appearance="outline" status="basic" onPress={onSignUp}>
                Sign Up
              </Button>
            </Column>
            <Column>
              <Button onPress={onLogin}>Login</Button>
            </Column>
          </Columns>
        </Stack>
      </Layout>
    </SafeAreaView>
  );
}
