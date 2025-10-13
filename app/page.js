"use client";
import { useState } from "react";

export default function Home() {
  const products = [
    {
      id: 1,
      name: "Antique Pocket Watch",
      price: 129.99,
      images: ["/watch.jpg", "/watch-2.jpg", "/watch-3.jpg"],
      description: "A 19th-century brass pocket watch that still ticks true.",
    },
    {
      id: 2,
      name: "Vintage Compass",
      price: 59.99,
      images: ["/compass.jpg", "/compass-2.jpg"],
      description: "Classic explorer’s compass — a relic of lost voyages.",
    },
    {
      id: 3,
      name: "Silver Ring of Ages",
      price: 89.99,
      images: ["/ring.jpg", "/ring-2.jpg"],
      description: "Handcrafted silver ring with a story older than time.",
    },
  ];

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImages, setCurrentImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (images) => {
    setCurrentImages(images);
    setCurrentIndex(0);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setCurrentImages([]);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? currentImages.length - 1 : prev - 1));
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === currentImages.length - 1 ? 0 : prev + 1));
  };

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
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition flex flex-col max-w-xs mx-auto"
          >
            <div
              className="w-full h-40 overflow-hidden rounded-md cursor-pointer"
              onClick={() => openLightbox(p.images)}
            >
              <img
                src={p.images[0]}
                alt={p.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-3 flex-grow">
              <h3 className="text-lg font-semibold text-gray-800">{p.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{p.description}</p>
              <p className="text-base font-bold text-gray-800 mt-2">
                ${p.price}
              </p>
            </div>

            <button
              className="snipcart-add-item bg-amber-500 hover:bg-amber-600 text-black font-bold px-5 py-3 rounded mt-4 w-full"
              data-item-id={p.id}
              data-item-price={p.price}
              data-item-name={p.name}
              data-item-description={p.description}
              data-item-url="/"
              data-item-image={p.images[0]}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={closeLightbox}
        >
          <div
            className="bg-white rounded-lg p-6 max-w-3xl w-full relative flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 font-bold text-lg"
              onClick={closeLightbox}
            >
              ×
            </button>

            {/* Left arrow */}
            {currentImages.length > 1 && (
              <button
                className="absolute left-2 text-gray-600 hover:text-gray-900 text-2xl font-bold"
                onClick={prevImage}
              >
                ‹
              </button>
            )}

            <img
              src={currentImages[currentIndex]}
              alt={`Lightbox ${currentIndex}`}
              className="w-full h-64 object-cover rounded-md shadow-lg"
            />

            {/* Right arrow */}
            {currentImages.length > 1 && (
              <button
                className="absolute right-2 text-gray-600 hover:text-gray-900 text-2xl font-bold"
                onClick={nextImage}
              >
                ›
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
