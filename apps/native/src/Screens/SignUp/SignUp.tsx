import { Column, Columns, FillView, Stack } from '@mobily/stacks';
import { useNavigation } from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {
  Button,
  Input,
  Layout,
  Text,
  TopNavigation,
} from '@ui-kitten/components';
import { useFormik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../Providers';
import { RootStackParamList } from '../types';

export function SignUp({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'SignUp'>) {
  const onLogin = () => navigation.navigate('Login');
  // const onSignUp = () => navigation.navigate('Home');

  const { t } = useTranslation();
  const { signUp } = useAuth();

  const f = useFormik({
    initialValues: {
      email: '',
      name: '',
      password: '',
      passwordConfirm: '',
    },
    async onSubmit({ email, password, name }) {
      await signUp({
        variables: {
          email,
          password,
          name,
        },
      });
    },
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ flexGrow: 1 }}>
        <FillView alignX="center" alignY="center">
          <Text category="h1">Sign Up</Text>
          <Stack space={4} padding={4}>
            <Input placeholder={t`auth.name`} />
            <Input placeholder={t`auth.email`} />
            <Input placeholder={t`auth.password`} />
            <Input placeholder={t`auth.passwordConfirm`} />
            <Columns defaultWidth="1/2" space={4}>
              <Column>
                <Button appearance="outline" status="basic" onPress={onLogin}>
                  Login
                </Button>
              </Column>
              <Column>
                <Button onPress={() => f.handleSubmit()}>Sign Up</Button>
              </Column>
            </Columns>
          </Stack>
        </FillView>
      </Layout>
    </SafeAreaView>
  );
}
