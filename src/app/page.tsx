import Link from "next/link";
import { getAllPosts } from "@/content/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <header className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-2xl px-6 py-10">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            My Blog
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            记录学习、生活与思考
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-6 py-10">
        <div className="flex flex-col gap-8">
          {posts.map((post) => (
            <article key={post.slug} className="group">
              <Link href={`/posts/${post.slug}`} className="block">
                <time className="text-sm text-zinc-500 dark:text-zinc-500">
                  {post.date}
                </time>
                <h2 className="mt-1 text-xl font-semibold text-zinc-900 group-hover:text-blue-600 dark:text-zinc-100 dark:group-hover:text-blue-400">
                  {post.title}
                </h2>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                  {post.summary}
                </p>
              </Link>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
