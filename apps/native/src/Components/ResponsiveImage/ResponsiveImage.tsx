import { useEffect, useState } from 'react';
import {
  Animated,
  Image,
  ImageStyle,
  ImageURISource,
  useAnimatedValue,
  View,
} from 'react-native';

export const ResponsiveImage = ({
  source,
  aspect,
  minHeight,
  imageStyle,
}: {
  source: ImageURISource;
  aspect: [number, number];
  minHeight?: number;
  imageStyle?: ImageStyle;
}) => {
  const [width, setWidth] = useState(0);
  const height = Math.round((width * aspect[1]) / aspect[0]);
  return (
    <View
      style={{ width: '100%' }}
      onLayout={(e) => {
        setWidth(e.nativeEvent.layout.width);
      }}
    >
      <Image
        source={source}
        style={[{ width, height, borderRadius: 10, minHeight }, imageStyle]}
      />
    </View>
  );
};
