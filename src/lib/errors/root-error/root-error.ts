import { ScreamingSnakeCase } from 'type-fest'

export type RootErrorMessage = string
export type RootErrorCode = ScreamingSnakeCase<string>
export type RootErrorData = Record<string, unknown>
export type RootErrorOptions = ErrorOptions

export class RootError<
  TCode extends RootErrorCode,
  TData extends RootErrorData
> extends Error {
  constructor(
    message: RootErrorMessage,
    public readonly code: TCode,
    public readonly data: TData = {} as TData,
    public readonly options?: RootErrorOptions
  ) {
    super(message, options)
    this.name = 'RootError'
  }
}
