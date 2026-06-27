"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Publications() {

  const [publications, setPublications] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);



  useEffect(() => {

    async function loadPublications() {

      const { data, error } = await supabase
        .from("publications")
        .select("*")
        .order("created_at", {
          ascending: false
        });


      if (!error) {

        setPublications(data || []);
        setFiltered(data || []);

      }

      setLoading(false);

    }


    loadPublications();

  }, []);




  // SEARCH SYSTEM
  useEffect(() => {


    const result = publications.filter(
      (item) =>

        item.title
          ?.toLowerCase()
          .includes(search.toLowerCase())

        ||

        item.code
          ?.toLowerCase()
          .includes(search.toLowerCase())

    );


    setFiltered(result);


  }, [search, publications]);





  if (loading) {

    return (
      <div className="p-10">
        Loading publications...
      </div>
    );

  }





  return (

    <div className="p-10">


      <div className="flex justify-between items-center">


        <h1 className="text-3xl font-bold">
          Publications
        </h1>


        <div className="bg-blue-100 px-4 py-2 rounded">

          Total:
          <span className="font-bold ml-2">
            {publications.length}
          </span>

        </div>


      </div>




      {/* SEARCH */}

      <input

        value={search}

        onChange={(e)=>setSearch(e.target.value)}

        placeholder="Search title or code..."

        className="
        mt-6
        w-full
        border
        p-3
        rounded
        "

      />





      {/* LIST */}


      <div className="mt-6 grid gap-4">


        {filtered.length === 0 && (

          <p className="text-gray-500">
            No publication found
          </p>

        )}





        {filtered.map((item)=> (

          <Link

            key={item.id}

            href={`/publications/${item.id}`}

          >


            <div

              className="
              border
              rounded
              p-5
              hover:bg-gray-50
              "

            >



              <h2 className="text-xl font-semibold">

                {item.title}

              </h2>




              <p className="text-gray-600">

                Code:
                <b className="ml-1">
                  {item.code}
                </b>

              </p>




              <p className="mt-2">

                Available:

                <span
                  className={
                    item.available_quantity < 5
                    ?
                    "text-red-600 font-bold ml-2"
                    :
                    "text-green-600 font-bold ml-2"
                  }
                >

                  {item.available_quantity}

                </span>


              </p>




              {item.category && (

                <p className="text-sm text-gray-500">

                  Category:
                  {item.category}

                </p>

              )}




            </div>


          </Link>

        ))}


      </div>



    </div>

  );

}