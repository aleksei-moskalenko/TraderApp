import { Decimal } from 'decimal.js'
import { GenericDomainError } from '../../../../lib/errors/domain/generic-domain-error.js'

export class Percent {
  constructor(
    protected value: Decimal
  ) {
  }

  negate() {
    return new Percent(this.value.neg())
  }

  static fromString(source: string): Percent {
    const value = source.trim().replace(/%/g, '')

    const decimal = new Decimal(value)

    if (decimal.isNaN()) {
      throw new GenericDomainError('Invalid Percent value', 'PERCENT_VALIDATION_INVALID_STRING', { source })
    }

    return new Percent(decimal)
  }

  [Symbol.toPrimitive](hint: string) {
    if (hint === 'string') {
      return this.value.toString()
    }
    return this.value.toNumber()
  }

  valueOf() {
    return this.value
  }
}
