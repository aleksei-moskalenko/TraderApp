import { CurrencyPair } from '../../../domain/vo/currency-pair'
import { PercentCommission } from '../../../domain/vo/percent-commission'

export interface ICommissionRepository {
  getFor(currencyPair: CurrencyPair): Promise<PercentCommission | null>
}
