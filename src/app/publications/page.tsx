import Link from "next/link";

const data = [
  { id: "1", title: "JW Card", code: "CD-9", available: 20 },
  { id: "2", title: "Bible Teach", code: "BK-12", available: 10 },
];

export default function Publications() {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Publications</h1>

      <div className="mt-5 space-y-3">
        {data.map((item) => (
          <Link key={item.id} href={`/publications/${item.id}`}>
            <div className="p-4 border">
              <h2>{item.title}</h2>
              <p>Code: {item.code}</p>
              <p>Available: {item.available}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}