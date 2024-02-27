import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { BphModule } from './users/internal/bph/bph.module';
import { PiModule } from './users/internal/pi/pi.module';
import { AcaraModule } from './acara/acara.module';
import entities from './entities';
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
