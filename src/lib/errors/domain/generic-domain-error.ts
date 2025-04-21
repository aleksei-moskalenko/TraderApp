import { RootError, RootErrorCode, RootErrorData, RootErrorMessage, RootErrorOptions } from '../root-error/root-error'
import { IErrorCategory } from '../categories/interface'

export class GenericDomainError<TCode extends RootErrorCode, TData extends RootErrorData> extends RootError<TCode, TData> {
  constructor(
    message: RootErrorMessage,
    code: TCode,
    categories: IErrorCategory[],
    data?: TData,
    options?: RootErrorOptions
  ) {
    super(message, code, categories, data, options)
    this.name = 'GenericDomainError'
  }
}
