"use client";
import Link from "next/link";
import products from "../public/products.json"; // make sure path is correct

export default function Home() {
  const formatSlug = (name) => name?.toLowerCase().replace(/\s+/g, "-") || "";

  return (
    <section className="max-w-6xl mx-auto py-12 px-6">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">
          Discover Timeless Treasures
        </h2>
        <p className="text-gray-600">
          Rare finds, storied artifacts, and collectibles waiting to be rediscovered.
        </p>
      </div>

      {/* Product grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p, i) => (
          <div
            key={i}
            className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition flex flex-col max-w-xs mx-auto"
          >
            <div className="w-full h-40 overflow-hidden rounded-md cursor-pointer">
              <img
                src={p.Image || "https://via.placeholder.com/400x400?text=No+Image"}
                alt={p["Item Name"]}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-3 flex-grow">
              <h3 className="text-lg font-semibold text-gray-800">{p["Item Name"]}</h3>
              <p className="text-sm text-gray-500 mt-1">{p.Category}</p>
              <p className="text-base font-bold text-gray-800 mt-2">{p["Sale Price"]}</p>
              {p.Status === "Sold" && (
                <p className="text-red-600 font-bold mt-1">Sold Out</p>
              )}
            </div>

            <button
              className={`snipcart-add-item bg-amber-500 hover:bg-amber-600 text-black font-bold px-5 py-3 rounded mt-4 w-full
                ${p.Status === "Sold" ? "opacity-50 cursor-not-allowed" : ""}`}
              data-item-id={formatSlug(p["Item Name"])}
              data-item-price={parseFloat(p["Sale Price"].replace("$", ""))}
              data-item-name={p["Item Name"]}
              data-item-url={`/products/${formatSlug(p["Item Name"])}`}
              data-item-description={p.Category}
              data-item-image={p.Image || "https://via.placeholder.com/400x400?text=No+Image"}
              disabled={p.Status === "Sold"}
            >
              {p.Status === "Sold" ? "Sold Out" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
