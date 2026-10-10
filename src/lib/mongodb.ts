import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";

const globalForMongo = globalThis as unknown as { _mongoClient?: MongoClient };

// Reuse one client in dev so hot-reload does not open new connections.
const client = globalForMongo._mongoClient ?? new MongoClient(uri);
if (process.env.NODE_ENV !== "production") globalForMongo._mongoClient = client;

export const db = client.db(process.env.MONGODB_DB || "bazardor");
