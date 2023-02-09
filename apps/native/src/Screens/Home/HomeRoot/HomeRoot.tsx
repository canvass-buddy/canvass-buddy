import { gql, useQuery } from '@apollo/client';
import { FillView, Stack } from '@mobily/stacks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Layout, TopNavigation, Spinner } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HomeStackParamList } from '../types';

export function HomeRoot({
  navigation,
}: NativeStackScreenProps<HomeStackParamList, 'HomeRoot'>) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ flex: 1, height: '100%' }}>
        <Stack space={4} padding={4}>
          <TopNavigation title="title," alignment="center" />
          <Button onPress={() => navigation.push('Profile')}>Profile</Button>
          <Button onPress={() => navigation.push('Project')}>Project</Button>
          <Button onPress={() => navigation.push('Team')}>Team</Button>
          <Button onPress={() => navigation.push('TeamCreate')}>
            Team Create
          </Button>
        </Stack>
      </Layout>
    </SafeAreaView>
  );
}
