import { Post } from "./definitions";

export const posts: Omit<Post, "id">[] = [
  {
    title: "Selamat Datang di Blog Baru Saya",
    content:
      "Ini adalah artikel pertama di blog saya yang baru. Dibangun dengan Next.js dan Vercel Postgres!",
    date: "2025-07-19",
  },
  {
    title: "Menjelajahi Server Components",
    content:
      "Server Components adalah fitur yang sangat kuat di Next.js. Mari kita pelajari cara kerjanya.",
    date: "2025-07-20",
  },
];
