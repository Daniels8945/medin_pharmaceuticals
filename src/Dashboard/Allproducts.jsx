import * as React from "react";
import { Link } from "react-router-dom";
import { MdAddBox, MdOutlineInventory2, MdSearch } from "react-icons/md";
import ProductItems from "./ui/Allproducts";
import { getItems, deleteItems } from "@/appwrite";
import AdminLayout from "./AdminLayout";

function StatCard({ label, value, icon: Icon, color }) {
  return (
    <div className="bg-white rounded-2xl border border-zinc-200 px-5 py-4 flex items-center gap-4">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
        <Icon className="text-xl" />
        {Icon && <span className="sr-only">{label}</span>}
      </div>
      <div>
        <p className="text-2xl font-bold text-zinc-900 leading-none">{value}</p>
        <p className="text-xs text-zinc-400 mt-0.5">{label}</p>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
      <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center">
        <MdOutlineInventory2 className="text-3xl text-zinc-400" />
      </div>
      <div>
        <p className="font-bold text-zinc-700 font-raleway">No products yet</p>
        <p className="text-sm text-zinc-400 font-raleway mt-1">Add your first product to see it listed here.</p>
      </div>
      <Link
        to="/addproducts"
        className="mt-2 inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors shadow-sm shadow-green-200"
      >
        <MdAddBox className="text-base" /> Add Product
      </Link>
    </div>
  );
}

function Products() {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [deletingId, setDeletingId] = React.useState(null);
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    (async () => {
      const data = await getItems();
      setProducts(data || []);
      setLoading(false);
    })();
  }, []);

  const handleDelete = async (id, imageId) => {
    setDeletingId(id);
    await deleteItems(id, imageId);
    setProducts((prev) => prev.filter((p) => p.$id !== id));
    setDeletingId(null);
  };

  const filtered = products.filter(
    (p) =>
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.description?.toLowerCase().includes(search.toLowerCase())
  );

  const action = (
    <Link
      to="/addproducts"
      className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 active:scale-[0.98] transition-all text-white font-semibold text-sm px-4 h-9 rounded-xl shadow-sm shadow-green-200"
    >
      <MdAddBox className="text-base" />
      Add Product
    </Link>
  );

  return (
    <AdminLayout title="Products" action={action}>
      <div className="flex flex-col gap-6 p-5 xl:p-8">

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard
            label="Total Products"
            value={loading ? "—" : products.length}
            icon={MdOutlineInventory2}
            color="bg-green-100 text-green-600"
          />
          <StatCard
            label="Showing"
            value={loading ? "—" : filtered.length}
            icon={MdSearch}
            color="bg-blue-100 text-blue-600"
          />
        </div>

        {/* Table card */}
        <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">

          {/* Table toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b border-zinc-100">
            <h2 className="font-bold text-zinc-800 text-[15px]">All Products</h2>
            <div className="relative">
              <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-base" />
              <input
                type="text"
                placeholder="Search products…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 h-9 w-full sm:w-[220px] text-sm border border-zinc-200 rounded-xl bg-zinc-50 focus:outline-none focus:border-green-400 focus:bg-white focus:ring-2 focus:ring-green-100 transition-all font-raleway placeholder-zinc-400"
              />
            </div>
          </div>

          {/* Table header */}
          {!loading && filtered.length > 0 && (
            <div className="grid grid-cols-[2fr_3fr_1fr] gap-4 px-6 py-3 border-b border-zinc-100 bg-zinc-50">
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Product</p>
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Description</p>
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider text-right">Action</p>
            </div>
          )}

          {/* Rows */}
          {loading ? (
            <div className="flex flex-col gap-0">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="grid grid-cols-[2fr_3fr_1fr] gap-4 px-6 py-4 border-b border-zinc-50 animate-pulse">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-200 shrink-0" />
                    <div className="h-3 w-24 bg-zinc-200 rounded" />
                  </div>
                  <div className="h-3 w-40 bg-zinc-100 rounded self-center" />
                  <div className="h-7 w-16 bg-zinc-100 rounded-lg ml-auto" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            search ? (
              <div className="py-16 text-center">
                <p className="text-zinc-500 font-raleway font-semibold">No results for "{search}"</p>
                <p className="text-zinc-400 text-sm font-raleway mt-1">Try a different search term.</p>
              </div>
            ) : (
              <EmptyState />
            )
          ) : (
            <div className="divide-y divide-zinc-100">
              {filtered.map((product) => (
                <ProductItems
                  key={product.$id}
                  id={product.$id}
                  imageId={product.imageId}
                  image={product.imageUrl}
                  name={product.name}
                  description={product.description}
                  onDelete={handleDelete}
                  isDeleting={deletingId === product.$id}
                />
              ))}
            </div>
          )}

          {/* Footer count */}
          {!loading && filtered.length > 0 && (
            <div className="px-6 py-3 border-t border-zinc-100 bg-zinc-50">
              <p className="text-xs text-zinc-400 font-raleway">
                {filtered.length} of {products.length} product{products.length !== 1 ? "s" : ""}
              </p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default Products;