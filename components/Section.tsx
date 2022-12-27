import { PropsWithChildren } from "react";

interface ISectionProps {}
const Section = ({ children }: PropsWithChildren<ISectionProps>) => {
  return (
    <div className="max-w-3xl mx-auto px-8 lg:px-0 flex flex-col items-center justify-center space-y-8 w-full">
      {children}
    </div>
  );
};

export default Section;
