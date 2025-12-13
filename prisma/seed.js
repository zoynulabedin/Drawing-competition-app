const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const password = "admin123"; // In a real app, hash this!
  const username = "admin";

  const upsertAdmin = await prisma.admin.upsert({
    where: { username: username },
    update: {},
    create: {
      username: username,
      password: password,
    },
  });

  console.log({ upsertAdmin });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
