import { PrismaClient } from "@prisma/client"
import { ILogbookRepository } from "../application/ILogbookRepository"
import { Logbook } from "../domain/Logbook"

export class PrismaLogbookRepository implements ILogbookRepository {
  public constructor(private readonly _client: PrismaClient) {}

  public async save(logbook: Logbook): Promise<boolean> {
    await this._client.logbook.create({
      data: {
        id: logbook.id,
        name: logbook.name,
        userId: logbook.userId,
      },
    })

    return true
  }

  public async find(id: string): Promise<Logbook | null> {
    const logbook = await this._client.logbook.findUnique({
      where: {
        id,
      },
    })

    if (!logbook) {
      return null
    }

    return new Logbook(logbook.name, logbook.userId, logbook.id)
  }
}
