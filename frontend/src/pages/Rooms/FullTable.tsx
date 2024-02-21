import { useQuery } from "@apollo/client";
import { GET_ROOMS } from "@/graphql/query";
import Spinner from "@/screen_components/Spinner";
import { toast } from "react-toastify";
import { DataTable } from "./data-table";
import {  columnsHeader, } from "./columns";

export function FullTable() {
  const { loading, error, data } = useQuery(GET_ROOMS);
  console.log(data?.rooms);


  const overrideProps = {};

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner loading={loading} override={overrideProps} size={30} />;
      </div>
    );
  }

  if (error) {
    return toast.error(error.message);
  }


  return <DataTable columns={columnsHeader} data={data?.rooms} />;
}
