import { useMutation } from '@apollo/client';
import { Stack } from '@mobily/stacks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Input, Layout, TopNavigation } from '@ui-kitten/components';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { gql } from '../../../__generated__';
import { HomeStackParamList } from '../types';

const CREATE_PROJECT = gql(/* GraphQL */ `
  mutation CreateProject($teamId: String!, $project: CreateProject!) {
    createProject(teamId: $teamId, project: $project) {
      id
    }
  }
`);

export function ProjectCreate({
  navigation,
  route,
}: NativeStackScreenProps<HomeStackParamList, 'ProjectCreate'>) {
  const { t } = useTranslation();
  const [createProject] = useMutation(CREATE_PROJECT);
  const f = useFormik({
    initialValues: {
      title: '',
    },
    async onSubmit({ title }) {
      const { data } = await createProject({
        variables: {
          teamId: route.params.id,
          project: {
            title,
            area: {
              x1: 0,
              x2: 0,
              y1: 0,
              y2: 0,
            },
          },
        },
      });
      if (data) {
        navigation.navigate('Project', {
          id: data?.createProject.id,
        });
      }
    },
  });
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title="Project Create" />
      <Layout style={{ flexGrow: 1 }}>
        <Stack padding={4} space={4}>
          <Input
            placeholder={t`util.projectName`}
            value={f.values.title}
            onChangeText={f.handleChange('title')}
            onBlur={f.handleBlur('title')}
          />
          <Button
            onPress={() => f.handleSubmit()}
          >{t`util.createProject`}</Button>
        </Stack>
      </Layout>
    </SafeAreaView>
  );
}
