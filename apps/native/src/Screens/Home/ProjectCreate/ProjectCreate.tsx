import { useMutation } from '@apollo/client';
import { Stack } from '@mobily/stacks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Button,
  Input,
  Menu,
  MenuItem,
  Text,
  useTheme,
} from '@ui-kitten/components';
import {
  getLastKnownPositionAsync,
  LocationObject,
  useForegroundPermissions,
} from 'expo-location';
import { useFormik } from 'formik';
import { some } from 'lodash';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';
import MapView, { LatLng, Polygon } from 'react-native-maps';
import { z } from 'zod';
import { toFormikValidate } from 'zod-formik-adapter';
import { ScreenLayout, TaskInput } from '../../../Components';
import { mapStyles } from '../../../helpers';
import { gql } from '../../../__generated__';
import { Task } from '../../../__generated__/graphql';
import { HomeStackParamList } from '../types';

const CREATE_PROJECT = gql(/* GraphQL */ `
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

  const [foregroundPermissions, requestForegroundPermissions] =
    useForegroundPermissions();

  const [position, setPosition] = useState<LocationObject | null>();

  useEffect(() => {
    requestForegroundPermissions();
    getLastKnownPositionAsync().then((position) => {
      setPosition(position);
    });
  }, [foregroundPermissions]);

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
      tasks: [] as Array<Omit<Task, 'id'>>,
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
          tasks,
        },
      });
      if (data) {
        navigation.navigate('Project', {
          id: data?.createProject.id,
        });
      }
    },
  });

  const theme = useTheme();

  return (
    <ScreenLayout>
      <ScrollView>
        <Stack padding={4} space={4}>
          <Input
            placeholder={t`util.projectName`}
            value={values.title}
            onChangeText={handleChange('title')}
            onBlur={handleBlur('title')}
            status={errors.title ? 'danger' : 'basic'}
            caption={errors.title}
          />
          {position && (
            <MapView
              style={{ width: '100%', height: 400 }}
              customMapStyle={mapStyles}
              initialRegion={
                position?.coords && {
                  longitude: position.coords.longitude ?? 0,
                  latitude: position.coords.latitude ?? 0,
                  longitudeDelta: 0.0922,
                  latitudeDelta: 0.0922,
                }
              }
              showsUserLocation
              onTouchStart={() => {
                setFieldValue('area', {});
              }}
              onPanDrag={({ nativeEvent }) => {
                if (!values.area.x1 || !values.area.y1) {
                  setFieldValue('area', {
                    ...values.area,
                    x1: nativeEvent.coordinate.latitude,
                    y1: nativeEvent.coordinate.longitude,
                  });
                } else {
                  setFieldValue('area', {
                    ...values.area,
                    x2: nativeEvent.coordinate.latitude,
                    y2: nativeEvent.coordinate.longitude,
                  });
                }
              }}
              pitchEnabled={false}
              scrollEnabled={false}
              zoomEnabled={false}
            >
              {values.area.x1 && values.area.x2 ? (
                <Polygon
                  coordinates={[
                    {
                      longitude: values.area.x1,
                      latitude: values.area.y1,
                    },
                    {
                      longitude: values.area.x1,
                      latitude: values.area.y2,
                    },
                    {
                      longitude: values.area.x2,
                      latitude: values.area.y2,
                    },
                    {
                      longitude: values.area.x2,
                      latitude: values.area.y1,
                    },
                  ]}
                  fillColor={theme['color-info-transparent-500']}
                  strokeColor={theme['color-info-transparent-600']}
                />
              ) : (
                <></>
              )}
            </MapView>
          )}
          <Text category="h2">{t`util.tasks`}</Text>
          <TaskInput
            onAdd={(task) => {
              setFieldValue('tasks', [...values.tasks, task]);
            }}
          />
          <Menu>
            {values.tasks.map((task) => (
              <MenuItem key={task.title} title={task.title} />
            ))}
          </Menu>
          <Button
            onPress={() => handleSubmit()}
            disabled={some(errors)}
          >{t`util.createProject`}</Button>
        </Stack>
      </ScrollView>
    </ScreenLayout>
  );
}
