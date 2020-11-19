import { inject, observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import { CountryInfo, RegionalBlocInfo } from '../../../services/CountriesService';
import { CountriesStore } from '../../../stores/CountriesStore';
import CountriesList from '../CountriesList/CountriesList.component';
import './RegionalBlocDetails.scss';

interface RegionalBlocDetailsMatchParams {
    bloc_acronym: string;
}
interface RouteProps extends RouteComponentProps<RegionalBlocDetailsMatchParams> {}
interface RegionalBlocDetailsProps {
    countriesStore: CountriesStore;
}

const RegionalBlocDetails = ({ countriesStore, match }: RegionalBlocDetailsProps & RouteProps) => {

    let bloc: RegionalBlocInfo;
    let countries: CountryInfo[];

    if (!countriesStore.dataLoaded) {
        return <h2>Data loading...</h2>
    }

    const acronym: string = match.params.bloc_acronym;
    bloc = countriesStore.blocs.get(match.params.bloc_acronym)!;
    countries = Array
        .from(bloc.countries)
        .map((code: string) => countriesStore.countries.get(code)!);

    return <div className="regional-bloc-details">
        <h3>Regional bloc "{bloc!.name}" countries</h3>

        <div className="rb-countries-list">
            <CountriesList countries={countries!}/>
        </div>
    </div>
}

export default inject('countriesStore')(observer(RegionalBlocDetails));