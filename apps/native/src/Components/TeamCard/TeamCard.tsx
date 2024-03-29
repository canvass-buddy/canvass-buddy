import { AntDesign } from '@expo/vector-icons';
import { FillView, Stack } from '@mobily/stacks';
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
    description
  }
`);

interface TeamCardProps {
  team?: FragmentType<typeof TeamCard_TeamFragment> | null;
  square?: boolean;
}

export const TeamCard: FC<TeamCardProps> = ({ square, ...props }) => {
  const theme = useTheme();
  const team = useFragment(TeamCard_TeamFragment, props.team);

  if (!team) return <></>;

  return (
    <SharedElement id={`team.${team.id}.image`}>
      <View style={styles.outerContainer}>
        <ResponsiveImage
          aspect={[16, 9]}
          source={{ uri: imageUri(team.image) }}
          imageStyle={{ borderRadius: square ? 0 : 10 }}
        />
        <LinearGradient
          style={styles.gradient}
          colors={[
            'transparent',
            square
              ? theme['background-basic-color-2']
              : theme['background-basic-color-4'],
          ]}
        />
        <FillView style={styles.textContainer} alignY="bottom" padding={4}>
          <Stack horizontal space={2} align="center">
            <AntDesign
              name={team.private ? 'lock' : 'unlock'}
              color="white"
              size={24}
            />
            <Text category="h1">{team.title}</Text>
          </Stack>
          <Text category="s2">{team.description}</Text>
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
    height: '75%',
    bottom: 0,
    borderBottomRightRadius: 3,
    borderBottomLeftRadius: 3,
  },
  lock: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
