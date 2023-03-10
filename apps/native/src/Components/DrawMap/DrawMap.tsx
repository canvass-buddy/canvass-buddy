import { AntDesign } from '@expo/vector-icons';
import { Stack, Tiles } from '@mobily/stacks';
import {
  Button,
  Card,
  useTheme,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import {
  LocationObject,
  useForegroundPermissions,
  getLastKnownPositionAsync,
} from 'expo-location';
import React, { FC, memo, PropsWithChildren, useEffect, useState } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  useAnimatedValue,
  View,
  ViewStyle,
} from 'react-native';
import MapView, {
  LatLng,
  Polygon,
  Marker as MapMarker,
} from 'react-native-maps';
import { mapStyles } from '../../helpers';
import { Marker, ProjectArea } from '../../__generated__/graphql';

interface DrawMapProps {
  initialRegion?: LatLng;
  onChangeArea?(area: ProjectArea): void;
  area?: ProjectArea;
  style?: ViewStyle;
  drawerButtonDisabled?: boolean;
  markers?: Marker[];
  isOpen?: boolean;
}
const themedStyles = StyleService.create({
  pannel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '10%',
    elevation: 5,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    backgroundColor: 'background-basic-color-1',
    padding: 16,
  },
});

export const DrawMap: FC<PropsWithChildren<DrawMapProps>> = memo(
  ({
    initialRegion,
    onChangeArea,
    area: initialArea,
    style,
    drawerButtonDisabled,
    children,
    markers,
    isOpen,
  }) => {
    const [area, setArea] = useState<ProjectArea>(
      initialArea ?? {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
      }
    );

    const [isDrawing, setDrawing] = useState(false);
    const [isEditing, setEditing] = useState(false);
    const [isPanelOpen, setPanelOpen] = useState(isOpen);

    const theme = useTheme();

    const value = useAnimatedValue(isOpen ? 1 : 0.1);
    const panelHeight = value.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '100%'],
    });

    useEffect(() => {
      Animated.spring(value, {
        toValue: isPanelOpen ? 1 : 0.1,
        useNativeDriver: false,
      }).start();
    }, [isPanelOpen, value]);

    const toggleEditting = () => setEditing((edit) => !edit);
    const togglePannel = () => setPanelOpen((open) => !open);

    const [, requestForegroundPermissions] = useForegroundPermissions();
    const [position, setPosition] = useState<LocationObject | null>();

    useEffect(() => {
      requestForegroundPermissions();
      getLastKnownPositionAsync().then((position) => {
        setPosition(position);
      });
    }, []);

    const styles = useStyleSheet(themedStyles);

    if (!position) return <></>;

    return (
      <View>
        <MapView
          style={[{ width: '100%', height: 400 }, style]}
          customMapStyle={mapStyles}
          initialRegion={{
            longitude:
              initialRegion?.longitude ?? position?.coords.longitude ?? 0,
            latitude: initialRegion?.latitude ?? position?.coords.latitude ?? 0,
            longitudeDelta: 0.0922,
            latitudeDelta: 0.0922,
          }}
          showsUserLocation
          onTouchStart={() => {
            if (!onChangeArea || !isEditing) return;
            setDrawing(true);
            setArea({
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 0,
            });
          }}
          onPanDrag={({ nativeEvent }) => {
            if (!onChangeArea || !isEditing) return;
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
            if (!isEditing) return;
            onChangeArea?.(area);
            setDrawing(false);
          }}
          pitchEnabled={!isEditing}
          scrollEnabled={!isEditing}
          zoomEnabled={!isEditing}
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
          {markers?.map((marker) => (
            <MapMarker
              key={marker.id}
              coordinate={{
                longitude: marker.longitude,
                latitude: marker.latitude,
              }}
            />
          ))}
        </MapView>
        {!isDrawing && children && (
          <Animated.View style={[styles.pannel, { height: panelHeight }]}>
            <Stack space={4}>
              <Tiles columns={onChangeArea ? 2 : 1} space={4}>
                {onChangeArea && (
                  <Button
                    onPress={toggleEditting}
                    appearance={isEditing ? 'outline' : 'filled'}
                  >
                    <AntDesign name="edit" />
                  </Button>
                )}
                <Button
                  onPress={togglePannel}
                  disabled={drawerButtonDisabled}
                  appearance="ghost"
                >
                  <AntDesign name={isPanelOpen ? 'down' : 'up'} />
                </Button>
              </Tiles>
              {isPanelOpen && <View>{children}</View>}
            </Stack>
          </Animated.View>
        )}
      </View>
    );
  }
);
