export const typeDefs = `#graphql
type Rooms {
    id: ID!
    number: Int
    status: String
    type: String
    occupants: Int
    price: Float
    gender_type: String
    # Add more fields as needed
  }

  type Query {
    rooms: [Rooms]
    # Define more queries here

    
    
  }

`;
