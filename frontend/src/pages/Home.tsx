import { ComponentType, FC, useEffect } from "react";
import { useAppSelector } from "../redux/hooks";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";

interface HomeLayoutProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: ComponentType<any>;
}

const Home: FC<HomeLayoutProps> = ({ component: Component, ...props }) => {
  const navigate = useNavigate();
  // const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <main className="flex">
      <SideBar/>

      <section className="w-full h-full">
        <Component {...props} />
      </section>
    </main>
  );
};

export default Home;
