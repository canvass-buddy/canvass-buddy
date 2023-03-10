import { useQuery } from '@apollo/client';
import { Stack } from '@mobily/stacks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Avatar, Layout, Text, TopNavigation } from '@ui-kitten/components';
import Constants from 'expo-constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenLayout } from '../../../../Components';
import { imageUri } from '../../../../helpers';
import { gql } from '../../../../__generated__';
import { HomeStackParamList } from '../types';

const USER_QUERY = gql(/* GraphQL */ `
  query UserQuery {
    user {
      id
      name
      profile {
        image
      }
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
      <TopNavigation title="Profile" alignment="center" />
      <Layout style={{ flexGrow: 1 }}>
        <Stack padding={4} space={4} align="center">
          {data?.user?.profile?.image && (
            <Avatar
              size="giant"
              source={{
                uri: imageUri(data.user.profile.image),
              }}
            />
          )}
          <Text category="h6">{data?.user?.name}</Text>
        </Stack>
      </Layout>
    </ScreenLayout>
  );
}
