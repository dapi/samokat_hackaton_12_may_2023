import { FC } from "react";

type MainContentProps = {
  title: string;
  description: string;
  src: string;
};

export const MainContent: FC<MainContentProps> = ({
  src,
  title,
  description,
}) => (
  <div className="flex flex-row mt-6">
    <div className="text-content basis-1/2">
      <h1 className="text-white text-6xl font-extrabold">{title}</h1>
      <p className="mt-6 text-white pr-48">{description}</p>
    </div>
    <div className="ml-4 image basis-1/2 rounded-xl overflow-hidden">
      <img
        className="basis-1/4"
        src={src}
        alt="Презентационная картинка офиса"
      />
    </div>
  </div>
);

// "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=884&q=80"
