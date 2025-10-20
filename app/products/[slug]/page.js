"use client";
import products from "../../../public/products.json";
import Link from "next/link";

// Absolute base URL of your site
const BASE_URL = "https://beyond-lost-treasures.netlify.app";

export default function ProductPage({ params }) {
  const { slug } = params;

  const product = products.find(
    (p) => p["Item Name"].toLowerCase().replace(/\s+/g, "-") === slug
  );

  if (!product) {
    return <p className="p-6">Product not found.</p>;
  }

  const isSold = product.Status === "Sold";

  return (
    <section className="max-w-3xl mx-auto py-12 px-6">
      <Link href="/" className="text-blue-500 mb-4 inline-block">
        ← Back to Shop
      </Link>

      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={product.Image || "https://via.placeholder.com/400x400?text=No+Image"}
          alt={product["Item Name"]}
          className="w-full md:w-1/2 object-cover rounded"
        />

        <div className="flex-1">
          <h1 className="text-3xl font-bold">{product["Item Name"]}</h1>
          <p className="text-gray-500 mt-1">{product.Category}</p>
          <p className="text-xl font-bold mt-4">{product["Sale Price"]}</p>
          {isSold && <p className="text-red-600 font-bold mt-2">Sold Out</p>}

          {!isSold && (
            <button
              className="snipcart-add-item bg-amber-500 hover:bg-amber-600 text-black font-bold px-5 py-3 rounded mt-4 w-full"
              data-item-id={slug}
              data-item-price={parseFloat(product["Sale Price"].replace("$", ""))}
              data-item-name={product["Item Name"]}
              data-item-description={product.Category}
              data-item-url={`${BASE_URL}/products/${slug}`}
              data-item-image={product.Image || "https://via.placeholder.com/400x400?text=No+Image"}
              data-item-quantity="1"
              data-item-max-quantity="1"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
