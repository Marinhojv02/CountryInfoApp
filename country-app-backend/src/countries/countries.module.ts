import { Module } from '@nestjs/common';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports:[HttpModule.register({
    timeout: 5000,
    maxRedirects: 5,
  })],
  controllers: [CountriesController],
  providers: [CountriesService]
})
export class CountriesModule {}
