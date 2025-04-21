import { IErrorCategory } from './interface'

export abstract class BaseErrorCategory implements IErrorCategory {
  abstract kind: string
  abstract ofCategories?: IErrorCategory[] | undefined

  isSubCategoryOf(category: IErrorCategory) {
    const categories = this.ofCategories || []
    for (const subCategory of categories) {
      if (subCategory.kind === category.kind) {
        return true
      }
      if (subCategory.isSubCategoryOf(category)) {
        return true
      }
    }
    return false
  }
}
