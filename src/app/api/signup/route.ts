import clientPromise from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const client = await clientPromise;
    const db = client.db("myapp");

    await db.collection("users").insertOne({ email, password });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false }), {
      status: 500,
    });
  }
}