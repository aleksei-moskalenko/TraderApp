import { Decimal } from 'decimal.js'

export interface IAdjustable {
  add(value: Decimal): this
  valueOf(): Decimal
}
