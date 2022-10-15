import React from "react";
import { useAppSelector } from "../redux/store";

const Homepage = () => {
  const user = useAppSelector((state) => state.user.user);

  return (
    <div className="container mx-auto pt-4">
      <h1>
        Hello,<span className="font-bold"> {user?.name}</span>
      </h1>
    </div>
  );
};

export default Homepage;
