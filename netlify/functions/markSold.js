import fs from "fs";
import path from "path";
import { execSync } from "child_process";

export async function handler(event, context) {
  try {
    // Parse webhook payload
    const body = JSON.parse(event.body);

    // Only handle completed orders
    if (body.status !== "completed") {
      return { statusCode: 200, body: "Ignored (not completed)" };
    }

    // body.items is an array of purchased items
    const purchasedItems = body.items || [];
    if (!purchasedItems.length) {
      return { statusCode: 200, body: "No items to mark as sold" };
    }

    // Load current products.json
    const filePath = path.join(process.cwd(), "public", "products.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    const products = JSON.parse(raw);

    let updated = [...products];
    let updatedNames = [];

    purchasedItems.forEach((item) => {
      updated = updated.map((p) => {
        if (p["Item Name"] === item.name && p.Status !== "Sold") {
          updatedNames.push(item.name);
          return { ...p, Status: "Sold" };
        }
        return p;
      });
    });

    if (updatedNames.length === 0) {
      return { statusCode: 200, body: "No items updated" };
    }

    // Save updated JSON
    fs.writeFileSync(filePath, JSON.stringify(updated, null, 2));
    console.log(`✅ Marked as Sold: ${updatedNames.join(", ")}`);

    // Commit & push changes to GitHub
    try {
      execSync("git add public/products.json");
      execSync(
        `git commit -m "Auto-mark sold: ${updatedNames.join(", ")} [skip ci]" || echo "No changes"`
      );
      execSync("git push origin main");
      console.log("✅ Changes pushed to GitHub!");
    } catch (err) {
      console.log("⚠️ Git push failed:", err.message);
    }

    return {
      statusCode: 200,
      body: `Updated ${updatedNames.join(", ")} successfully`,
    };
  } catch (err) {
    console.error("❌ Error processing webhook:", err);
    return { statusCode: 500, body: "Server error" };
  }
}
