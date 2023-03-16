import { AntDesign } from '@expo/vector-icons';
import { Column, Columns, Stack } from '@mobily/stacks';
import { Text, useTheme } from '@ui-kitten/components';
import { Avatar } from '@ui-kitten/components/ui/avatar/avatar.component';
import React, { FC } from 'react';
import { imageUri } from '../../helpers';
import { FragmentType, graphql, useFragment } from '../../__generated__';

const UserProfile_UserFragment = graphql(/* GraphQL */ `
  fragment UserProfile_UserFragment on User {
    id
    profile {
      firstName
      lastName
      username
      image
    }
  }
`);

const UserProfile_TeamMemberFragment = graphql(/* GraphQL */ `
  fragment UserProfile_TeamMemberFragment on TeamMember {
    role
  }
`);

interface UserProfileProps {
  user?: FragmentType<typeof UserProfile_UserFragment> | null;
  member?: FragmentType<typeof UserProfile_TeamMemberFragment> | null;
  accessoryRight?(): JSX.Element;
}

export const UserProfile: FC<UserProfileProps> = (props) => {
  const user = useFragment(UserProfile_UserFragment, props.user);
  const member = useFragment(UserProfile_TeamMemberFragment, props.member);
  const theme = useTheme();
  if (!user) return <></>;
  return (
    <Columns
      key={user.id}
      space={4}
      paddingBottom={4}
      alignX="center"
      alignY="center"
      style={{
        borderBottomColor: theme['color-primary-default'],
        borderBottomWidth: 1,
      }}
    >
      <Column width="1/5">
        <Avatar
          source={{ uri: imageUri(user.profile?.image) }}
          style={
            member?.role === 'ADMIN' && {
              borderColor: theme['color-primary-default'],
              borderWidth: 3,
            }
          }
        />
        {member?.role === 'ADMIN' && (
          <AntDesign
            name="star"
            color={theme['color-success-default']}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          />
        )}
      </Column>
      <Column width={'3/5'}>
        <Stack>
          <Stack horizontal space={2}>
            <Text category="h4">{user.profile?.firstName}</Text>
            <Text category="h4">{user.profile?.lastName}</Text>
          </Stack>
          <Text category="s2">{user.profile?.username}</Text>
        </Stack>
      </Column>
      <Column width="1/5">{props.accessoryRight?.()}</Column>
    </Columns>
  );
};
