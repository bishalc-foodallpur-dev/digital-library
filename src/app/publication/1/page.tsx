import { notFound } from "next/navigation";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) return notFound();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Publication Details</h1>
      <p className="mt-2">Publication ID: {id}</p>
    </div>
  );
}