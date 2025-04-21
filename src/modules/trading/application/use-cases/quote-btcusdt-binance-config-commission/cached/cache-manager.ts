import * as v8 from 'node:v8'
import { Cache } from '@nestjs/cache-manager'
import { Quote } from '../../../../domain/entity/quote'
import { CurrencyPair } from '../../../../../financial/domain/vo/currency-pair'
import { Price } from '../../../../../financial/domain/vo/price'
import { QUOTE_CACHE_KEY } from './constants'
import { CacheResolverQuotePojo } from './cache-manager.types'

export class CacheManager {
  constructor(
    private readonly cacheStorage: Cache
  ) {
  }

  async withCache(callback: () => Promise<Quote>) {
    const cached = await this.getCache()
    if (cached) {
      return cached
    }
    const newEntry = await callback()
    await this.saveCache(newEntry)
    return newEntry
  }

  protected async saveCache(quote: Quote) {
    const pojo = this.toPojo(quote)
    const serialized = v8.serialize(pojo).toString('base64')
    await this.cacheStorage.set<string>(QUOTE_CACHE_KEY, serialized)
  }

  protected async getCache() {
    const cachedUnserialized = await this.cacheStorage.get<string>(QUOTE_CACHE_KEY)
    if (!cachedUnserialized) {
      return null
    }

    const quotePojo = v8.deserialize(Buffer.from(cachedUnserialized, 'base64')) as CacheResolverQuotePojo

    console.log(quotePojo)

    return this.fromPojo(quotePojo)
  }

  protected toPojo(quote: Quote): CacheResolverQuotePojo {
    return {
      ask:          quote.ask.valueOf().toString(),
      bid:          quote.bid.valueOf().toString(),
      currencyPair: quote.currencyPair.valueOf()
    }
  }

  protected fromPojo(from: CacheResolverQuotePojo): Quote {
    const quote = new Quote(
      new CurrencyPair(from.currencyPair),
      Price.fromString(from.bid),
      Price.fromString(from.ask)
    )

    return quote
  }
}
