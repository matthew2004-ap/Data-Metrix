"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LockKeyhole, ArrowRight, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email: email.trim(),
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid admin email or password.");
      setLoading(false);
      return;
    }

    router.replace("/admin");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-12 text-white">
      <div className="mx-auto flex min-h-[80vh] max-w-6xl items-center justify-center">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl md:grid-cols-2">
          <div className="hidden min-h-[620px] flex-col justify-between bg-gradient-to-br from-blue-600 via-indigo-700 to-zinc-950 p-10 md:flex">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                <ShieldCheck />
              </div>
              <p className="mt-10 text-sm font-bold uppercase tracking-[0.25em] text-white/70">
                Adewale Insights
              </p>
              <h1 className="mt-4 text-5xl font-black leading-tight">
                Your ideas.
                <br />
                Your platform.
                <br />
                Your CMS.
              </h1>
            </div>
            <p className="max-w-sm text-sm leading-7 text-white/70">
              Securely manage articles, categories, comments and subscribers
              from one place.
            </p>
          </div>

          <div className="bg-white p-8 text-zinc-950 sm:p-12">
            <div className="mb-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-950 text-white">
                <LockKeyhole size={20} />
              </div>
              <p className="mt-8 text-sm font-bold text-blue-600">
                ADMIN PORTAL
              </p>
              <h2 className="mt-2 text-3xl font-black">Welcome back</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-500">
                Sign in with your administrator account.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm font-bold">Email</span>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3.5 outline-none transition focus:border-blue-500 focus:bg-white"
                  placeholder="admin@example.com"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-bold">Password</span>
                <input
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3.5 outline-none transition focus:border-blue-500 focus:bg-white"
                  placeholder="Enter your password"
                />
              </label>

              {error && (
                <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-zinc-950 px-4 py-3.5 font-bold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign in"}
                {!loading && <ArrowRight size={18} />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
