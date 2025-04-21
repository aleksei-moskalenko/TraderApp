import { ConfigService } from '@nestjs/config'
import { Injectable } from '@nestjs/common'
import { TradingConfig } from '../config/types'
import { ICommissionRepository } from '../../../financial/application/repository/interface/commission'
import { CurrencyPair } from '../../../financial/domain/vo/currency-pair'
import { CryptoCurrencyPair } from '../../../financial/domain/constants/crypto-currency-pair'
import { PercentCommission } from '../../../financial/domain/vo/percent-commission'
import { TRADING_CONFIG_KEY } from '../config/config'

@Injectable()
export class ConfigCommissionRepository implements ICommissionRepository {
  protected readonly config: TradingConfig

  constructor(
    configService: ConfigService
  ) {
    this.config = configService.getOrThrow<TradingConfig>(TRADING_CONFIG_KEY)
  }

  getFor(currencyPair: CurrencyPair): Promise<PercentCommission | null> {
    if (currencyPair.valueOf() === CryptoCurrencyPair.BTCUSDT) {
      return Promise.resolve(PercentCommission.fromString(this.config.commissionBTCUSDT))
    } else {
      return Promise.resolve(null)
    }
  }
}
