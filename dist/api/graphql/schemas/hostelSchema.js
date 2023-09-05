export const typeDefs = `#graphql
type Hostel {
    id: ID!
    name: String!
    description: String
    # Add more fields as needed
  }

  type Query {
    hostels: [Hostel]
    # Define more queries here
  }

  type Mutation {
    createHostel(input: HostelInput): Hostel 
  }

  input HostelInput {
    id: ID!
    name: String!,
    description: String!,
  }
`;
