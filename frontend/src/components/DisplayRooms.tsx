import { useQuery} from "@apollo/client";
import { GET_ROOMS } from "../graphql/query";
import Spinner from "./Spinner";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  setData,
  setLoading,
  setError,
  selectRooms,
} from "../redux/graph_info/roomSlice";
import MUIDataTable from "mui-datatables";

export default function DisplayRooms() {
 
  const dispatch = useAppDispatch();
  const rooms = useAppSelector(selectRooms);

  const overrideProps = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  const { loading, error, data } = useQuery(GET_ROOMS);

  useEffect(() => {
    dispatch(setLoading(loading));
    if (error) {
      dispatch(setError(error.message));
    } else if (data) {
      dispatch(setData(data.rooms));
    }
  }, [loading, error, data, dispatch]);

  const columns = ["Number", "Price", "Occupants", "Status", "Type", "Gender"];
  /*
  const options = {
    filterType: true,
  };
  */

  if (rooms.loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner loading={loading} override={overrideProps} size={30} />
      </div>
    );
  if (rooms.error) return <p>Error : {rooms.error}</p>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const transformedData = data?.rooms.map((room: { number: any; price: any; occupants: any; status:any; type: any; gender_type: any; }) => ({
    Number: room.number,
    Price: room.price,
    Occupants: room.occupants,
    Status:room.status,
    Type:  room.type ,
    Gender:room.gender_type
  }));
  

  return (
    <MUIDataTable
      options={{responsive: 'simple' }}
      title={"Hostel Rooms"}
      data={transformedData}
      columns={columns}
    />
  );
}
