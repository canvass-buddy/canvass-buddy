import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { AntDesign } from '@expo/vector-icons';
import { Stack, Tiles } from '@mobily/stacks';
import { Link } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Avatar,
  Button,
  Card,
  Menu,
  MenuItem,
  Text,
} from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Image, View, Platform, ScrollView } from 'react-native';
import { ResponsiveImage, ScreenLayout, TeamCard } from '../../../Components';
import { imageUri } from '../../../helpers';
import { gql } from '../../../__generated__';
import { Team as ITeam } from '../../../__generated__/graphql';
import { HomeStackParamList } from '../types';

const TEAM_QUERY = gql(/* GraphQL */ `
  query TeamPage($id: String!) {
    user {
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
          {data && <TeamCard team={data?.user?.team as ITeam} />}
          {/* <Card */}
          {/*   status="primary" */}
          {/*   header={(props) => ( */}
          {/*     <View style={props?.style}> */}
          {/*       <Text category="h2">{data?.user?.team?.title}</Text> */}
          {/*       <Text category="s1">{data?.user?.team?.description}</Text> */}
          {/*     </View> */}
          {/*   )} */}
          {/* > */}
          {/*   {data?.user?.team?.image && ( */}
          {/*     <ResponsiveImage */}
          {/*       source={{ uri: imageUri(data?.user?.team?.image ?? '') }} */}
          {/*       aspect={[16, 9]} */}
          {/*     /> */}
          {/*   )} */}
          {/* </Card> */}
          <Card
            status="info"
            header={(props) => (
              <Text {...props} category="h6">{t`util.projects`}</Text>
            )}
            footer={(props) => (
              <Stack style={props?.style}>
                <Button
                  onPress={() =>
                    navigation.push('ProjectCreate', {
                      id: route.params.id,
                    })
                  }
                >
                  {t`util.createProject`}
                </Button>
              </Stack>
            )}
          >
            <Stack space={2}>
              {data?.user?.team?.projects?.map((project) => (
                <MenuItem
                  key={project.id}
                  title={project.title}
                  accessoryRight={() => (
                    <AntDesign name="right" color="white" />
                  )}
                  onPress={() => {
                    navigation.navigate('Project', {
                      id: project.id,
                    });
                  }}
                />
              ))}
            </Stack>
          </Card>
          <Card
            status="info"
            header={(props) => (
              <Text {...props} category="h6">{t`util.users`}</Text>
            )}
            footer={(props) => (
              <Stack style={props?.style}>
                <Button
                  onPress={() =>
                    navigation.navigate('InviteUser', {
                      teamId: route.params.id,
                    })
                  }
                >{t`util.inviteUser`}</Button>
              </Stack>
            )}
          >
            <Stack space={2}>
              {data?.user?.team?.users?.map((user) => (
                <MenuItem
                  key={user.id}
                  title={user.name}
                  accessoryLeft={() => (
                    <Avatar
                      source={{ uri: imageUri(user.profile?.image ?? '') }}
                    />
                  )}
                  accessoryRight={() => (
                    <AntDesign name="right" color="white" />
                  )}
                  onPress={() => {
                    navigation.navigate('Profile', {
                      id: user.id,
                    });
                  }}
                />
              ))}
            </Stack>
          </Card>
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
