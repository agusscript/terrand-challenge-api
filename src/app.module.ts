import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { environmentConfig } from './config/environment.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { datasourceOptions } from './config/orm.config';
import { UserModule } from './module/user/user.module';
import { AuthenticationModule } from './module/authentication/authentication.module';
import { RecipeModule } from './module/recipe/recipe.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [environmentConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...datasourceOptions,
        autoLoadEntities: true,
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveStaticOptions: {
        setHeaders: (res) => (
          res.setHeader(
            'Cross-Origin-Resource-Policy',
            'cross-origin'
          )),
      }
    }),
    UserModule,
    AuthenticationModule,
    RecipeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
