import { FillView, Stack } from '@mobily/stacks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Layout, TopNavigation } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../../Providers';
import { HomeStackParamList } from '../types';

export function HomeRoot({
  navigation,
}: NativeStackScreenProps<HomeStackParamList, 'HomeRoot'>) {
  const { logout } = useAuth();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ flex: 1, height: '100%' }}>
        <FillView alignY="between" padding={4}>
          <Stack space={4}>
            <TopNavigation title="Home" alignment="center" />
            <Button onPress={() => navigation.push('Profile')}>Profile</Button>
            <Button onPress={() => navigation.push('Project')}>Project</Button>
            <Button onPress={() => navigation.push('Team')}>Team</Button>
            <Button onPress={() => navigation.push('TeamCreate')}>
              Team Create
            </Button>
          </Stack>
          <Button status="danger" onPress={logout}>
            Logout
          </Button>
        </FillView>
      </Layout>
    </SafeAreaView>
  );
}
