import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import {CountriesService} from './countries.service'

@Controller('countries')
export class CountriesController {
    constructor(private readonly countriesService: CountriesService){}

    @Get()
    async findAll(){
        try{
            const response = await this.countriesService.findAll();
            return response;
        } catch (err) {
            if (err.response && err.response.status === 404) {
                throw new NotFoundException(`No country found`);
            }
            console.error(err);
            throw err;
        }
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        try {
          return await this.countriesService.findById(id);
        } catch (err) {
          if (err.response && err.response.status === 404) {
            throw new NotFoundException(`Country with id ${id} not found`);
          }
          console.error(err);
          throw err;
        }
      }
}