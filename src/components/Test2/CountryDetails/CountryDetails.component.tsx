import { inject, observer } from 'mobx-react';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { CountryInfo, RegionalBlocInfo } from '../../../services/CountriesService';
import { CountriesStore } from '../../../stores/CountriesStore';
import CountriesList from '../CountriesList/CountriesList.component';
import RegionalBlocInList from '../RegionalBlocInList/RegionalBlocInList.component';
import './CountryDetails.scss'

interface CountryDetailsMatchParams {
    country_code: string;
}
interface RouteProps extends RouteComponentProps<CountryDetailsMatchParams> { }
interface CountryDetailsProps {
    countriesStore: CountriesStore;
}

const CountryDetails = ({ countriesStore, match }: CountryDetailsProps & RouteProps) => {

    let code:string;
    let country:CountryInfo;
    let blocs:RegionalBlocInfo[];
    let border_countries:CountryInfo[];

    if (!countriesStore.dataLoaded) {
        return <h2>Data loading...</h2>
    }

    code = match.params.country_code;
    country = countriesStore.countries.get(code)!;
    blocs = country.regionalBlocs.map((acronym:string) => {
        return countriesStore.blocs.get(acronym)!;
    });
    border_countries = country.borders.map((code:string) => {
        return countriesStore.countries.get(code)!;
    });

    return <div className="country-details">
        <h3 className="cd-title">
            <img className="cd-flag" src={country.flag} alt={country.name} />
            {country.name}
            <span className="cd-code">({country.code})</span>    
        </h3>

        <h5 className="cd-list-title">{blocs.length == 1 ? 'Regional Bloc' : 'Regional Blocs'}</h5>
        <div className="cd-list">
            {blocs.map((bloc:RegionalBlocInfo) => {
                return <RegionalBlocInList key={bloc.acronym} bloc={bloc}></RegionalBlocInList>;
            })}
        </div>
        { border_countries.length ? <>
            <h5 className="cd-list-title">{border_countries.length == 1 ? 'Border Country' : 'Border Countries'}</h5>
            <div className="cd-list">
                <CountriesList countries={border_countries}></CountriesList>
                </div>
        </> : <h5 className="cd-list-title">No border countries</h5> }
    </div>
}

export default inject('countriesStore')(observer(CountryDetails));