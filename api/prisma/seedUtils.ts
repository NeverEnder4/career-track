import { RolePermissions, Permission, User, Role } from "@prisma/client"

import type {
  CreateUserArgs,
  CreateRoleArgs,
  CreateUserRoleRelationArgs,
  CreateRolePermissionRelationsArgs,
  CreatePermissionsArgs,
  CreatePermissionsReturn,
  UpsertPermissionArgs,
  RolePermissionLookup,
} from "./seedTypes"
import { getClient } from "./seedConnection"

const handleError = (e: Error) => {
  console.error(e)
  process.exit(1)
}

const findRolePermissions = async (
  roleId: number
): Promise<RolePermissions[]> => {
  const { prisma, disconnect } = getClient()

  const rolePermissions = await prisma.rolePermissions
    .findMany({
      where: { roleId },
    })
    .catch(handleError)
    .finally(disconnect)

  return rolePermissions
}

export const createRolePermissionRelations = async ({
  roleId,
  permissions,
}: CreateRolePermissionRelationsArgs): Promise<void> => {
  const { prisma, disconnect } = getClient()

  const rolePermissions = await findRolePermissions(roleId)

  const rolePermissionsLookup: RolePermissionLookup = {}

  rolePermissions.forEach((rolePermission: RolePermissions) => {
    rolePermissionsLookup[rolePermission.permissionId] = rolePermission
  })

  await Promise.all(
    permissions.map(async (permission: Permission) => {
      if (!rolePermissionsLookup[permission.id]) {
        await prisma.rolePermissions.create({
          data: {
            role: { connect: { id: roleId } },
            permission: { connect: { id: permission.id } },
          },
        })
      }
    })
  )
    .catch(handleError)
    .finally(disconnect)

  await disconnect()
}

export const createUser = async ({
  email,
  name,
  password,
}: CreateUserArgs): Promise<User> => {
  const { prisma, disconnect } = getClient()
  const user = await prisma.user
    .upsert({
      where: {
        email,
      },
      update: {},
      create: {
        email,
        name,
        password,
      },
    })
    .catch(handleError)
    .finally(disconnect)

  return user
}

export const createRole = async ({
  name,
  description,
}: CreateRoleArgs): Promise<Role> => {
  const { prisma, disconnect } = getClient()
  const role = await prisma.role
    .upsert({
      where: {
        name,
      },
      update: {},
      create: {
        name,
        description,
      },
    })
    .catch(handleError)
    .finally(disconnect)
  return role
}

export const createUserRoleRelation = async ({
  userId,
  roleId,
}: CreateUserRoleRelationArgs): Promise<void> => {
  const { prisma, disconnect } = getClient()
  try {
    const [userRoleRelation] = await prisma.userRoles.findMany({
      where: { userId, roleId },
    })
    if (!userRoleRelation) {
      await prisma.userRoles.create({
        data: {
          user: { connect: { id: userId } },
          role: { connect: { id: roleId } },
        },
      })
    }
  } catch (e: any) {
    handleError(e)
  } finally {
    await disconnect()
  }
}

const upsertPermission = async ({
  name,
  description,
}: UpsertPermissionArgs): Promise<Permission> => {
  const { prisma, disconnect } = getClient()
  const permission = await prisma.permission
    .upsert({
      where: { name },
      update: {},
      create: {
        name,
        description,
      },
    })
    .catch(handleError)
    .finally(disconnect)

  return permission
}

export const createPermissions = async ({
  adminPermissionsList,
  userPermissionsList,
}: CreatePermissionsArgs): CreatePermissionsReturn => {
  // Create user permisssions
  const userPermissions: Permission[] = await Promise.all(
    userPermissionsList.map(async (permission) => {
      const upsertedPermission: Permission = await upsertPermission(permission)
      return upsertedPermission
    })
  )

  // Create admin permisssions
  let adminPermissions: Permission[] = await Promise.all(
    adminPermissionsList.map(async (permission) => {
      const upsertedPermission: Permission = await upsertPermission(permission)
      return upsertedPermission
    })
  )

  // Admin will have its own unique permissions as well as all other role permissions
  adminPermissions = [...adminPermissions, ...userPermissions]

  return {
    userPermissions,
    adminPermissions,
  }
}
