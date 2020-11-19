import React from 'react';
import { CountryInfo } from '../../../services/CountriesService';
import CountryInList from '../CountryInList/CountryInList.component';

interface CountriesListProps {
    countries: CountryInfo[];
}
const CountriesList = ({ countries }: CountriesListProps ) => {
    return <div className="countries-list">
        {countries.map((country:CountryInfo) => {
            return <CountryInList country={country} key={country.code}></CountryInList>
        })}
    </div>
    
}

export default CountriesList;