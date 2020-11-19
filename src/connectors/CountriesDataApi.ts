import { CountryInfo, ILoadData, RegionalBlocInfo } from "../services/CountriesService";

const CountriesDataApi = {
    endpoint: {
        base: 'https://restcountries.eu/rest/v2/',
        allCountries : 'all',
        // ...
    },
    temp: {
        regionalBlocs: <Map<string, RegionalBlocInfo>>new Map(),
        countries: <Map<string, CountryInfo>>new Map()
    },
    api: {
        getAppCountriesAndBlocs: (): Promise<ILoadData> => {
            return fetch(CountriesDataApi.endpoint.base + CountriesDataApi.endpoint.allCountries)
                .then(res => res.json())
                .then(data => data.map(CountriesDataApi.utils.dataFormatter))
                .then(data => {
                    CountriesDataApi.utils.prepareData()
                    return CountriesDataApi.temp;
                })
        }
    },
    utils: {
        dataFormatter(country: any): CountryInfo {
            const rbs: RegionalBlocInfo[] = country.regionalBlocs
                .map((el: any) => {
                    return {
                        name: el.name,
                        acronym: el.acronym,
                        countries: new Set()
                    }
                });
            const c: CountryInfo = {
                name: country.name,
                code: country.alpha3Code,
                regionalBlocs: rbs
                    .map((el: RegionalBlocInfo) => el.acronym),
                flag: country.flag,
                capital: country.capital,
                borders: country.borders
            }

            // fill temporary blocs
            rbs.forEach((rb: RegionalBlocInfo) => {
                CountriesDataApi.temp.regionalBlocs.set(rb.acronym, rb);
            });
            // fill temporary countries 
            CountriesDataApi.temp.countries.set(c.code, c);

            return c;
        },
        prepareData() {
            CountriesDataApi.temp.countries.forEach((country: CountryInfo) => {
                country.regionalBlocs.forEach((bloc_acronym: string) => {
                    CountriesDataApi.temp.regionalBlocs.get(bloc_acronym)?.countries.add(country.code);
                });
            });
        }
    }
}

export default CountriesDataApi;