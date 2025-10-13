export default function Home() {
  const products = [
    {
      id: 1,
      name: "Antique Pocket Watch",
      price: 129.99,
      image: "/watch.jpg",
      description: "A 19th-century brass pocket watch that still ticks true.",
    },
    {
      id: 2,
      name: "Vintage Compass",
      price: 59.99,
      image: "/compass.jpg",
      description: "Classic explorer’s compass — a relic of lost voyages.",
    },
    {
      id: 3,
      name: "Silver Ring of Ages",
      price: 89.99,
      image: "/ring.jpg",
      description: "Handcrafted silver ring with a story older than time.",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto py-12 px-6">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">
          Discover Timeless Treasures
        </h2>
        <p className="text-gray-600">
          Rare finds, storied artifacts, and collectibles waiting to be rediscovered.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition flex flex-col max-w-xs mx-auto"
          >
            {/* Image container with fixed height */}
            <div className="w-full h-28 overflow-hidden rounded-md">
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-3 flex-grow">
              <h3 className="text-lg font-semibold text-gray-800">{p.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{p.description}</p>
              <p className="text-base font-bold text-gray-800 mt-2">${p.price}</p>
            </div>

            <button
              className="snipcart-add-item bg-amber-500 hover:bg-amber-600 text-black font-bold px-4 py-2 rounded mt-3"
              data-item-id={p.id}
              data-item-price={p.price}
              data-item-name={p.name}
              data-item-description={p.description}
              data-item-url="/"
              data-item-image={p.image}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
