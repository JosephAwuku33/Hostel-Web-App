import { useQuery, gql } from "@apollo/client";

interface Rooms {
  id: string;
  number: string;
  status:string;
  gender_type: string;
  price: number;
  occupants: number;
}

interface RoomsData {
  rooms: Rooms[];
}

export default function DisplayRooms() {
  const GET_ROOMS = gql`
    query Getrooms {
      rooms {
        id
        number
        price
        occupants
      }
    }
  `;

  const { loading, error, data } = useQuery<RoomsData>(GET_ROOMS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data?.rooms.map(({ id, number, price, occupants }) => {
    return (
      <div key={id}>
        <h3>{number}</h3>
        <b>Price:</b>
        <p>{price}</p>
        <br />
        <b>Occupants:</b>
        <p>{occupants}</p>
        <br />
      </div>
    );
  });
}
