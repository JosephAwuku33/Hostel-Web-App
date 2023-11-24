export const typeDefs = `#graphql
type Rooms {
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
    user: ObjectId
    room: ObjectId
    checkInDate: Date
    checkOutDate: Date
    createdAt: Date
    updatedAt: Date
    status: String
    totalAmountPaid: Float
    transactionMethod: String
}

  type Query {
    
    rooms: [Rooms]
    # Define more queries here

    booking: [Booking]
    

  }


`;
