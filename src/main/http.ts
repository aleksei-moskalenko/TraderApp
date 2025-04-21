import { INestApplication } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AppConfig } from '../modules/app/infrastructure/config/config.types'
import { APP_CONFIG_KEY } from '../modules/app/infrastructure/config/config'

export async function setupHttp(app: INestApplication) {
  const configService = await app.resolve(ConfigService)

  const appConfig = configService.getOrThrow<AppConfig>(APP_CONFIG_KEY)

  await app.listen(appConfig.port)
}
