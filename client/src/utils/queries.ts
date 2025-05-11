import { gql } from "@apollo/client";

export const QUERY_CRYPTIDS = gql`
  query GetCryptids {
    cryptids {
      _id
      name
      region
      description
      image
    }
  }
`;
