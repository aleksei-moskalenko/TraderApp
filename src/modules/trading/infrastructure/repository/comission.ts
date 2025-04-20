import { ConfigService } from '@nestjs/config'
import { TradingConfig } from '../config/types'
import { ICommissionRepository } from '../../../financial/application/repository/interface/commission'
import { CurrencyPair } from '../../../financial/domain/vo/currency-pair'
import { Commission } from '../../../financial/domain/vo/commission'

export class ConfigCommissionRepository implements ICommissionRepository {
  protected readonly config: TradingConfig

  constructor(
    configService: ConfigService
  ) {
    this.config = configService.getOrThrow<TradingConfig>('trading')
  }

  getFor(currencyPair: CurrencyPair): Promise<Commission | null> {
    if (currencyPair.valueOf() === 'BTCUSDT') {
      return Promise.resolve(Commission.fromString(this.config.commissionBTCUSDT))
    } else {
      return Promise.resolve(null)
    }
  }
}
