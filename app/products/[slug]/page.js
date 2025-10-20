"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import products from "../../../public/products.json";

export default function ProductPage() {
  const { slug } = useParams();

  // Find product by slug
  const product = products.find(
    (p) => p["Item Name"].toLowerCase().replace(/\s+/g, "-") === slug
  );

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Product Not Found</h1>
        <Link href="/" className="text-blue-600 underline mt-4 block">
          Back to Home
        </Link>
      </div>
    );
  }

  const price = parseFloat(product["Sale Price"].replace("$", ""));

  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <img
            src={product.Image || "https://via.placeholder.com/400x400?text=No+Image"}
            alt={product["Item Name"]}
            className="w-full h-auto rounded-md shadow-lg"
          />
        </div>

        <div className="flex-1">
          <h1 className="text-4xl font-bold text-gray-800">{product["Item Name"]}</h1>
          <p className="text-gray-600 mt-2">{product.Category}</p>
          <p className="text-2xl font-bold text-gray-800 mt-4">{product["Sale Price"]}</p>

          {product.Status === "Sold" && (
            <p className="text-red-600 font-bold mt-4 text-xl">Sold Out</p>
          )}

          <button
            className={`snipcart-add-item bg-amber-500 hover:bg-amber-600 text-black font-bold px-5 py-3 rounded mt-6 w-full ${
              product.Status === "Sold" ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={product.Status === "Sold"}
            data-item-id={slug}
            data-item-price={price}
            data-item-name={product["Item Name"]}
            data-item-description={product.Category}
            data-item-url={`/products/${slug}`}
            data-item-image={product.Image || "https://via.placeholder.com/400x400?text=No+Image"}
          >
            {product.Status === "Sold" ? "Sold Out" : "Add to Cart"}
          </button>

          <Link href="/" className="text-blue-600 underline mt-6 block">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
