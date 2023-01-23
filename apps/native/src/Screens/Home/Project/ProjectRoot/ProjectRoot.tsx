import { Stack } from '@mobily/stacks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Divider, Layout, TopNavigation } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProlejectStackParamList } from '../types';

export function ProjectRoot({
  navigation,
}: NativeStackScreenProps<ProlejectStackParamList, 'ProjectRoot'>) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title="Project Root" alignment="center" />
      <Divider />
      <Layout style={{ flex: 1, flexGrow: 1, height: '100%' }}>
        <Stack space={4} padding={4}>
          <Button onPress={() => navigation.push('GroundView')}>
            Ground View
          </Button>
          <Button onPress={() => navigation.push('InviteUser')}>
            Invite User
          </Button>
        </Stack>
      </Layout>
    </SafeAreaView>
  );
}
