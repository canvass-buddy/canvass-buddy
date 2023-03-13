import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { Stack } from '@mobily/stacks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Card, Divider, Text } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import {
  DrawMap,
  ProjectTitle,
  ScreenLayout,
  UserList,
} from '../../../../Components';
import { PROJECT_QUERY } from '../../../../graphql/Project.graphql';
import { graphql } from '../../../../__generated__';
import { User, Project as IProject } from '../../../../__generated__/graphql';
import { HomeStackParamList } from '../types';

const DELETE_PROJECT_MUTATION = graphql(/* GraphQL */ `
  mutation DeleteProject($projectId: String!) {
    deleteProject(projectId: $projectId)
  }
`);

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});

export function Project({
  navigation,
  route,
}: NativeStackScreenProps<HomeStackParamList, 'Project'>) {
  const { data } = useQuery(PROJECT_QUERY, {
    variables: {
      id: route.params.id,
    },
  });
  const client = useApolloClient();
  const [deleteProject] = useMutation(DELETE_PROJECT_MUTATION, {
    variables: {
      projectId: route.params.id,
    },
    update() {
      client.refetchQueries({
        include: 'active',
      });
      navigation.goBack();
    },
  });
  const { t } = useTranslation();
  const project = data?.user?.project ?? route.params.project;
  return (
    <ScreenLayout>
      <Stack padding={4} space={4}>
        <ProjectTitle project={project as IProject} />
        <Button
          onPress={() =>
            navigation.navigate('GroundView', {
              id: route.params.id,
            })
          }
        >{t`util.start`}</Button>
        <UserList users={data?.user?.project?.users as User[]} />
        <Card
          status="danger"
          header={(props) => (
            <Text category="h2" {...props}>{t`util.settings`}</Text>
          )}
        >
          <Button
            status="danger"
            onPress={() => deleteProject()}
          >{t`util.delete`}</Button>
        </Card>
      </Stack>
    </ScreenLayout>
  );
}
