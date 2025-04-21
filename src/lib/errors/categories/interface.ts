export interface IErrorCategory {
  readonly kind:          string
  readonly ofCategories?: IErrorCategory[] | undefined
  isSubCategoryOf(category: IErrorCategory): boolean
}
