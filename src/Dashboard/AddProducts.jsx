import React from "react";
import { useNavigate } from "react-router-dom";
import { MdCloudUpload, MdDeleteForever, MdCheckCircle } from "react-icons/md";
import { uploadImage, addToDB } from "@/appwrite";
import AdminLayout from "./AdminLayout";

const AddProducts = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    description: "",
    creator: "Admin",
  });
  const [isPending, setIsPending] = React.useState(false);
  const [isDone, setIsDone] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const [preview, setPreview] = React.useState(null);
  const [dragOver, setDragOver] = React.useState(false);
  const [error, setError] = React.useState("");
  const fileInputRef = React.useRef(null);
  const navigate = useNavigate();

  const handleImageChange = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }
    setError("");
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleImageChange(file);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) { setError("Please upload a product image."); return; }
    setIsPending(true);
    setError("");
    try {
      const imageId = await uploadImage(image);
      await addToDB(formData, imageId);
      setIsDone(true);
      setTimeout(() => navigate("/dashboard"), 1200);
    } catch {
      setError("Something went wrong. Please try again.");
      setIsPending(false);
    }
  };

  const inputClass =
    "w-full h-11 px-4 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-800 font-raleway placeholder-zinc-400 focus:outline-none focus:border-green-400 focus:bg-white focus:ring-2 focus:ring-green-100 transition-all";

  return (
    <AdminLayout title="Add Product">
      <div className="flex flex-col gap-6 p-5 xl:p-8 max-w-4xl">

        {/* Page heading */}
        <div>
          <h2 className="text-xl font-bold text-zinc-900 font-raleway">New Product</h2>
          <p className="text-sm text-zinc-400 font-raleway mt-0.5">Fill in the details below to add a product to the catalogue.</p>
        </div>

        {/* Error banner */}
        {error && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-6">

          {/* ── Left: form fields ─────────────────────────── */}
          <div className="flex-1 flex flex-col gap-5 bg-white rounded-2xl border border-zinc-200 p-6">
            <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Product Details</h3>

            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-sm font-semibold text-zinc-700">
                Product Name <span className="text-red-400">*</span>
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Normal Saline 1000ml"
                className={inputClass}
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="description" className="text-sm font-semibold text-zinc-700">
                Description <span className="text-red-400">*</span>
              </label>
              <textarea
                id="description"
                required
                value={formData.description}
                onChange={handleChange}
                placeholder="A brief description of the product, its uses, and formulation…"
                rows={5}
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-800 font-raleway placeholder-zinc-400 focus:outline-none focus:border-green-400 focus:bg-white focus:ring-2 focus:ring-green-100 transition-all resize-none"
              />
            </div>

            {/* Creator */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="creator" className="text-sm font-semibold text-zinc-700">Created By</label>
              <div className="relative">
                <select
                  id="creator"
                  value={formData.creator}
                  onChange={handleChange}
                  className="w-full h-11 pl-4 pr-10 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-700 font-raleway focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all appearance-none cursor-pointer"
                >
                  <option value="Admin">Admin</option>
                  <option value="Ola">Ola</option>
                </select>
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending || isDone}
              className="mt-2 w-full h-12 rounded-xl font-bold text-[15px] font-raleway transition-all duration-200 flex items-center justify-center gap-2 shadow-sm disabled:cursor-not-allowed
                bg-green-500 hover:bg-green-600 active:scale-[0.98] text-white shadow-green-200
                disabled:opacity-70"
            >
              {isDone ? (
                <><MdCheckCircle className="text-lg" /> Product Added!</>
              ) : isPending ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Saving…
                </>
              ) : (
                "Add Product"
              )}
            </button>
          </div>

          {/* ── Right: image upload ────────────────────────── */}
          <div className="lg:w-[300px] xl:w-[340px] flex flex-col gap-4 bg-white rounded-2xl border border-zinc-200 p-6">
            <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Product Image</h3>

            {/* Preview */}
            {preview ? (
              <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-zinc-200 bg-zinc-100 group">
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => { setImage(null); setPreview(null); }}
                    className="flex items-center gap-1.5 bg-white text-red-500 font-bold text-sm px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <MdDeleteForever className="text-base" /> Remove
                  </button>
                </div>
              </div>
            ) : (
              /* Drop zone */
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`w-full aspect-square rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-200 ${
                  dragOver
                    ? "border-green-400 bg-green-50"
                    : "border-zinc-300 bg-zinc-50 hover:border-green-400 hover:bg-green-50/50"
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-white border border-zinc-200 flex items-center justify-center shadow-sm">
                  <MdCloudUpload className={`text-2xl transition-colors ${dragOver ? "text-green-500" : "text-zinc-400"}`} />
                </div>
                <div className="text-center px-4">
                  <p className="text-sm font-semibold text-zinc-600 font-raleway">
                    {dragOver ? "Drop it here" : "Click or drag to upload"}
                  </p>
                  <p className="text-xs text-zinc-400 font-raleway mt-0.5">PNG, JPG, WEBP up to 10MB</p>
                </div>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e.target.files[0])}
              className="hidden"
            />

            {image && (
              <div className="bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3">
                <p className="text-xs text-zinc-500 font-raleway truncate">
                  <span className="font-semibold text-zinc-700">File:</span> {image.name}
                </p>
                <p className="text-xs text-zinc-400 font-raleway mt-0.5">
                  {(image.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            )}

            <p className="text-xs text-zinc-400 font-raleway text-center">
              Upload a clear product photo for the catalogue.
            </p>
          </div>

        </form>
      </div>
    </AdminLayout>
  );
};

export default AddProducts;