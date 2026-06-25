export default function Dashboard() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-2 gap-4 mt-5">
        <div className="p-4 bg-gray-100">Total Publications</div>
        <div className="p-4 bg-gray-100">Available Stock</div>
        <div className="p-4 bg-gray-100">Borrowed Items</div>
        <div className="p-4 bg-gray-100">Users</div>
      </div>
    </div>
  );
}