import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function Page({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  if (!id) return notFound();

  const { data: publication, error } = await supabase
    .from("publications")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !publication) {
    return notFound();
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      
      {/* Title */}
      <h1 className="text-3xl font-bold">
        {publication.title}
      </h1>

      {/* Image */}
      {publication.image_url && (
        <img
          src={publication.image_url}
          className="mt-4 rounded w-full h-64 object-cover"
        />
      )}

      {/* Info */}
      <div className="mt-6 space-y-2 text-gray-700">

        <p>
          <b>Code:</b> {publication.code}
        </p>

        <p>
          <b>Category:</b> {publication.category}
        </p>

        <p>
          <b>Description:</b> {publication.description}
        </p>

        <p>
          <b>Total Quantity:</b> {publication.total_quantity}
        </p>

        <p>
          <b>Available Quantity:</b> {publication.available_quantity}
        </p>

      </div>

    </div>
  );
}