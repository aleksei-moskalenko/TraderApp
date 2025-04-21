import { Injectable } from '@nestjs/common'
import { ICurrencyPairPriceRepository } from '../../../../financial/application/repository/interface/currency-pair-price'
import { CurrencyPair } from '../../../../financial/domain/vo/currency-pair'
import { BookPrice } from '../../../../financial/application/repository/dto/book-price'
import { getApiV3TickerBookTicker } from '../api-client/client'
import { GenericInfrastructureError } from '../../../../../lib/errors/infrastructure/generic-infrastructure-error'
import { Price } from '../../../../financial/domain/vo/price'

@Injectable()
export class BinanceCurrencyPairPriceRepository implements ICurrencyPairPriceRepository {
  async getBookPrice(currencyPair: CurrencyPair): Promise<BookPrice | null> {
    try {
      const response = await getApiV3TickerBookTicker({
        query: {
          symbol: currencyPair.valueOf()
        },
        throwOnError: true
      })

      if (!response.data || Array.isArray(response.data)) {
        throw new GenericInfrastructureError('Binance API error', 'BINANCE_SPOT_API_BOOK_PRICE_FORMAT_ERROR', { currencyPair, response })
      }

      return {
        ask: Price.fromString(response.data.askPrice),
        bid: Price.fromString(response.data.bidPrice),
        currencyPair
      }

    } catch (error) {
      throw new GenericInfrastructureError('Binance API error', 'BINANCE_SPOT_API_BOOK_PRICE_ERROR', { currencyPair }, { cause: error })
    }
  }
}
