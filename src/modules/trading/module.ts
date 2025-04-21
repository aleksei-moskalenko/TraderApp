import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CacheModule } from '@nestjs/cache-manager'
import { IntegrationsModule } from '../integrations/integrations.module'
import { useClass } from '../../lib/nest/providers'
import { SpotTradingController } from './infrastructure/http/spot/controller'
import { tradingConfig } from './infrastructure/config/config'
import { ConfigCommissionRepository } from './infrastructure/repository/comission'
import {
  QuoteBTCUSDTBinanceConfigCommissionUseCase
} from './application/use-cases/quote-btcusdt-binance-config-commission/quote-btcusdt-binance-config-commission-cached'
import {
  QuoteBTCUSDTBinanceConfigCommissionUseCaseCached
} from './application/use-cases/quote-btcusdt-binance-config-commission/quote-btcusdt-binance-config-commission'

@Module({
  imports: [
    CacheModule.register(),
    IntegrationsModule,
    ConfigModule.forFeature(tradingConfig)
  ],
  controllers: [SpotTradingController],
  providers:   [
    ConfigCommissionRepository,
    useClass(QuoteBTCUSDTBinanceConfigCommissionUseCase, QuoteBTCUSDTBinanceConfigCommissionUseCaseCached)
  ]
})
export class TradingModule {

}
