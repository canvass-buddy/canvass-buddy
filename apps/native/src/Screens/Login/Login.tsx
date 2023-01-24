import { Column, Columns, FillView, Stack } from '@mobily/stacks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Input, Layout, Text } from '@ui-kitten/components';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../types';

export function Login({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Login'>) {
  const onLogin = () => navigation.navigate('Home');
  const onSignUp = () => navigation.navigate('SignUp');
  const { t } = useTranslation();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ flexGrow: 1 }}>
        <FillView alignX="center" alignY="center">
          <Stack space={4} padding={4} align="center">
            <Text category="h1">{t`auth.login`}</Text>
            <Input placeholder={t`auth.username`} />
            <Input placeholder={t`auth.password`} />
            <Columns defaultWidth="1/2" space={4}>
              <Column>
                <Button appearance="outline" status="basic" onPress={onSignUp}>
                  {t`auth.signUp`}
                </Button>
              </Column>
              <Column>
                <Button onPress={onLogin}>{t`auth.login`}</Button>
              </Column>
            </Columns>
          </Stack>
        </FillView>
      </Layout>
    </SafeAreaView>
  );
}
