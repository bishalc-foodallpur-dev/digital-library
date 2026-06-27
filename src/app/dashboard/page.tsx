"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Dashboard() {

  const [stats, setStats] = useState({
    totalPublications: 0,
    totalStock: 0,
    availableStock: 0,
    users: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");



  useEffect(() => {

    async function fetchStats() {

      try {

        setLoading(true);


        // publications
        const {
          data: publications,
          error: pubError
        } = await supabase
          .from("publications")
          .select("total_quantity, available_quantity");


        if (pubError) {
          throw pubError;
        }



        // users
        const {
          count,
          error: userError
        } = await supabase
          .from("users")
          .select("*", {
            count: "exact",
            head: true
          });


        if (userError) {
          throw userError;
        }



        let totalStock = 0;
        let availableStock = 0;


        publications?.forEach((item) => {

          totalStock +=
            item.total_quantity ?? 0;

          availableStock +=
            item.available_quantity ?? 0;

        });



        setStats({
          totalPublications:
            publications?.length ?? 0,

          totalStock,

          availableStock,

          users:
            count ?? 0,
        });



      } catch (err: any) {

        console.error(
          "Dashboard Error:",
          err.message
        );

        setError(err.message);

      } finally {

        setLoading(false);

      }

    }


    fetchStats();


  }, []);



  if (loading) {
    return (
      <div className="p-10">
        Loading dashboard...
      </div>
    );
  }


  if (error) {
    return (
      <div className="p-10">

        <h1 className="text-xl font-bold">
          Dashboard Error
        </h1>

        <p className="text-red-500 mt-3">
          {error}
        </p>

      </div>
    );
  }



  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold">
        Dashboard
      </h1>


      <div className="grid grid-cols-2 gap-5 mt-6">


        <Card
          title="Publications"
          value={stats.totalPublications}
        />


        <Card
          title="Total Stock"
          value={stats.totalStock}
        />


        <Card
          title="Available Stock"
          value={stats.availableStock}
        />


        <Card
          title="Users"
          value={stats.users}
        />


      </div>


    </div>

  );
}



function Card({
  title,
  value
}: {
  title:string;
  value:number;
}) {

  return (

    <div className="p-6 bg-gray-100 rounded">

      <h2 className="font-semibold">
        {title}
      </h2>

      <p className="text-3xl mt-2">
        {value}
      </p>

    </div>

  );
}