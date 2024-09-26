

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompaniesModule } from './companies/companies.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { CompaniesController } from './companies/companies.controller';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';
require('dotenv').config()
@Module({
  imports: [MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      uri: configService.get<string>('MONGO_URL'),
      connectionFactory: (connection) => {
        connection.plugin(softDeletePlugin);
        return connection;
      }
    }), inject: [ConfigService]
  }),
  ConfigModule.forRoot({ isGlobal: true }),
    CompaniesModule,

    AuthModule,

    UsersModule,
  ],
  controllers: [AppController, UsersController, CompaniesController],
  providers: [AppService, AuthService, JwtService, {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },],
})

export class AppModule { }
