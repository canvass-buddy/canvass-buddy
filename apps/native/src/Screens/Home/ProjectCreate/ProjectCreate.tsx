import { useMutation } from '@apollo/client';
import { Stack } from '@mobily/stacks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Input, Text, useTheme } from '@ui-kitten/components';
import {
  getLastKnownPositionAsync,
  LocationObject,
  useForegroundPermissions,
} from 'expo-location';
import { useFormik } from 'formik';
import { some } from 'lodash';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import MapView, { LatLng, Polygon } from 'react-native-maps';
import { z } from 'zod';
import { toFormikValidate } from 'zod-formik-adapter';
import { ScreenLayout, TaskInput } from '../../../Components';
import { mapStyles } from '../../../helpers';
import { gql } from '../../../__generated__';
import { HomeStackParamList } from '../types';

const CREATE_PROJECT = gql(/* GraphQL */ `
  mutation CreateProject($teamId: String!, $project: CreateProject!) {
    createProject(teamId: $teamId, project: $project) {
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

  const [polygonStart, setPolygonStart] = useState<LatLng>();
  const [polygonEnd, setPolygonEnd] = useState<LatLng>();

  useEffect(() => {
    requestForegroundPermissions();
    getLastKnownPositionAsync().then((position) => {
      setPosition(position);
    });
  }, [foregroundPermissions]);

  const Schema = z.object({
    title: z.string().min(1, t`errors.required`),
  });

  const f = useFormik({
    validate: toFormikValidate(Schema),
    initialValues: {
      title: '',
    },
    async onSubmit({ title }) {
      const { data } = await createProject({
        variables: {
          teamId: route.params.id,
          project: {
            title,
            area: {
              x1: polygonStart?.longitude ?? 0,
              y1: polygonStart?.latitude ?? 0,
              x2: polygonEnd?.longitude ?? 0,
              y2: polygonEnd?.latitude ?? 0,
            },
          },
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
      <Stack padding={4} space={4}>
        <Input
          placeholder={t`util.projectName`}
          value={f.values.title}
          onChangeText={f.handleChange('title')}
          onBlur={f.handleBlur('title')}
          status={f.errors.title ? 'danger' : 'basic'}
          caption={f.errors.title}
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
              setPolygonStart(undefined);
            }}
            onPanDrag={({ nativeEvent }) => {
              if (!polygonStart)
                setPolygonStart({
                  latitude: nativeEvent.coordinate.latitude,
                  longitude: nativeEvent.coordinate.longitude,
                });
              setPolygonEnd({
                latitude: nativeEvent.coordinate.latitude,
                longitude: nativeEvent.coordinate.longitude,
              });
            }}
            pitchEnabled={false}
            scrollEnabled={false}
            zoomEnabled={false}
          >
            {polygonStart && polygonEnd ? (
              <Polygon
                coordinates={[
                  polygonStart,
                  {
                    longitude: polygonStart.longitude,
                    latitude: polygonEnd.latitude,
                  },
                  polygonEnd,
                  {
                    longitude: polygonEnd.longitude,
                    latitude: polygonStart.latitude,
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
        <TaskInput onAdd={() => {}} />
        <Button
          onPress={() => f.handleSubmit()}
          disabled={some(f.errors)}
        >{t`util.createProject`}</Button>
      </Stack>
    </ScreenLayout>
  );
}
