import { ScreamingSnakeCase } from 'type-fest'
import { IErrorCategory } from '../categories/interface'

export type RootErrorMessage = string
export type RootErrorCode = ScreamingSnakeCase<string>
export type RootErrorData = Record<string, unknown>
export type RootErrorOptions = ErrorOptions
export type RootErrorCategories = IErrorCategory[]

export class RootError<
  TCode extends RootErrorCode,
  TData extends RootErrorData
> extends Error {
  constructor(
    message: RootErrorMessage,
    public readonly code: TCode,
    public readonly categories: RootErrorCategories,
    public readonly data: TData = {} as TData,
    public readonly options?: RootErrorOptions
  ) {
    super(message, options)
    this.name = 'RootError'
  }

  isCategoryOf(givenCategory: IErrorCategory, inSubcategories: boolean = false): boolean {
    return this.categories.some(thisCategory => {
      const isThisCategoryMatched = thisCategory.kind === givenCategory.kind
      if (!inSubcategories) {
        return isThisCategoryMatched
      }
      const isThisSubcategoryMatched = thisCategory.isSubCategoryOf(givenCategory)
      return isThisSubcategoryMatched
    })
  }
}
