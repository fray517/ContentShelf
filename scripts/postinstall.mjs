import { execSync } from "node:child_process";

if (!process.env.DATABASE_URL) {
  console.log("postinstall: пропускаю prisma generate (нет DATABASE_URL).");
  process.exit(0);
}

execSync("npx prisma generate", { stdio: "inherit" });

