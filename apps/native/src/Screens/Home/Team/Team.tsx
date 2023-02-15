import { useQuery } from '@apollo/client';
import { AntDesign } from '@expo/vector-icons';
import { Stack } from '@mobily/stacks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Card, Menu, MenuItem, Text } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Image } from 'react-native';
import { ResponsiveImage, ScreenLayout } from '../../../Components';
import { imageUri } from '../../../helpers';
import { gql } from '../../../__generated__';
import { HomeStackParamList } from '../types';

const TEAM_QUERY = gql(/* GraphQL */ `
  query TeamPage($id: String!) {
    user {
      team(teamId: $id) {
        id
        title
        description
        image
        users {
          id
          name
        }
        projects {
          id
          title
        }
      }
    }
  }
`);

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
  },
});

export function Team({
  navigation,
  route,
}: NativeStackScreenProps<HomeStackParamList, 'Team'>) {
  const { data } = useQuery(TEAM_QUERY, {
    variables: {
      id: route.params.id,
    },
  });
  const { t } = useTranslation();
  return (
    <ScreenLayout>
      <Stack space={4} padding={4}>
        <ResponsiveImage
          source={{ uri: imageUri(data?.user?.team?.image ?? '') }}
          aspect={[16, 9]}
        />
        <Text category="h2" style={styles.text}>
          {data?.user?.team?.title}
        </Text>
        <Text category="s1" style={styles.text}>
          {data?.user?.team?.description}
        </Text>
        <Text category="h6" style={styles.text}>{t`util.projects`}</Text>
        <Card>
          <Menu>
            {data?.user?.team?.projects?.map((project) => (
              <MenuItem
                key={project.id}
                title={project.title}
                accessoryRight={() => <AntDesign name="right" color="white" />}
                onPress={() => {
                  navigation.navigate('Project', {
                    id: project.id,
                  });
                }}
              />
            ))}
          </Menu>
        </Card>
        <Button
          onPress={() =>
            navigation.push('ProjectCreate', {
              id: route.params.id,
            })
          }
        >
          {t`util.createProject`}
        </Button>
        <Stack space={2}>
          <Text category="h6" style={styles.text}>{t`util.users`}</Text>
          <Menu>
            {data?.user?.team?.users?.map((user) => (
              <MenuItem
                key={user.id}
                title={user.name}
                accessoryRight={() => <AntDesign name="right" color="white" />}
                onPress={() => {
                  navigation.navigate('Profile', {
                    id: user.id,
                  });
                }}
              />
            ))}
          </Menu>
        </Stack>
      </Stack>
    </ScreenLayout>
  );
}
