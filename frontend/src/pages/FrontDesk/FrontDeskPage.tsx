import Header from "@/screen_components/Header";

export default function FrontDeskPage() {
  return (
    <main className="flex flex-col h-screen bg-primary-grey">
      <Header/>
       {/** space underneath header */}
       <div className="flex justify-between p-4 h-16 bg-primary-white items-center w-full">
       
      </div>
    </main>
  );
}
