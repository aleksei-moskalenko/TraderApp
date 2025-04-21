import { Inject } from '@nestjs/common'
import { Cache } from '@nestjs/cache-manager'
import { Quote } from '../../../../domain/entity/quote'
import { ConfigCommissionRepository } from '../../../../infrastructure/repository/comission'
import {
  BinanceCurrencyPairPriceRepository
} from '../../../../../integrations/infrastructure/binance/repository/currency-pair-price'
import { IQuoteBTCUSDTBinanceConfigCommissionUseCaseConfig } from '../interface/config'
import { QUOTE_BTCUSDT_BINANCE_CONFIG_COMMISSION_CONFIG } from '../di'
import { QuoteBTCUSDTBinanceConfigCommissionUseCase } from '../quote-btcusdt-binance-config-commission'
import { CacheManager } from './cache-manager'

export class QuoteBTCUSDTBinanceConfigCommissionUseCaseCached extends QuoteBTCUSDTBinanceConfigCommissionUseCase {
  protected cacheManager: CacheManager

  constructor(
    commissionService: ConfigCommissionRepository,
    currencyPairRepository: BinanceCurrencyPairPriceRepository,
    @Inject(QUOTE_BTCUSDT_BINANCE_CONFIG_COMMISSION_CONFIG) protected config: IQuoteBTCUSDTBinanceConfigCommissionUseCaseConfig,
    protected cacheStorage: Cache
  ) {
    super(commissionService, currencyPairRepository)
    this.cacheManager = new CacheManager(cacheStorage)
  }

  override async run(): Promise<Quote> {
    return this.cacheManager.withCache(() => {
      return super.run()
    })
  }
}
