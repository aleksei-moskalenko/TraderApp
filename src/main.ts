import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app/app.module'
import { setupOpenapi } from './main/openapi'
import { setupHttp } from './main/http'
import { setupLogger } from './main/logger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true })
  setupLogger(app)
  setupOpenapi(app)
  await setupHttp(app)
}
bootstrap()
