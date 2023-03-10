import { Stack } from '@mobily/stacks';
import { Text } from '@ui-kitten/components';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';
import { Project } from '../../__generated__/graphql';
import { ProjectTitle } from '../ProjectTitle/ProjectTitle';

interface ProjectListProps {
  projects?: Project[];
  onPressProject?(project: Project): void;
}

export const ProjectList: FC<ProjectListProps> = ({
  projects,
  onPressProject,
}) => {
  const { t } = useTranslation();
  return (
    <Stack space={4}>
      <Text category="h2">{t`util.projects`}</Text>
      <Stack space={4}>
        {projects?.map((project) => (
          <TouchableOpacity
            key={project.id}
            onPress={() => {
              onPressProject?.(project);
            }}
          >
            <ProjectTitle project={project} />
          </TouchableOpacity>
        ))}
      </Stack>
    </Stack>
  );
};
