/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 * @description Root layout for the app
 */

// Node Modules
import { Outlet } from "react-router";
// Custom modules
import { cn } from "@/lib/utils";
// Components
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const RootLayout = () => {
  return (
    <>
      <div className={cn("min-h-[100vh]", "flex flex-col", "overflow-hidden")}>
        <Header />

        <main
          className={cn("grow", "pt-36 pb-16", "grid grid-cols-1 items-center")}
        >
          <Outlet />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default RootLayout;
