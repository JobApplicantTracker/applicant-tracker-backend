import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KandidatiModule } from './kandidati/kandidati.module';
import { KorisniciModule } from './korisnici/korisnici.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3308,
    username: 'root',
    password: 'majeskuel123',
    database: 'bazakandidata',
    synchronize: true,
    logging: true,
    entities: [__dirname + '/**/*.entity{.ts,.js}']
  }), KandidatiModule, KorisniciModule, AuthModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }