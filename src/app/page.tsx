import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Digital Library</h1>
      <p className="text-gray-500 mt-2">
        Manage real library publications digitally
      </p>

      <a
        href="/login"
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl"
      >
        Get Started
      </a>
    </div>
  );
}