import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { CATEGORIES, type Category } from "@/lib/site";

export interface Post {
  slug: string;
  title: string;
  date: string;
  category: Category;
  tags: string[];
  summary: string;
  content: string;
  readingMinutes: number;
  topics: string[];
  source?: { name: string; url?: string };
}

export async function getPosts(): Promise<Post[]> {
  const groups = await Promise.all(
    CATEGORIES.map(async (category) => {
      const directory = path.join(process.cwd(), "content/posts", category);
      const names = await readdir(directory);
      return Promise.all(
        names
          .filter((name) => name.endsWith(".md"))
          .map(async (name): Promise<Post | null> => {
            const { data, content } = matter(
              await readFile(path.join(directory, name), "utf8"),
            );
            if (data.published === false) return null;
            const { title, date, tags, summary, topics = [], source } = data;
            if (
              typeof title !== "string" ||
              !title.trim() ||
              typeof summary !== "string" ||
              typeof date !== "string" ||
              !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
              !Number.isFinite(Date.parse(date)) ||
              new Date(date).toISOString().slice(0, 10) !== date ||
              data.category !== category ||
              !Array.isArray(tags) ||
              !tags.every((tag): tag is string => typeof tag === "string") ||
              !Array.isArray(topics) ||
              !topics.every(
                (topic): topic is string =>
                  typeof topic === "string" && topic.trim().length > 0,
              ) ||
              (source !== undefined &&
                (source === null ||
                  typeof source !== "object" ||
                  typeof source.name !== "string" ||
                  !source.name.trim() ||
                  (source.url !== undefined &&
                    (typeof source.url !== "string" ||
                      !URL.canParse(source.url) ||
                      !["https:", "http:"].includes(
                        new URL(source.url).protocol,
                      )))))
            ) {
              throw new Error(
                `Frontmatter inválido em ${category}/${name}. Confira content/template.md.`,
              );
            }
            return {
              slug: `${category}/${name.slice(0, -3)}`,
              title,
              date,
              tags,
              summary,
              category,
              topics,
              ...(source !== undefined ? { source } : {}),
              content,
              readingMinutes: Math.max(
                1,
                Math.ceil(content.trim().split(/\s+/).length / 200),
              ),
            };
          }),
      );
    }),
  );
  return groups
    .flat()
    .filter((post): post is Post => post !== null)
    .sort(
      (a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug),
    );
}
