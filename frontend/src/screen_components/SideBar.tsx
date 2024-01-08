import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "@/redux/auth/usersApiSlice";
import { logout } from "@/redux/auth/authSlice";

export default function SideBar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.auth);

  const [logoutApiCall] = useLogoutMutation();

  const [collapsegimme, setCollapseGimme] = useState<boolean>(false);

  const toggleSidebar = () => {
    setCollapseGimme(!collapsegimme);
  };

  const handleLogout = async () => {
    try {
      await logoutApiCall({}).unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, [dispatch, userInfo, navigate]);

  return (
    <section className="flex h-screen">
      <Sidebar backgroundColor="#CBC3E3" collapsed={collapsegimme}>
        <Menu>
          <MenuItem onClick={toggleSidebar}>|||</MenuItem>
          <MenuItem component={<Link to="/home" />}>Home</MenuItem>
          <MenuItem component={<Link to="/contact" />}>Contact</MenuItem>
          <MenuItem onClick={ handleLogout}>OUT</MenuItem>
        </Menu>
      </Sidebar>
    </section>
  );
}
