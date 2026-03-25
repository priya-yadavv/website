import clientPromise from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const client = await clientPromise;
    const db = client.db("myapp");

    const user = await db.collection("users").findOne({ email, password });

    if (!user) {
      return new Response(JSON.stringify({ success: false }), { status: 200 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return new Response(JSON.stringify({ success: false }), { status: 500 });
  }
}