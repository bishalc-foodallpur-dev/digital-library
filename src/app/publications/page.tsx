"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Publications() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("publications")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error) {
        setData(data || []);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="p-10">

      <h1 className="text-2xl font-bold">
        Publications
      </h1>

      {/* LOADING STATE */}
      {loading && (
        <p className="mt-5 text-gray-500">
          Loading publications...
        </p>
      )}

      {/* EMPTY STATE */}
      {!loading && data.length === 0 && (
        <p className="mt-5 text-gray-500">
          No publications available
        </p>
      )}

      {/* LIST */}
      <div className="mt-5 space-y-3">
        {data.map((item: any) => (
          <Link
            key={item.id}
            href={`/publications/${item.id}`}
          >
            <div className="p-4 border rounded hover:bg-gray-50 transition">

              <h2 className="font-semibold text-lg">
                {item.title}
              </h2>

              <p className="text-sm text-gray-600">
                Code: {item.code}
              </p>

              <p className="text-sm">
                Available:{" "}
                <span
                  className={
                    item.available_quantity < 5
                      ? "text-red-500 font-bold"
                      : "text-green-600"
                  }
                >
                  {item.available_quantity}
                </span>
              </p>

            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}