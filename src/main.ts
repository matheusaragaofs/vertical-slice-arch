import { PrismaClient } from "@prisma/client"
import { PrismaLogbookRepository } from "./logbook/shared/PrismaLogbookRepository"
import { InMemoryLogbookRepository } from "./logbook/shared/InMemoryLogbookRepository"
import { CreateLogbookUseCase } from "./logbook/features/create-logbook/CreateLogbookUseCase"
import { CreateLogbookController } from "./logbook/features/create-logbook/CreateLogbookController"
import { GetLoogbookUseCase } from "./logbook/features/get-logbook/GetLogbookUseCase"
import { GetLogbookController } from "./logbook/features/get-logbook/GetLogbookController"
import { ApiServer } from "./logbook/shared/ApiServer"

export async function main(): Promise<void> {
  const client = new PrismaClient()
  const prismaRepo = new PrismaLogbookRepository(client)
  const inMemoryRepo = new InMemoryLogbookRepository()
  const useCase = new CreateLogbookUseCase(prismaRepo)
  const controller = new CreateLogbookController(useCase)

  const getUseCase = new GetLoogbookUseCase(prismaRepo)
  const getController = new GetLogbookController(getUseCase)

  await ApiServer.run(5000, controller, getController)
}

main()
