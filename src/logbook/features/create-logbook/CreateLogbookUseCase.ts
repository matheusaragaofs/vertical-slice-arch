
import { IUseCase } from "../../../shared/IUseCase"
import { Logbook } from "../../domain/Logbook"
import { ILogbookRepository } from "../../shared/ILogbookRepository"

interface ICreateLogbookDto {
  name: string
  userId: string
}

export interface ICreateLogbookResult {
  logbookId: string
}

export class CreateLogbookUseCase implements IUseCase<ICreateLogbookDto, ICreateLogbookResult> {
  public constructor(private readonly _logbookRepo: ILogbookRepository) {}

  public async execute(
    input: ICreateLogbookDto
  ): Promise<ICreateLogbookResult> {
    const logbook = new Logbook(input.name, input.userId)

    const result = await this._logbookRepo.save(logbook)

    if (!result) {
      throw new Error("Failed to save logbook")
    }

    return {
      logbookId: logbook.id,
    }
  }
}
