const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.create({
    data: {
      id: "admin-12345",
      nama: "Admin System",
      email: "admin@example.com",
      password: "admin",
      role: "admin"
    }
  });
  console.log("CREATED ADMIN:", admin);
}

main().catch(console.error).finally(() => prisma.$disconnect());
