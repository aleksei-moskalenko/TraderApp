import { ICurrencyPairPriceRepository } from '../../../../financial/application/repository/interface/currency-pair-price'
import { Quote } from '../../../domain/entity/quote'
import { GenericApplicationError } from '../../../../../lib/errors/application/generic-application-error'
import { QuoteService as QuoteDomainService } from '../../../domain/service/quote'
import { ICommissionRepository } from '../../../../financial/application/repository/interface/commission'
import { SystemCategory } from '../../../../../lib/errors/categories/system'
import { QuoteServiceGetForParameters as QuoteServiceGetForParameters } from './types'

export class QuoteService {
  constructor(
    protected readonly currencyPairPriceRepository: ICurrencyPairPriceRepository,
    protected readonly commissionRepository: ICommissionRepository,
    protected readonly quoteService: QuoteDomainService
  ) {}

  async getFor(parameters: QuoteServiceGetForParameters): Promise<Quote> {
    const { currencyPair } = parameters
    const pricePair = await this.currencyPairPriceRepository.getBookPrice(currencyPair)

    if (!pricePair) {
      throw new GenericApplicationError('Price not found for quote', 'QUOTE_PRICE_NOT_FOUND', [new SystemCategory()], { currencyPair })
    }

    const commission = await this.commissionRepository.getFor(currencyPair)

    if (!commission) {
      throw new GenericApplicationError('Commission not found for quote', 'QUOTE_COMMISSION_NOT_FOUND', [new SystemCategory()], { currencyPair, commission })
    }

    const { ask: initialAskPrice, bid: initialBidPrice } = pricePair

    const quote = this.quoteService.calculateQuote({ currencyPair, initialAskPrice, initialBidPrice, commission })

    return quote
  }
}
