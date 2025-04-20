import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { Logger } from 'nestjs-pino'
import { AppModule } from './modules/app/app.module'
import { AppConfig } from './modules/app/infrastructure/config/config.types'
import { APP_CONFIG_KEY } from './modules/app/infrastructure/config/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true })
  app.useLogger(app.get(Logger))

  const configService = await app.resolve(ConfigService)

  const appConfig = configService.getOrThrow<AppConfig>(APP_CONFIG_KEY)

  await app.listen(appConfig.port)
}
bootstrap()
