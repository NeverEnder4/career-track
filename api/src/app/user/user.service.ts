import { User, Prisma, UserRoles } from "@prisma/client"
import { prisma } from "../../app"

export const getAllUsers = () => {
  return new Promise<(Partial<User> & { userRoles: Partial<UserRoles>[] })[]>(
    (resolve, reject) => {
      try {
        const users = prisma.user.findMany({
          select: {
            name: true,
            email: true,
            userRoles: {
              select: {
                role: {
                  select: {
                    name: true,
                    rolePermissions: {
                      select: {
                        permission: {
                          select: {
                            name: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        })
        users && resolve(users)
      } catch (e) {
        reject(e)
      }
    }
  )
}

export const createUser = ({
  email,
  name,
  password,
  role,
}: {
  email: string
  name: string
  password: string
  role: number
}) => {
  return new Promise<Prisma.Prisma__UserClient<User>>((resolve, reject) => {
    try {
      const user = prisma.user.create({
        include: { userRoles: true },
        data: {
          email,
          name,
          password,
        },
      })

      user && resolve(user)
    } catch (e) {
      reject(e)
    }
  })
}

export const updateUser = ({
  id,
  email,
  name,
  userRoles,
}: Partial<User> & { userRoles: { id: number }[] }) => {
  return new Promise<Prisma.Prisma__UserClient<User>>((resolve, reject) => {
    try {
      const user = prisma.user.update({
        include: { userRoles: true },
        where: {
          id: id,
        },
        data: {
          email,
          name,
          userRoles: {
            connect: userRoles,
          },
        },
      })
      user && resolve(user)
    } catch (e) {
      reject(e)
    }
  })
}

export const deleteUser = ({ id }: { id: number }) => {
  return new Promise<Prisma.Prisma__UserClient<User>>((resolve, reject) => {
    try {
      const user = prisma.user.delete({
        where: {
          id: id,
        },
      })
      if (user) {
        resolve(user)
      }
    } catch (e) {
      reject(e)
    }
  })
}
