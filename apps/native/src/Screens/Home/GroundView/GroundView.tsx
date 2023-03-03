import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { Stack } from '@mobily/stacks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, CheckBox, Divider } from '@ui-kitten/components';
import { LocationAccuracy, watchPositionAsync } from 'expo-location';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { LatLng } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DrawMap } from '../../../Components';
import { PROJECT_QUERY } from '../../../graphql/Project.graphql';
import { gql } from '../../../__generated__';
import { Marker } from '../../../__generated__/graphql';
import { HomeStackParamList } from '../types';

const CREATE_MARKER_MUTATION = gql(/* GraphQL */ `
  mutation CreateMarker($marker: CreateMarker!, $projectId: String!) {
    createMarker(marker: $marker, projectId: $projectId) {
      id
    }
  }
`);

export function GroundView({
  route,
}: NativeStackScreenProps<HomeStackParamList, 'GroundView'>) {
  const client = useApolloClient();
  const { data } = useQuery(PROJECT_QUERY, {
    variables: {
      id: route.params.id,
    },
  });

  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [position, setPositon] = useState<LatLng>({
    latitude: 0,
    longitude: 0,
  });

  const [createMarker] = useMutation(CREATE_MARKER_MUTATION, {
    variables: {
      projectId: route.params.id,
      marker: {
        completedTasks: completedTasks,
        longitude: position.longitude,
        latitude: position.latitude,
      },
    },
    update() {
      client.refetchQueries({ include: 'active' });
    },
  });

  const toggleTask = (taskId: string) => (checked: boolean) =>
    checked
      ? setCompletedTasks([...completedTasks, taskId])
      : setCompletedTasks(completedTasks.filter((task) => task !== taskId));

  useEffect(() => {
    watchPositionAsync({ accuracy: LocationAccuracy.Low }, ({ coords }) => {
      setPositon({
        longitude: coords.longitude,
        latitude: coords.latitude,
      });
    });
  }, []);

  const { t } = useTranslation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DrawMap
        style={styles.map}
        area={data?.user?.project?.area}
        markers={data?.user?.project?.markers as Marker[]}
      >
        <Stack space={4}>
          <Stack space={2}>
            {data?.user?.project?.tasks?.map(
              (task) =>
                task && (
                  <CheckBox
                    key={task.id}
                    onChange={toggleTask(task.id)}
                    checked={completedTasks.includes(task.id)}
                  >
                    {task?.title}
                  </CheckBox>
                )
            )}
          </Stack>
          <Divider />
          <Button
            onPress={() => createMarker()}
            disabled={isEmpty(completedTasks)}
          >{t`marker.createMarker`}</Button>
        </Stack>
      </DrawMap>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});
