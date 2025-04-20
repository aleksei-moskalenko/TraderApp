import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { LoggerModule, Params } from 'nestjs-pino'
import { appConfig } from './infrastructure/config/config.js'
import { AppConfig } from './infrastructure/config/config.types.js'

@Module({
  imports: [
    LoggerModule.forRootAsync({
      imports: [ConfigModule.forFeature(appConfig)],
      useFactory(configService: ConfigService): Params {
        const config = configService.getOrThrow<AppConfig>('app')
        return {
          pinoHttp: {
            level:    config.logLevel,
            genReqId: (request) => request.headers['x-request-id'] || request.id
          }
        }
      },
      inject: [ConfigService]
    }),
    ConfigModule.forFeature(appConfig)
  ],
  controllers: [],
  providers:   []
})
export class AppModule {}
