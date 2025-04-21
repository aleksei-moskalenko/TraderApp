import { Logger } from '@nestjs/common'
import { MultiplierAdjustment } from '../../../financial/domain/vo/adjustment/multiplier-adjustment'
import { Quote } from '../entity/quote'
import { QuoteServiceCalculateQuoteParameters } from './quote.types'

export class QuoteService {
  private readonly logger = new Logger(QuoteService.name)

  calculateQuote(parameters: QuoteServiceCalculateQuoteParameters) {
    const { commission, initialAskPrice, initialBidPrice, currencyPair } = parameters
    const askMultiplier = MultiplierAdjustment.fromPercentsShift(commission)
    const bidMultiplier = MultiplierAdjustment.fromPercentsShift(commission.negate())

    const askPrice = askMultiplier.applyTo(initialAskPrice)
    const bidPrice = bidMultiplier.applyTo(initialBidPrice)

    this.logger.log({
      initialAskPrice,
      initialBidPrice,
      askPrice,
      bidPrice,
      resolvedAt: new Date()
    })

    const quote = new Quote(currencyPair, bidPrice, askPrice)

    return quote
  }
}
