import { useQuery } from "@apollo/client";
import { GET_ROOMS } from "@/graphql/query";
// import { DataTable } from "./data-table";
// import { columnsHeader } from "./columns";

export function FullTable() {
  const { loading, error, data } = useQuery(GET_ROOMS);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error : {error.message}</p>  ;
  }

  console.log(data);

  return data?.rooms?.map(
    ({
      id,
      status,
      gender_type,
    }: {
      id: number;
      status: string;
      gender_type: string;
    }) => (
      <div key={id}>
        <h3>{status}</h3>
        <br />
        <p>{gender_type}</p>
        <br />
      </div>
    )
  );
}
