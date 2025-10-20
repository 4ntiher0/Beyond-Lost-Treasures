// scripts/updateProducts.js
import fs from "fs";
import { execSync } from "child_process";

// Use global fetch in Node >=18
async function updateProducts() {
  try {
    const sheetUrl =
      "https://opensheet.elk.sh/1XcLtt6gG7TcX4-rQ9xUTvF2_IgyjR5ZBgRnVFDbS1qE/Inventory";

    const res = await fetch(sheetUrl);
    if (!res.ok) throw new Error(`Failed to fetch sheet: ${res.statusText}`);

    const products = await res.json();

    const cleaned = products.map((p, i) => ({
      id: p.id || i + 1,
      name: p.name || `Item ${i + 1}`,
      price: parseFloat(p.price?.replace(/\$/g, "") || 0),
      description: p.description || "",
      images: p.images ? p.images.split(",").map((img) => img.trim()) : [],
      quantity: parseInt(p.quantity || 1, 10),
      soldOut: (p.soldOut || "false").toLowerCase() === "true",
    }));

    fs.writeFileSync("./public/products.json", JSON.stringify(cleaned, null, 2));
    console.log("✅ products.json updated!");

    // Git commit + push
    try {
      execSync("git add public/products.json");
      execSync('git commit -m "Auto-update products.json [skip ci]"');
      execSync("git push origin main");
      console.log("✅ Changes pushed to GitHub!");
    } catch (gitErr) {
      console.log("⚠ No changes to commit or Git push failed:", gitErr.message);
    }
  } catch (err) {
    console.error("❌ Update failed:", err);
  }
}

updateProducts();
