import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common'
import { Response } from 'express'
import fclone from 'fclone'
import { RootError } from '../../errors/root-error/root-error'
import { SystemCategory } from '../../errors/categories/system'
import { ExternalServiceCategory } from '../../errors/categories/external-service'
import { ValidationCategory } from '../../errors/categories/validation'
import { IResponseErrorData } from './interface'
import { getStack } from './common/get-stack'
import { getCause } from './common/get-cause'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyRootError = RootError<any, any>

@Catch(RootError)
export class RootExceptionFilter implements ExceptionFilter {

  catch(error: AnyRootError, host: ArgumentsHost) {
    const context = host.switchToHttp()
    const response = context.getResponse<Response>()

    const responseStatus
      = this.getSystemErrorCode(error)
        || this.getExternalErrorCode(error)
        || this.getValidationErrorCode(error)
        || this.getGenericError(error)

    const errorData = this.formatErrorData(error)

    return response.status(responseStatus).json(errorData)
  }

  private formatErrorData(error: AnyRootError): IResponseErrorData {
    return {
      message:    error.message,
      code:       error.code,
      data:       fclone(error.data),
      stack:      getStack(error.stack) ?? null,
      cause:      getCause(error.options?.cause) ?? null,
      categories: error.categories
    }
  }

  private getSystemErrorCode(error: AnyRootError) {
    return error.isCategoryOf(new SystemCategory()) && 500
  }

  private getExternalErrorCode(error: AnyRootError) {
    return error.isCategoryOf(new ExternalServiceCategory()) && 503
  }

  private getValidationErrorCode(error: AnyRootError) {
    return error.isCategoryOf(new ValidationCategory()) && 400
  }

  private getGenericError(_error: AnyRootError) {
    return 500
  }
}
