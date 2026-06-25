import Link from "next/link";

export default function Home() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Digital Library</h1>

      <div className="mt-5 space-x-4">
        <Link href="/login">Login</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/publications">Publications</Link>
        <Link href="/my-borrowed">My Borrowed</Link>
        <Link href="/admin">Admin</Link>
      </div>
    </div>
  );
}