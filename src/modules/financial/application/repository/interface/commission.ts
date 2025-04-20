import { CurrencyPair } from '../../../domain/vo/currency-pair'
import { Commission } from '../../../domain/vo/commission'

export interface ICommissionRepository {
  getFor(currencyPair: CurrencyPair): Promise<Commission | null>
}
