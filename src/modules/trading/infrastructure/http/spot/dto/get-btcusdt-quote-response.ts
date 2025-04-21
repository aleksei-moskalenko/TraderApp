import { ApiProperty } from '@nestjs/swagger'
import { Quote } from '../../../../domain/entity/quote'
import { GetBTCUSDTQuoteResponseData } from './get-btcusdt-quote-response.types'

export class GetBTCUSDTQuoteResponse {
  @ApiProperty()
  public currencyPair: string
  @ApiProperty()
  public askPrice: string
  @ApiProperty()
  public bidPrice: string
  @ApiProperty()
  public midPrice: string

  constructor(
    data: GetBTCUSDTQuoteResponseData
  ) {
    this.currencyPair = data.currencyPair
    this.askPrice = data.askPrice
    this.bidPrice = data.bidPrice
    this.midPrice = data.midPrice
  }

  static fromQuote(quote: Quote): GetBTCUSDTQuoteResponse {
    return new GetBTCUSDTQuoteResponse({
      currencyPair: quote.currencyPair.valueOf(),
      askPrice:     quote.ask.valueOf().toString(),
      bidPrice:     quote.bid.valueOf().toString(),
      midPrice:     quote.mid.valueOf().toString()
    })
  }
}
