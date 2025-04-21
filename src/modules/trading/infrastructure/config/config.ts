import { registerAs } from '@nestjs/config'
import { z } from 'zod'
import ms from 'ms'
import { fromEnvironment } from '../../../../lib/config/from-environment'

export const TRADING_CONFIG_KEY = Symbol('trading')

export const tradingConfig = registerAs(TRADING_CONFIG_KEY, () => {
  return fromEnvironment(z.object({
    commissionBTCUSDT:    z.string(),
    quoteUpdateFrequency: z.string()
      .regex(/^\d+\s*\w*$/, 'Must be a value in MS package format')
      .transform(value => ms(value as ms.StringValue))
  }), {
    commissionBTCUSDT:    'TRADING_COMMISSION_BTCUSDT',
    quoteUpdateFrequency: 'TRADING_QUOTE_UPDATE_FREQUENCY'
  })
})
