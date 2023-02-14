import { useApolloClient, useMutation } from '@apollo/client';
import { Stack } from '@mobily/stacks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Input, Layout, TopNavigation } from '@ui-kitten/components';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { gql } from '../../../__generated__';
import { HomeStackParamList } from '../types';

const CREATE_TEAM_MUTATION = gql(/* GraphQL */ `
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
      await createTeam({
        variables: {
          team: {
            title,
            description,
            longitude: 0,
            latitude: 0,
          },
        },
      });
      navigation.navigate('HomeRoot');
    },
  });
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title="Team Create" alignment="center" />
      <Layout style={{ flexGrow: 1 }}>
        <Stack padding={4} space={4}>
          <Button>{t`util.uploadTeamImage`}</Button>
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
      </Layout>
    </SafeAreaView>
  );
}
