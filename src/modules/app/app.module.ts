import { randomUUID } from 'crypto'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { LoggerModule, Params } from 'nestjs-pino'
import { TradingModule } from '../trading/module'
import { APP_CONFIG_KEY, appConfig } from './infrastructure/config/config'
import { AppConfig } from './infrastructure/config/config.types'

@Module({
  imports: [
    LoggerModule.forRootAsync({
      imports: [ConfigModule.forFeature(appConfig)],
      useFactory(configService: ConfigService): Params {
        const config = configService.getOrThrow<AppConfig>(APP_CONFIG_KEY)
        return {
          pinoHttp: {
            level:    config.logLevel,
            genReqId: (request) => request.headers['x-request-id'] || randomUUID()
          }
        }
      },
      inject: [ConfigService]
    }),
    ConfigModule.forFeature(appConfig),
    TradingModule
  ],
  controllers: [],
  providers:   []
})
export class AppModule {}
