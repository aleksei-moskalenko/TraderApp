import { ScreamingSnakeCase } from 'type-fest'

export type AppErrorMessage = string
export type AppErrorCode = ScreamingSnakeCase<string>
export type AppErrorData = Record<string, unknown>
export type AppErrorOptions = ErrorOptions

export class AppError<
  TCode extends AppErrorCode,
  TData extends AppErrorData
> extends Error {
  constructor(
    message: AppErrorMessage,
    public readonly code: TCode,
    public readonly data: TData = {} as TData,
    public readonly options?: AppErrorOptions
  ) {
    super(message, options)
    this.name = 'AppError'
  }
}
