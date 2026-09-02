import "dotenv/config";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";

async function main() {
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    throw new Error("ADMIN_PASSWORD is missing from .env");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const admin = await prisma.user.findFirst({
    where: { role: "ADMIN" },
  });

  if (!admin) {
    throw new Error("No ADMIN user found in the database.");
  }

  await prisma.user.update({
    where: { id: admin.id },
    data: { passwordHash },
  });

  console.log(`Admin password updated for ${admin.email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });