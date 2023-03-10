import { Stack } from '@mobily/stacks';
import { Avatar, Text, useTheme } from '@ui-kitten/components';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';
import { imageUri } from '../../helpers';
import { User } from '../../__generated__/graphql';

interface UserListProps {
  users?: User[];
}

export const UserList: FC<UserListProps> = ({ users }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <Stack space={4}>
      <Text category="h2">{t`util.users`}</Text>
      {users?.map((user) => (
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
      ))}
    </Stack>
  );
};
