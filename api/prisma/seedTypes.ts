import { RolePermissions, Permission, User, Role } from "@prisma/client"

export type RolePermissionLookup = {
  [key: number]: RolePermissions
}

export type CreateUserArgs = {
  email: string
  name: string
  password: string
}

export type CreateRoleArgs = {
  name: string
  description: string
}

export type CreateUserRoleRelationArgs = {
  userId: number
  roleId: number
}

export type CreateRolePermissionRelationsArgs = {
  roleId: number
  permissions: Permission[]
}

export type UpsertPermissionArgs = {
  name: string
  description: string
}

type PermissionListItem = {
  name: string
  description: string
}

export type CreatePermissionsArgs = {
  adminPermissionsList: PermissionListItem[]
  userPermissionsList: PermissionListItem[]
}

export type CreatePermissionsReturn = Promise<{
  userPermissions: Permission[]
  adminPermissions: Permission[]
}>
