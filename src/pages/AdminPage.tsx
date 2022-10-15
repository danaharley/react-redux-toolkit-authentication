import React from "react";
import { useAppSelector } from "../redux/store";

const AdminPage = () => {
  const user = useAppSelector((state) => state.user.user);

  return <div>AdminPage - `${user?.name}`</div>;
};

export default AdminPage;
