import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Home() {
  const notes = await prisma.note.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main>
      <h1>Заметки</h1>
      <p className="muted">
        Данные читаются сервером из PostgreSQL (Neon) через Prisma.
      </p>

      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <div>{note.title}</div>
            <div className="muted">
              {note.createdAt.toLocaleString("ru-RU")}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
