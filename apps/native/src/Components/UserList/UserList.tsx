import { Stack } from '@mobily/stacks';
import { Avatar, Text, useTheme } from '@ui-kitten/components';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';
import { imageUri } from '../../helpers';
import { FragmentType, graphql, useFragment } from '../../__generated__';

const UserList_UserFragment = graphql(/* GraphQL */ `
  fragment UserList_UserFragment on User {
    id
    name
    profile {
      image
    }
  }
`);

interface UserListProps {
  users?: FragmentType<typeof UserList_UserFragment>[];
}

export const UserList: FC<UserListProps> = ({ users }) => {
  const { t } = useTranslation();
  return (
    <Stack space={4}>
      <Text category="h2">{t`util.users`}</Text>
      {users?.map((user) => (
        <ListItem key={(user as any).id} user={user} />
      ))}
    </Stack>
  );
};

const ListItem: FC<{ user: FragmentType<typeof UserList_UserFragment> }> = (
  props
) => {
  const user = useFragment(UserList_UserFragment, props.user);
  const theme = useTheme();

  return (
    <TouchableOpacity>
      <Stack
        key={user.id}
        horizontal
        align="center"
        space={4}
        paddingBottom={4}
        style={{
          borderBottomColor: theme['color-primary-default'],
          borderBottomWidth: 1,
        }}
      >
        <Avatar source={{ uri: imageUri(user.profile?.image) }} />
        <Text category="h4">{user.name}</Text>
      </Stack>
    </TouchableOpacity>
  );
};
