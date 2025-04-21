import { IErrorCategory } from './interface'
import { BaseErrorCategory } from './base-category'

export class ValidationCategory extends BaseErrorCategory {
  readonly kind = 'validation'

  constructor(
    readonly ofCategories?: IErrorCategory[]
  ) {
    super()
  }
}
