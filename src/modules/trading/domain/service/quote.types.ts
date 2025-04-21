import { CurrencyPair } from '../../../financial/domain/vo/currency-pair'
import { Price } from '../../../financial/domain/vo/price'
import { PercentCommission } from '../../../financial/domain/vo/percent-commission'

export type QuoteServiceCalculateQuoteParameters = {
  currencyPair:    CurrencyPair
  initialBidPrice: Price
  initialAskPrice: Price
  commission:      PercentCommission
}
