import { MultiplierAdjustment } from '../../../financial/domain/vo/adjustment/multiplier-adjustment.js'
import { Quote } from '../entity/quote.js'
import { QuoteServiceCalculateQuoteParameters as QuoteServiceCalculateQuoteParameters } from './quote-service.types.js'

export class QuoteService {
  calculateQuote(parameters: QuoteServiceCalculateQuoteParameters) {
    const { commission, initialPrice, currencyPair } = parameters
    const bidMultiplier = MultiplierAdjustment.fromPercentsShift(commission)
    const askMultiplier = MultiplierAdjustment.fromPercentsShift(commission)

    const bidPrice = bidMultiplier.applyTo(initialPrice)
    const askPrice = askMultiplier.applyTo(initialPrice)

    const quote = new Quote(currencyPair, bidPrice, askPrice)

    return quote
  }
}
