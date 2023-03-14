import { useQuery } from '@apollo/client';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TopNavigation } from '@ui-kitten/components';
import { ScreenLayout, UserProfile } from '../../../../Components';
import { graphql } from '../../../../__generated__';
import { HomeStackParamList } from '../types';

const USER_QUERY = graphql(/* GraphQL */ `
  query UserQuery {
    user {
      id
      ...UserProfile_UserFragment
    }
  }
`);

export function Profile({}: NativeStackScreenProps<
  HomeStackParamList,
  'Profile'
>) {
  const { data } = useQuery(USER_QUERY);
  return (
    <ScreenLayout>
      {data?.user && <UserProfile user={data.user} />}
    </ScreenLayout>
  );
}
