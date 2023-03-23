import { Team, UpdateTeam } from '@resolvers-types';
import { prismaClient } from 'src/clients';
import { authedQuery, genTestName } from 'src/testHelpers';
import { fetchUserData } from 'src/testHelpers/user';

const fetchTeams = async (): Promise<Team[]> => {
  const { user } = await authedQuery<{ user: { teams: Team[] } }>({
    query: /* GraphQL */ `
      query Teams {
        user {
          teams {
            id
            title
            description
            longitude
            latitude
            members {
              id
            }
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
          members {
            id
          }
        }
      }
    `,
    variables: {
      team: {
        title,
        description: 'MY_DESC',
        longitude: 0,
        latitude: 0,
        private: false,
      },
    },
  });
  return team;
};

const updateTeam = async (team: UpdateTeam): Promise<Team> => {
  const { team: teamRes } = await authedQuery<{ team: Team }>({
    query: /* GraphQL */ `
      mutation UpdateTeam($team: UpdateTeam!) {
        team: updateTeam(team: $team) {
          id
        }
      }
    `,
    variables: { team },
  });
  return teamRes;
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
        updateTeamMembers(teamId: $teamId, memberIds: $memberIds) {
          id
          title
          description
          longitude
          latitude
          members {
            id
          }
        }
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

test('Update Team', async () => {
  const team = await createTeam();
  const title = genTestName();
  delete team.members;
  await expect(
    updateTeam({
      ...team,
      title,
      private: false,
    })
  ).resolves.toBeTruthy();
  const teams = await fetchTeams();
  expect(teams.find((f) => f.title === team.title)).toBeFalsy();
  expect(teams.find((f) => f.title === title)).toBeTruthy();
});

test('Delete Team', async () => {
  const team = await createTeam();
  await expect(deleteTeam(team.id)).resolves.not.toThrowError();
  await expect(fetchTeams()).resolves.toHaveLength(1);
});

test('Add member to team', async () => {
  const team = await createTeam();
  expect(team.members).toHaveLength(1);
  const user1 = await fetchUserData('USER_1');
  const user2 = await fetchUserData('USER_2');

  await expect(
    addTeamMember(team.id, [user1.id, user2.id])
  ).resolves.not.toThrowError();

  const teams = await fetchTeams();

  expect(teams.find((t) => t.id === team.id)?.members).toHaveLength(2);
});
