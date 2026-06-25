"use client";

import { auth, provider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const login = async () => {
    await signInWithPopup(auth, provider);
    router.push("/dashboard");
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Login</h1>

      <button
        onClick={login}
        className="mt-5 px-4 py-2 bg-blue-600 text-white"
      >
        Login with Google
      </button>
    </div>
  );
}