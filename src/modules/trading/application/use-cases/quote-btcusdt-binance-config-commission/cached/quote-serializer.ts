import v8 from 'node:v8'
import { Quote } from '../../../../domain/entity/quote'
import { CurrencyPair } from '../../../../../financial/domain/vo/currency-pair'
import { Price } from '../../../../../financial/domain/vo/price'
import { CacheResolverQuotePojo } from './cache-manager.types'

export class QuoteSerializer {
  public serialize(quote: Quote) {
    const pojo = {
      ask:          quote.ask.valueOf().toString(),
      bid:          quote.bid.valueOf().toString(),
      currencyPair: quote.currencyPair.valueOf()
    }
    const serialized = v8.serialize(pojo).toString('base64')
    return serialized
  }

  public deserialize(serialized: string) {
    const quotePojo = v8.deserialize(Buffer.from(serialized, 'base64')) as CacheResolverQuotePojo

    const quote = new Quote(
      new CurrencyPair(quotePojo.currencyPair),
      Price.fromString(quotePojo.bid),
      Price.fromString(quotePojo.ask)
    )

    return quote
  }
}
