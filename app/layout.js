import "./globals.css";

export const metadata = {
  title: "Beyond Lost Treasures",
  description: "Discover rare antiques, vintage collectibles, and timeless valuables.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" 
          data-google-analytics-opt-out=""
          data-darkreader-mode="dynamic"
          data-darkreader-scheme="dark"
          data-darkreader-proxy-injected="true" >
      
      <head>
        {/* Snipcart Styles & Script */}
        <link
          rel="stylesheet"
          href="https://cdn.snipcart.com/themes/v3.6.1/default/snipcart.css"
        />
        <script
          async
          src="https://cdn.snipcart.com/themes/v3.6.1/default/snipcart.js"
        ></script>
      </head>
      <body className="flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-[#1e293b] text-white shadow-md">
          <div className="container mx-auto flex items-center justify-between p-4">
            <h1 className="text-2xl font-bold tracking-tight">
              Beyond <span className="text-amber-400">Lost Treasures</span>
            </h1>
            <button className="snipcart-checkout bg-amber-500 hover:bg-amber-600 text-black font-semibold px-4 py-2 rounded">
              🛒 View Cart
            </button>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-grow">{children}</main>

        {/* Footer */}
        <footer className="bg-[#0f172a] text-gray-300 text-center py-4 text-sm">
          © {new Date().getFullYear()} Beyond Lost Treasures — Curating History, One Find at a Time.
        </footer>

        {/* Snipcart container */}
        <div
          hidden
          id="snipcart"
          data-api-key="MWNmODFjZDYtNzdkNi00YjVmLWEwMzQtMGFjMTI2NWFiYjEwNjM4OTU5MjE1OTAzMzU0NTkz"
          data-config-modal-style="side"
        ></div>
      </body>
    </html>
  );
}