import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {  toast } from "react-toastify";
import Spinner from "../../screen_components/Spinner";
import { useRegisterMutation } from "../../redux/auth/usersApiSlice";
import { setCredentials } from "../../redux/auth/authSlice";



export default function SignUp() {
  
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password2: "",
  });

  const overrideProps = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  const { first_name, last_name, email, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useAppSelector(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (state: { auth: any }) => state.auth
  );

  useEffect(() => {
    if ( userInfo){
      navigate("/dashboard");
    }
  }, [navigate, userInfo]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChange = (e: { target: { name: any; value: any } }) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if ( password !== password2){
      toast.error('Passwords do not match');
      return;
    } else {
      try {
        const res = await register({first_name, last_name, email, password}).unwrap();
        dispatch(setCredentials({...res}));
        navigate('/dashboard');
      } catch ( err: unknown ){
        toast.error(err as string);
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <Spinner loading={isLoading} override={overrideProps} size={30} />
        </div>
      ) : (
        <main className="flex items-start justify-start flex-col md:flex-row md:max-h-screen w-full bg-slate-300">
          {/**Left column */}
          <section className="flex items-center p-3 justify-center bg-second-background sm:w-full md:min-h-screen md:w-1/3 lg:w-1/3">
            <p className="font-medium md:blur-3xl drop-shadow text-white text-9xl text-center">
              Sign Up
            </p>
          </section>
          {/**Right Column */}
          <section className="flex flex-col gap-3 items-center justify-start md:items-start md:justify-start h-screen w-full lg:w-2/3 md:w-2/3 bg-white p-2">
            <p className="text-4xl font-bold lg:ml-8">Welcome!</p>
            <button className="rounded w-3/4 p-2 lg:ml-8 bg-blue-700 text-white">
              Sign Up with Facebook
            </button>
            <button className="rounded w-3/4 p-2 lg:ml-8 lg:mt-2 bg-red-700 text-white">
              Sign Up with YouTube
            </button>

            <div className="flex flex-row gap-1 items-start lg:ml-8 justify-start w-3/4">
              <div className="border mt-3 border-gray-400 w-1/2"></div>
              <p>Or</p>
              <div className="border mt-3 border-gray-400 w-1/2"></div>
            </div>

            <form
              onSubmit={(val) => onSubmit(val)}
              className="grid grid-cols-2 gap-4 md:gap-2 lg:ml-8 w-3/4"
            >
              <div>
                <label
                  htmlFor="first_name"
                  className="block text-sm mb-2 font-medium text-gray-900"
                >
                  First Name
                </label>
                <input
                  name="first_name"
                  type="text"
                  value={first_name}
                  required
                  onChange={(val) => onChange(val)}
                  className="p-2 w-full rounded-md border-2 py-1.5 text-gray-900 shadow-lg ring-3 ring-inset ring-blue-300 border-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>

              <div>
                <label
                  htmlFor="last_name"
                  className="block text-sm mb-2 font-medium text-gray-900"
                >
                  Last Name
                </label>
                <input
                  name="last_name"
                  type="text"
                  value={last_name}
                  required
                  onChange={(val) => onChange(val)}
                  className="p-2 w-full rounded-md border-2 py-1.5 text-gray-900 shadow-lg ring-3 ring-inset ring-blue-300 border-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>

              <div className="col-span-2">
                <label
                  htmlFor="email"
                  className="block text-sm mb-2 font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" 
                  value={email}
                  required
                  onChange={(val) => onChange(val)}
                  className="p-2 w-full rounded-md border-2 py-1.5 text-gray-900 shadow-lg ring-3 ring-inset ring-blue-300 border-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm mb-2 font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  minLength={8}
                  value={password}
                  required
                  onChange={(val) => onChange(val)}
                  className="p-2 w-full rounded-md border-2 py-1.5 text-gray-900 shadow-lg ring-3 ring-inset ring-blue-300 border-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>

              <div>
                <label
                  htmlFor="password2"
                  className="md:block text-sm mb-2 font-medium text-gray-900"
                >
                  Confirm It
                </label>
                <input
                  name="password2"
                  type="password"
                  minLength={8}
                  value={password2}
                  required
                  onChange={(val) => onChange(val)}
                  className="p-2 w-full mt-1 md:mt-0 rounded-md border-2 py-1.5 text-gray-900 shadow-lg ring-3 ring-inset ring-blue-300 border-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>

              <div className="col-span-2 mt-1">
                <button
                  type="submit"
                  className="rounded-none p-2 w-full bg-blue-700 text-white"
                >
                  Sign Up
                </button>
              </div>

              <div className="flex items-center justify-center col-span-2">
                <input
                  type="checkbox"
                  name="termsAndConditions"
                  className="mr-2"
                />
                <label
                  htmlFor="termsAndConditions"
                  className=" text-sm font-medium text-gray-900"
                >
                  I agree to the TOS
                </label>
              </div>

              <div className="flex items-center justify-center col-span-2">
                <p className="text-center">
                  Already registered?{" "}
                  <Link to="/" className="text-blue-500">
                    Login
                  </Link>
                  <Outlet />
                </p>
              </div>
            </form>
          </section>
        </main>
      )}
    </>
  );
}
