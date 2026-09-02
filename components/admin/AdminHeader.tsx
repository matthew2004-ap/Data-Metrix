"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function AdminHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/90 px-5 py-4 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80 md:px-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">
            Admin panel
          </p>
          <h1 className="mt-1 text-xl font-black">Content control</h1>
        </div>

        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="inline-flex items-center gap-2 rounded-2xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm font-bold text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
        >
          <LogOut size={16} />
          Sign out
        </button>
      </div>
    </header>
  );
}
