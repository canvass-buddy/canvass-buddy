import { AntDesign } from '@expo/vector-icons';
import { Column, Columns, FillView } from '@mobily/stacks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Button,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import * as Clipboard from 'expo-clipboard';
import { useState } from 'react';
import { ScreenLayout } from '../../../Components';
import { HomeStackParamList } from '../types';

export function InviteUser({
  navigation,
  route,
}: NativeStackScreenProps<HomeStackParamList, 'InviteUser'>) {
  const styles = useStyleSheet(s);
  const [str, setStr] = useState(
    `https://app.canvassbuddy.com/teams/${route.params.teamId}`
  );
  return (
    <ScreenLayout>
      <FillView alignY="center" alignX="center" padding={4}>
        <Columns style={styles.outer} padding={2} alignY="center">
          <Column width="4/5">
            <Text appearance="hint">{str}</Text>
          </Column>
          <Column>
            <Button
              appearance="ghost"
              onPress={() => Clipboard.setStringAsync(str)}
            >
              <AntDesign name="copy1" />
            </Button>
          </Column>
        </Columns>
      </FillView>
    </ScreenLayout>
  );
}

const s = StyleService.create({
  outer: {
    borderColor: 'border-primary-color-1',
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: 'background-basic-color-4',
  },
});
