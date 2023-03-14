import { useQuery } from '@apollo/client';
import { FillView, Stack, Tiles } from '@mobily/stacks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Avatar, Button, Divider, Text } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';
import { ScrollView, TouchableOpacity } from 'react-native';
import {
  ProjectList,
  ProjectTitle,
  ScreenLayout,
  TeamCard,
  UserProfile,
} from '../../../../Components';
import { imageUri } from '../../../../helpers';
import { graphql } from '../../../../__generated__';
import { HomeStackParamList } from '../types';

const HOME_QUERY = graphql(/* GraphQL */ `
  query HomeQuery {
    user {
      id
      ...UserProfile_UserFragment
      teams {
        id
        ...TeamCard_TeamFragment
      }
      projects {
        id
        ...ProjectTitle_ProjectFragment
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
            {data?.user && <UserProfile user={data.user} />}
            {data?.user?.projects && (
              <Stack space={2}>
                <Divider />
                <Text category="h2">{t`util.projects`}</Text>
                {data.user.projects.map((project) => (
                  <TouchableOpacity
                    key={project.id}
                    onPress={() =>
                      navigation.navigate('Project', {
                        id: project.id,
                        project,
                      })
                    }
                  >
                    <ProjectTitle project={project} />
                  </TouchableOpacity>
                ))}
              </Stack>
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
            <Button
              onPress={() => navigation.navigate('TeamCreate')}
              appearance="outline"
            >{t`util.createTeam`}</Button>
          </Tiles>
        </ScrollView>
      </FillView>
    </ScreenLayout>
  );
}
