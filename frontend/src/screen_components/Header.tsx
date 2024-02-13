import { Input } from "@/components/ui/input";
import search from "../assets/images/search.png";
import bell from "../assets/images/bell.png";
import profile from "../assets/images/Joseph.jpg";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

export default function Header() {
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
        <Avatar>
          <AvatarImage src={profile} height={35} width={35} />
          <AvatarFallback>J</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}