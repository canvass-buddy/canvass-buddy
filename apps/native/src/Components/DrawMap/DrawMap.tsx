import { useTheme } from '@ui-kitten/components';
import React, { FC, memo, useState } from 'react';
import MapView, { LatLng, Polygon } from 'react-native-maps';
import { mapStyles } from '../../helpers';
import { ProjectArea } from '../../__generated__/graphql';

interface DrawMapProps {
  initialRegion: LatLng;
  onChangeArea?(area: ProjectArea): void;
  area?: ProjectArea;
}

export const DrawMap: FC<DrawMapProps> = memo(
  ({ initialRegion, onChangeArea, area: initialArea }) => {
    const [area, setArea] = useState<ProjectArea>(
      initialArea ?? {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
      }
    );

    const [isDrawing, setDrawing] = useState(false);

    const theme = useTheme();

    return (
      <MapView
        style={{ width: '100%', height: 400 }}
        customMapStyle={mapStyles}
        initialRegion={{
          longitude: initialRegion.longitude ?? 0,
          latitude: initialRegion.latitude ?? 0,
          longitudeDelta: 0.0922,
          latitudeDelta: 0.0922,
        }}
        showsUserLocation
        onTouchStart={() => {
          if (!onChangeArea) return;
          setDrawing(true);
          setArea({
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 0,
          });
        }}
        onPanDrag={({ nativeEvent }) => {
          if (!onChangeArea) return;
          if (!area.x1 || !area.y1) {
            setArea({
              ...area,
              x1: nativeEvent.coordinate.longitude,
              y1: nativeEvent.coordinate.latitude,
            });
          } else {
            setArea({
              ...area,
              x2: nativeEvent.coordinate.longitude,
              y2: nativeEvent.coordinate.latitude,
            });
          }
        }}
        onTouchEnd={() => {
          onChangeArea?.(area);
          setDrawing(false);
        }}
        pitchEnabled={false}
        scrollEnabled={false}
        zoomEnabled={false}
      >
        {area.x1 && area.x2 ? (
          <Polygon
            coordinates={[
              {
                longitude: area.x1,
                latitude: area.y1,
              },
              {
                longitude: area.x1,
                latitude: area.y2,
              },
              {
                longitude: area.x2,
                latitude: area.y2,
              },
              {
                longitude: area.x2,
                latitude: area.y1,
              },
            ]}
            fillColor={
              !isDrawing ? theme['color-info-transparent-500'] : undefined
            }
            strokeColor={theme['color-info-transparent-600']}
            strokeWidth={isDrawing ? 3 : 0}
          />
        ) : (
          <></>
        )}
      </MapView>
    );
  }
);
