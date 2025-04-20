import { MultiplierAdjustment } from '../../../financial/domain/vo/adjustment/multiplier-adjustment'
import { Quote } from '../entity/quote'
import { QuoteServiceCalculateQuoteParameters } from './quote.types'

export class QuoteService {
  calculateQuote(parameters: QuoteServiceCalculateQuoteParameters) {
    const { commission, initialAskPrice, initialBidPrice, currencyPair } = parameters
    const bidMultiplier = MultiplierAdjustment.fromPercentsShift(commission)
    const askMultiplier = MultiplierAdjustment.fromPercentsShift(commission)

    const askPrice = askMultiplier.applyTo(initialAskPrice)
    const bidPrice = bidMultiplier.applyTo(initialBidPrice)

    const quote = new Quote(currencyPair, bidPrice, askPrice)

    return quote
  }
}
