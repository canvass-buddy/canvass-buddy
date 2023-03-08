import { FillView } from '@mobily/stacks';
import { Text, useTheme } from '@ui-kitten/components';
import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { imageUri } from '../../helpers';
import { Team } from '../../__generated__/graphql';
import { ResponsiveImage } from '../ResponsiveImage';
import { LinearGradient } from 'expo-linear-gradient';

interface TeamCardProps {
  team: Team;
  onPress?(): void;
}

export const TeamCard: FC<TeamCardProps> = ({ team, onPress }) => {
  const theme = useTheme();
  return (
    <TouchableOpacity style={styles.outerContainer} onPress={onPress}>
      <ResponsiveImage
        aspect={[16, 9]}
        source={{ uri: imageUri(team.image) }}
      />
      <LinearGradient
        style={styles.gradient}
        colors={['transparent', theme['background-basic-color-4']]}
      />
      <FillView style={styles.textContainer} alignY="bottom" padding={4}>
        <Text category="h1">{team.title}</Text>
      </FillView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    position: 'relative',
  },
  textContainer: {
    position: 'absolute',
    shadowColor: 'balck',
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '50%',
    bottom: 0,
    borderBottomRightRadius: 3,
    borderBottomLeftRadius: 3,
  },
});
