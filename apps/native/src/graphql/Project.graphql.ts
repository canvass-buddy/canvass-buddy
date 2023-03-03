import { gql } from '../__generated__';

export const PROJECT_QUERY = gql(/* GraphQL */ `
  query Project($id: String!) {
    user {
      project(id: $id) {
        title
        tasks {
          id
          title
          description
          type
        }
        markers {
          id
          longitude
          latitude
        }
        area {
          x1
          y1
          x2
          y2
        }
        users {
          id
          name
          profile {
            image
          }
        }
      }
    }
  }
`);
