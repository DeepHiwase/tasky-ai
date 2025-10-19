/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 * @description Root layout for the app
 */

// Node Modules
import { Outlet, useNavigation } from "react-router";
import { Loader2 } from "lucide-react";
// Custom modules
import { cn } from "@/lib/utils";
// Components
import Header from "@/components/Header";
import Footer from "@/components/Footer";
// Assets
import { logo } from "@/assets";

const RootLayout = () => {
  const navigation = useNavigation();

  const isLoading = navigation.state === "loading" && !navigation.formData;

  return (
    <>
      <div
        className={cn(
          "relative isolate",
          "min-h-[100vh]",
          "flex flex-col",
          "overflow-hidden",
        )}
      >
        <Header />

        <main
          className={cn("grow", "pt-36 pb-16", "grid grid-cols-1 items-center")}
        >
          <Outlet />
        </main>

        <Footer />

        {/* Background shapes */}
        <div
          className={cn(
            "absolute top-20 left-0 rotate-45 origin-top-left",
            "w-80 h-10",
            "bg-primary/20 blur-3xl",
          )}
        ></div>
        <div
          className={cn(
            "absolute top-20 right-0 -rotate-45 origin-top-right",
            "w-80 h-10",
            "bg-primary/20 blur-3xl",
          )}
        ></div>

        {/* Loader */}
        {isLoading && (
          <div
            className={cn(
              "fixed top-0 left-0 z-50",
              "h-[100dvh] w-full",
              "flex flex-col justify-center items-center gap-5",
              "bg-background",
            )}
          >
            <img
              src={logo}
              width={64}
              height={64}
              alt="Tasky AI"
            />
            <Loader2 className="text-muted-foreground animate-spin" />
          </div>
        )}
      </div>
    </>
  );
};

export default RootLayout;
