import { Decimal } from 'decimal.js'
import { Price } from '../../../financial/domain/vo/price'
import { CurrencyPair } from '../../../financial/domain/vo/currency-pair'

export class Quote {
  public readonly mid: Price

  constructor(
    public readonly currencyPair: CurrencyPair,
    public readonly bid: Price,
    public readonly ask: Price
  ) {
    this.mid = bid.sum(ask).divide(new Decimal(2))
  }
}
