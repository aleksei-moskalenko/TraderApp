import { Decimal } from 'decimal.js'
import { Percent } from '../percent'
import { GenericDomainError } from '../../../../../lib/errors/domain/generic-domain-error'
import { ValidationCategory } from '../../../../../lib/errors/categories/validation'
import { IAdjustable } from './interfaces/adjustable'

export class MultiplierAdjustment {
  constructor(
    protected value: Decimal
  ) {
  }

  applyTo<TAdjustable extends IAdjustable>(target: TAdjustable) {
    return target.add(
      target.valueOf().mul(this.value)
    )
  }

  static fromString(source: string) {
    const decimal = new Decimal(source)

    if (decimal.isNaN()) {
      throw new GenericDomainError('Invalid percent value', 'PERCENT_VALIDATION_INVALID_STRING', [new ValidationCategory()], { source })
    }
    return new MultiplierAdjustment(decimal)
  }

  static fromPercentsShift(value: Percent) {
    const decimal = new Decimal(value.valueOf())
    const multiplier = decimal.div(100)

    return new MultiplierAdjustment(multiplier)
  }
}
