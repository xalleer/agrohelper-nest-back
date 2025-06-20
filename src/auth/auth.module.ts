import {Module} from "@nestjs/common";
import {PrismaModule} from '../prisma/prisma.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from './jwt.config';
import { JwtStrategy } from './auth.strategy';

@Module({
  imports: [
    PrismaModule,
    JwtModule.registerAsync({
      useFactory: async () => jwtConfig,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})

export class AuthModule {}