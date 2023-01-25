import { createYoga } from 'graphql-yoga';
import { verify } from 'jsonwebtoken';
import { APP_SECRET } from './constants';
import { schema } from './schema';

export const yoga = createYoga({
  schema,
  async context(context) {
    const token = context.request.headers
      .get('Authorization')
      ?.replace('Bearer ', '');

    if (!token) return;

    const { userId } = verify(token, APP_SECRET) as { userId: string };
    return {
      userId,
    };
  },
});
