import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common'
import { Response } from 'express'
import fclone from 'fclone'
import { IResponseErrorData } from './interface'
import { getStack } from './common/get-stack'
import { getCause } from './common/get-cause'

@Catch()
export class AnyExceptionFilter implements ExceptionFilter {
  catch(error: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp()
    const response = context.getResponse<Response>()

    const { status, data } = this.formatErrorData(error)

    response.status(status).json(data)
  }

  private formatErrorData(error: unknown) {
    if (!(error instanceof Error)) {
      return {
        status: 500,
        data:   {
          message: 'Unknown malformed error',
          code:    'UNKNOWN_MALFORMED_ERROR',
          data:    fclone({
            initialError: error,
            ...Object(error)
          }),
          cause:      null,
          stack:      null,
          categories: null
        } satisfies IResponseErrorData
      }
    }

    return {
      status: 'status' in error ? Number(error.status) : 500,
      data:   {
        message: error.message,
        code:    `UNKNOWN_ERROR_${error.name}`.toUpperCase(),
        data:    fclone({
          ...Object(error)
        }),
        stack:      getStack(error.stack) ?? null,
        cause:      getCause(error.cause) ?? null,
        categories: null
      } satisfies IResponseErrorData
    }
  }
}
