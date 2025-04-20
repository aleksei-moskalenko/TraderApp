import { ICurrencyPairPriceRepository } from '../../../../financial/application/repository/interface/currency-pair-price.js'
import { Quote } from '../../../domain/entity/quote.js'
import { GenericApplicationError } from '../../../../../lib/errors/application/generic-application-error.js'
import { QuoteService as QuoteDomainService } from '../../../domain/service/quote.js'
import { ICommissionRepository } from '../../../../financial/application/repository/interface/commission.js'
import { QuoteServiceGetForParameters as QuoteServiceGetForParameters } from './types.js'

export class QuoteService {
  constructor(
    protected readonly currencyPairPriceRepository: ICurrencyPairPriceRepository,
    protected readonly commissionRepository: ICommissionRepository,
    protected readonly quoteService: QuoteDomainService
  ) {}

  async getFor(parameters: QuoteServiceGetForParameters): Promise<Quote> {
    const { currencyPair } = parameters
    const price = await this.currencyPairPriceRepository.getPrice(currencyPair)

    if (!price) {
      throw new GenericApplicationError('Price not found for quote', 'QUOTE_PRICE_NOT_FOUND', { currencyPair })
    }

    const commission = await this.commissionRepository.getFor(currencyPair)

    if (!commission) {
      throw new GenericApplicationError('Commission not found for quote', 'QUOTE_COMMISSION_NOT_FOUND', { currencyPair, commission })
    }

    const quote = this.quoteService.calculateQuote({ currencyPair, initialPrice: price, commission })

    return quote
  }
}
