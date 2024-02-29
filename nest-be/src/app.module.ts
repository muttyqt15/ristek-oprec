import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import entities from './entities';
import { BphModule } from './modules/internal/bph/bph.module';
import { PiModule } from './modules/internal/pi/pi.module';
import { AcaraModule } from './modules/external/acara/acara.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './modules/users.module';
import { MentoringModule } from './modules/external/mentoring/mentoring.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'mySQLpsw123.',
      database: 'okk_forge',
      entities: entities,
      synchronize: true,
    }),
    BphModule,
    PiModule,
    AcaraModule,
    MentoringModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
