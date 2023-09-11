interface roomsData {
  number: number;
  status: string;
  type: string;
  occupants: number;
  price: number;
  gender_type: string;
}


export const roomsData: roomsData[] = [
  {
    number: 3,
    status: "available",
    type: "2 in 1",
    occupants: 2,
    price: 8000,
    gender_type: "male",
  },

  {
    number: 4,
    status: "available",
    type: "8 in 1",
    occupants: 8,
    price: 2000,
    gender_type: "male",
  },

  {
    number: 5,
    status: "available",
    type: "8 in 1",
    occupants: 8,
    price: 2000,
    gender_type: "female",
  },

  {
    number: 6,
    status: "available",
    type: "1 in 1",
    occupants: 1,
    price: 12000,
    gender_type: "male",
  },

  {
    number: 7,
    status: "available",
    type: "1 in 1",
    occupants: 1,
    price: 12000,
    gender_type: "male",
  }
];
