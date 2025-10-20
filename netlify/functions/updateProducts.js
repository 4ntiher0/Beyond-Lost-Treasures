// netlify/functions/updateProducts.js
import fetch from "node-fetch";
import fs from "fs";
import path from "path";

export async function handler() {
  try {
    const sheetUrl =
      "https://opensheet.elk.sh/1XcLtt6gG7TcX4-rQ9xUTvF2_IgyjR5ZBgRnVFDbS1qE/Inventory";

    const res = await fetch(sheetUrl);
    const sheetProducts = await res.json();

    const filePath = path.join(process.cwd(), "public", "products.json");

    // Load existing products.json to preserve sold items
    const existingProducts = fs.existsSync(filePath)
      ? JSON.parse(fs.readFileSync(filePath, "utf-8"))
      : [];

    const cleaned = sheetProducts.map((p, i) => {
      const slug =
        p["Item Name"]?.toLowerCase().replace(/\s+/g, "-") || `item-${i + 1}`;

      const existing = existingProducts.find(
        (ep) =>
          ep["Item Name"]?.toLowerCase().replace(/\s+/g, "-") === slug
      );

      return {
        "Item Name": p["Item Name"] || `Item ${i + 1}`,
        Category: p["Category"] || "Misc",
        "Sale Price": p["Sale Price"] || "$0.00",
        Image: p["Image"] || "",
        Status: existing?.Status === "Sold" ? "Sold" : p["Status"] || "Available",
      };
    });

    fs.writeFileSync(filePath, JSON.stringify(cleaned, null, 2));
    console.log("✅ products.json updated successfully");

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Products updated" }),
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
