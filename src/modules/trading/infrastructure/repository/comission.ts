import { ConfigService } from '@nestjs/config'
import { TradingConfig } from '../config/types'
import { ICommissionRepository } from '../../../financial/application/repository/interface/commission'
import { CurrencyPair } from '../../../financial/domain/vo/currency-pair'
import { CryptoCurrencyPair } from '../../../financial/domain/constants/crypto-currency-pair'
import { Commission } from '../../../financial/domain/vo/commission'
import { TRADING_CONFIG_KEY } from '../config/config'

export class ConfigCommissionRepository implements ICommissionRepository {
  protected readonly config: TradingConfig

  constructor(
    configService: ConfigService
  ) {
    this.config = configService.getOrThrow<TradingConfig>(TRADING_CONFIG_KEY)
  }

  getFor(currencyPair: CurrencyPair): Promise<Commission | null> {
    if (currencyPair.valueOf() === CryptoCurrencyPair.BTCUSDT) {
      return Promise.resolve(Commission.fromString(this.config.commissionBTCUSDT))
    } else {
      return Promise.resolve(null)
    }
  }
}
