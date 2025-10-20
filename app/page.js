"use client";
import Link from "next/link";
import products from "../products.json";

export default function Home() {
  const formatSlug = (name) => name.toLowerCase().replace(/\s+/g, "-");

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

      {/* Product Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => {
          const slug = formatSlug(p["Item Name"]);
          const image =
            p.Image && p.Image.trim() !== ""
              ? p.Image
              : "https://placehold.co/400x400?text=No+Image";
          const price = p["Sale Price"].replace("$", "");

          return (
            <div
              key={slug}
              className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition flex flex-col max-w-xs mx-auto"
            >
              <Link href={`/products/${slug}`} className="block w-full h-40 overflow-hidden rounded-md cursor-pointer">
                <img
                  src={image}
                  alt={p["Item Name"]}
                  className="w-full h-full object-cover"
                />
              </Link>

              <div className="mt-3 flex-grow">
                <h3 className="text-lg font-semibold text-gray-800">
                  {p["Item Name"]}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{p.Category}</p>
                <p className="text-base font-bold text-gray-800 mt-2">
                  {p["Sale Price"]}
                </p>
              </div>

              <button
                className="snipcart-add-item bg-amber-500 hover:bg-amber-600 text-black font-bold px-5 py-3 rounded mt-4 w-full"
                data-item-id={slug}
                data-item-price={price}
                data-item-name={p["Item Name"]}
                data-item-url={`https://beyond-lost-treasures.netlify.app/products/${slug}`}
              >
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
