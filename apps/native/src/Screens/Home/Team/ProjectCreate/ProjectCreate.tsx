import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Layout, TopNavigation } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TeamStackParamList } from '../types';

export function ProjectCreate({
  navigation,
}: NativeStackScreenProps<TeamStackParamList, 'ProjectCreate'>) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title="Project Create" />
      <Layout style={{ flexGrow: 1 }} />
    </SafeAreaView>
  );
}
