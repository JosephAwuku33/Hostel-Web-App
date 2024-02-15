import { useAppSelector } from "@/redux/hooks";

export const useAuthToken = () => {
  // useAppSelector is a hook provided by react-redux that allows you to extract data from the Redux store state.
  // Here, we're accessing the token from the auth slice of the Redux store.
  const token = useAppSelector((state) => state.auth.token);
  return token;
};
