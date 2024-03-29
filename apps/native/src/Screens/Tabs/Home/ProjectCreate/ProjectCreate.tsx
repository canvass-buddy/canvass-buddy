import { useMutation, useApolloClient } from '@apollo/client';
import { Stack } from '@mobily/stacks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Divider,
  Input,
  Menu,
  MenuItem,
  Text,
} from '@ui-kitten/components';
import {
  getLastKnownPositionAsync,
  LocationObject,
  useForegroundPermissions,
} from 'expo-location';
import { useFormik } from 'formik';
import { some } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { toFormikValidate } from 'zod-formik-adapter';
import { DrawMap, ScreenLayout, TaskList } from '../../../../Components';
import { graphql } from '../../../../__generated__';
import { ProjectArea, Task } from '../../../../__generated__/graphql';
import { HomeStackParamList } from '../types';

const CREATE_PROJECT = graphql(/* GraphQL */ `
  mutation CreateProject(
    $teamId: String!
    $project: CreateProject!
    $tasks: [CreateTask!]!
  ) {
    createProject(teamId: $teamId, project: $project, tasks: $tasks) {
      id
    }
  }
`);

export function ProjectCreate({
  navigation,
  route,
}: NativeStackScreenProps<HomeStackParamList, 'ProjectCreate'>) {
  const { t } = useTranslation();
  const [createProject] = useMutation(CREATE_PROJECT);

  const [, requestForegroundPermissions] = useForegroundPermissions();

  const [position, setPosition] = useState<LocationObject | null>();

  useEffect(() => {
    requestForegroundPermissions();
    getLastKnownPositionAsync().then((position) => {
      setPosition(position);
    });
  }, []);

  const client = useApolloClient();

  const Schema = z.object({
    title: z.string().min(1, t`errors.required`),
    tasks: z
      .array(
        z.object({
          title: z.string(),
        })
      )
      .min(1),
    area: z.object({
      x1: z.number(),
      y1: z.number(),
      x2: z.number(),
      y2: z.number(),
    }),
  });

  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    handleBlur,
    setFieldValue,
  } = useFormik({
    validate: toFormikValidate(Schema),
    initialValues: {
      title: '',
      tasks: [] as Task[],
      area: {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
      },
    },
    async onSubmit({ title, area, tasks }) {
      const { data } = await createProject({
        variables: {
          teamId: route.params.id,
          project: {
            title,
            area,
          },
          tasks: tasks.map((t) => ({
            ...t,
            id: undefined,
          })),
        },
      });
      client.refetchQueries({ include: 'active' });
      if (data) {
        navigation.navigate('Project', {
          id: data?.createProject.id,
        });
      }
    },
  });

  const onChangeArea = useCallback((area: ProjectArea) => {
    setFieldValue('area', area);
  }, []);
  const drawerButtonDisabled =
    !values.area.x1 && !values.area.x2 && !values.area.y1 && !values.area.y2;

  return (
    <ScreenLayout>
      {position && (
        <DrawMap
          initialRegion={{
            longitude: position?.coords.longitude ?? 0,
            latitude: position?.coords.latitude ?? 0,
          }}
          style={{ height: '100%' }}
          onChangeArea={onChangeArea}
          drawerButtonDisabled={drawerButtonDisabled}
          drawerButtonAppearance="filled"
        >
          <Stack space={4}>
            <Input
              placeholder={t`util.projectName`}
              value={values.title}
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              status={errors.title ? 'danger' : 'basic'}
              caption={errors.title}
            />
            <Divider />
            <TaskList
              teamId={route.params.id}
              tasks={values.tasks}
              onSave={(tasks) => {
                setFieldValue('tasks', tasks);
              }}
            />
            <Divider />
            <Button
              onPress={() => handleSubmit()}
              disabled={some(errors)}
            >{t`util.createProject`}</Button>
          </Stack>
        </DrawMap>
      )}
    </ScreenLayout>
  );
}
