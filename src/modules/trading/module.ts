import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { CacheModule } from '@nestjs/cache-manager'
import { IntegrationsModule } from '../integrations/integrations.module'
import { useClass } from '../../lib/nest/providers'
import { SpotTradingController } from './infrastructure/http/spot/controller'
import { TRADING_CONFIG_KEY, tradingConfig } from './infrastructure/config/config'
import { ConfigCommissionRepository } from './infrastructure/repository/comission'
import {
  QuoteBTCUSDTBinanceConfigCommissionUseCase
} from './application/use-cases/quote-btcusdt-binance-config-commission/quote-btcusdt-binance-config-commission'
import {
  QuoteBTCUSDTBinanceConfigCommissionUseCaseCached
} from './application/use-cases/quote-btcusdt-binance-config-commission/cached/quote-btcusdt-binance-config-commission-cached'
import {
  QUOTE_BTCUSDT_BINANCE_CONFIG_COMMISSION_CONFIG
} from './application/use-cases/quote-btcusdt-binance-config-commission/di'
import { TradingConfig } from './infrastructure/config/types'

@Module({
  imports: [
    CacheModule.register(),
    IntegrationsModule,
    ConfigModule.forFeature(tradingConfig)
  ],
  controllers: [SpotTradingController],
  providers:   [
    ConfigCommissionRepository,
    useClass(QuoteBTCUSDTBinanceConfigCommissionUseCase, QuoteBTCUSDTBinanceConfigCommissionUseCaseCached),
    {
      provide: QUOTE_BTCUSDT_BINANCE_CONFIG_COMMISSION_CONFIG,
      useFactory(configService: ConfigService) {
        return configService.getOrThrow<TradingConfig>(TRADING_CONFIG_KEY)
      },
      inject: [ConfigService]
    }
  ]
})
export class TradingModule {

}
