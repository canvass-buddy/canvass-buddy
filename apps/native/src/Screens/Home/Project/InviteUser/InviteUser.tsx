import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Layout, TopNavigation } from '@ui-kitten/components';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProlejectStackParamList } from '../types';

export function InviteUser({
  navigation,
}: NativeStackScreenProps<ProlejectStackParamList, 'InviteUser'>) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title="Invite User" alignment="center" />
      <Layout style={{ flexGrow: 1 }} />
    </SafeAreaView>
  );
}
