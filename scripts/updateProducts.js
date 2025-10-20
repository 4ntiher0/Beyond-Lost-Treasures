// scripts/updateProducts.js
import fs from "fs";
import fetch from "node-fetch";
import { execSync } from "child_process";
import path from "path";

async function updateProducts() {
  const sheetUrl =
    "https://opensheet.elk.sh/1XcLtt6gG7TcX4-rQ9xUTvF2_IgyjR5ZBgRnVFDbS1qE/Inventory";

  // Fetch the latest sheet data
  const res = await fetch(sheetUrl);
  const sheetProducts = await res.json();

  // Load existing products.json to preserve sold items
  const filePath = path.join(process.cwd(), "public", "products.json");
  const existingProducts = fs.existsSync(filePath)
    ? JSON.parse(fs.readFileSync(filePath, "utf-8"))
    : [];

  // Map new products from sheet
  const cleaned = sheetProducts.map((p, i) => {
    const slug = p["Item Name"]?.toLowerCase().replace(/\s+/g, "-") || `item-${i+1}`;

    // Check if the item already exists and is sold
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
  console.log("✅ products.json updated while preserving sold items!");

  // Optional: Git commit + push
  try {
    execSync(`git add public/products.json`);
    execSync(`git commit -m "Auto-update products.json [skip ci]" || echo "No changes"`);
    execSync(`git push origin main`);
    console.log("✅ Pushed changes to GitHub");
  } catch (err) {
    console.log("⚠ No changes to push or git error:", err.message);
  }
}

updateProducts().catch((err) => {
  console.error("❌ Update failed:", err);
});
