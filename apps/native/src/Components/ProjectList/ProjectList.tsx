import { Stack } from '@mobily/stacks';
import { useTheme, Text } from '@ui-kitten/components';
import { t } from 'i18next';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';
import { Project } from '../../__generated__/graphql';

interface ProjectListProps {
  projects: Project[];
  onPressProject?(project: Project): void;
}

export const ProjectList: FC<ProjectListProps> = ({
  projects,
  onPressProject,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <Stack space={4}>
      <Text category="h2">{t`util.projects`}</Text>
      <Stack space={4}>
        {projects.map((project) => (
          <TouchableOpacity
            key={project.id}
            onPress={() => {
              onPressProject?.(project);
            }}
          >
            <Stack
              style={{
                borderBottomColor: theme['color-primary-default'],
                borderBottomWidth: 1,
              }}
              paddingBottom={2}
            >
              <Text category="h4">{project.title}</Text>
            </Stack>
          </TouchableOpacity>
        ))}
      </Stack>
    </Stack>
  );
};
