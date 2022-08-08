export const USERS = {
  admin: {
    email: "admin@career-track.com",
    name: "John Smith",
    password: "Password",
  },
  user: {
    email: "user@abc.com",
    name: "Clara Jimenez",
    password: "Password",
  },
}
export const ROLES = {
  admin: {
    id: 1,
    name: "admin",
    description: "Administrator with all permissons",
  },
  user: {
    id: 2,
    name: "user",
    description: "End user, permissions to read and write own content",
  },
}

// Admin permissions will include permissions from all lists when created in seed.ts
export const ADMIN_PERMISSIONS = [
  {
    name: "user:read",
    description: "Create, edit and delete users",
  },
  {
    name: "user:write",
    description: "View users",
  },
  {
    name: "role:read",
    description: "View roles",
  },
  {
    name: "role:write",
    description: "Create, edit and delete roles",
  },
  {
    name: "permission:read",
    description: "View permissions",
  },
  {
    name: "permission:write",
    description: "Create, edit and delete permissions",
  },
  {
    name: "userRole:read",
    description: "View userRoles",
  },
  {
    name: "userRole:write",
    description: "Create, edit and delete userRoles",
  },
  {
    name: "rolePermission:read",
    description: "View rolePermissions",
  },
  {
    name: "rolePermission:write",
    description: "Create, edit and delete rolePermissions",
  },
]

export const USER_PERMISSIONS = [
  {
    name: "careerTracking:read",
    description: "View careerTrackings",
  },
  {
    name: "careerTracking:write",
    description: "Create, edit and delete careerTrackings",
  },
  {
    name: "company:read",
    description: "View companies",
  },
  {
    name: "company:write",
    description: "Create, edit and delete companies",
  },
  {
    name: "status:read",
    description: "View statuses",
  },
  {
    name: "status:write",
    description: "Create, edit and delete statuses",
  },
  {
    name: "careerRole:read",
    description: "View careerRoles",
  },
  {
    name: "careerRole:write",
    description: "Create, edit and delete careerRoles",
  },
  {
    name: "careerTrackingStatus:read",
    description: "View careerTrackingStatuses",
  },
  {
    name: "careerTrackingStatus:write",
    description: "Create, edit and delete careerTrackingStatuses",
  },
]
