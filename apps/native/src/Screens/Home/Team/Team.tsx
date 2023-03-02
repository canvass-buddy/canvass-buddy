import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { AntDesign } from '@expo/vector-icons';
import { Stack, Tiles } from '@mobily/stacks';
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
import { ResponsiveImage, ScreenLayout } from '../../../Components';
import { imageUri } from '../../../helpers';
import { gql } from '../../../__generated__';
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
          <Card
            header={(props) => (
              <View style={props?.style}>
                <Text category="h2">{data?.user?.team?.title}</Text>
                <Text category="s1">{data?.user?.team?.description}</Text>
              </View>
            )}
          >
            {data?.user?.team?.image && (
              <ResponsiveImage
                source={{ uri: imageUri(data?.user?.team?.image ?? '') }}
                aspect={[16, 9]}
              />
            )}
          </Card>
          <Card
            header={(props) => (
              <Text {...props} category="h6">{t`util.projects`}</Text>
            )}
          >
            <Stack space={2}>
              <Menu>
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
              </Menu>
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
          </Card>
          <Card
            header={(props) => (
              <Text {...props} category="h6">{t`util.users`}</Text>
            )}
          >
            <Stack space={2}>
              <Menu>
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
              </Menu>
            </Stack>
          </Card>
          <Card header={(props) => <Text {...props}>{t`util.settings`}</Text>}>
            <Button
              status="danger"
              onPress={() => deleteTeam()}
            >{t`util.deleteTeam`}</Button>
          </Card>
        </Tiles>
      </ScrollView>
    </ScreenLayout>
  );
}
