# Project Requirements Coverage

## 1) Confirmed Scope

Business type: Technology company focused on GPU, PC builds, hardware reviews, and tech news.

Stack:
- Next.js App Router
- Supabase (Postgres, Auth, Storage)
- Vercel deployment

Scale target:
- Small year-1 footprint (up to 10k monthly visitors, up to 2 admins)

Security target:
- Standard best-practice baseline

Language target:
- English + Arabic (bilingual)

## 2) Public Website Coverage

Required pages and status:
- Home page: Covered
- About page: Covered
- Services page: Covered
- Projects page: Covered
- Project details page: Covered
- Blog page: Covered
- Blog details page: Covered
- News page: Covered
- News details page: Covered
- Contact page: Covered

Functional requirement:
- Public pages are dynamic and DB-backed, not static-only: Covered

## 3) Dashboard Coverage

Dashboard modules and status:
- Projects: Covered
- Blogs: Covered
- News: Covered
- Services: Covered
- Home content: Covered
- About content: Covered
- Contact messages: Covered
- Project interest requests: Covered
- Users: Covered
- Roles: Covered
- Permissions: Covered
- Settings: Covered

## 4) Content Management Coverage

Projects content model:
- title, slug, short description, full description
- main image, gallery images
- cpu, gpu, ram, storage, motherboard, psu, case, cooling
- price
- performance category
- resolution category (1080p, 1440p, 4K)
- benchmark FPS values
- created date
Status: Covered

Blog content model:
- title, slug, content, featured image, category, tags, author
- created date, updated date, published status
- create, edit, delete, publish, unpublish
Status: Covered

News content model:
- title, slug, content, image, category, created date, published status
- create, edit, delete, publish, unpublish
Status: Covered

Editable static-business content from dashboard:
- Home content: Covered
- About content: Covered
- Services content: Covered

## 5) Forms and Data Capture Coverage

Forms required:
- Contact form (name, email, subject, message) -> stored in DB and visible in dashboard: Covered
- Project interest form (on each project details page) -> stored in DB and visible in dashboard: Covered

All create/edit forms must persist to DB:
- Projects, Blogs, News, Services, Page content: Covered

## 6) Dynamic RBAC Coverage

Required RBAC capabilities:
- Super Admin can create roles: Covered
- Super Admin can define permissions per role: Covered
- Super Admin can assign roles to users: Covered
- Super Admin can edit/delete roles: Covered

Permission enforcement layers (all required):
- Dashboard menu visibility: Covered
- Route/page access checks: Covered
- Form submission checks: Covered
- Create/edit/delete action checks: Covered

Example role behavior:
- Editor role can be restricted to blog-only management: Covered

## 7) Database Coverage

Core tables covered:
- users
- roles
- permissions
- role_permissions
- user_roles
- projects
- project_images
- project_requests
- blogs
- blog_categories
- news
- news_categories
- services
- pages_content
- contact_messages

Supabase-specific additions (required for robust implementation):
- profiles (linked to auth.users)
- media_assets (optional registry for storage files)
- audit_logs (recommended)

## 8) Design Coverage (Non-Generic UI)

Design constraints:
- Non-template, intentional visual direction: Covered
- No default repeated AI style: Covered
- Layout, colors, typography chosen to fit hardware/tech brand: Covered
- Public and dashboard UX quality emphasized: Covered

Planned design direction:
- Public site: clean editorial-tech with bold benchmark visuals
- Dashboard: operational clarity with dense data views and strong hierarchy

## 9) Next.js Best-Practice Coverage

- App Router route structure: Covered
- Server-first rendering where possible: Covered
- Client components only for interaction/forms: Covered
- Route handlers and server actions for mutations: Covered
- loading, error, not-found UX states: Covered
- metadata per page/details route: Covered
- image optimization and responsive media: Covered

## 10) Missing Details Resolved As Implementation Defaults

To avoid ambiguity, these defaults are now part of scope:
- Visitors can submit contact/project-interest forms without login
- Dashboard requires authenticated users only
- Slugs are unique per content type
- Blog/News visibility on public site only when published
- Soft delete for content records where practical
- Storage uses Supabase buckets with path-based organization
- English and Arabic fields supported in content models

## 11) Acceptance Checklist

A release is accepted only if all items pass:

Public site
- [ ] All required pages render and are linked
- [ ] Project, blog, and news details are dynamic by slug
- [ ] Contact form writes to DB
- [ ] Project interest form writes to DB

Dashboard
- [ ] CRUD works for projects/blog/news/services/pages content
- [ ] Contact messages list is visible
- [ ] Project interest requests list is visible
- [ ] Users, roles, and permissions are manageable by Super Admin

RBAC
- [ ] Menu hides unauthorized modules
- [ ] Unauthorized routes are blocked
- [ ] Unauthorized actions are blocked at server level
- [ ] Blog-only editor can operate blog and nothing else

Data and quality
- [ ] DB schema matches required models
- [ ] Validation exists for all forms
- [ ] Error/loading states implemented
- [ ] Bilingual content fields are supported

Design and UX
- [ ] Intentional non-generic design is implemented
- [ ] Responsive behavior works on mobile and desktop
- [ ] Accessibility baseline (keyboard/focus/contrast) is respected

## 12) Implementation Phases

Phase 1
- Database schema, auth wiring, RBAC primitives, seed Super Admin

Phase 2
- Public routes and dynamic data reads

Phase 3
- Dashboard CRUD modules and role-gated navigation

Phase 4
- Forms integration, moderation lists, publish workflows

Phase 5
- Visual refinement, accessibility pass, final QA checklist

---

This document is the contract to ensure the project fully covers your requirements and avoids scope drift during implementation.
