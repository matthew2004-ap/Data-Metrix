"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function text(value: FormDataEntryValue | null) {
  return String(value ?? "").trim();
}

function bool(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

async function uniqueSlug(title: string, currentId?: string) {
  const base = slugify(title) || `post-${Date.now()}`;
  let slug = base;
  let counter = 2;

  while (true) {
    const existing = await prisma.post.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!existing || existing.id === currentId) return slug;
    slug = `${base}-${counter++}`;
  }
}

export async function createPost(formData: FormData) {
  const session = await requireAdmin();

  const title = text(formData.get("title"));
  const excerpt = text(formData.get("excerpt"));
  const content = text(formData.get("content"));
  const image = text(formData.get("image")) || null;
  const readTime = text(formData.get("readTime")) || "5 min read";
  const categoryId = text(formData.get("categoryId"));
  const published = bool(formData, "published");
  const featured = bool(formData, "featured");

  if (!title || !excerpt || !content || !categoryId) {
    throw new Error("Title, excerpt, content and category are required.");
  }

  const slug = await uniqueSlug(title);

  await prisma.post.create({
    data: {
      title,
      slug,
      excerpt,
      content,
      image,
      readTime,
      categoryId,
      authorId: session.user.id,
      published,
      featured,
      publishedAt: published ? new Date() : null,
    },
  });

  revalidatePath("/");
  revalidatePath("/articles");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/admin");
  revalidatePath("/admin/posts");

  redirect("/admin/posts");
}

export async function updatePost(formData: FormData) {
  await requireAdmin();

  const id = text(formData.get("id"));
  const title = text(formData.get("title"));
  const excerpt = text(formData.get("excerpt"));
  const content = text(formData.get("content"));
  const image = text(formData.get("image")) || null;
  const readTime = text(formData.get("readTime")) || "5 min read";
  const categoryId = text(formData.get("categoryId"));
  const published = bool(formData, "published");
  const featured = bool(formData, "featured");

  if (!id || !title || !excerpt || !content || !categoryId) {
    throw new Error("Missing required post fields.");
  }

  const existing = await prisma.post.findUnique({
    where: { id },
    select: { slug: true, publishedAt: true },
  });

  if (!existing) throw new Error("Post not found.");

  const slug = await uniqueSlug(title, id);

  await prisma.post.update({
    where: { id },
    data: {
      title,
      slug,
      excerpt,
      content,
      image,
      readTime,
      categoryId,
      published,
      featured,
      publishedAt: published
        ? existing.publishedAt ?? new Date()
        : null,
    },
  });

  revalidatePath("/");
  revalidatePath("/articles");
  revalidatePath(`/blog/${existing.slug}`);
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/admin");
  revalidatePath("/admin/posts");

  redirect("/admin/posts");
}

export async function deletePost(formData: FormData) {
  await requireAdmin();

  const id = text(formData.get("id"));

  if (!id) throw new Error("Post ID is required.");

  const post = await prisma.post.findUnique({
    where: { id },
    select: { slug: true },
  });

  if (!post) throw new Error("Post not found.");

  await prisma.post.delete({ where: { id } });

  revalidatePath("/");
  revalidatePath("/articles");
  revalidatePath(`/blog/${post.slug}`);
  revalidatePath("/admin");
  revalidatePath("/admin/posts");
}

export async function createCategory(formData: FormData) {
  await requireAdmin();

  const name = text(formData.get("name"));
  if (!name) throw new Error("Category name is required.");

  const slug = slugify(name);

  await prisma.category.create({ data: { name, slug } });

  revalidatePath("/articles");
  revalidatePath("/admin");
  revalidatePath("/admin/categories");
}

export async function deleteCategory(formData: FormData) {
  await requireAdmin();

  const id = text(formData.get("id"));
  const count = await prisma.post.count({ where: { categoryId: id } });

  if (count > 0) {
    throw new Error("Move or delete the category's posts before deleting it.");
  }

  await prisma.category.delete({ where: { id } });

  revalidatePath("/articles");
  revalidatePath("/admin/categories");
}

export async function approveComment(formData: FormData) {
  await requireAdmin();

  const id = text(formData.get("id"));
  await prisma.comment.update({
    where: { id },
    data: { approved: true },
  });

  revalidatePath("/admin/comments");
}

export async function deleteComment(formData: FormData) {
  await requireAdmin();

  const id = text(formData.get("id"));
  await prisma.comment.delete({ where: { id } });

  revalidatePath("/admin/comments");
}

export async function deleteSubscriber(formData: FormData) {
  await requireAdmin();

  const id = text(formData.get("id"));
  await prisma.subscriber.delete({ where: { id } });

  revalidatePath("/admin/subscribers");
}
