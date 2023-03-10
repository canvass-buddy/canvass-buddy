import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { AntDesign } from '@expo/vector-icons';
import { Stack } from '@mobily/stacks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Avatar,
  Button,
  Card,
  Divider,
  Menu,
  MenuItem,
  Text,
} from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';
import { DrawMap, ScreenLayout, UserList } from '../../../Components';
import { imageUri } from '../../../helpers';
import { gql } from '../../../__generated__';
import { HomeStackParamList } from '../types';
import { ScrollView, StyleSheet } from 'react-native';
import { PROJECT_QUERY } from '../../../graphql/Project.graphql';
import { User } from '../../../__generated__/graphql';

const DELETE_PROJECT_MUTATION = gql(/* GraphQL */ `
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
  return (
    <ScreenLayout>
      {data?.user?.project?.area && (
        <DrawMap
          style={styles.map}
          initialRegion={{
            longitude: data.user.project.area.x1,
            latitude: data.user.project.area.y1,
          }}
          area={data.user.project.area}
        >
          <Stack space={4}>
            <Text category="h1">{data.user.project.title}</Text>
            <Button
              onPress={() =>
                navigation.navigate('GroundView', {
                  id: route.params.id,
                })
              }
            >{t`util.start`}</Button>
            <Divider />
            <UserList users={data.user.project.users as User[]} />
            <Divider />
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
        </DrawMap>
      )}
    </ScreenLayout>
  );
}
