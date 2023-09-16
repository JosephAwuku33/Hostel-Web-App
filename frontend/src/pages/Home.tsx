import { useEffect } from "react";
import { useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";

export default function Home() {
  
  const navigate = useNavigate();
  // const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
  <>
    <SideBar/>
  </>
  );
}
