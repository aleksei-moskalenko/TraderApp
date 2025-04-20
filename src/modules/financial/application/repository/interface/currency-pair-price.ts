import { CurrencyPair } from '../../../domain/vo/currency-pair'
import { BookPrice } from '../dto/book-price'

export interface ICurrencyPairPriceRepository {
  getBookPrice(
    currencyPair: CurrencyPair
  ): Promise<BookPrice | null>
}
