import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { environmentConfig } from './config/environment.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [environmentConfig],
      isGlobal: true,
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
