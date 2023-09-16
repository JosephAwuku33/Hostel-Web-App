// import React from "react";
import { useNavigate } from "react-router-dom";
import {  Link } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout, reset } from "../features/auth/authSlice";
import { useEffect, useState } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);

  const [ collapsegimme, setCollapseGimme ] = useState(false);
  
  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
  };

  const toggleSidebar = () => {
    setCollapseGimme(!collapsegimme);
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [dispatch, user, navigate]);

  return (
    <section className="flex min-h-screen">
      <Sidebar backgroundColor="#CBC3E3" collapsed={collapsegimme}>
        <Menu>
          <MenuItem icon={<MenuOutlinedIcon />} onClick={toggleSidebar} style={{ textAlign: "left" }}>
            <h2>Admin</h2>
          </MenuItem>
          <MenuItem icon={<HomeOutlinedIcon />} component={<Link to="/roomslist"/>}>Home</MenuItem>
          <MenuItem icon={<PeopleOutlinedIcon />}>Team</MenuItem>
          <MenuItem icon={<ContactsOutlinedIcon />}>Contacts</MenuItem>
          <MenuItem icon={<ReceiptOutlinedIcon />}>Profile</MenuItem>
          <MenuItem icon={<HelpOutlineOutlinedIcon />}>FAQ</MenuItem>
          <MenuItem icon={<LogoutOutlinedIcon  />} onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Sidebar>
    </section>
  );
};

export default SideBar;
