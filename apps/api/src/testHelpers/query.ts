import { yoga } from 'src/yoga';

type Query = <T>(props: {
  query: string;
  variables?: { [key: string]: any };
  headers?: { [key: string]: any };
}) => Promise<T>;

export const query: Query = async ({ query, variables, headers }) => {
  const res = await yoga.fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(headers ?? {}),
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const data = await res.json();
  if (data.errors?.length) {
    throw new Error(data.errors[0].message);
  }

  return data.data;
};

export const authedQuery: Query = async ({ variables, query: queryString }) => {
  const { login } = await query<{ login: { token: string } }>({
    query: /* GraphQL */ `
      mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          token
        }
      }
    `,
    variables: {
      email: process.env.TEST_USER_1_EMAIL,
      password: process.env.TEST_USER_1_EMAIL,
    },
  });
  const res = await query({
    query: queryString,
    variables,
    headers: {
      Authorization: login.token,
    },
  });

  return res as any;
};
