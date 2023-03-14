import { useApolloClient, useMutation } from '@apollo/client';
import { Stack } from '@mobily/stacks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Input, Layout, TopNavigation } from '@ui-kitten/components';
import { ReactNativeFile } from 'apollo-upload-client';
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, Image, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenLayout } from '../../../../Components';
import { graphql } from '../../../../__generated__';
import { HomeStackParamList } from '../types';

const CREATE_TEAM_MUTATION = graphql(/* GraphQL */ `
  mutation CreateTeam($team: CreateTeam!) {
    createTeam(team: $team) {
      id
    }
  }
`);

export function TeamCreate({
  navigation,
}: NativeStackScreenProps<HomeStackParamList, 'TeamCreate'>) {
  const client = useApolloClient();
  const [imageUri, setImageUri] = useState<string>();
  const [createTeam] = useMutation(CREATE_TEAM_MUTATION, {
    update() {
      client.refetchQueries({
        include: ['HomeQuery'],
      });
    },
  });
  const { t } = useTranslation();
  const f = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    async onSubmit({ title, description }) {
      const image = new ReactNativeFile({
        uri: imageUri ?? '',
        name: 'a.jpg',
        type: 'image/jpeg',
      });
      await createTeam({
        variables: {
          team: {
            title,
            description,
            image,
            longitude: 0,
            latitude: 0,
            private: false,
          },
        },
      });
      navigation.navigate('HomeRoot');
    },
  });
  const onUploadImage = async () => {
    const res = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });
    setImageUri(res.assets?.[0].uri);
  };

  const [stackWidth, setStackWidth] = useState(0);
  const imageHeight = Math.round((stackWidth * 9) / 16);
  return (
    <ScreenLayout>
      <Stack padding={4} space={4}>
        <Button onPress={onUploadImage}>{t`util.uploadTeamImage`}</Button>
        <Image
          source={{ uri: imageUri }}
          style={{
            width: stackWidth,
            height: imageHeight,
          }}
        />
        <View
          onLayout={(e) => setStackWidth(e.nativeEvent.layout.width)}
        ></View>
        <Input
          placeholder={t`util.teamTitle`}
          onChangeText={f.handleChange('title')}
          onBlur={f.handleBlur('title')}
          value={f.values.title}
        />
        <Input
          placeholder={t`util.teamDescription`}
          onChangeText={f.handleChange('description')}
          onBlur={f.handleBlur('description')}
          value={f.values.description}
        />
        <Button onPress={() => f.handleSubmit()}>{t`util.createTeam`}</Button>
      </Stack>
    </ScreenLayout>
  );
}
