import { inject, observer } from 'mobx-react';
import React from 'react';
import { RegionalBlocInfo } from '../../../services/CountriesService';
import { CountriesStore } from '../../../stores/CountriesStore';
import RegionalBlocInList from '../RegionalBlocInList/RegionalBlocInList.component';
import './RegionalBlocsList.scss';

interface RegionalBlocListProps {
    countriesStore : CountriesStore;
}

const RegionalBlocList = ({ countriesStore }:RegionalBlocListProps) => {
    return <div className="regional-bloc-list">
        <h3>Regional Blocs</h3>
        {
            Array.from(countriesStore.blocs.values()).map((bloc:RegionalBlocInfo) => {
                return <RegionalBlocInList key={bloc.acronym} bloc={bloc}></RegionalBlocInList>
            })
        }
    </div>
}

export default inject('countriesStore')(observer(RegionalBlocList));