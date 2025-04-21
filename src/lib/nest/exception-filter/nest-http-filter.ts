import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common'
import { Response } from 'express'
import fclone from 'fclone'
import { IErrorCategory } from '../../errors/categories/interface'
import { IResponseErrorData } from './interface'
import { getStack } from './common/get-stack'

@Catch(HttpException)
export class NestExceptionFilter implements ExceptionFilter {

  catch(error: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp()
    const response = context.getResponse<Response>()

    const errorData = this.formatErrorData(error)

    return response.status(error.getStatus()).json(errorData)
  }

  private formatErrorData(error: HttpException): IResponseErrorData {
    return {
      message:    error.message,
      code:       'code' in error ? String(error.code) : 'GENERIC_ERROR',
      data:       fclone({ ...error }),
      stack:      getStack(error.stack) ?? null,
      cause:      null,
      categories: 'categories' in error ? error.categories as IErrorCategory[] : []
    }
  }
}
