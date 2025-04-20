import { ConfigType } from '@nestjs/config'
import { appConfig } from './config.js'

export type AppConfig = ConfigType<typeof appConfig>
