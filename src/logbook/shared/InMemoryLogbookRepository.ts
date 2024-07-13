import { Logbook } from "../domain/Logbook"
import { ILogbookRepository } from "./ILogbookRepository"

export class InMemoryLogbookRepository implements ILogbookRepository {
  private readonly _logbooks: Logbook[] = []

  public async save(logbook: Logbook): Promise<boolean> {
    this._logbooks.push(logbook)
    return true
  }
  public find(id: string): Promise<Logbook | null> {
    return Promise.resolve(
      this._logbooks.find((logbook) => logbook.id === id) || null
    )
  }
}
