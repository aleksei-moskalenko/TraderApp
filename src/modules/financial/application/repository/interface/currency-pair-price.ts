import { Price } from '../../../domain/vo/price'
import { CurrencyPair } from '../../../domain/vo/currency-pair'

export interface ICurrencyPairPriceRepository {
  getPrice(
    currencyPair: CurrencyPair
  ): Promise<Price | null>
}
