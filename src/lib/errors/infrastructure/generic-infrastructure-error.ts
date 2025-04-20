import { AppError, AppErrorCode, AppErrorData, AppErrorMessage, AppErrorOptions } from '../app/app'

export class GenericInfrastructureError<TCode extends AppErrorCode, TData extends AppErrorData> extends AppError<TCode, TData> {
  constructor(
    message: AppErrorMessage,
    code: TCode,
    data?: TData,
    options?: AppErrorOptions
  ) {
    super(message, code, data, options)
    this.name = 'GenericInfrastructureError'
  }
}
