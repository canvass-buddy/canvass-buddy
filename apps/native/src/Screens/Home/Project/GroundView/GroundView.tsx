import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Layout, TopNavigation } from '@ui-kitten/components';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProlejectStackParamList } from '../types';

export function GroundView({
  navigation,
}: NativeStackScreenProps<ProlejectStackParamList, 'GroundView'>) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title="Ground View" />
      <Layout style={{ flexGrow: 1 }} />
    </SafeAreaView>
  );
}
