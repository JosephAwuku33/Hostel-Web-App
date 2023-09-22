import { FC, CSSProperties } from "react";
import { ScaleLoader } from "react-spinners";

interface SpinnerProps {
  loading: boolean;
  color?: string;
  size?: number;
  override: CSSProperties;
}

const Spinner: FC<SpinnerProps> = ({ loading , color, override }) => {
  return (
    <>
      <ScaleLoader color={color}  loading={loading} cssOverride={override} />
    </>
  );
};

export default Spinner;
