import { Cache } from '@nestjs/cache-manager'
import { Quote } from '../../../../domain/entity/quote'
import { QUOTE_CACHE_KEY } from './constants'
import { QuoteSerializer } from './quote-serializer'

export class CacheManager {
  private readonly serializer = new QuoteSerializer()

  constructor(
    private readonly cacheStorage: Cache,
    private readonly ttl: number
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
    const serialized = this.serializer.serialize(quote)
    await this.cacheStorage.set<string>(QUOTE_CACHE_KEY, serialized, this.ttl)
  }

  protected async getCache() {
    const cachedUnserialized = await this.cacheStorage.get<string>(QUOTE_CACHE_KEY)
    if (!cachedUnserialized) {
      return null
    }
    return this.serializer.deserialize(cachedUnserialized)
  }
}
