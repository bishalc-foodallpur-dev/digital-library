"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState<any>(null);

  // Example: later you will replace this with Firebase auth
  useEffect(() => {
    const mockUser = null; // replace with auth logic
    setUser(mockUser);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-10">
      
      {/* Title */}
      <h1 className="text-4xl font-bold text-blue-600">
        Digital Library
      </h1>

      <p className="text-gray-600 mt-2">
        Manage publications digitally with ease
      </p>

      {/* Navigation */}
      <div className="mt-8 flex gap-4 flex-wrap justify-center">

        {/* Public Access */}
        <Link
          href="/publications"
          className="px-5 py-2 bg-blue-500 text-white rounded"
        >
          Browse Publications
        </Link>

        {/* Login */}
        {!user && (
          <Link
            href="/login"
            className="px-5 py-2 border border-blue-500 text-blue-500 rounded"
          >
            Login
          </Link>
        )}

        {/* Dashboard (only for logged users) */}
        {user && (
          <Link
            href="/dashboard"
            className="px-5 py-2 bg-green-500 text-white rounded"
          >
            Dashboard
          </Link>
        )}

        {/* Admin Panel (later role-based) */}
        {user?.role === "admin" && (
          <Link
            href="/admin"
            className="px-5 py-2 bg-red-500 text-white rounded"
          >
            Admin Panel
          </Link>
        )}
      </div>
    </div>
  );
}