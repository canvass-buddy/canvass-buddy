import { Team } from '@resolvers-types';
import { prismaClient } from 'src/clients';
import { authedQuery, genTestName } from 'src/testHelpers';
import { beforeEach, expect, test } from 'vitest';

const fetchTeams = async (): Promise<Team[]> => {
  const { user } = await authedQuery<{ user: { teams: Team[] } }>({
    query: /* GraphQL */ `
      query Teams {
        user {
          teams {
            id
          }
        }
      }
    `,
  });
  return user.teams;
};

const createTeam = async (): Promise<Team> => {
  const title = genTestName();
  const { team } = await authedQuery<{ team: Team }>({
    query: /* GraphQL */ `
      mutation CreateTeam($team: CreateTeam!) {
        team: createTeam(team: $team) {
          id
          title
          description
          longitude
          latitude
        }
      }
    `,
    variables: {
      team: {
        title,
        description: 'MY_DESC',
        longitude: 0,
        latitude: 0,
      },
    },
  });
  return team;
};

const deleteTeam = async (teamId: string): Promise<void> => {
  await authedQuery<{ team: Team }>({
    query: /* GraphQL */ `
      mutation deleteTeam($teamId: String!) {
        deleteTeam(teamId: $teamId)
      }
    `,
    variables: {
      teamId,
    },
  });
};

const addTeamMember = async (
  teamId: string,
  memberIds: string[]
): Promise<void> => {
  await authedQuery<{ team: Team }>({
    query: /* GraphQL */ `
      mutation AddMembers($teamId: String!, $memberIds: [String!]!) {
        updateTeamMembers(teamId: $teamId, memberIds: $memberIds)
      }
    `,
    variables: {
      teamId,
      memberIds,
    },
  });
};

beforeEach(async () => {
  await prismaClient.team.deleteMany({
    where: {
      title: {
        contains: 'TEST-',
      },
    },
  });
});

test('Get teams', async () => {
  await expect(fetchTeams()).resolves.toHaveLength(1);
});

test('Create Teams', async () => {
  await expect(createTeam()).resolves.toBeTruthy();
  await expect(fetchTeams()).resolves.toHaveLength(2);
});

test('Delete Team', async () => {
  const team = await createTeam();
  await expect(deleteTeam(team.id)).resolves.not.toThrowError();
  await expect(fetchTeams()).resolves.toHaveLength(1);
});

test('Add member to team', async () => {
  const team = await createTeam();
  await expect();
});
