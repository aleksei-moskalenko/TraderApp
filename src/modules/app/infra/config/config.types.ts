import { ConfigType } from '@nestjs/config'
import { appConfig } from './config'

export type AppConfig = ConfigType<typeof appConfig>
