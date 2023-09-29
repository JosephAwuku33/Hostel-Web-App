import { gql } from "@apollo/client";

export const GET_ROOMS = gql`
query Getrooms {
  rooms {
    id
    number
    price
    occupants
    status
    type
    gender_type
  }
}
`;