import { PrismaClient } from "../generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";

// 1. Inject the WebSocket constructor so Node.js can talk to Neon
neonConfig.webSocketConstructor = ws;

// 2. Wrap your correct adapter syntax in a function
const prismaClientSingleton = () => {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is not defined");
  }

  const adapter = new PrismaNeon({ connectionString });
  return new PrismaClient({ adapter });
};

// 3. Define the global variable
declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

// 4. Instantiate the client (or reuse the existing one if it's an HMR reload)
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

// 5. Save the instance globally in development mode
if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}
