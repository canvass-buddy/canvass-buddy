import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { Tiles } from '@mobily/stacks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Card, Divider, Text } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';
import { Platform, ScrollView, StyleSheet } from 'react-native';
import {
  ProjectList,
  ScreenLayout,
  TeamCard,
  UserList,
} from '../../../../Components';
import { TEAM_QUERY } from '../../../../graphql/Team.graphql';
import { graphql } from '../../../../__generated__';
import {
  Project,
  Team as ITeam,
  User,
} from '../../../../__generated__/graphql';
import { HomeStackParamList } from '../types';

const DELETE_TEAM_MUTATION = graphql(/* GraphQL */ `
  mutation DeleteTeam($teamId: String!) {
    deleteTeam(teamId: $teamId)
  }
`);

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
  },
});

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

  const team = data?.user?.team ?? route.params.team;

  return (
    <ScreenLayout>
      <ScrollView>
        <Tiles space={4} padding={4} columns={Platform.OS === 'web' ? 3 : 1}>
          {team && <TeamCard team={team as ITeam} />}
          <Divider />
          <ProjectList
            projects={data?.user?.team?.projects as Project[]}
            onPressProject={(project) =>
              navigation.navigate('Project', {
                id: project.id,
              })
            }
          />
          <Divider />
          <UserList users={(team?.users as User[]) ?? []} />
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
