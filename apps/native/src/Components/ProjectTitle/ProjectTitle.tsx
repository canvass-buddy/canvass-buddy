import { Stack } from '@mobily/stacks';
import { Text, useTheme } from '@ui-kitten/components';
import React, { FC } from 'react';
import { SharedElement } from 'react-navigation-shared-element';
import { Project } from '../../__generated__/graphql';

interface ProjectTitleProps {
  project?: Project;
}

export const ProjectTitle: FC<ProjectTitleProps> = ({ project }) => {
  const theme = useTheme();
  return (
    <SharedElement id={`project.${project?.id}.title`}>
      <Stack
        style={{
          borderBottomColor: theme['color-primary-default'],
          borderBottomWidth: 1,
        }}
        paddingBottom={2}
      >
        <Text category="h4">{project?.title}</Text>
      </Stack>
    </SharedElement>
  );
};
