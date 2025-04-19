import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { appConfig } from './infra/config/config'

@Module({
  imports: [
    ConfigModule.forFeature(appConfig)
  ],
  controllers: [],
  providers:   []
})
export class AppModule {}
