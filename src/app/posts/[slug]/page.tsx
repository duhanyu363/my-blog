import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/content/posts";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Not Found" };
  return { title: `${post.title} — My Blog` };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <header className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-2xl px-6 py-6">
          <Link
            href="/"
            className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            ← Back
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-6 py-10">
        <article>
          <time className="text-sm text-zinc-500">{post.date}</time>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            {post.title}
          </h1>
          <div className="prose prose-zinc mt-8 dark:prose-invert max-w-none">
            {post.content.split("\n").map((line, i) => {
              if (line.startsWith("## ")) {
                return (
                  <h2
                    key={i}
                    className="mt-8 mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100"
                  >
                    {line.replace("## ", "")}
                  </h2>
                );
              }
              if (line.startsWith("- ")) {
                return (
                  <li
                    key={i}
                    className="ml-4 text-zinc-700 dark:text-zinc-300"
                  >
                    {line.replace("- ", "")}
                  </li>
                );
              }
              if (line.match(/^\d+\. /)) {
                return (
                  <li
                    key={i}
                    className="ml-4 list-decimal text-zinc-700 dark:text-zinc-300"
                  >
                    {line.replace(/^\d+\. /, "")}
                  </li>
                );
              }
              if (line.trim() === "") return <br key={i} />;
              return (
                <p
                  key={i}
                  className="my-2 text-zinc-700 leading-relaxed dark:text-zinc-300"
                  dangerouslySetInnerHTML={{
                    __html: line
                      .replace(
                        /\*\*(.*?)\*\*/g,
                        '<strong class="font-semibold text-zinc-900 dark:text-zinc-100">$1</strong>'
                      )
                      .replace(
                        /`(.*?)`/g,
                        '<code class="rounded bg-zinc-200 px-1.5 py-0.5 text-sm dark:bg-zinc-800">$1</code>'
                      ),
                  }}
                />
              );
            })}
          </div>
        </article>
      </main>
    </div>
  );
}
