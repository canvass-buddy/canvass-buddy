import { useQuery } from '@apollo/client';
import { AntDesign } from '@expo/vector-icons';
import { Stack } from '@mobily/stacks';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Input } from '@ui-kitten/components';
import { FC, useState } from 'react';
import { ScrollView } from 'react-native';
import { ScreenLayout, TeamCard } from '../../../Components';
import { graphql } from '../../../__generated__';
import { TabParamList } from '../types';

const TEAMS_QUERY = graphql(/* GraphQL */ `
  query TeamsSearch($title: String!) {
    teams(title: $title) {
      id
      ...TeamCard_TeamFragment
    }
  }
`);

export const Search: FC<BottomTabScreenProps<TabParamList>> = () => {
  const [title, setTitle] = useState('');
  const { data } = useQuery(TEAMS_QUERY, {
    variables: {
      title,
    },
  });
  return (
    <ScreenLayout>
      <Stack space={4} padding={4}>
        <Stack horizontal align="center" space={2}>
          <Input value={title} onChangeText={setTitle} />
          <AntDesign name="search1" />
        </Stack>
        <ScrollView>
          <Stack space={2}>
            {data?.teams.map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </Stack>
        </ScrollView>
      </Stack>
    </ScreenLayout>
  );
};
