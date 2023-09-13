import { useEffect } from "react";
import { useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router-dom";
import DisplayRooms from "../components/DisplayRooms";

export default function Home() {
  
  const navigate = useNavigate();
  // const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <section className="bg-slate-200 flex items-center justify-center h-screen">
      <DisplayRooms/>
    </section>
  );
}
