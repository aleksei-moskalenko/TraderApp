import { Inject } from '@nestjs/common'
import { Cache } from '@nestjs/cache-manager'
import { Quote } from '../../../domain/entity/quote'
import { ConfigCommissionRepository } from '../../../infrastructure/repository/comission'
import {
  BinanceCurrencyPairPriceRepository
} from '../../../../integrations/infrastructure/binance/repository/currency-pair-price'
import { IQuoteBTCUSDTBinanceConfigCommissionUseCaseConfig } from './interface/config'
import { QUOTE_BTCUSDT_BINANCE_CONFIG_COMMISSION_CONFIG } from './di'
import { QuoteBTCUSDTBinanceConfigCommissionUseCase } from './quote-btcusdt-binance-config-commission-cached'
import { QUOTE_CACHE_KEY } from './constants'

export class QuoteBTCUSDTBinanceConfigCommissionUseCaseCached extends QuoteBTCUSDTBinanceConfigCommissionUseCase {
  constructor(
    commissionService: ConfigCommissionRepository,
    currencyPairRepository: BinanceCurrencyPairPriceRepository,
    @Inject(QUOTE_BTCUSDT_BINANCE_CONFIG_COMMISSION_CONFIG) protected config: IQuoteBTCUSDTBinanceConfigCommissionUseCaseConfig,
    protected cacheManager: Cache
  ) {
    super(commissionService, currencyPairRepository)
  }

  override async run(): Promise<Quote> {
    const cached = await this.cacheManager.get<Quote>(QUOTE_CACHE_KEY)

    if (cached) {
      return cached
    }

    const quote = await super.run()

    await this.cacheManager.set(QUOTE_CACHE_KEY, quote, this.config.quoteUpdateFrequency)

    return quote
  }
}
