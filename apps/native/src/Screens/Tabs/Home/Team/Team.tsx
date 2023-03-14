import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { Stack, Tiles } from '@mobily/stacks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Card, Divider, Text } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';
import {
  ProjectList,
  ScreenLayout,
  TeamCard,
  UserProfile,
} from '../../../../Components';
import { graphql } from '../../../../__generated__';
import { HomeStackParamList } from '../types';

const DELETE_TEAM_MUTATION = graphql(/* GraphQL */ `
  mutation DeleteTeam($teamId: String!) {
    deleteTeam(teamId: $teamId)
  }
`);

const TEAM_QUERY = graphql(/* GraphQL */ `
  query TeamQuery($id: String!) {
    team(id: $id) {
      ...TeamCard_TeamFragment
      users {
        id
        ...UserProfile_UserFragment
      }
      projects {
        id
        ...ProjectList_ProjectFragment
      }
    }
  }
`);

export function Team({
  navigation,
  route,
}: NativeStackScreenProps<HomeStackParamList, 'Team'>) {
  const { data } = useQuery(TEAM_QUERY, {
    variables: {
      id: route.params.id,
    },
  });

  const [deleteTeam] = useMutation(DELETE_TEAM_MUTATION, {
    variables: {
      teamId: route.params.id,
    },
    update() {
      client.refetchQueries({
        include: 'active',
      });
      navigation.navigate('HomeRoot');
    },
  });

  const client = useApolloClient();

  const { t } = useTranslation();

  return (
    <ScreenLayout>
      <ScrollView>
        <Tiles space={4} padding={4} columns={1}>
          <TeamCard team={route.params.team ?? data?.team} />
          <Divider />
          {data?.team?.projects && (
            <ProjectList
              projects={data?.team?.projects}
              onPressProject={(id) =>
                navigation.navigate('Project', {
                  id,
                })
              }
            />
          )}
          <Button
            appearance="outline"
            onPress={() =>
              navigation.navigate('ProjectCreate', { id: route.params.id })
            }
          >{t`util.createProject`}</Button>
          <Divider />
          <Stack space={4}>
            <Text category="h2">{t`util.users`}</Text>
            {data?.team?.users?.map((user) => (
              <UserProfile key={user.id} user={user} />
            ))}
          </Stack>
          <Button
            appearance="outline"
            onPress={() =>
              navigation.navigate('InviteUser', {
                teamId: route.params.id,
              })
            }
          >{t`util.inviteUser`}</Button>
          <Divider />
          <Card
            header={(props) => (
              <Text {...props} category="h6">{t`util.settings`}</Text>
            )}
            status="danger"
          >
            <Button
              status="danger"
              onPress={() => deleteTeam()}
            >{t`util.delete`}</Button>
          </Card>
        </Tiles>
      </ScrollView>
    </ScreenLayout>
  );
}
