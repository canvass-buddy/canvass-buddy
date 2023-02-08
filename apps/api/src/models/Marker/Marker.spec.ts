import { Marker } from 'src/../resolvers-types';
import { prismaClient } from 'src/clients';
import { authedQuery } from 'src/testHelpers';
import { fetchUserData } from 'src/testHelpers/user';

const createMarker = async () => {
  const { projects } = await fetchUserData('USER_1');
  const { marker } = await authedQuery<{ marker: Marker }>({
    query: /* GraphQL */ `
      mutation CreateMarker($projectId: String!, $marker: CreateMarker!) {
        marker: createMarker(projectId: $projectId, marker: $marker) {
          id
        }
      }
    `,
    variables: {
      projectId: projects?.[0].id,
      marker: {
        longitude: 0,
        latitude: 0,
        completedTasks: [],
      },
    },
  });

  return marker;
};

afterEach(async () => {
  await prismaClient.marker.deleteMany({
    where: {
      longitude: 0,
      latitude: 0,
    },
  });
});

test('create marker', async () => {
  await expect(createMarker()).resolves.toBeTruthy();
  await expect(
    prismaClient.marker.findMany({
      where: {
        longitude: 0,
        latitude: 0,
      },
    })
  ).resolves.toHaveLength(1);
});

test('update marker', async () => {
  const marker = await createMarker();

  await authedQuery({
    query: /* GraphQL */ `
      mutation UpdateMarker($marker: UpdateMarker!) {
        updateMarker(marker: $marker) {
          id
        }
      }
    `,
    variables: {
      marker: {
        id: marker.id,
        longitude: 420,
        latitude: 69,
        completedTasks: [],
      },
    },
  });

  const dbMarker = await prismaClient.marker.findFirst({
    where: {
      id: marker.id,
    },
  });

  expect(dbMarker?.longitude).toBe(420);
  expect(dbMarker?.latitude).toBe(69);
});

test('delete marker', async () => {
  const marker = await createMarker();
  await expect(
    prismaClient.marker.findMany({
      where: {
        id: marker.id,
      },
    })
  ).resolves.toHaveLength(1);

  await authedQuery({
    query: /* GraphQL */ `
      mutation DeleteMarker($markerId: String!) {
        deleteMarker(markerId: $markerId)
      }
    `,
    variables: {
      markerId: marker.id,
    },
  });

  await expect(
    prismaClient.marker.findMany({
      where: {
        id: marker.id,
      },
    })
  ).resolves.toHaveLength(0);
});
