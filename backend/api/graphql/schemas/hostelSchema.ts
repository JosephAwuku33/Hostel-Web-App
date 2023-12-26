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
    checkInDate: String
    checkOutDate: String
    status: String
    totalAmountPaid: Float
    transactionMethod: String
  }

  type Query {
    rooms:[Room]
    room(id: ID): Room
    booking(id: ID): Booking
    # Define more queries here
  }

  input CreateBookingInput {
    user: ID!
    room: ID!
    checkInDate: String!
    checkOutDate: String!
    status: String!
    totalAmountPaid: Float!
    transactionMethod: String!
  }

  type Mutation {
    addBooking(input: CreateBookingInput!): Booking!
    deleteBooking(id: ID): Booking
  }

`;
