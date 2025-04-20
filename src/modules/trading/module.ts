import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { IntegrationsModule } from '../integrations/integrations.module'
import { useClass } from '../../lib/nest/providers'
import {
  BinanceCurrencyPairPriceRepository
} from '../integrations/infrastructure/binance/repository/currency-pair-price'
import { SpotTradingController } from './infrastructure/http/spot/controller'
import {
  QUOTE_SERVICE_COMMISSION_REPOSITORY,
  QUOTE_SERVICE_CURRENCY_PAIR_PRICE_REPOSITORY, QUOTE_SERVICE_QUOTE_SERVICE
} from './application/service/quote/di'
import { tradingConfig } from './infrastructure/config/config'
import { ConfigCommissionRepository } from './infrastructure/repository/comission'
import { QuoteService as QuoteDomainService } from './domain/service/quote'
import { QuoteService } from './application/service/quote/quote'

@Module({
  imports: [
    IntegrationsModule,
    ConfigModule.forFeature(tradingConfig)
  ],
  controllers: [SpotTradingController],
  providers:   [
    useClass(QUOTE_SERVICE_CURRENCY_PAIR_PRICE_REPOSITORY, BinanceCurrencyPairPriceRepository),
    useClass(QUOTE_SERVICE_COMMISSION_REPOSITORY, ConfigCommissionRepository),
    useClass(QUOTE_SERVICE_QUOTE_SERVICE, QuoteDomainService),
    QuoteService
  ]
})
export class TradingModule {

}
