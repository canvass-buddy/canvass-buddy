import { AntDesign, Entypo } from '@expo/vector-icons';
import { Column, Columns, Stack, Tiles } from '@mobily/stacks';
import {
  Button,
  Card,
  Divider,
  Input,
  Modal,
  Text,
} from '@ui-kitten/components';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { v4 } from 'uuid';
import { graphql } from '../../__generated__';
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
  onSave?(tasks: Task[]): void;
}

const TASKS_QUERY = graphql(/* GraphQL */ `
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

export function TaskList({ tasks: inputTasks, onSave }: TaskListProps) {
  const { t } = useTranslation();

  const [isVisible, setIsVisible] = useState(false);
  const [value, setValue] = useState('');
  const [id, setId] = useState<string | null>(null);

  const [tasks, setTasks] = useState<Task[]>(inputTasks ?? []);

  useEffect(() => {
    if (inputTasks) setTasks(inputTasks);
  }, [inputTasks]);

  const onAddTask = (task: Task) => {
    setTasks((tasks) => [...tasks, task]);
  };

  const onDeleteTask = (task: Task) => {
    setTasks((tasks) => tasks.filter((t) => t.id !== task.id));
  };

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
    setTasks(inputTasks ?? []);
  };

  const save = () => {
    onSave?.(tasks);
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
          {inputTasks?.map((task) => (
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
              <Tiles style={props?.style} columns={2} space={2}>
                <Button
                  onPress={onClose}
                  appearance="outline"
                  status="basic"
                >{t`util.close`}</Button>
                <Button onPress={save}>{t`util.save`}</Button>
              </Tiles>
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
