type Category = {
  id: string;
  name: string;
};

type PostFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  categories: Category[];
  post?: {
    id?: string;
    title?: string;
    excerpt?: string;
    content?: string;
    image?: string | null;
    readTime?: string | null;
    categoryId?: string;
    published?: boolean;
    featured?: boolean;
  };
};

export default function PostForm({ action, categories, post }: PostFormProps) {
  const isEditing = Boolean(post?.id);

  return (
    <form action={action} className="space-y-6 rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      {isEditing && <input type="hidden" name="id" value={post?.id ?? ""} />}

      <div className="grid gap-6 lg:grid-cols-2">
        <label className="block space-y-2 lg:col-span-2">
          <span className="text-sm font-bold">Title</span>
          <input
            name="title"
            required
            defaultValue={post?.title ?? ""}
            className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-950"
            placeholder="The title of your article"
          />
        </label>

        <label className="block space-y-2 lg:col-span-2">
          <span className="text-sm font-bold">Excerpt</span>
          <textarea
            name="excerpt"
            required
            rows={3}
            defaultValue={post?.excerpt ?? ""}
            className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-950"
            placeholder="A short summary of the article"
          />
        </label>

        <label className="block space-y-2 lg:col-span-2">
          <span className="text-sm font-bold">Content</span>
          <textarea
            name="content"
            required
            rows={12}
            defaultValue={post?.content ?? ""}
            className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-950"
            placeholder="Write your article here"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-bold">Image URL</span>
          <input
            name="image"
            type="url"
            defaultValue={post?.image ?? ""}
            className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-950"
            placeholder="https://example.com/cover.jpg"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-bold">Read time</span>
          <input
            name="readTime"
            defaultValue={post?.readTime ?? "5 min read"}
            className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-950"
            placeholder="5 min read"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-bold">Category</span>
          <select
            name="categoryId"
            required
            defaultValue={post?.categoryId ?? ""}
            className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-950"
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>

        <div className="space-y-3 lg:col-span-2">
          <label className="flex items-center gap-3 text-sm font-bold">
            <input
              type="checkbox"
              name="published"
              defaultChecked={post?.published ?? false}
              className="h-4 w-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500"
            />
            Publish immediately
          </label>

          <label className="flex items-center gap-3 text-sm font-bold">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={post?.featured ?? false}
              className="h-4 w-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500"
            />
            Feature this article
          </label>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded-2xl bg-blue-600 px-5 py-3 font-bold text-white transition hover:bg-blue-700"
        >
          {isEditing ? "Update article" : "Create article"}
        </button>
      </div>
    </form>
  );
}
