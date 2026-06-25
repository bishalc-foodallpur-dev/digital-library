"use client";

import { useState } from "react";

export default function Page() {
  const [qty, setQty] = useState(1);

  const borrow = () => {
    alert(`Borrowed ${qty} items`);
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Publication Detail</h1>

      <p className="mt-2">Code: CD-9</p>
      <p>Available: 20</p>

      <input
        type="number"
        value={qty}
        onChange={(e) => setQty(Number(e.target.value))}
        className="border p-2 mt-4"
      />

      <button
        onClick={borrow}
        className="ml-3 px-4 py-2 bg-green-600 text-white"
      >
        Borrow
      </button>
    </div>
  );
}