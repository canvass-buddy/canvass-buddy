import { User } from 'src/../resolvers-types';
import { authedQuery } from './query';

export const TEST_USER_LIST = {
  USER_1: {
    name: process.env.TEST_USER_1_NAME,
    email: process.env.TEST_USER_1_EMAIL,
    password: process.env.TEST_USER_1_PASSWORD,
  },
  USER_2: {
    name: process.env.TEST_USER_2_NAME,
    email: process.env.TEST_USER_2_EMAIL,
    password: process.env.TEST_USER_2_PASSWORD,
  },
};

export type TestUserKey = keyof typeof TEST_USER_LIST;

export const fetchUserData = async (user: TestUserKey) => {
  const { user: userData } = await authedQuery<{ user: User }>({
    query: /* GraphQL */ `
      query {
        user {
          id
          name
          email
          projects {
            id
            title
          }
          teams {
            id
            title
          }
        }
      }
    `,
    user,
  });
  return userData;
};
