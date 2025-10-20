import fs from "fs";
import path from "path";

// Example: run `node scripts/markSold.js "Smartwatch X"`
// to mark "Smartwatch X" as sold
const itemName = process.argv[2];
if (!itemName) {
  console.error("Please provide an item name to mark as sold.");
  process.exit(1);
}

const filePath = path.join(process.cwd(), "public", "products.json");

const raw = fs.readFileSync(filePath, "utf-8");
const products = JSON.parse(raw);

let found = false;
const updated = products.map((p) => {
  if (p["Item Name"] === itemName) {
    found = true;
    return { ...p, Status: "Sold" };
  }
  return p;
});

if (!found) {
  console.error(`Item "${itemName}" not found in products.json`);
  process.exit(1);
}

fs.writeFileSync(filePath, JSON.stringify(updated, null, 2));
console.log(`✅ Item "${itemName}" marked as Sold!`);

// Optionally: commit & push to GitHub so Netlify rebuilds
try {
  const { execSync } = await import("child_process");
  execSync("git add public/products.json");
  execSync(`git commit -m "Mark ${itemName} as sold [skip ci]" || echo "No changes"`);
  execSync("git push origin main");
  console.log("✅ Changes pushed to GitHub!");
} catch (err) {
  console.log("⚠️ Git push failed, continue manually if needed:", err.message);
}
