import { AntDesign } from '@expo/vector-icons';
import { Column, Columns, Stack, Tiles } from '@mobily/stacks';
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  Input,
  MenuItem,
  Modal,
  Text,
} from '@ui-kitten/components';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { z } from 'zod';
import { toFormikValidate } from 'zod-formik-adapter';
import { gql } from '../../__generated__';
import { Task } from '../../__generated__/graphql';

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: '100%',
    minWidth: 300,
    minHeight: 800,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

interface TaskListProps {
  visible?: boolean;
  tasks?: Task[];
  onAddTask?(task: Omit<Task, 'id'>): void;
}

const TASKS_QUERY = gql(/* GraphQL */ `
  query TasksQuery($teamId: String!) {
    user {
      team(teamId: $teamId) {
        id
        # tasks
      }
    }
  }
`);

export function TaskList({ onAddTask, tasks }: TaskListProps) {
  const { t } = useTranslation();

  const [isVisible, setIsVisible] = useState(false);

  const Schema = z.object({
    title: z.string().min(1, t('errors.required')),
  });

  const { values, handleChange, handleBlur, handleSubmit, errors } = useFormik({
    validate: toFormikValidate(Schema),
    validateOnChange: false,
    initialValues: {
      title: '',
      description: '',
    },
    onSubmit: ({ title, description }) => {
      onAddTask?.({
        title,
        description,
        type: 'checkbox',
      });
    },
  });

  return (
    <>
      <Stack horizontal>
        <Text category="h2">{t`util.tasks`}</Text>
        <Button onPress={() => setIsVisible(true)} appearance="ghost">
          <AntDesign name="plus" />
        </Button>
      </Stack>
      <Modal visible={isVisible} backdropStyle={styles.backdrop}>
        <Card
          style={styles.card}
          header={(props) => (
            <Text {...props} category="h2">{t`util.tasks`}</Text>
          )}
          footer={(props) => (
            <Tiles style={props?.style} space={2} columns={2}>
              <Button appearance="outline">{t`util.close`}</Button>
              <Button>{t`util.save`}</Button>
            </Tiles>
          )}
        >
          <Stack>
            <Columns space={2} alignY="center">
              <Column width="2/3">
                <Autocomplete>
                  <AutocompleteItem title="ABCD" />
                </Autocomplete>
              </Column>
              <Column width="1/3">
                <Button>{t`app.task.addTask`}</Button>
              </Column>
            </Columns>
            {tasks?.map((task) => (
              <MenuItem key={task.id} title={task.title} />
            ))}
          </Stack>
        </Card>
      </Modal>
    </>
  );
}
