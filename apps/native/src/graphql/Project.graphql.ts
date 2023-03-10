import { gql } from '../__generated__';

export const PROJECT_FRAGMENT = gql(/* GraphQL */ `
  fragment ProjectDetails on Project {
    id
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
`);

export const PROJECT_QUERY = gql(/* GraphQL */ `
  query Project($id: String!) {
    user {
      id
      project(id: $id) {
        ...ProjectDetails
      }
    }
  }
`);
