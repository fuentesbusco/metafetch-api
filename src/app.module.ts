import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MetaModule } from './meta/meta.module';

@Module({
  imports: [MetaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
