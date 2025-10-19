/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 * @description Auth Sync Page for the app
 */

// Node Modules
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";

const AuthSyncPage = () => {
  const navigate = useNavigate();
  const { isSignedIn, isLoaded, userId } = useAuth();

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      if (localStorage.getItem("clerkUserId")) {
        localStorage.removeItem("clerkUserId");
      }

      navigate("/");
      return;
    }

    if (isSignedIn) {
      localStorage.setItem("clerkUserId", userId);

      navigate("/app/today");
    }
  }, [isSignedIn, isLoaded, userId]);

  return <></>;
};

export default AuthSyncPage;
