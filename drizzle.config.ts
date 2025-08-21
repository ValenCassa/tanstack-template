import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./src/utils/db/migrations",
  schema: "./src/utils/db/schema/**/*.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
