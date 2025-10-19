/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 * @description Root layout for the app
 */

// Node Modules
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <>
      <div>RootLayout</div>
      <Outlet />
    </>
  );
};

export default RootLayout;
