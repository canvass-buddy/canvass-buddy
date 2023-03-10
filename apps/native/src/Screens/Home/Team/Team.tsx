import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { AntDesign } from '@expo/vector-icons';
import { Stack, Tiles } from '@mobily/stacks';
import { Link } from '@react-navigation/native';
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
import { StyleSheet, Image, View, Platform, ScrollView } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import {
  ProjectList,
  ResponsiveImage,
  ScreenLayout,
  TeamCard,
  UserList,
} from '../../../Components';
import { imageUri } from '../../../helpers';
import { gql } from '../../../__generated__';
import { Project, Team as ITeam, User } from '../../../__generated__/graphql';
import { HomeStackParamList } from '../types';

const TEAM_QUERY = gql(/* GraphQL */ `
  query TeamPage($id: String!) {
    user {
      id
      team(teamId: $id) {
        id
        title
        description
        image
        users {
          id
          name
          profile {
            image
          }
        }
        projects {
          id
          title
        }
      }
    }
  }
`);

const DELETE_TEAM_MUTATION = gql(/* GraphQL */ `
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

  return (
    <ScreenLayout>
      <ScrollView>
        <Tiles space={4} padding={4} columns={Platform.OS === 'web' ? 3 : 1}>
          {data?.user?.team && (
            <SharedElement id={`team.${route.params.id}.card`}>
              <TeamCard team={data.user.team as ITeam} />
            </SharedElement>
          )}
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
          <UserList users={(data?.user?.team?.users as User[]) ?? []} />
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
