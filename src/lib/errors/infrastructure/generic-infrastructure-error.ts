import { RootError, RootErrorCode, RootErrorData, RootErrorMessage, RootErrorOptions } from '../root-error/root-error'

export class GenericInfrastructureError<TCode extends RootErrorCode, TData extends RootErrorData> extends RootError<TCode, TData> {
  constructor(
    message: RootErrorMessage,
    code: TCode,
    data?: TData,
    options?: RootErrorOptions
  ) {
    super(message, code, data, options)
    this.name = 'GenericInfrastructureError'
  }
}
