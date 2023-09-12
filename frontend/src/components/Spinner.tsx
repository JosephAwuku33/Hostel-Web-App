import { FC } from "react";
import { ScaleLoader } from "react-spinners";

interface SpinnerProps {
  loading: boolean;
  color?: string;
  size?: number;
}

const Spinner: FC<SpinnerProps> = ({ loading, color }, { props }) => {
  return (
    <>
      <ScaleLoader color={color} loading={loading} {...props} />
    </>
  );
};

export default Spinner;
