import { Column, Columns, FillView, Stack } from '@mobily/stacks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Input, Layout, Text } from '@ui-kitten/components';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../types';

export function Login({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Login'>) {
  const onLogin = () => navigation.navigate('Home');
  const onSignUp = () => navigation.navigate('SignUp');
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ flexGrow: 1 }}>
        <FillView alignX="center" alignY="center">
          <Stack space={4} padding={4} align="center">
            <Text category="h1">Login</Text>
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
        </FillView>
      </Layout>
    </SafeAreaView>
  );
}
