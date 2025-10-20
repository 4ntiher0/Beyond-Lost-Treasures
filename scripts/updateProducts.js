// scripts/updateProducts.js
import fs from "fs";
import fetch from "node-fetch";
import { execSync } from "child_process";

async function updateProducts() {
  const sheetUrl = "https://opensheet.elk.sh/1XcLtt6gG7TcX4-rQ9xUTvF2_IgyjR5ZBgRnVFDbS1qE/Inventory";

  const res = await fetch(sheetUrl);
  const products = await res.json();

  const cleaned = products.map((p, i) => ({
    id: p.id || i + 1,
    name: p.name,
    price: parseFloat(p.price || 0),
    description: p.description,
    images: p.images ? p.images.split(",") : [],
    quantity: parseInt(p.quantity || 1),
    soldOut: p.soldOut?.toLowerCase() === "true",
  }));

  fs.writeFileSync("./public/products.json", JSON.stringify(cleaned, null, 2));
  console.log("✅ Products.json updated!");

  // Git commit + push
  execSync(`git add public/products.json`);
  execSync(`git commit -m "Auto-update products.json [skip ci]" || echo "No changes"`);
  execSync(`git push origin main`);
}

updateProducts().catch((err) => {
  console.error("❌ Update failed:", err);
});
