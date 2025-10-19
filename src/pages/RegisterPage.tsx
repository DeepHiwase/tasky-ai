/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 * @description Register Page for the app
 */

// Node Modules
import { SignUp } from "@clerk/clerk-react";
// Custom Modules
import { cn } from "@/lib/utils";
// Components
import Head from "@/components/Head";

const RegisterPage = () => {
  return (
    <>
      <Head title="Create an Account - Tasky AI To-Do List & Project Management App" />

      <section className="">
        <div className={cn("container", "flex justify-center")}>
          <SignUp signInUrl="/login" />
        </div>
      </section>
    </>
  );
};

export default RegisterPage;
