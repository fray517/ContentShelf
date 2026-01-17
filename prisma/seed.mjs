import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const notes_count = await prisma.note.count();
  if (notes_count > 0) {
    return;
  }

  await prisma.note.createMany({
    data: [
      { title: "Первая заметка" },
      { title: "Вторая заметка" },
    ],
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

