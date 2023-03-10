import { Layout, useTheme } from '@ui-kitten/components';
import { PropsWithChildren } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export const ScreenLayout = ({ children }: PropsWithChildren) => {
  return <Layout style={{ flexGrow: 1, height: '100%' }}>{children}</Layout>;
};
