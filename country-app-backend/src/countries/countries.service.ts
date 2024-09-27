import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CountriesService {
    constructor(private readonly httpService: HttpService){}
    async findAll(){
        const countries = await this.httpService.axiosRef.get(`${process.env.DATE_NAGER_API_URL}/AvailableCountries`)
        return countries.data;
    }

    async findById(id: string){
        const [countryInfo, countryFlag] = await Promise.all([
            this.httpService.axiosRef.get(`${process.env.DATE_NAGER_API_URL}/CountryInfo/${id}`),
            this.httpService.axiosRef.post(
                `${process.env.COUNTRIES_NOW_API_URL}/flag/images`,
                { "iso2": id }
            )
        ]);
        
        console.log(countryInfo.data)
        
        const countryPopulation = await this.httpService.axiosRef.post(
        `${process.env.COUNTRIES_NOW_API_URL}/population`, 
            { "country": countryInfo.data.commonName }
        )

        return {
            country_name: countryInfo.data.commonName,
            borders: countryInfo.data.borders,
            population_data: countryPopulation.data?.data?.populationCounts,
            flag_url: countryFlag.data?.data?.flag
        }
    }
}
