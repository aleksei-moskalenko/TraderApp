import { Decimal } from 'decimal.js'
import { GenericDomainError } from '../../../../lib/errors/domain/generic-domain-error.js'

export class Price {
  protected value: Decimal

  protected constructor(value: Decimal) {
    if (value.isNeg()) {
      throw new GenericDomainError('Price cannot be negative', 'PRICE_VALIDATION_NOT_NEGATIVE', { value })
    }
    this.value = new Decimal(value)
  }

  add(value: Decimal): Price {
    return new Price(
      this.value.add(value)
    )
  }

  sub(value: Decimal): Price {
    return new Price(
      this.value.sub(value)
    )
  }

  multiply(value: Decimal): Price {
    return new Price(
      this.value.mul(value)
    )
  }

  divide(value: Decimal): Price {
    return new Price(
      this.value.div(value)
    )
  }

  sum(value: Price): Price {
    return new Price(
      this.value.plus(value.value)
    )
  }

  static fromString(source: string) {
    const decimal = new Decimal(source)

    if (decimal.isNaN()) {
      throw new GenericDomainError('Invalid Price value', 'PRICE_VALIDATION_INVALID_STRING', { source })
    }

    return new Price(decimal)
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
