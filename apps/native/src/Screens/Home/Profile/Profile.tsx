import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Layout, TopNavigation } from '@ui-kitten/components';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HomeStackParamList } from '../types';

export function Profile({}: NativeStackScreenProps<
  HomeStackParamList,
  'Profile'
>) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title="Profile" alignment="center" />
      <Layout style={{ flexGrow: 1 }}></Layout>
    </SafeAreaView>
  );
}
