import { registerAs } from '@nestjs/config'
import { z } from 'zod'
import { LevelWithSilent } from 'pino'
import { fromEnvironment } from '../../../../lib/config/from-environment'
import { isOneOf } from '../../../../lib/zod/refinements/is-one-of'

export const APP_CONFIG_KEY = Symbol('app')

export const appConfig = registerAs(APP_CONFIG_KEY, () => {
  return fromEnvironment(z.object({
    port: z.coerce
      .number(),
    logLevel: z.string()
      .refine(...isOneOf(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'] satisfies LevelWithSilent[]))
  }), {
    port:     'APP_PORT',
    logLevel: 'APP_LOG_LEVEL'
  })
})
