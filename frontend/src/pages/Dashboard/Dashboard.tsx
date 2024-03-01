import Header from "@/screen_components/Header";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/getDate";
import { Card, CardTitle, CardContent, CardHeader } from "@/components/ui/card";
import { GET_ROOM_COUNT } from "@/graphql/query";
import { useQuery } from "@apollo/client";
import Spinner from "@/screen_components/Spinner";


export default function Dashboard() {
  const { loading , data } = useQuery(GET_ROOM_COUNT, {pollInterval: 500 });
  console.log(data?.roomCount);
  const overrideProps = {};

  const currentDate = formatDate(new Date());
  return (
    <main className="flex flex-col h-screen bg-primary-grey">
      <Header />

      {/** space underneath header */}
      <div className="flex justify-between p-4 h-16 bg-primary-white items-center w-full">
        <div className="bg-primary-white mx-auto ">
          <Label htmlFor="date">{currentDate}</Label>
        </div>
        <>
          <Button className="bg-primary-blue text-primary-white h-9">
            Create Booking
          </Button>
        </>
      </div>

      {/**Overview Card */}
      <Card className=" bg-primary-white w-7/8 h-1/5 m-5">
        <CardHeader>
          <CardTitle>
            <Label className="text-md font-bold ">Overview</Label>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row mt-1 items-start justify-between">
            <Label>Total</Label>
            <Label>Total</Label>
            <Label>Total</Label>
            <Label>Overall</Label>
          </div>
          <div className="flex flex-row items-start justify-between ">
            <Label>
              Available rooms
              <Label className="md:ml-1 text-primary-blue font-extrabold text-xl">
                {loading ? <Spinner loading={loading} override={overrideProps} size={12}/> : data?.roomCount?.count}
              </Label>
            </Label>
            <Label className="md:mr-12">
              In hostel
              <Label className="ml-1 text-primary-blue font-extrabold text-xl">
                23
              </Label>
            </Label>
            <Label className="md:mr-1">
              Occupied
              <Label className="ml-1 text-primary-blue font-extrabold text-xl">
                23
              </Label>
            </Label>
            <Label>
              Number
              <Label className="ml-1 text-primary-blue font-extrabold text-xl">
                23
              </Label>
            </Label>
          </div>
        </CardContent>
      </Card>

      {/**Rooms Card */}
      <Card className="bg-primary-white mt-2 w-7/8 h-2/5 m-5">
        <CardHeader>
          <CardTitle>
            <Label className="text-md font-bold ">Rooms</Label>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-start justify-between gap-5">
          <Card className="flex flex-col items-start border-2 justify-start border-primary-grey w-1/4 h-40">
            <CardHeader>
              <Label className="text-primary-black text-lg">8 in 1</Label>
            </CardHeader>
            <CardContent className="flex flex-col items-start gap-2 justify-start">
              <Label className="text-sm">
                2/30
              </Label>
              <Label className="text-xl font-extrabold text-primary-blue">
                GHS 2,000.00
              </Label>
            </CardContent>
          </Card>
          <Card className="flex flex-col items-start border-2 justify-start border-primary-grey w-1/4 h-40">
            <CardHeader>
              <Label className="text-primary-black text-lg">4 in 1</Label>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 items-start justify-start">
              <Label className="text-sm">
                2/30
              </Label>
              <Label className="text-xl font-extrabold text-primary-blue">
                GHS 4,000.00
              </Label>
            </CardContent>
          </Card>
          <Card className="flex flex-col items-start border-2 justify-start border-primary-grey w-1/4 h-40">
            <CardHeader>
              <Label className="text-primary-black text-lg">2 in 1</Label>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 items-start justify-start">
              <Label className="text-sm">
                2/30
              </Label>
              <Label className="text-xl font-extrabold text-primary-blue">
                GHS 8,000.00
              </Label>
            </CardContent>
          </Card>
          <Card className="flex flex-col items-start border-2 justify-start border-primary-grey w-1/4 h-40">
            <CardHeader>
              <Label className="text-primary-black text-lg">1 in 1</Label>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 items-start justify-start">
              <Label className="text-sm">
                2/30
              </Label>
              <Label className="text-xl font-extrabold text-primary-blue">
                GHS 9,000.00
              </Label>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </main>
  );
}
