import { Stack } from '@mobily/stacks';
import { Text } from '@ui-kitten/components';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';
import { FragmentType, graphql, useFragment } from '../../__generated__';
import { Project } from '../../__generated__/graphql';
import { ProjectTitle } from '../ProjectTitle/ProjectTitle';

export const ProjectList_QueryFragment = graphql(/* GraphQL */ `
  fragment ProjectList_QueryFragment on Query {
    user {
      projects {
        id
        ...ProjectTitle_ProjectFragment
      }
    }
  }
`);

interface ProjectListProps {
  projects?: FragmentType<typeof ProjectList_QueryFragment>;
  onPressProject?(id: string): void;
}

export const ProjectList: FC<ProjectListProps> = ({
  projects: pProjects,
  onPressProject,
}) => {
  const { t } = useTranslation();
  const query = useFragment(ProjectList_QueryFragment, pProjects);
  return (
    <Stack space={4}>
      <Text category="h2">{t`util.projects`}</Text>
      <Stack space={4}>
        {query?.user?.projects?.map((project) => (
          <TouchableOpacity
            key={project.id}
            onPress={() => {
              onPressProject?.(project.id);
            }}
          >
            <ProjectTitle project={project} />
          </TouchableOpacity>
        ))}
      </Stack>
    </Stack>
  );
};
