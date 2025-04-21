import { Quote } from '../../../domain/entity/quote'
import { CurrencyPair } from '../../../../financial/domain/vo/currency-pair'
import { ConfigCommissionRepository } from '../../../infrastructure/repository/comission'
import {
  BinanceCurrencyPairPriceRepository
} from '../../../../integrations/infrastructure/binance/repository/currency-pair-price'
import { QuoteService as QuoteDomainService } from '../../../domain/service/quote'
import { QuoteService } from '../../service/quote/quote'
import { CryptoCurrencyPair } from '../../../../financial/domain/constants/crypto-currency-pair'

export class QuoteBTCUSDTBinanceConfigCommissionUseCase {
  protected readonly quoteService: QuoteService

  constructor(
    commissionService: ConfigCommissionRepository,
    currencyPairRepository: BinanceCurrencyPairPriceRepository
  ) {
    this.quoteService = new QuoteService(currencyPairRepository, commissionService, new QuoteDomainService())
  }

  async run(): Promise<Quote> {

    const currencyPair = new CurrencyPair(CryptoCurrencyPair.BTCUSDT)

    const quote = await this.quoteService.getFor({ currencyPair })

    return quote
  }
}
