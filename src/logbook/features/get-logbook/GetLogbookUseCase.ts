import { Logbook } from "../../domain/Logbook"
import { ILogbookRepository } from "../../shared/ILogbookRepository"

interface IUseCase<TInput, TOutput> {
  execute(input: TInput): Promise<TOutput>
}

interface IGetLogbookDto {
  id: string
}

export class LogbookDto {
  public constructor( public readonly id: string, public readonly name: string ) {}

  public static from(loogbook: Logbook): LogbookDto {
    return new LogbookDto(loogbook.id, loogbook.name)
  }
}


export class GetLoogbookUseCase implements IUseCase<IGetLogbookDto, LogbookDto> {
    public constructor(private readonly _logbookRepo: ILogbookRepository) {}
    
    public async execute(input: IGetLogbookDto): Promise<LogbookDto> {
        const logbook = await this._logbookRepo.find(input.id)
    
        if (!logbook) {
        throw new Error("Logbook not found")
        }
    
        return LogbookDto.from(logbook)
    }
}
