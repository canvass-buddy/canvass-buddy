import { useMutation, useQuery } from '@apollo/client';
import { AntDesign } from '@expo/vector-icons';
import { Stack } from '@mobily/stacks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Divider,
  StyleService,
  useStyleSheet,
  useTheme,
} from '@ui-kitten/components';
import React, { useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import {
  ScreenLayout,
  SearchBar,
  TeamCard,
  UserProfile,
} from '../../../../Components';
import { graphql } from '../../../../__generated__';
import { HomeStackParamList } from '../types';

const INVITE_USER_QUERY = graphql(/* GraphQL */ `
  query InviteUserQuery($id: String!) {
    team(id: $id) {
      ...TeamCard_TeamFragment
      users {
        id
      }
    }
  }
`);

const USERS_QUERY = graphql(/* GraphQL */ `
  query InviteUsersUsersQuery($name: String!) {
    users(name: $name) {
      id
      ...UserProfile_UserFragment
    }
  }
`);

const ADD_USER_MUTATION = graphql(/* GraphQL */ `
  mutation AddUserMutation($teamId: String!, $memberIds: [String!]!) {
    updateTeamMembers(teamId: $teamId, memberIds: $memberIds) {
      id
    }
  }
`);

export function InviteUser({
  route,
}: NativeStackScreenProps<HomeStackParamList, 'InviteUser'>) {
  const [name, setName] = useState('');
  const { data: teamData, refetch } = useQuery(INVITE_USER_QUERY, {
    variables: {
      id: route.params.teamId,
    },
  });
  const { data: userData } = useQuery(USERS_QUERY, {
    variables: {
      name,
    },
  });
  const [dispatch] = useMutation(ADD_USER_MUTATION, {
    onCompleted() {
      refetch();
    },
  });
  const theme = useTheme();
  return (
    <ScreenLayout>
      {teamData?.team && <TeamCard square team={teamData?.team} />}
      <Stack space={4} padding={2} paddingTop={4}>
        <SearchBar value={name} onChangeText={setName} />
        <Divider />
        <ScrollView>
          <Stack space={4}>
            {userData?.users?.map((user) => (
              <TouchableOpacity
                key={user?.id}
                onPress={() =>
                  dispatch({
                    variables: {
                      teamId: route.params.teamId,
                      memberIds: [
                        ...(teamData?.team?.users?.map((user) => user?.id) ??
                          []),
                        user?.id ?? '',
                      ],
                    },
                  })
                }
              >
                <UserProfile
                  user={user}
                  accessoryRight={() =>
                    teamData?.team?.users?.find((u) => u.id === user?.id) ? (
                      <AntDesign
                        name="check"
                        size={24}
                        color={theme['color-success-default']}
                      />
                    ) : (
                      <AntDesign
                        name="plus"
                        size={24}
                        color={theme['color-primary-default']}
                      />
                    )
                  }
                />
              </TouchableOpacity>
            ))}
          </Stack>
        </ScrollView>
      </Stack>
    </ScreenLayout>
  );
}

const s = StyleService.create({
  outer: {
    borderColor: 'border-primary-color-1',
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: 'background-basic-color-4',
  },
});
