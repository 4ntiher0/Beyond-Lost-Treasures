"use client";
import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error loading products:", err));
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-900 to-black text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Beyond Lost Treasures</h1>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl mx-auto">
        {products.map((item, index) => {
          const name = item["Item Name"];
          const category = item["Category"];
          const price = item["Sale Price"];
          const image = item["Image"] || "https://via.placeholder.com/400x400?text=No+Image";
          const status = item["Status"];

          const isSold = status?.toLowerCase() !== "available";

          return (
            <div
              key={index}
              className={`relative rounded-2xl overflow-hidden shadow-lg bg-neutral-800 border border-neutral-700 hover:shadow-xl transition duration-300 ${
                isSold ? "opacity-60" : ""
              }`}
            >
              <img
                src={image}
                alt={name}
                className="w-full h-64 object-cover"
              />

              <div className="p-4">
                <h2 className="text-lg font-semibold">{name}</h2>
                <p className="text-sm text-neutral-400">{category}</p>
                <p className="text-xl font-bold mt-2">{price}</p>

                {isSold ? (
                  <p className="text-red-500 font-semibold mt-2">SOLD</p>
                ) : (
                  <button
                    className="snipcart-add-item mt-3 bg-emerald-600 hover:bg-emerald-500 text-white py-2 px-4 rounded-xl w-full font-medium transition"
                    data-item-id={name.replace(/\s+/g, "-").toLowerCase()}
                    data-item-name={name}
                    data-item-price={price.replace(/[^0-9.]/g, "")}
                    data-item-url="/"
                    data-item-image={image}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
