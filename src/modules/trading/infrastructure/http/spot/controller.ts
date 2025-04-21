import { Controller, Get } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import {
  QuoteBTCUSDTBinanceConfigCommissionUseCase
} from '../../../application/use-cases/quote-btcusdt-binance-config-commission/quote-btcusdt-binance-config-commission'
import { GetBTCUSDTQuoteResponse } from './dto/get-btcusdt-quote-response'

@ApiTags('Trading - Spot')
@Controller('trading/spot')
export class SpotTradingController {
  constructor(
    protected readonly quoteBTCUSDTUseCase: QuoteBTCUSDTBinanceConfigCommissionUseCase
  ) {
  }

  @ApiTags('Crypto')
  @Get('/btcusdt')
  @ApiOkResponse({ type: GetBTCUSDTQuoteResponse })
  async getQuoteBTCUSDT(): Promise<GetBTCUSDTQuoteResponse> {
    const quote = await this.quoteBTCUSDTUseCase.run()

    return GetBTCUSDTQuoteResponse.fromQuote(quote)
  }
}
