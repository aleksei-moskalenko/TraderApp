import { IErrorCategory } from './interface'
import { BaseErrorCategory } from './base-category'

export class ExternalServiceCategory extends BaseErrorCategory {
  readonly kind = 'external-service'

  constructor(
    readonly ofCategories?: IErrorCategory[]
  ) {
    super()
  }
}
