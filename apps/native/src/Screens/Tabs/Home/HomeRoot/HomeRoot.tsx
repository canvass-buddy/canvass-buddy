import { useQuery } from '@apollo/client';
import { FillView, Stack, Tiles } from '@mobily/stacks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Avatar, Divider, Text } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';
import { ScrollView, TouchableOpacity } from 'react-native';
import { ProjectList, ScreenLayout, TeamCard } from '../../../../Components';
import { imageUri } from '../../../../helpers';
import { graphql } from '../../../../__generated__';
import { HomeStackParamList } from '../types';

const HOME_QUERY = graphql(/* GraphQL */ `
  query HomeQuery {
    user {
      id
      name
      profile {
        image
      }
      teams {
        id
        ...TeamCard_TeamFragment
      }
      projects {
        id
        ...ProjectList_ProjectFragment
      }
    }
  }
`);

export function HomeRoot({
  navigation,
}: NativeStackScreenProps<HomeStackParamList, 'HomeRoot'>) {
  const { data } = useQuery(HOME_QUERY);
  const { t } = useTranslation();
  console.log('data', data?.user?.projects);

  return (
    <ScreenLayout>
      <FillView alignY="between">
        <ScrollView>
          <Tiles
            space={4}
            padding={4}
            paddingTop={10}
            paddingBottom={20}
            columns={1}
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
            {data?.user?.projects && (
              <ProjectList
                projects={data.user.projects}
                onPressProject={(id) => navigation.navigate('Project', { id })}
              />
            )}
            <Divider />
            <Text category="h2">{t`util.teams`}</Text>
            <Stack space={4}>
              {data?.user?.teams?.map(
                (team) =>
                  team && (
                    <TouchableOpacity
                      key={team?.id}
                      onPress={() =>
                        navigation.navigate('Team', { id: team.id, team })
                      }
                    >
                      <TeamCard team={team} />
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
