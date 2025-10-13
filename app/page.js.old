export default function Home() {
  const products = [
    { id: 1, name: "Antique Watch", price: 129.99, image: "/watch.jpg" },
    { id: 2, name: "Vintage Compass", price: 59.99, image: "/compass.jpg" },
  ];

  return (
    <main className="p-10 grid gap-10 sm:grid-cols-2 md:grid-cols-3">
      {products.map((p) => (
        <div
          key={p.id}
          className="rounded-xl shadow-lg p-4 text-center border border-gray-200"
        >
          <img
            src={p.image}
            alt={p.name}
            className="w-full h-48 object-cover rounded-xl"
          />
          <h2 className="text-lg font-bold mt-2">{p.name}</h2>
          <p className="text-gray-600">${p.price}</p>
          <button
            className="snipcart-add-item bg-blue-600 text-white px-4 py-2 rounded mt-2"
            data-item-id={p.id}
            data-item-price={p.price}
            data-item-name={p.name}
            data-item-url="/"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </main>
  );
}
