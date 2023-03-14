import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { Stack } from '@mobily/stacks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Card, Text } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';
import { ProjectTitle, ScreenLayout, UserList } from '../../../../Components';
import { graphql } from '../../../../__generated__';
import { HomeStackParamList } from '../types';

const DELETE_PROJECT_MUTATION = graphql(/* GraphQL */ `
  mutation DeleteProject($projectId: String!) {
    deleteProject(projectId: $projectId)
  }
`);

const PROJECT_QUERY = graphql(/* GraphQL */ `
  query ProjectQuery($id: String!) {
    user {
      project(id: $id) {
        ...ProjectTitle_ProjectFragment
        users {
          ...UserList_UserFragment
        }
      }
    }
  }
`);

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
  return (
    <ScreenLayout>
      <Stack padding={4} space={4}>
        <ProjectTitle project={route.params.project ?? data?.user?.project} />
        <Button
          onPress={() =>
            navigation.navigate('GroundView', {
              id: route.params.id,
            })
          }
        >{t`util.start`}</Button>
        <UserList users={data?.user?.project?.users} />
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
