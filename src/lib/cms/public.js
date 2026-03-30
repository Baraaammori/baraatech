import { createClient } from "@/lib/supabase/server";

function sanitizePage(rawPage) {
  const page = Number.parseInt(String(rawPage ?? "1"), 10);
  if (!Number.isFinite(page) || page < 1) return 1;
  return page;
}

function buildPagination(page, pageSize, totalCount) {
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const safePage = Math.min(page, totalPages);
  const from = (safePage - 1) * pageSize;
  const to = from + pageSize - 1;

  return { page: safePage, totalPages, from, to, totalCount };
}

export async function getPageContent(pageKey) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("pages_content")
    .select("*")
    .eq("page_key", pageKey)
    .eq("published", true)
    .maybeSingle();

  return data;
}

export async function listPublishedProjects() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("id, slug, title_en, title_ar, short_description_en, short_description_ar, main_image_url, price, performance_category, resolution_category, created_at")
    .eq("published", true)
    .order("created_at", { ascending: false });

  return data ?? [];
}

export async function listPublishedProjectsPage({ page = 1, pageSize = 9 } = {}) {
  const supabase = await createClient();
  const parsedPage = sanitizePage(page);

  const { count } = await supabase
    .from("projects")
    .select("id", { count: "exact", head: true })
    .eq("published", true);

  const pagination = buildPagination(parsedPage, pageSize, count ?? 0);
  const { data } = await supabase
    .from("projects")
    .select("id, slug, title_en, title_ar, short_description_en, short_description_ar, main_image_url, price, performance_category, resolution_category, created_at")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .range(pagination.from, pagination.to);

  return {
    items: data ?? [],
    page: pagination.page,
    totalPages: pagination.totalPages,
    totalCount: pagination.totalCount,
  };
}

export async function getProjectBySlug(slug) {
  const supabase = await createClient();

  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (!project) return null;

  const { data: images } = await supabase
    .from("project_images")
    .select("*")
    .eq("project_id", project.id)
    .order("sort_order", { ascending: true });

  return { ...project, images: images ?? [] };
}

export async function listPublishedBlogs() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("blogs")
    .select("id, slug, title_en, title_ar, featured_image_url, tags, created_at")
    .eq("published", true)
    .order("created_at", { ascending: false });

  return data ?? [];
}

export async function listPublishedBlogsPage({ page = 1, pageSize = 10 } = {}) {
  const supabase = await createClient();
  const parsedPage = sanitizePage(page);

  const { count } = await supabase
    .from("blogs")
    .select("id", { count: "exact", head: true })
    .eq("published", true);

  const pagination = buildPagination(parsedPage, pageSize, count ?? 0);
  const { data } = await supabase
    .from("blogs")
    .select("id, slug, title_en, title_ar, featured_image_url, tags, created_at")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .range(pagination.from, pagination.to);

  return {
    items: data ?? [],
    page: pagination.page,
    totalPages: pagination.totalPages,
    totalCount: pagination.totalCount,
  };
}

export async function getBlogBySlug(slug) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  return data;
}

export async function listPublishedNews() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("news")
    .select("id, slug, title_en, title_ar, image_url, created_at")
    .eq("published", true)
    .order("created_at", { ascending: false });

  return data ?? [];
}

export async function listPublishedNewsPage({ page = 1, pageSize = 10 } = {}) {
  const supabase = await createClient();
  const parsedPage = sanitizePage(page);

  const { count } = await supabase
    .from("news")
    .select("id", { count: "exact", head: true })
    .eq("published", true);

  const pagination = buildPagination(parsedPage, pageSize, count ?? 0);
  const { data } = await supabase
    .from("news")
    .select("id, slug, title_en, title_ar, image_url, created_at")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .range(pagination.from, pagination.to);

  return {
    items: data ?? [],
    page: pagination.page,
    totalPages: pagination.totalPages,
    totalCount: pagination.totalCount,
  };
}

export async function getNewsBySlug(slug) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("news")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  return data;
}

export async function listPublishedServices() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("services")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  return data ?? [];
}

export async function listPublishedServicesPage({ page = 1, pageSize = 6 } = {}) {
  const supabase = await createClient();
  const parsedPage = sanitizePage(page);

  const { count } = await supabase
    .from("services")
    .select("id", { count: "exact", head: true })
    .eq("published", true);

  const pagination = buildPagination(parsedPage, pageSize, count ?? 0);
  const { data } = await supabase
    .from("services")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true })
    .range(pagination.from, pagination.to);

  return {
    items: data ?? [],
    page: pagination.page,
    totalPages: pagination.totalPages,
    totalCount: pagination.totalCount,
  };
}
