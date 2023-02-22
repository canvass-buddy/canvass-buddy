import { AntDesign } from '@expo/vector-icons';
import { Column, Columns, Stack } from '@mobily/stacks';
import { Button, Input } from '@ui-kitten/components';
import { useFormik } from 'formik';
import { some } from 'lodash';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { z } from 'zod';
import { toFormikValidate } from 'zod-formik-adapter';
import { Task } from '../../__generated__/graphql';

const styles = StyleSheet.create({
  outer: {
    width: '100%',
  },
  input: {
    width: '100%',
  },
  button: {
    height: 90,
  },
});

export function TaskInput({
  task,
  onAdd,
}: {
  task?: Partial<Task>;
  onAdd(task: Omit<Task, 'id'>): void;
}) {
  const { t } = useTranslation();

  const Schema = z.object({
    title: z.string().min(1, t('errors.required')),
  });

  const { values, handleChange, handleBlur, handleSubmit, errors } = useFormik({
    validate: toFormikValidate(Schema),
    validateOnChange: false,
    initialValues: {
      title: task?.title ?? '',
      description: task?.description ?? '',
    },
    onSubmit: ({ title, description }) => {
      onAdd({
        title,
        description,
        type: 'checkbox',
      });
    },
  });
  return (
    <Columns defaultWidth="1/2" space={4}>
      <Column width="3/5">
        <Stack space={2}>
          <Input
            placeholder={t`util.title`}
            value={values.title}
            onChangeText={handleChange('title')}
            onBlur={handleBlur('title')}
            style={styles.input}
          />
          <Input
            placeholder={t`util.description`}
            value={values.description}
            onChangeText={handleChange('description')}
            onBlur={handleBlur('description')}
          />
        </Stack>
      </Column>
      <Column width="2/5">
        <Button
          appearance="outline"
          disabled={some(errors)}
          style={styles.button}
          onPress={() => handleSubmit()}
        >
          <AntDesign name="check" />
        </Button>
      </Column>
    </Columns>
  );
}
