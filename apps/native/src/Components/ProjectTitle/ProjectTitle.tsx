import { Stack } from '@mobily/stacks';
import { Text, useTheme } from '@ui-kitten/components';
import React, { FC } from 'react';
import { SharedElement } from 'react-navigation-shared-element';
import { FragmentType, graphql, useFragment } from '../../__generated__';

export const ProjectTitle_ProjectFragment = graphql(/* GraphQL */ `
  fragment ProjectTitle_ProjectFragment on Project {
    id
    title
  }
`);

interface ProjectTitleProps {
  project?: FragmentType<typeof ProjectTitle_ProjectFragment>;
}

export const ProjectTitle: FC<ProjectTitleProps> = (props) => {
  const theme = useTheme();
  const project = useFragment(ProjectTitle_ProjectFragment, props.project);
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
