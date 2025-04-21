import { INestApplication } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AppConfig } from '../modules/app/infrastructure/config/config.types'
import { APP_CONFIG_KEY } from '../modules/app/infrastructure/config/config'
import { RootExceptionFilter } from '../lib/nest/exception-filter/root-filter'
import { NestExceptionFilter } from '../lib/nest/exception-filter/nest-http-filter'
import { AnyExceptionFilter } from '../lib/nest/exception-filter/any-filter'

export async function setupHttp(app: INestApplication) {
  const configService = await app.resolve(ConfigService)

  app.useGlobalFilters(
    new NestExceptionFilter(),
    new AnyExceptionFilter(),
    new RootExceptionFilter()
  )

  const appConfig = configService.getOrThrow<AppConfig>(APP_CONFIG_KEY)

  await app.listen(appConfig.port)
}
