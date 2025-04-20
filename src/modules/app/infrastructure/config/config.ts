import { registerAs } from '@nestjs/config'
import { z } from 'zod'
import { LevelWithSilent } from 'pino'
import { fromEnvironment } from '../../../../lib/config/from-environment.js'
import { isOneOf } from '../../../../lib/zod/refinements/is-one-of.js'

export const appConfig = registerAs('app', () => {
  return fromEnvironment(z.object({
    port: z.coerce
      .number()
      .default(300),
    logLevel: z.string()
      .refine(...isOneOf(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'] satisfies LevelWithSilent[]))
      .default('debug')
  }), {
    port:     'APP_PORT',
    logLevel: 'APP_LOG_LEVEL'
  })
})
