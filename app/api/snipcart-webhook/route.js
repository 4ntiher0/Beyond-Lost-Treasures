import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    const body = await req.json();

    // Snipcart order event
    if (body?.eventName === "order.completed") {
      const items = body?.content?.items || [];

      const filePath = path.join(process.cwd(), "public", "products.json");
      const products = JSON.parse(fs.readFileSync(filePath, "utf-8"));

      // Mark purchased items as sold
      items.forEach((item) => {
        const slug = item.id;
        const product = products.find(
          (p) =>
            p["Item Name"].toLowerCase().replace(/\s+/g, "-") === slug
        );
        if (product) {
          product.Status = "Sold";
        }
      });

      fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
      console.log("✅ Products.json updated after purchase!");
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("❌ Snipcart webhook error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
