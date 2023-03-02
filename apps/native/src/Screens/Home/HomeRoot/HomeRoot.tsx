import { useQuery } from '@apollo/client';
import { AntDesign } from '@expo/vector-icons';
import { FillView, Stack, Tiles } from '@mobily/stacks';
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
import { Platform } from 'react-native';
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
          <Tiles
            space={4}
            padding={4}
            paddingTop={10}
            paddingBottom={20}
            columns={Platform.OS === 'web' ? 3 : 1}
          >
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
            <Card
              header={(props) => (
                <View style={props?.style}>
                  <Text
                    category="h2"
                    style={styles.header}
                  >{t`util.projects`}</Text>
                </View>
              )}
            >
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
            <Card
              header={(props) => (
                <View style={props?.style}>
                  <Text
                    category="h2"
                    style={styles.header}
                  >{t`util.teams`}</Text>
                </View>
              )}
            >
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
          </Tiles>
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
