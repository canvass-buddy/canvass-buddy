import { Column, Columns, FillView, Stack } from '@mobily/stacks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Avatar, Button, Input, Layout, Text } from '@ui-kitten/components';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';
import { toFormikValidate } from 'zod-formik-adapter';
import { useAuth } from '../../Providers';
import { RootStackParamList } from '../types';
import * as ImagePicker from 'expo-image-picker';
import { ReactNativeFile } from 'apollo-upload-client';

export function SignUp({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'SignUp'>) {
  const onLogin = () => navigation.navigate('Login');

  const [imageUri, setImageUri] = useState<string>();

  const { t } = useTranslation();
  const { signUp } = useAuth();

  const Schema = z
    .object({
      firstName: z.string().min(1, t`errors.required`),
      lastName: z.string().min(1, t`errors.required`),
      email: z.string().email(),
      password: z.string().min(8, t`errors.auth.passwordMinLength`),
      passwordConfirm: z.string().min(8, t`errors.auth.passwordMinLength`),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: t`error.auth.passwordMustMatch`,
      path: ['passwordConfirm', 'password'],
    });

  const f = useFormik({
    validate: toFormikValidate(Schema),
    initialValues: {
      firstName: 'Erik',
      lastName: 'Badger',
      email: 'erikbadger777@gmail.com',
      password: 'abcd1234',
      passwordConfirm: 'abcd1234',
    },
    async onSubmit({ email, password, firstName, lastName }) {
      const name = `${firstName} ${lastName}`;
      // const profileImage = imageUri
      //   ? await fetch(imageUri).then((f) => f.blob())
      //   : null;
      // console.log('profile image', profileImage);
      const profileImage = new ReactNativeFile({
        uri: imageUri ?? '',
        name: 'a.jpg',
        type: 'image/jpeg',
      });
      await signUp({
        variables: {
          email,
          password,
          name,
          profileImage,
        },
      });
    },
  });

  const onPickImage = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    setImageUri(res.assets?.[0].uri);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ flexGrow: 1 }}>
        <FillView alignX="center" alignY="center">
          <Avatar size="giant" source={{ uri: imageUri }} />
          <Text category="h1">Sign Up</Text>
          <Stack space={4} padding={4}>
            <Button onPress={onPickImage}>Pick Image</Button>
            <Columns defaultWidth="1/2" space={4}>
              <Column>
                <Input
                  placeholder={t`auth.firstName`}
                  value={f.values.firstName}
                  onChangeText={f.handleChange('firstName')}
                  onBlur={f.handleBlur('firstName')}
                  status={f.errors.firstName ? 'danger' : 'basic'}
                  caption={f.errors.firstName}
                />
              </Column>
              <Column>
                <Input
                  placeholder={t`auth.lastName`}
                  value={f.values.lastName}
                  onChangeText={f.handleChange('lastName')}
                  onBlur={f.handleBlur('lastName')}
                  status={f.errors.lastName ? 'danger' : 'basic'}
                  caption={f.errors.lastName}
                />
              </Column>
            </Columns>
            <Input
              placeholder={t`auth.email`}
              value={f.values.email}
              onChangeText={f.handleChange('email')}
              onBlur={f.handleBlur('email')}
              status={f.errors.email ? 'danger' : 'basic'}
              caption={f.errors.email}
            />
            <Input
              secureTextEntry
              placeholder={t`auth.password`}
              value={f.values.password}
              onChangeText={f.handleChange('password')}
              onBlur={f.handleBlur('password')}
              status={f.errors.password ? 'danger' : 'basic'}
              caption={f.errors.password}
            />
            <Input
              secureTextEntry
              placeholder={t`auth.passwordConfirm`}
              value={f.values.passwordConfirm}
              onChangeText={f.handleChange('passwordConfirm')}
              onBlur={f.handleBlur('passwordConfirm')}
              status={f.errors.passwordConfirm ? 'danger' : 'basic'}
              caption={f.errors.passwordConfirm}
            />
            <Columns defaultWidth="1/2" space={4}>
              <Column>
                <Button appearance="outline" status="basic" onPress={onLogin}>
                  {t`auth.login`}
                </Button>
              </Column>
              <Column>
                <Button onPress={() => f.handleSubmit()}>
                  {t`auth.signUp`}
                </Button>
              </Column>
            </Columns>
          </Stack>
        </FillView>
      </Layout>
    </SafeAreaView>
  );
}
