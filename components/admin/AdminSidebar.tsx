import Link from "next/link";
import {
  BarChart3,
  FileText,
  FolderOpen,
  MessageSquare,
  Users,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: BarChart3 },
  { href: "/admin/posts", label: "Posts", icon: FileText },
  { href: "/admin/categories", label: "Categories", icon: FolderOpen },
  { href: "/admin/comments", label: "Comments", icon: MessageSquare },
  { href: "/admin/subscribers", label: "Subscribers", icon: Users },
];

export default function AdminSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-zinc-200 bg-zinc-950 px-5 py-6 text-white md:flex">
      <div className="mb-10">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-blue-400">
          Adewale
        </p>
        <h2 className="mt-3 text-xl font-black">Insights CMS</h2>
      </div>

      <nav className="space-y-2">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold text-zinc-300 transition hover:bg-white/5 hover:text-white"
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
