import { CurrencyPair } from '../../../financial/domain/vo/currency-pair'
import { Price } from '../../../financial/domain/vo/price'
import { Commission } from '../../../financial/domain/vo/commission'

export type QuoteServiceCalculateQuoteParameters = {
  currencyPair:    CurrencyPair
  initialBidPrice: Price
  initialAskPrice: Price
  commission:      Commission
}
