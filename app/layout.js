import "./globals.css";

export const metadata = {
  title: "My Store",
  description: "Fast React store with Snipcart",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
      <body>
        {/* Snipcart container (hidden but required) */}
        <div
          hidden
          id="snipcart"
          data-api-key="MWNmODFjZDYtNzdkNi00YjVmLWEwMzQtMGFjMTI2NWFiYjEwNjM4OTU5MjE1OTAzMzU0NTkz"
          data-config-modal-style="side"
        ></div>

        {/* Page content */}
        {children}
      </body>
    </html>
  );
}
