/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 * @description Login Page for the app
 */

// Node Modules
import { SignIn } from "@clerk/clerk-react";
// Custom Modules
import { cn } from "@/lib/utils";
// Components
import Head from "@/components/Head";

const LoginPage = () => {
  return (
    <>
      <Head title="Log In to Tasky AI -  Manage Your To-Do Lists and Projects" />

      <section className="">
        <div className={cn("container", "flex justify-center")}>
          <SignIn signUpUrl="/register" />
        </div>
      </section>
    </>
  );
};

export default LoginPage;
