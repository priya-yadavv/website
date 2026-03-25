import clientPromise from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return new Response(JSON.stringify({ success: false, message: "Missing fields" }), {
        status: 400,
      });
    }

    const client = await clientPromise;
    const db = client.db("myapp");

    const existingUser = await db.collection("users").findOne({ email });

    if (existingUser) {
      return new Response(JSON.stringify({ success: false, message: "User already exists" }), {
        status: 400,
      });
    }

    await db.collection("users").insertOne({
      email,
      password,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });

  } catch (error) {
    console.error("SIGNUP ERROR:", error);

    return new Response(JSON.stringify({ success: false, message: "Server error" }), {
      status: 500,
    });
  }
}