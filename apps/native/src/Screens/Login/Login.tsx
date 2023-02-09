import { Column, Columns, FillView, Stack } from '@mobily/stacks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Input, Layout, Text } from '@ui-kitten/components';
import { useFormik } from 'formik';
import { some } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { toFormikValidate } from 'zod-formik-adapter';
import { z } from 'zod/lib';
import { useAuth } from '../../Providers';
import { RootStackParamList } from '../types';

export function Login({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Login'>) {
  const onSignUp = () => navigation.navigate('SignUp');

  const { t } = useTranslation();
  const { login } = useAuth();

  const Schema = z.object({
    email: z.string().email(),
    password: z.string().min(1, t`errors.required`),
  });

  const f = useFormik({
    validate: toFormikValidate(Schema),
    initialValues: {
      password: '',
      email: '',
    },
    onSubmit({ email, password }) {
      login({
        variables: {
          email,
          password,
        },
      });
    },
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ flexGrow: 1 }}>
        <FillView alignX="center" alignY="center">
          <Stack space={4} padding={4} align="center">
            <Text category="h1">{t`auth.login`}</Text>
            <Input
              placeholder={t`auth.username`}
              value={f.values.email}
              onChangeText={f.handleChange('email')}
              onBlur={f.handleBlur('email')}
              status={f.errors.email ? 'danger' : 'basic'}
              caption={f.errors.email}
            />
            <Input
              placeholder={t`auth.password`}
              secureTextEntry
              value={f.values.password}
              onChangeText={f.handleChange('password')}
              onBlur={f.handleBlur('password')}
              status={f.errors.password ? 'danger' : 'basic'}
              caption={f.errors.password}
            />
            <Columns defaultWidth="1/2" space={4}>
              <Column>
                <Button appearance="outline" status="basic" onPress={onSignUp}>
                  {t`auth.signUp`}
                </Button>
              </Column>
              <Column>
                <Button
                  onPress={() => f.handleSubmit()}
                  disabled={some(f.errors)}
                >{t`auth.login`}</Button>
              </Column>
            </Columns>
          </Stack>
        </FillView>
      </Layout>
    </SafeAreaView>
  );
}
