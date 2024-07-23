import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { PeriodModule } from './period/period.module';
import { FamilyModule } from './family/family.module';

@Module({
    imports: [
        AuthModule,
        PrismaModule,
        ConfigModule.forRoot({ isGlobal: true }),
        UserModule,
        PeriodModule,
        FamilyModule
    ]
})
export class AppModule {}
