import { useState, useEffect, SetStateAction } from "react";
import { Outlet, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks.ts";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../screen_components/Spinner.tsx";
import { setCredentials } from "../../redux/auth/authSlice.ts";
import { useLoginMutation } from "../../redux/auth/usersApiSlice.ts";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const userInfo = useAppSelector((state) => state.auth.userInfo);

  const onEmailChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard");
    }
  }, [userInfo, navigate, dispatch]);

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/dashboard");
    } catch (err) {
      toast.error(err as string);
      console.log(err);
    }
  };

  const overrideProps = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    backgroundColor: "white",
  };

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <Spinner loading={isLoading} override={overrideProps} size={30} />
        </div>
      ) : (
        <main className="flex h-screen flex-1 flex-col justify-center bg-slate-100 bg-main-background px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={(val) => onSubmit(val)}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    value={email}
                    onChange={onEmailChange}
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-indigo-900 hover:text-green-900"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    value={password}
                    onChange={onPasswordChange}
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-900">
              Not a member?{" "}
              <Link
                to="/signup"
                className="font-semibold leading-6 text-indigo-900 hover:text-green-500"
              >
                Register now
              </Link>
              <Outlet />
            </p>
          </div>
        </main>
      )}
    </>
  );
}
