import { registerAs } from '@nestjs/config'
import { z } from 'zod'
import { fromEnvironment } from '../../../../lib/config/from-environment'

export const TRADING_CONFIG_KEY = 'trading' as const

export const tradingConfig = registerAs(TRADING_CONFIG_KEY, () => {
  return fromEnvironment(z.object({
    commissionBTCUSDT:    z.string().default('10%'),
    quoteUpdateFrequency: z.coerce.number().default(10_000)
  }), {
    commissionBTCUSDT: 'TRADING_COMMISSION_BTCUSDT'
  })
})
