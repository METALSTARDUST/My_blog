import type { Post } from "./posts";

const searchDateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export function postFilters(post: Post): string[] {
  return [
    post.category,
    ...post.topics,
    ...(post.source ? [post.source.name] : []),
  ];
}

export function journalFilters(posts: Post[], categories: readonly string[]) {
  const filters = new Map<string, string>();
  for (const label of [...categories, ...posts.flatMap(postFilters)]) {
    const key = normalize(label);
    if (key !== "todos" && !filters.has(key)) filters.set(key, label.trim());
  }
  return Array.from(filters, ([value, label]) => ({ value, label }));
}

export function matchesPost(post: Post, query: string, filter: string) {
  if (
    filter !== "todos" &&
    !postFilters(post).some((label) => normalize(label) === filter)
  )
    return false;
  const searchable = normalize(
    [
      post.title,
      post.summary,
      post.content,
      ...post.tags,
      ...postFilters(post),
      post.source?.url ?? "",
      post.date,
      post.date.split("-").reverse().join("/"),
      searchDateFormatter.format(new Date(`${post.date}T00:00:00Z`)),
    ].join(" "),
  );
  return normalize(query)
    .split(/\s+/)
    .every((word) => searchable.includes(word));
}
