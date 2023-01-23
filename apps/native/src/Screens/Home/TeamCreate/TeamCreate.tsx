import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Layout, TopNavigation } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HomeStackParamList } from '../types';

export function TeamCreate({}: NativeStackScreenProps<
  HomeStackParamList,
  'TeamCreate'
>) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title="Team Create" alignment="center" />
      <Layout style={{ flexGrow: 1 }} />
    </SafeAreaView>
  );
}
