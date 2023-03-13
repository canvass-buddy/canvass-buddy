import { useQuery } from '@apollo/client';
import { AntDesign } from '@expo/vector-icons';
import { Stack } from '@mobily/stacks';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Input } from '@ui-kitten/components';
import { FC, useState } from 'react';
import { TeamCard } from '../../../Components';
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
    <Stack>
      <Stack horizontal>
        <Input />
        <AntDesign name="search1" />
      </Stack>
      {data?.teams.map((team) => (
        <TeamCard id={team.id} team={team} />
      ))}
    </Stack>
  );
};
