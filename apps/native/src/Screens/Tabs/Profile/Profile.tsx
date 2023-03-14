import { useApolloClient, useQuery } from '@apollo/client';
import { Stack } from '@mobily/stacks';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Button } from '@ui-kitten/components';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ScreenLayout, UserProfile } from '../../../Components';
import { useAuth } from '../../../Providers';
import { graphql } from '../../../__generated__';
import { TabParamList } from '../types';

const PROFILE_QUERY = graphql(/* GraphQL */ `
  query ProfileScreenQuery {
    user {
      id
      ...UserProfile_UserFragment
    }
  }
`);

export const Profile: FC<BottomTabScreenProps<TabParamList>> = () => {
  const { logout } = useAuth();
  const { data } = useQuery(PROFILE_QUERY);
  const { t } = useTranslation();
  return (
    <ScreenLayout>
      <Stack padding={4} space={4}>
        <UserProfile user={data?.user} />
        <Button
          appearance="outline"
          status="danger"
          onPress={logout}
        >{t`auth.logout`}</Button>
      </Stack>
    </ScreenLayout>
  );
};
