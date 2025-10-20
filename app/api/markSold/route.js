import fs from "fs";
import path from "path";

export async function POST(request) {
  try {
    const { id } = await request.json();
    const filePath = path.join(process.cwd(), "public", "products.json");

    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const updated = data.map((item) => {
      if (String(item.id) === String(id)) {
        return { ...item, soldOut: true, quantity: 0 };
      }
      return item;
    });

    fs.writeFileSync(filePath, JSON.stringify(updated, null, 2));
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("❌ Error updating sold item:", err);
    return new Response(JSON.stringify({ error: "Update failed" }), { status: 500 });
  }
}
