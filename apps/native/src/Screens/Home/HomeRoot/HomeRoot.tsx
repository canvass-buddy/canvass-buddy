import { useQuery } from '@apollo/client';
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
} from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
  const { logout } = useAuth();
  const { data } = useQuery(HOME_QUERY);
  const { t } = useTranslation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ flex: 1, height: '100%' }}>
        <FillView alignY="between" padding={4}>
          <Stack space={6}>
            <Card onPress={() => navigation.navigate('Profile')}>
              <Stack align="center" padding={4} space={4}>
                {data?.user?.profile?.image && (
                  <Avatar
                    source={{ uri: imageUri(data?.user?.profile?.image) }}
                  />
                )}
                <Text category="h4">{data?.user?.name}</Text>
                <Text category="s1" appearance="hint">
                  Minneapolis, Minnesota
                </Text>
              </Stack>
            </Card>
            <Stack space={4} padding={4}>
              <Text
                category="h2"
                style={styles.header}
              >{t`util.projects`}</Text>
              <Menu>
                {data?.user?.projects?.length ? (
                  data.user.projects.map((project) => (
                    <MenuItem
                      key={project.id}
                      title={project.title}
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
              <Text category="h2" style={styles.header}>{t`util.teams`}</Text>
              <Menu>
                {data?.user?.teams?.length ? (
                  data?.user?.teams?.map((project) => (
                    <MenuItem
                      key={project.id}
                      title={project.title}
                      onPress={() =>
                        navigation.navigate('Team', {
                          id: project.id,
                        })
                      }
                    />
                  ))
                ) : (
                  <MissingDataCard text={t`status.noTeams`} />
                )}
              </Menu>
            </Stack>
          </Stack>
        </FillView>
      </Layout>
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
    </SafeAreaView>
  );
}
