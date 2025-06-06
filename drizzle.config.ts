import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env.local" });

console.log("DATABASE_URL:", process.env.DATABASE_URL);
console.log("Schema Path:", "./database/schema.ts");
console.log("Output Directory:", "./migrations");

export default defineConfig({
  schema: "./database/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
