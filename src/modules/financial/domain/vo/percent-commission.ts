import { Decimal } from 'decimal.js'
import { GenericDomainError } from '../../../../lib/errors/domain/generic-domain-error'
import { ValidationCategory } from '../../../../lib/errors/categories/validation'
import { Percent } from './percent.js'

export class PercentCommission extends Percent {
  constructor(
    value: Decimal
  ) {
    if (value.isNeg()) {
      throw new GenericDomainError('Commission cannot be negative', 'COMMISSION_VALIDATION_NEGATIVE', [new ValidationCategory()], { value })
    }
    super(value)
  }
}
