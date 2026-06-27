"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { supabase } from "@/lib/supabase";

export default function Home() {

  const [user, setUser] = useState<any>(null);
  const [totalPublications, setTotalPublications] = useState(0);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);



  useEffect(() => {

    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {

        setUser(currentUser);
        setLoading(false);

      }
    );


    return () => unsubscribe();

  }, []);





  useEffect(() => {

    async function getPublicationCount() {

      const { count, error } =
        await supabase
        .from("publications")
        .select("*", {
          count: "exact",
          head: true
        });


      if (!error) {
        setTotalPublications(count || 0);
      }

    }


    getPublicationCount();


  }, []);






  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  }





  return (

    <div className="
      min-h-screen
      flex
      flex-col
      items-center
      justify-center
      bg-gray-50
      p-10
    ">


      {/* HEADER */}

      <h1 className="text-5xl font-bold text-blue-600">
        Digital Library
      </h1>


      <p className="mt-3 text-gray-600">
        Manage publications digitally with ease
      </p>




      {/* PUBLICATION COUNT */}

      <div className="
        mt-6
        bg-white
        shadow
        rounded
        px-6
        py-3
      ">

        Total Publications:

        <span className="font-bold ml-2 text-blue-600">
          {totalPublications}
        </span>

      </div>





      {/* SEARCH */}

      <div className="mt-6 w-full max-w-md">


        <input

          value={search}

          onChange={(e)=>setSearch(e.target.value)}

          placeholder="Search publication..."

          className="
          w-full
          border
          p-3
          rounded
          "

        />


        {search && (

          <Link

            href={`/publications?search=${search}`}

            className="
            block
            mt-2
            text-blue-600
            "
          >

            Search "{search}"

          </Link>

        )}

      </div>





      {/* NAVIGATION */}

      <div className="
        mt-8
        flex
        gap-4
        flex-wrap
        justify-center
      ">



        <Link

          href="/publications"

          className="
          px-5
          py-2
          bg-blue-600
          text-white
          rounded
          "

        >
          Browse Publications

        </Link>





        {!user && (

          <Link

            href="/login"

            className="
            px-5
            py-2
            border
            border-blue-600
            text-blue-600
            rounded
            "

          >

            Login

          </Link>

        )}







        {user && (

          <Link

            href="/dashboard"

            className="
            px-5
            py-2
            bg-green-600
            text-white
            rounded
            "

          >

            Dashboard

          </Link>

        )}







        {user?.email === "YOUR_ADMIN_EMAIL@gmail.com" && (

          <Link

            href="/admin"

            className="
            px-5
            py-2
            bg-red-600
            text-white
            rounded
            "

          >

            Admin Panel

          </Link>

        )}



      </div>






      {/* USER INFO */}

      {user && (

        <div className="mt-8 text-center">


          {user.photoURL && (

            <img

              src={user.photoURL}

              className="
              w-16
              h-16
              rounded-full
              mx-auto
              "

            />

          )}



          <h2 className="font-semibold mt-2">

            {user.displayName}

          </h2>


          <p className="text-gray-500 text-sm">

            {user.email}

          </p>


        </div>

      )}



    </div>

  );

}