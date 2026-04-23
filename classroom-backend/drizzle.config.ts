import "dotenv/config";
import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

export default defineConfig({
  // Drizzle Kit loads schema files with a CommonJS TS register, which does not
  // resolve the repo's NodeNext-style ".js" specifiers back to sibling ".ts"
  // source files. Reading the compiled schema keeps generation aligned with the
  // app's runtime imports.
  schema: ["./dist/db/schema/app.js", "./dist/db/schema/auth.js"],
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
