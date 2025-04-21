import { IErrorCategory } from '../../errors/categories/interface'

export interface IResponseErrorData {
  message:    string
  code:       string
  data:       Record<string, unknown>
  stack:      string[] | null
  cause:      unknown | null
  categories: IErrorCategory[] | null
}
