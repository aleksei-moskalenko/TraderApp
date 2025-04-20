import { CurrencyPair } from '../../../domain/vo/currency-pair.js'
import { Commission } from '../../../domain/vo/commission.js'

export interface ICommissionRepository {
  getFor(currencyPair: CurrencyPair): Promise<Commission | null>
}
