import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CacheModule } from '@nestjs/cache-manager'
import { IntegrationsModule } from '../integrations/integrations.module'
import { SpotTradingController } from './infrastructure/http/spot/controller'
import { tradingConfig } from './infrastructure/config/config'
import {
  QuoteBTCUSDTBinanceConfigCommissionUseCase
} from './application/use-cases/quote-btcusdt-binance-config-commission/get-btc-usdt-quote'
import { ConfigCommissionRepository } from './infrastructure/repository/comission'

@Module({
  imports: [
    CacheModule.register(),
    IntegrationsModule,
    ConfigModule.forFeature(tradingConfig)
  ],
  controllers: [SpotTradingController],
  providers:   [
    ConfigCommissionRepository,
    QuoteBTCUSDTBinanceConfigCommissionUseCase
  ]
})
export class TradingModule {

}
