import { Price } from '../../../domain/vo/price.js'
import { CurrencyPair } from '../../../domain/vo/currency-pair.js'

export interface ICurrencyPairPriceRepository {
  getPrice(
    currencyPair: CurrencyPair
  ): Promise<Price | null>
}
