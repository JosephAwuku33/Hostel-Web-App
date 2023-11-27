export const typeDefs = `#graphql
  type Room {
    id: ID!
    number: Int
    status: String
    type: String
    occupants: Int
    price: Float
    gender_type: String
  }

  type Booking {
    id: ID!
    user: ID
    room: ID
    checkInDate: Date
    checkOutDate: Date
    status: String
    totalAmountPaid: Float
    transactionMethod: String
  }

  type Query {
    rooms: [Room]
    # Define more queries here
  }

  input CreateBookingInput {
    userId: ID!
    roomId: ID!
    checkInDate: Date!
    checkOutDate: Date!
    status: String!
    totalAmountPaid: Float!
    transactionMethod: String!
  }

  type Mutation {
    addBooking(input: CreateBookingInput!): Booking!
  }

`;
