import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';


@Module({

  imports:
    [
      PrismaModule,
      ConfigModule.forRoot({ isGlobal: true }),
      AuthModule,
      UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
