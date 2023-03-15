import { useQuery } from '@apollo/client';
import { AntDesign } from '@expo/vector-icons';
import { Stack } from '@mobily/stacks';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Input, Spinner } from '@ui-kitten/components';
import { FC, useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { ScreenLayout, SearchBar, TeamCard } from '../../../Components';
import { graphql } from '../../../__generated__';
import { TabParamList } from '../types';

const TEAMS_QUERY = graphql(/* GraphQL */ `
  query TeamsSearch($title: String!) {
    teams(title: $title, size: 10) {
      id
      ...TeamCard_TeamFragment
    }
  }
`);

export const Search: FC<BottomTabScreenProps<TabParamList>> = ({
  navigation,
}) => {
  const [title, setTitle] = useState('');
  const { data, loading } = useQuery(TEAMS_QUERY, {
    variables: {
      title,
    },
  });
  return (
    <ScreenLayout>
      <Stack space={4} padding={4}>
        <SearchBar value={title} onChangeText={setTitle} />
        {loading && <Spinner />}
        <ScrollView>
          <Stack space={2}>
            {data?.teams.map((team) => (
              <TouchableOpacity
                key={team.id}
                onPress={() =>
                  navigation.navigate('Home', {
                    screen: 'Team',
                    params: { id: team.id },
                  } as any)
                }
              >
                <TeamCard team={team} />
              </TouchableOpacity>
            ))}
          </Stack>
        </ScrollView>
      </Stack>
    </ScreenLayout>
  );
};
