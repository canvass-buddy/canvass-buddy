import { useQuery } from '@apollo/client';
import { Stack } from '@mobily/stacks';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { Layout, Text, useTheme } from '@ui-kitten/components';
import MapView, { Polygon } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenLayout } from '../../../Components';
import { mapStyles } from '../../../helpers';
import { gql } from '../../../__generated__';
import { HomeStackParamList } from '../types';

const PROJECT_QUERY = gql(/* GraphQL */ `
  query Project($id: String!) {
    user {
      project(id: $id) {
        title
        area {
          x1
          y1
          x2
          y2
        }
      }
    }
  }
`);

export function Project({
  route,
}: NativeStackScreenProps<HomeStackParamList, 'Project'>) {
  const { data } = useQuery(PROJECT_QUERY, {
    variables: {
      id: route.params.id,
    },
  });
  const theme = useTheme();
  return (
    <ScreenLayout>
      <Stack padding={4} space={4}>
        <Text category="h2" style={{ textAlign: 'center' }}>
          {data?.user?.project?.title}
        </Text>
        {data?.user?.project?.area && (
          <MapView
            style={{ width: '100%', height: 400 }}
            initialRegion={{
              longitude: data.user.project.area.x1,
              latitude: data.user.project.area.y1,
              longitudeDelta: 0.09,
              latitudeDelta: 0.09,
            }}
            customMapStyle={mapStyles}
          >
            <Polygon
              fillColor={theme['color-info-transparent-500']}
              strokeColor={theme['color-info-transparent-600']}
              coordinates={[
                {
                  longitude: data.user.project.area.x1,
                  latitude: data.user.project.area.y1,
                },
                {
                  longitude: data.user.project.area.x1,
                  latitude: data.user.project.area.y2,
                },
                {
                  longitude: data.user.project.area.x2,
                  latitude: data.user.project.area.y2,
                },
                {
                  longitude: data.user.project.area.x2,
                  latitude: data.user.project.area.y1,
                },
              ]}
            />
          </MapView>
        )}
      </Stack>
    </ScreenLayout>
  );
}
