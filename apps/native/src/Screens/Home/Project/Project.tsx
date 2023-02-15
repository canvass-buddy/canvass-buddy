import { useQuery } from '@apollo/client';
import { Stack } from '@mobily/stacks';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { Layout, Text } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenLayout } from '../../../Components';
import { gql } from '../../../__generated__';
import { HomeStackParamList } from '../types';

const PROJECT_QUERY = gql(/* GraphQL */ `
  query Project($id: String!) {
    user {
      project(id: $id) {
        title
      }
    }
  }
`);

export function Project({
  route,
}: NativeStackScreenProps<HomeStackParamList, 'Project'>) {
  const { data } = useQuery(PROJECT_QUERY, {
    variables: {
      id: route.params.id,
    },
  });
  return (
    <ScreenLayout>
      <Stack padding={4} space={4}>
        <Text category="h2" style={{ textAlign: 'center' }}>
          {data?.user?.project?.title}
        </Text>
      </Stack>
    </ScreenLayout>
  );
}
