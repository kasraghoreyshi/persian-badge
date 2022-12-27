import classNames from "classnames";

interface IDividerProps {
  className?: string;
}
const Divider = ({ className }: IDividerProps) => {
  return (
    <div className={classNames("w-full h-[1px] bg-gray-300", className)}></div>
  );
};

export default Divider;
