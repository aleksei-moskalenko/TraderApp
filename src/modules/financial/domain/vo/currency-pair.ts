import { GenericDomainError } from '../../../../lib/errors/domain/generic-domain-error'
import { ValidationCategory } from '../../../../lib/errors/categories/validation'

export class CurrencyPair {
  constructor(
    protected readonly value: string
  ) {
    if (value.toUpperCase() !== value) {
      throw new GenericDomainError('CurrencyPair must be uppercase', 'CURRENCY_PAIR_VALIDATION_UPPER_CASE', [new ValidationCategory()], { value })
    }
  }

  valueOf(): string {
    return this.value
  }
}
