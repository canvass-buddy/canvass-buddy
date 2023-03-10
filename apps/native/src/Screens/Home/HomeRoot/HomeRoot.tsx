import { useQuery } from '@apollo/client';
import { AntDesign } from '@expo/vector-icons';
import { FillView, Stack, Tiles } from '@mobily/stacks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Avatar,
  Button,
  Card,
  Divider,
  Menu,
  MenuItem,
  Text,
  useTheme,
} from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';
import { Platform, TouchableOpacity } from 'react-native';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import { ProjectList, ScreenLayout, TeamCard } from '../../../Components';
import { imageUri } from '../../../helpers';
import { gql } from '../../../__generated__';
import { Project, Team } from '../../../__generated__/graphql';
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
        image
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

  const theme = useTheme();

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
            <Stack horizontal space={4} align="center">
              {data?.user?.profile?.image && (
                <Avatar
                  source={{ uri: imageUri(data?.user?.profile?.image) }}
                  size="large"
                />
              )}
              <Text category="h1">{data?.user?.name}</Text>
            </Stack>
            <Divider />
            <ProjectList
              projects={(data?.user?.projects as Project[]) ?? []}
              onPressProject={(project) =>
                navigation.navigate('Project', { id: project.id })
              }
            />
            <Divider />
            <Text category="h2">{t`util.teams`}</Text>
            <Stack space={4}>
              {data?.user?.teams?.map(
                (team) =>
                  team && (
                    <TouchableOpacity
                      key={team?.id}
                      onPress={() =>
                        navigation.navigate('Team', { id: team.id })
                      }
                    >
                      <TeamCard team={team as Team} />
                    </TouchableOpacity>
                  )
              )}
            </Stack>
          </Tiles>
        </ScrollView>
      </FillView>
    </ScreenLayout>
  );
}
