import Link from "next/link";

export default function Admin() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Admin Panel</h1>

      <div className="mt-5 space-y-3">
        <Link href="/admin/publications">Manage Publications</Link>
        <br />
        <Link href="/admin/users">Users</Link>
      </div>
    </div>
  );
}