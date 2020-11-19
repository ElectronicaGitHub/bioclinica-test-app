import CountriesDataApi from "../connectors/CountriesDataApi";
import store from "../stores/CountriesStore";

export interface CountryInfo {
    name: string;
    code: string;
    regionalBlocs: string[];
    flag: string;
    capital : string;
    borders : string[];
}
export interface RegionalBlocInfo {
    name: string;
    acronym: string;
    countries : Set<string>;
}

export interface ILoadData {
    regionalBlocs: Map<string, RegionalBlocInfo>;
    countries: Map<string, CountryInfo>;
}

const CountriesService = {
    api: {
        loadData: (): void => {
            CountriesDataApi.api.getAppCountriesAndBlocs()
            .then((data: ILoadData) => {
                store.importBlocsAndCountriesData(
                    data.regionalBlocs, 
                    data.countries
                );
                return data;
            })
            .catch(err => console.log(err));
        }
    }
}

export default CountriesService;