import { ComponentType, FC, useEffect } from "react";
import { useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import SideBar from "@/screen_components/SideBar";
import { shallowEqual } from "react-redux";

interface HomeLayoutProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: ComponentType<any>;
}

const Home: FC<HomeLayoutProps> = ({ component: Component, ...props }) => {
  const navigate = useNavigate();

  const userInfo = useAppSelector((state) => state.auth.userInfo, shallowEqual);

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  return (
    <main className="flex min-h-screen">
      <SideBar />
      <section className="w-full h-full">
        <Component {...props} />
      </section>
    </main>
  );
};

export default Home;
