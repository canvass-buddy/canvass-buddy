import { readFileSync } from 'fs';
import { yoga } from 'src/yoga';
import { test } from 'vitest';

test.todo('Add User Tests');

const profileImage = readFileSync(`${__dirname}/profile.jpg`);

test('Sign Up', async () => {
  const res = await yoga.fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: /* GraphQL */ `
        mutation SignUp(
          $email: String!
          $password: String!
          $name: String!
          $profileImage: ProfileImage!
        ) {
          signUp(
            email: $email
            password: $password
            name: $name
            profileImage: $profileImage
          ) {
            token
          }
        }
      `,
      variables: {
        email: 'abcd1234@booboo.com',
        password: 'MY_PASSWORD',
        name: 'Hello',
        profileImage,
      },
    }),
  });
  console.log('res', await res.json());
  // prismaClient.profile.deleteMany({});
});
