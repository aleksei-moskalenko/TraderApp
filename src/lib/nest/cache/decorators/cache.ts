import { Class } from 'type-fest'
import { Cache } from 'cache-manager'
import { GenericInfrastructureError } from '../../../errors/infrastructure/generic-infrastructure-error'

export type ClassCacheOptions = {
  ttl?: number
}

export type CacheableMethodSource = {
  cacheManager: Cache
}

export type CacheOptionsData = {
  ttl?:          number
  keyGenerator?: (...parameters: unknown[]) => string
}

export type CacheOptions = (() => Promise<CacheOptionsData> | CacheOptionsData) | CacheOptionsData

export function UseCache(options: CacheOptions) {
  return function <T>(
    target: T,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const constructor = target as Class<unknown>
    const originalMethod = descriptor.value

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    descriptor.value = async function (this: CacheableMethodSource, ...parameters: unknown[]): Promise<any> {
      const cacheOptions: CacheOptionsData = await (typeof options === 'function' ? options() : options)

      const { ttl, keyGenerator } = cacheOptions

      if (!this.cacheManager) {
        throw new GenericInfrastructureError('Cache manager not found', 'CACHE_MANAGER_NOT_FOUND')
      }

      const cacheKey = keyGenerator
        ? keyGenerator(...parameters)
        : `${constructor.constructor.name}.${propertyKey}:${JSON.stringify(parameters)}`

      let result = await this.cacheManager.get(cacheKey)

      if (result === undefined) {
        result = await originalMethod.apply(this, parameters)

        await this.cacheManager.set(cacheKey, result, ttl)
      }

      return result
    }

    return descriptor
  }
}
