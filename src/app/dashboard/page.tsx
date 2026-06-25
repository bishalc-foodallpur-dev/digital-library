"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalPublications: 0,
    totalStock: 0,
    availableStock: 0,
    users: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      // 📚 Publications
      const { data: publications } = await supabase
        .from("publications")
        .select("*");

      // 👤 Users
      const { data: users } = await supabase
        .from("users")
        .select("*");

      let totalStock = 0;
      let availableStock = 0;

      publications?.forEach((p: any) => {
        totalStock += p.total_quantity || 0;
        availableStock += p.available_quantity || 0;
      });

      setStats({
        totalPublications: publications?.length || 0,
        totalStock,
        availableStock,
        users: users?.length || 0,
      });
    };

    fetchStats();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-2 gap-4 mt-5">

        <div className="p-5 bg-blue-100 rounded">
          <h2 className="text-lg font-semibold">Total Publications</h2>
          <p className="text-2xl">{stats.totalPublications}</p>
        </div>

        <div className="p-5 bg-green-100 rounded">
          <h2 className="text-lg font-semibold">Total Stock</h2>
          <p className="text-2xl">{stats.totalStock}</p>
        </div>

        <div className="p-5 bg-yellow-100 rounded">
          <h2 className="text-lg font-semibold">Available Stock</h2>
          <p className="text-2xl">{stats.availableStock}</p>
        </div>

        <div className="p-5 bg-purple-100 rounded">
          <h2 className="text-lg font-semibold">Users</h2>
          <p className="text-2xl">{stats.users}</p>
        </div>

      </div>
    </div>
  );
}