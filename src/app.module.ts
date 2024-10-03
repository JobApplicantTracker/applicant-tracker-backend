import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users.module';
import { JobsModule } from './modules/jobs.module';
import { RolesModule } from './modules/roles.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3308,
    username: 'root',
    password: 'majeskuel123',
    database: 'applicant-tracker-database',
    synchronize: true,
    logging: true,
    entities: [__dirname + '/**/*.entity{.ts,.js}']
  }), UsersModule, JobsModule, RolesModule, AuthModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }