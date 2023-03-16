import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { Stack, Tiles } from '@mobily/stacks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Card, Divider, Text } from '@ui-kitten/components';
import { some } from 'lodash';
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
    user {
      id
    }
    team(id: $id) {
      ...TeamCard_TeamFragment
      admins: members(role: "ADMIN") {
        id
        userId
        ...UserProfile_TeamMemberFragment
        user {
          ...UserProfile_UserFragment
        }
      }
      users: members(role: "USER") {
        id
        ...UserProfile_TeamMemberFragment
        user {
          ...UserProfile_UserFragment
        }
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

  const isAdmin = some(
    data?.team?.admins?.find((f) => f.userId === data?.user?.id)
  );

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
          {isAdmin && (
            <Button
              appearance="outline"
              onPress={() =>
                navigation.navigate('ProjectCreate', { id: route.params.id })
              }
            >{t`util.createProject`}</Button>
          )}
          <Divider />
          <Stack space={4}>
            <Text category="h2">{t`util.users`}</Text>
            {data?.team?.admins?.map((member) => (
              <UserProfile key={member.id} member={member} user={member.user} />
            ))}
            {data?.team?.users?.map((member) => (
              <UserProfile key={member.id} member={member} user={member.user} />
            ))}
          </Stack>
          {isAdmin && (
            <Button
              appearance="outline"
              onPress={() =>
                navigation.navigate('InviteUser', {
                  teamId: route.params.id,
                })
              }
            >{t`util.inviteUser`}</Button>
          )}
          <Divider />
          {isAdmin && (
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
          )}
        </Tiles>
      </ScrollView>
    </ScreenLayout>
  );
}
