import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

export function Header() {
  return (
    <header className="border-b border-dark-border bg-dark-card">
      <nav className="mx-auto flex w-full max-w-3xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold text-sonic-cyan">
          {SITE_NAME}
        </Link>
      </nav>
    </header>
  );
}
