import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { RolesGuard } from './modules/auth/guards/roles.guard';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      ignoreEnvFile: false,
    }),

    // Modules
    AuthModule,
    // We'll add BookingModule, PaymentModule, AdminModule later
  ],
  providers: [
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, // JWT protection for all routes by default
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard, // Role-based protection
    },
  ],
  exports: [PrismaService],
})
export class AppModule {}
