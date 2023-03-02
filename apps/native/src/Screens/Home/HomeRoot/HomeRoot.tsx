import { useQuery } from '@apollo/client';
import { AntDesign } from '@expo/vector-icons';
import { FillView, Stack } from '@mobily/stacks';
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
import { ScrollView, StyleSheet, View } from 'react-native';
import { ScreenLayout } from '../../../Components';
import { imageUri } from '../../../helpers';
import { gql } from '../../../__generated__';
import { HomeStackParamList } from '../types';

const HOME_QUERY = gql(/* GraphQL */ `
  query HomeQuery {
    user {
      id
      name
      profile {
        image
      }
      teams {
        id
        title
      }
      projects {
        id
        title
      }
    }
  }
`);

const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
  },
});

const MissingDataCard = ({ text }: { text: string }) => {
  return (
    <Card
      style={{
        minHeight: 200,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text category="h6" status="info">
        {text}
      </Text>
    </Card>
  );
};

export function HomeRoot({
  navigation,
}: NativeStackScreenProps<HomeStackParamList, 'HomeRoot'>) {
  const { data } = useQuery(HOME_QUERY);
  const { t } = useTranslation();

  return (
    <ScreenLayout>
      <FillView alignY="between">
        <ScrollView>
          <Stack space={4} padding={4} paddingTop={10} paddingBottom={20}>
            <Card onPress={() => navigation.navigate('Profile', {})}>
              <Stack align="center" padding={4} space={4}>
                {data?.user?.profile?.image && (
                  <Avatar
                    source={{ uri: imageUri(data?.user?.profile?.image) }}
                  />
                )}
                <Text category="h2">{data?.user?.name}</Text>
                <Text category="s1" appearance="hint">
                  Minneapolis, Minnesota
                </Text>
              </Stack>
            </Card>
            <Stack space={6} padding={6}>
              <Text
                category="h2"
                style={styles.header}
              >{t`util.projects`}</Text>
              <Card>
                <Menu>
                  {data?.user?.projects?.length ? (
                    data.user.projects.map((project) => (
                      <MenuItem
                        key={project.id}
                        title={project.title}
                        accessoryRight={() => (
                          <AntDesign name="right" color="white" />
                        )}
                        onPress={() =>
                          navigation.navigate('Project', {
                            id: project.id,
                          })
                        }
                      />
                    ))
                  ) : (
                    <MissingDataCard text={t`status.noProjects`} />
                  )}
                </Menu>
              </Card>
              <Text category="h2" style={styles.header}>{t`util.teams`}</Text>
              <Card>
                <Menu>
                  {data?.user?.teams?.length ? (
                    data?.user?.teams?.map((project) =>
                      project ? (
                        <MenuItem
                          key={project.id}
                          title={project.title}
                          accessoryRight={() => (
                            <AntDesign name="right" color="white" />
                          )}
                          onPress={() =>
                            navigation.navigate('Team', {
                              id: project.id,
                            })
                          }
                        />
                      ) : (
                        <></>
                      )
                    )
                  ) : (
                    <MissingDataCard text={t`status.noTeams`} />
                  )}
                </Menu>
              </Card>
            </Stack>
          </Stack>
        </ScrollView>
      </FillView>
      <View
        style={{
          width: '100%',
          position: 'absolute',
          bottom: 0,
          padding: 18,
        }}
      >
        <Button status="info" onPress={() => navigation.navigate('TeamCreate')}>
          Create Team
        </Button>
      </View>
    </ScreenLayout>
  );
}
