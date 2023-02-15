import { useQuery } from '@apollo/client';
import { AntDesign } from '@expo/vector-icons';
import { FillView, Stack } from '@mobily/stacks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Avatar,
  Button,
  Card,
  Layout,
  Menu,
  MenuItem,
  Text,
  useTheme,
} from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenLayout } from '../../../Components';
import { imageUri } from '../../../helpers';
import { useAuth } from '../../../Providers';
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
      <FillView alignY="between" padding={6} paddingTop={10}>
        <Stack space={4}>
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
            <Text category="h2" style={styles.header}>{t`util.projects`}</Text>
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
      </FillView>
      <FillView
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
        }}
        alignY="bottom"
        alignX="right"
        padding={4}
      >
        <Button
          status="info"
          style={{ width: '100%' }}
          onPress={() => navigation.navigate('TeamCreate')}
        >
          Create Team
        </Button>
      </FillView>
    </ScreenLayout>
  );
}
