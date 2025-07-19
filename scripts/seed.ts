import { posts } from "../src/lib/placeholder-data";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function seedPosts() {
  try {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await sql`
      CREATE TABLE IF NOT EXISTS posts (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        date DATE NOT NULL
      );
    `;
    console.log(`Created "posts" table`);

    const insertedPosts = await Promise.all(
      posts.map(
        (post) => sql`
          INSERT INTO posts (title, content, date)
          VALUES (${post.title}, ${post.content}, ${post.date})
          ON CONFLICT (id) DO NOTHING;
        `
      )
    );

    console.log(`Seeded ${insertedPosts.length} posts`);
    return { createTable, posts: insertedPosts };
  } catch (error) {
    console.error("Error seeding posts:", error);
    throw error;
  }
}

async function main() {
  await seedPosts();
  await sql.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
