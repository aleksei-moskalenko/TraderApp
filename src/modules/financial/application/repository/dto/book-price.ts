import { Price } from '../../../domain/vo/price'
import { CurrencyPair } from '../../../domain/vo/currency-pair'

export class BookPrice {
  constructor(
    public readonly ask: Price,
    public readonly bid: Price,
    public readonly currencyPair: CurrencyPair
  ) {
  }
}
