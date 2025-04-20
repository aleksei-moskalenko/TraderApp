import { Module, Provider } from '@nestjs/common'
import { BinanceCurrencyPairPriceRepository } from './infrastructure/binance/repository/currency-pair-price'

const reexport: Provider[] = [
  BinanceCurrencyPairPriceRepository
]

@Module({
  providers: [...reexport],
  exports:   reexport
})
export class IntegrationsModule {

}
