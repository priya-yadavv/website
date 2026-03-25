import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

let clientPromise: Promise<MongoClient>;

if (!(globalThis as any)._mongoClientPromise) {
  (globalThis as any)._mongoClientPromise = client.connect();
}

clientPromise = (globalThis as any)._mongoClientPromise;

export default clientPromise;