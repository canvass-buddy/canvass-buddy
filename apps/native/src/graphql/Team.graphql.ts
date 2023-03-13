import { graphql } from '../__generated__';

export const TEAM_QUERY = graphql(/* GraphQL */ `
  query TeamPage($id: String!) {
    user {
      id
      team(teamId: $id) {
        id
        title
        description
        image
        users {
          id
          name
          profile {
            image
          }
        }
        projects {
          id
          title
        }
      }
    }
  }
`);
