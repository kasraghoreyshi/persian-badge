import { PropsWithChildren } from "react";

interface IParagraphProps {}
const Paragraph = ({ children }: PropsWithChildren<IParagraphProps>) => {
  return (
    <p className="text-lg lg:text-xl text-gray-500 font-light">{children}</p>
  );
};

export default Paragraph;
