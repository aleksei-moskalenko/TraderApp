import { ConfigType, registerAs } from '@nestjs/config'
import { z } from 'zod'
import { fromEnvironment } from '../../../../lib/config/from-environment'

export const appConfig = registerAs('app', () => {
  return fromEnvironment(z.object({
    port: z.coerce.number().default(300)
  }), {
    port: 'APP_PORT'
  })
})

export type AppConfig = ConfigType<typeof appConfig>
