import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { AppModule } from './modules/app/app.module'
import { AppConfig } from './modules/app/infra/config/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configService = await app.resolve(ConfigService)

  const appConfig = configService.getOrThrow<AppConfig>('app')

  await app.listen(appConfig.port)
}
bootstrap()
