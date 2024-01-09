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

  // Function to handle window resize
  const handleResize = () => {
    setCollapseGimme(window.innerWidth < 768);
  };

  useEffect(() => {
    // Add event listener for window resize
    window.addEventListener("resize", handleResize);
    // Initial check on component mount
    handleResize();

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="flex h-screen">
      <Sidebar backgroundColor="white" collapsed={collapsegimme}>
        <Menu>
          <MenuItem onClick={toggleSidebar} >
            <h1 className="p-1 flex items-center flex-row justify-start gap-4 w-full" >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="40"
                viewBox="0 0 30 40"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.474 1.48017C12.0035 3.6732 12.1012 3.38256 12.1012 11.5178C12.1012 15.0772 12.1563 17.9892 12.2238 17.9892C12.4782 17.9892 16.046 15.7619 16.5493 15.2885C16.8387 15.0166 17.269 14.3955 17.5054 13.9087C17.9035 13.0893 17.931 12.5374 17.8759 6.51165L17.8163 0L15.474 1.48017ZM1.46841e-05 17.22C0.000687047 20.5718 0.101543 23.6962 0.224361 24.1629C0.561215 25.4438 1.68989 26.6037 3.88246 27.9227C4.97079 28.5773 5.90359 29.1129 5.95558 29.1129C6.00735 29.1129 6.04994 26.2494 6.04994 22.7497V16.3864L5.43361 15.1448C4.89482 14.0595 4.54945 13.7302 2.68812 12.5272C1.51709 11.7703 0.433017 11.1453 0.278822 11.1384C0.0616487 11.1285 -0.00110592 12.4948 1.46841e-05 17.22ZM23.981 17.1017C23.9821 23.4233 24.1056 24.4583 25.0077 25.7209C25.4216 26.3005 28.6826 28.5525 29.8684 29.0781C29.9719 29.1241 30.0257 26.1337 29.9879 22.4333L29.9188 15.7051L29.3274 14.7619C28.9139 14.1023 28.0938 13.414 26.5991 12.4723C25.4239 11.7315 24.3537 11.1256 24.221 11.1256C24.0549 11.1256 23.9801 12.9899 23.981 17.1017ZM15.9113 23.2084C14.8635 23.8519 13.7144 24.6684 13.3579 25.0227C12.1649 26.2078 12.1012 26.643 12.1012 33.6022C12.1012 37.1211 12.164 40 12.2404 40C12.317 40 13.2808 39.4507 14.3823 38.7795C16.5218 37.4754 17.6278 36.3107 17.8246 35.1543C17.8916 34.7605 17.9172 31.6482 17.8813 28.238L17.8163 22.038L15.9113 23.2084Z"
                  fill="#2F7BEB"
                /> 
              </svg>
              <p className="text-blue-500 text-lg font-bold">Novotel</p>
            </h1>

          </MenuItem>
          <MenuItem
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
            }
            component={<Link to="/dashboard" />}
          >
            Dashboard
          </MenuItem>
          <MenuItem
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            }
            component={<Link to="/front-desk" />}
          >
            Front Desk
          </MenuItem>
          <MenuItem
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"
                />
              </svg>
            }
            component={<Link to="/guest" />}
          >
            Guest
          </MenuItem>

          <MenuItem
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                />
              </svg>
            }
            component={<Link to="/rooms" />}
          >
            Rooms
          </MenuItem>

          <MenuItem
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 6h.008v.008H6V6Z"
                />
              </svg>
            }
            component={<Link to="/deal" />}
          >
            Deal
          </MenuItem>
          <MenuItem
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            }
            component={<Link to="/rate" />}
          >
            Rate
          </MenuItem>

          <MenuItem
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25"
                />
              </svg>
            }
            onClick={handleLogout}
          >
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
    </section>
  );
}
