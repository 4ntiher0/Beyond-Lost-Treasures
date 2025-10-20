"use client";
import { useParams } from "next/navigation";
import products from "../../../products.json";

export default function ProductPage() {
  const { slug } = useParams();

  const product = products.find(
    (p) => p["Item Name"].toLowerCase().replace(/\s+/g, "-") === slug
  );

  if (!product) return <p className="text-center py-20 text-gray-600">Product not found.</p>;

  const image =
    product.Image && product.Image.trim() !== ""
      ? product.Image
      : "https://placehold.co/400x400?text=No+Image";
  const price = product["Sale Price"].replace("$", "");

  return (
    <section className="max-w-3xl mx-auto py-12 px-6 text-center">
      <img
        src={image}
        alt={product["Item Name"]}
        className="w-full max-h-[500px] object-cover rounded-lg shadow-md mb-6"
      />
      <h1 className="text-3xl font-bold mb-2">{product["Item Name"]}</h1>
      <p className="text-gray-500 mb-4">{product.Category}</p>
      <p className="text-2xl font-semibold mb-6">{product["Sale Price"]}</p>

      <button
        className="snipcart-add-item bg-amber-500 hover:bg-amber-600 text-black font-bold px-6 py-3 rounded"
        data-item-id={slug}
        data-item-name={product["Item Name"]}
        data-item-price={price}
        data-item-url={`https://beyond-lost-treasures.netlify.app/products/${slug}`}
      >
        Add to Cart
      </button>
    </section>
  );
}
