import { BaseErrorCategory } from './base-category'
import { IErrorCategory } from './interface'

export class SystemCategory extends BaseErrorCategory {
  readonly kind = 'system'

  constructor(
    readonly ofCategories?: IErrorCategory[]
  ) {
    super()
  }
}
