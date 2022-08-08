import { USERS, ROLES, ADMIN_PERMISSIONS, USER_PERMISSIONS } from "./seedData"
import {
  createRolePermissionRelations,
  createUser,
  createRole,
  createUserRoleRelation,
  createPermissions,
} from "./seedUtils"

async function main() {
  // Create users
  const admin = await createUser(USERS.admin)
  const user = await createUser(USERS.user)

  // Create roles
  const adminRole = await createRole(ROLES.admin)
  const userRole = await createRole(ROLES.user)

  // Relate users to roles
  await createUserRoleRelation({ userId: admin.id, roleId: adminRole.id })
  await createUserRoleRelation({ userId: user.id, roleId: userRole.id })

  // Create permissions
  const { adminPermissions, userPermissions } = await createPermissions({
    adminPermissionsList: ADMIN_PERMISSIONS,
    userPermissionsList: USER_PERMISSIONS,
  })

  // Add permissions to admin role
  await createRolePermissionRelations({
    roleId: adminRole.id,
    permissions: adminPermissions,
  })

  // Add permissions to user role
  await createRolePermissionRelations({
    roleId: userRole.id,
    permissions: userPermissions,
  })

  console.log({
    admin,
    adminRole,
    user,
    userRole,
  })
}

main()
