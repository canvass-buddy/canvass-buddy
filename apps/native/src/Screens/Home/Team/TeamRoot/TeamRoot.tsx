import { Stack } from '@mobily/stacks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Layout, TopNavigation } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TeamStackParamList } from '../types';

export function TeamRoot({
  navigation,
}: NativeStackScreenProps<TeamStackParamList, 'TeamRoot'>) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title="Team Root" alignment="center" />
      <Layout style={{ flexGrow: 1 }}>
        <Stack space={4} padding={4}>
          <Button onPress={() => navigation.push('ProjectCreate')}>
            Project Create
          </Button>
        </Stack>
      </Layout>
    </SafeAreaView>
  );
}
