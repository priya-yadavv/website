import clientPromise from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const client = await clientPromise;
    const db = client.db("myapp");

    // check if user already exists
    const existingUser = await db.collection("users").findOne({ email });

    if (existingUser) {
      return new Response(
        JSON.stringify({ message: "User already exists" }),
        { status: 400 }
      );
    }

    // insert user
    await db.collection("users").insertOne({
      email,
      password,
    });

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200 }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error creating user" }),
      { status: 500 }
    );
  }
import clientPromise from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const client = await clientPromise;
    const db = client.db("myapp");

    // check if user already exists
    const existingUser = await db.collection("users").findOne({ email });

    if (existingUser) {
      return new Response(
        JSON.stringify({ message: "User already exists" }),
        { status: 400 }
      );
    }

    // insert user
    await db.collection("users").insertOne({
      email,
      password,
    });

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200 }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error creating user" }),
      { status: 500 }
    );
  }
}
}