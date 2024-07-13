import { Request, Response } from "express"
import {
  CreateLogbookUseCase,
  ICreateLogbookResult,
} from "../application/CreateLogbookUseCase"



export class CreatedLogbookDto implements ICreateLogbookResult {
  public readonly logbookId: string
  public constructor(id: string) { 
    this.logbookId = id
  
  }
}

export class CreateLogbookController {
  public constructor(private readonly _useCase: CreateLogbookUseCase) {}

  public async handle(req: Request, res: Response): Promise<void> {
    const userId = "userIdFake"

    const result = await this._useCase.execute({
      name: req.body.name,
      userId,
    })
    const response = new CreatedLogbookDto(result.logbookId)

    // res.status(201).json({ id: response.logbookId })
    res.status(201).json(response)
  }
}
