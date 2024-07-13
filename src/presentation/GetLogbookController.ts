import { Request, Response } from "express"
import { GetLoogbookUseCase } from "../application/GetLogbookUseCase"

export class GetLogbookController {
  public constructor(private readonly _useCase: GetLoogbookUseCase) {}
  public async handle(req: Request, res: Response): Promise<void> {
    const result = await this._useCase.execute({ id: req.params.id })

    res.json(result)
  }
}
