import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { NotesModule } from './notes/notes.module';
import { Notes } from './typeorm/entities/Notes';
import { config } from './config';
import * as fs from 'fs'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      url: config.DB_URL,
      host: config.DB_HOST,
      port: 4000,
      username: config.DB_USERNAME,
      password: config.DB_PASSWORD,
      database: 'test',
      ssl : {
        ca : fs.readFileSync('./src/certs/isrgrootx1.pem'),
      },
      entities: [User,Notes],
      synchronize: true,
    }),
    UserModule,
    NotesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
