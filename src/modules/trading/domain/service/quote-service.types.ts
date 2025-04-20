import { CurrencyPair } from '../../../financial/domain/vo/currency-pair.js'
import { Price } from '../../../financial/domain/vo/price.js'
import { Commission } from '../../../financial/domain/vo/commission.js'

export type QuoteServiceCalculateQuoteParameters = {
  currencyPair: CurrencyPair
  initialPrice: Price
  commission:   Commission
}
