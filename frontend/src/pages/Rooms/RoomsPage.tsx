import Header from "@/screen_components/Header";
import { Label } from "@/components/ui/label";
import { FullTable } from "./FullTable";

export default function RoomsPage() {
  
  return (
    <main className="flex flex-col h-screen bg-primary-grey">
      <Header />
      {/** space underneath header */}
      <div className="flex items-start justify-start p-4 h-14 bg-primary-white w-full">
        <div className="bg-primary-white mx-auto ">
          <Label htmlFor="date" className="text-lg">
            Rooms
          </Label>
        </div>
      </div>

      <div className="container mx-auto mt-2 h-screen w-full">
        <FullTable/>
      </div>
    </main>
  );
}
