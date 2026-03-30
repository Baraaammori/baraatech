export const PERMISSIONS = {
  VIEW_PROJECTS: "view.projects",
  CREATE_PROJECT: "create.project",
  EDIT_PROJECT: "edit.project",
  DELETE_PROJECT: "delete.project",
  VIEW_BLOGS: "view.blogs",
  CREATE_BLOG: "create.blog",
  EDIT_BLOG: "edit.blog",
  DELETE_BLOG: "delete.blog",
  PUBLISH_BLOG: "publish.blog",
  VIEW_NEWS: "view.news",
  CREATE_NEWS: "create.news",
  EDIT_NEWS: "edit.news",
  DELETE_NEWS: "delete.news",
  PUBLISH_NEWS: "publish.news",
  MANAGE_SERVICES: "manage.services",
  MANAGE_WEBSITE_CONTENT: "manage.website_content",
  VIEW_MESSAGES: "view.messages",
  VIEW_PROJECT_REQUESTS: "view.project_requests",
  MANAGE_USERS: "manage.users",
  MANAGE_ROLES: "manage.roles",
  MANAGE_SETTINGS: "manage.settings",
};

export function hasPermission(permissionSet, permission) {
  return permissionSet.has(permission);
}
