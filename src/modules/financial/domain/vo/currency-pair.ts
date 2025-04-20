import { GenericDomainError } from '../../../../lib/errors/domain/generic-domain-error'

export class CurrencyPair {
  constructor(
    public readonly value: string
  ) {
    if (value.toUpperCase() !== value) {
      throw new GenericDomainError('CurrencyPair must be uppercase', 'CURRENCY_PAIR_VALIDATION_UPPER_CASE', { value })
    }
  }
}
