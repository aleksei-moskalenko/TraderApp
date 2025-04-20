import { AppError, AppErrorCode, AppErrorData, AppErrorMessage, AppErrorOptions } from '../app/app'

export class GenericDomainError<TCode extends AppErrorCode, TData extends AppErrorData> extends AppError<TCode, TData> {
  constructor(
    message: AppErrorMessage,
    code: TCode,
    data?: TData,
    options?: AppErrorOptions
  ) {
    super(message, code, data, options)
    this.name = 'GenericDomainError'
  }
}
