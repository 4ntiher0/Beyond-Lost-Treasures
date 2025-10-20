import fs from "fs";
import path from "path";

export async function handler(event) {
  try {
    const data = JSON.parse(event.body);

    // Only handle completed orders
    if (data.eventName !== "order.completed") {
      return { statusCode: 200, body: "Ignored" };
    }

    const productsFile = path.join(process.cwd(), "public", "products.json");
    const products = JSON.parse(fs.readFileSync(productsFile, "utf-8"));

    const updated = products.map((p) => {
      const slug = p["Item Name"].toLowerCase().replace(/\s+/g, "-");

      // If this product was purchased, mark it sold
      const purchased = data.content.items.find(
        (item) => item.id.toLowerCase() === slug
      );

      if (purchased) {
        return { ...p, Status: "Sold" };
      }
      return p;
    });

    fs.writeFileSync(productsFile, JSON.stringify(updated, null, 2));
    console.log("✅ Products updated after purchase!");

    return { statusCode: 200, body: "OK" };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
