import { gql } from "@apollo/client";

export const GET_DATA_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;
