import { useState, SetStateAction, useEffect } from "react";
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
  const isAuth = useAppSelector((state) => state.auth.isAuthenticated);

  //const [ successGoogleLogin] = useSuccessGoogleLoginMutation();

  /*
  useEffect(() => {
    const getUser = async () => {
       try {
        const { user } = await successGoogleLogin({}).unwrap();
        dispatch(setGoogleCredentials({ user }));
       } catch (err){
        console.log(err);
       }
    }

    getUser();
  }, [successGoogleLogin, dispatch]);
  */
  useEffect(() => {
    if ( !isAuth ){
      navigate("/");
    }
  }, [isAuth, navigate, dispatch]);

  const onEmailChange = (e: { target: { value: SetStateAction<string> } }) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setPassword(e.target.value);
  };

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const { accessToken, first_name, last_name } = await login({ email, password }).unwrap();
      dispatch(setCredentials({ accessToken, first_name, last_name }));
      setEmail("");
      setPassword("");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err as string);
      console.log(err);
    }
  };

  
  /*
  const handleGoogleSignIn = async () => {
    setEmail("");
    setPassword("");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    window.open("http://localhost:4000/users/google", "_self");
  };
  */
  
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
                  className="flex w-full justify-center rounded-md bg-primary-blue text-primary-white px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>

            <div>
              <button className="flex w-full justify-center rounded-md mt-2 bg-primary-red text-primary-white px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Sign Up with Google
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-google"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
                </svg>
              </button>
            </div>

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
