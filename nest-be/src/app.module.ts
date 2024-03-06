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
import { RapatModule } from './modules/internal/bph/rapat/rapat.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_DB_HOST,
      port: parseInt(process.env.MYSQL_DB_PORT),
      username: process.env.MYSQL_DB_USERNAME,
      password: process.env.MYSQL_DB_PASSWORD,
      database: process.env.MYSQL_DB_NAME,
      entities: entities,
      synchronize: true, // TypeORM doesn't support database names that have capital letters
    }),
    BphModule,
    PiModule,
    AcaraModule,
    MentoringModule,
    AuthModule,
    UsersModule,
    RapatModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
