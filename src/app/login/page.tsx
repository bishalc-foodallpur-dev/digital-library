"use client";

import { auth, provider } from "@/lib/firebase";
import { signInWithPopup, signInWithRedirect } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const login = async () => {
    try {
      setLoading(true);
      setMessage("");

      const result = await signInWithPopup(
        auth,
        provider
      );

      console.log("User:", result.user);

      router.push("/dashboard");

    } catch (error: any) {

      console.log(error.code);

      if (error.code === "auth/popup-closed-by-user") {
        setMessage("Login cancelled");
      }

      else if (
        error.code === "auth/popup-blocked"
      ) {
        // fallback
        await signInWithRedirect(
          auth,
          provider
        );
      }

      else {
        setMessage(
          "Login failed. Try again."
        );
      }

    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center">

      <div className="p-8 shadow rounded">

        <h1 className="text-2xl font-bold">
          Digital Library Login
        </h1>


        {message && (
          <p className="text-red-500 mt-3">
            {message}
          </p>
        )}


        <button
          onClick={login}
          disabled={loading}
          className="mt-5 bg-blue-600 text-white px-5 py-2 rounded"
        >
          {
            loading
            ? "Loading..."
            : "Login with Google"
          }

        </button>

      </div>

    </div>
  );
}