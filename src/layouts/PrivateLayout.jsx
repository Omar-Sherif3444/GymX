// PrivateLayout.jsx
import { Outlet } from "react-router-dom";
import MachinesContext from "../context/MachinesContext";

const PrivateLayout = () => (
  <MachinesContext>
    <Outlet />
  </MachinesContext>
);

export default PrivateLayout;
