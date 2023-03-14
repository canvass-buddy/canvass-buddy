import { FillView } from '@mobily/stacks';
import { Text, useTheme } from '@ui-kitten/components';
import { LinearGradient } from 'expo-linear-gradient';
import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import { imageUri } from '../../helpers';
import { FragmentType, graphql, useFragment } from '../../__generated__';
import { ResponsiveImage } from '../ResponsiveImage';

export const TeamCard_TeamFragment = graphql(/* GraphQL */ `
  fragment TeamCard_TeamFragment on Team {
    id
    private
    image
    title
  }
`);

interface TeamCardProps {
  team?: FragmentType<typeof TeamCard_TeamFragment> | null;
  onPress?(): void;
}

export const TeamCard: FC<TeamCardProps> = ({ team: pTeam, onPress }) => {
  const theme = useTheme();
  const team = useFragment(TeamCard_TeamFragment, pTeam);

  if (!team) return <></>;

  return (
    <SharedElement id={`team.${team.id}.image`}>
      <View style={styles.outerContainer}>
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
      </View>
    </SharedElement>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    position: 'relative',
    minHeight: 200,
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
