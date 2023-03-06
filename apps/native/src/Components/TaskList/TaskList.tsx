import { AntDesign, Entypo } from '@expo/vector-icons';
import { Column, Columns, Stack } from '@mobily/stacks';
import {
  Button,
  Card,
  Divider,
  Input,
  Modal,
  Text,
} from '@ui-kitten/components';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { v4 } from 'uuid';
import { gql } from '../../__generated__';
import { Task } from '../../__generated__/graphql';

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: '100%',
    minWidth: 300,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

interface TaskListProps {
  teamId: string;
  visible?: boolean;
  tasks?: Task[];
  onAddTask?(task: Task): void;
  onDeleteTask?(task: Task): void;
}

const TASKS_QUERY = gql(/* GraphQL */ `
  query TasksQuery($teamId: String!) {
    user {
      team(teamId: $teamId) {
        tasks {
          id
          title
          description
          type
        }
      }
    }
  }
`);

export function TaskList({ onAddTask, onDeleteTask, tasks }: TaskListProps) {
  const { t } = useTranslation();

  // const { data } = useQuery(TASKS_QUERY, {
  //   variables: {
  //     teamId,
  //   },
  // });

  const [isVisible, setIsVisible] = useState(false);
  const [value, setValue] = useState('');
  const [id, setId] = useState<string | null>(null);

  const addTask = () => {
    setValue('');
    onAddTask?.({
      type: 'checkbox',
      description: '',
      title: value,
      id: id ?? v4(),
    });
  };

  const onClose = () => {
    setIsVisible(false);
  };

  return (
    <>
      <Stack space={2}>
        <Stack horizontal>
          <Text category="h2">{t`util.tasks`}</Text>
          <Button onPress={() => setIsVisible(true)} appearance="ghost">
            <AntDesign name="edit" />
          </Button>
        </Stack>
        <Stack space={2}>
          {tasks?.map((task) => (
            <Stack horizontal align="center" space={4}>
              <Entypo name="dot-single" color="white" size={24} />
              <Text key={task.id} category="h6">
                {task.title}
              </Text>
            </Stack>
          ))}
        </Stack>
      </Stack>
      <Modal visible={isVisible} backdropStyle={styles.backdrop}>
        <Stack padding={4}>
          <Card
            footer={(props) => (
              <View style={props?.style}>
                <Button
                  onPress={onClose}
                  appearance="outline"
                >{t`util.close`}</Button>
              </View>
            )}
          >
            <Stack space={2}>
              <Columns space={2} alignY="center">
                <Column width="2/3">
                  <Input value={value} onChangeText={setValue} />
                </Column>
                <Column width="1/3">
                  <Button
                    disabled={!value}
                    onPress={addTask}
                  >{t`app.task.addTask`}</Button>
                </Column>
              </Columns>
              <Divider />
              {tasks?.map((task) => (
                <Columns key={task.id} alignY="center">
                  <Column width="4/5">
                    <Text category="p2">{task.title}</Text>
                  </Column>
                  <Column>
                    <Button
                      appearance="ghost"
                      status="danger"
                      onPress={() => onDeleteTask?.(task)}
                    >
                      <AntDesign name="delete" />
                    </Button>
                  </Column>
                </Columns>
              ))}
            </Stack>
          </Card>
        </Stack>
      </Modal>
    </>
  );
}
