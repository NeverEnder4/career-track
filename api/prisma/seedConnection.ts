import { PrismaClient } from "@prisma/client"

export const getClient = () => {
  const prisma = new PrismaClient()

  return {
    prisma,
    disconnect: async (): Promise<void> => {
      await prisma.$disconnect()
    },
  }
}
