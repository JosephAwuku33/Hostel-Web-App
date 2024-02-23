import { Input } from "@/components/ui/input";
import search from "../assets/images/search.png";
import bell from "../assets/images/bell.png";
import Avatar from "react-avatar";
import { useAppSelector } from "@/redux/hooks";

export default function Header() {
  const firstName = useAppSelector((state) => state.auth.first_name);
  const lastName = useAppSelector((state) => state.auth.last_name);

  const fullName = `${firstName} ${lastName}`
  console.log(fullName);


  return (
    <header className="flex flex-row relative p-3 w-full h-10 top-0 bg-primary-white">
      <div className="relative w-3/5">
        <img
          src={search}
          alt="search"
          width={20}
          height={20}
          className="absolute top-5 bottom-0 my-auto text-gray-400 left-3"
        />
        <Input
          type="text"
          placeholder="Search about..."
          className="py-3 pl-12 pr-4 bg-primary-grey rounded-md "
        />
      </div>

      {/**avatar and notification */}
      <div className="flex flex-row absolute right-0 top-0 gap-1 mt-1 mr-3">
        <div className="rounded-full bg-slate-100 p-3">
          <img src={bell} width={20} height={20} alt="bell" />
        </div>
        <Avatar
          round={true}
          textSizeRatio={1.5}
          size="40px"
          name={fullName}
        />
      </div>
    </header>
  );
}
