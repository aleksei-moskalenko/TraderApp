import { Inject, Injectable } from '@nestjs/common'
import { ICurrencyPairPriceRepository } from '../../../../financial/application/repository/interface/currency-pair-price'
import { Quote } from '../../../domain/entity/quote'
import { GenericApplicationError } from '../../../../../lib/errors/application/generic-application-error'
import { QuoteService as QuoteDomainService } from '../../../domain/service/quote'
import { ICommissionRepository } from '../../../../financial/application/repository/interface/commission'
import { QuoteServiceGetForParameters as QuoteServiceGetForParameters } from './types'
import {
  QUOTE_SERVICE_COMMISSION_REPOSITORY,
  QUOTE_SERVICE_CURRENCY_PAIR_PRICE_REPOSITORY,
  QUOTE_SERVICE_QUOTE_SERVICE
} from './di'

@Injectable()
export class QuoteService {
  constructor(
    @Inject(QUOTE_SERVICE_CURRENCY_PAIR_PRICE_REPOSITORY) protected readonly currencyPairPriceRepository: ICurrencyPairPriceRepository,
    @Inject(QUOTE_SERVICE_COMMISSION_REPOSITORY) protected readonly commissionRepository: ICommissionRepository,
    @Inject(QUOTE_SERVICE_QUOTE_SERVICE) protected readonly quoteService: QuoteDomainService
  ) {}

  async getFor(parameters: QuoteServiceGetForParameters): Promise<Quote> {
    const { currencyPair } = parameters
    const pricePair = await this.currencyPairPriceRepository.getBookPrice(currencyPair)

    if (!pricePair) {
      throw new GenericApplicationError('Price not found for quote', 'QUOTE_PRICE_NOT_FOUND', { currencyPair })
    }

    const commission = await this.commissionRepository.getFor(currencyPair)

    if (!commission) {
      throw new GenericApplicationError('Commission not found for quote', 'QUOTE_COMMISSION_NOT_FOUND', { currencyPair, commission })
    }

    const { ask: initialAskPrice, bid: initialBidPrice } = pricePair

    const quote = this.quoteService.calculateQuote({ currencyPair, initialAskPrice, initialBidPrice, commission })

    return quote
  }
}
