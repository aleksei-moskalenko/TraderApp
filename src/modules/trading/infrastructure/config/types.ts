import { ConfigType } from '@nestjs/config'
import { tradingConfig } from './config'

export type TradingConfig = ConfigType<typeof tradingConfig>
