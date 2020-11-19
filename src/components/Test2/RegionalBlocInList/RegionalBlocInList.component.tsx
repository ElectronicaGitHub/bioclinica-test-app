import React from 'react';
import { Link } from 'react-router-dom';
import { RegionalBlocInfo } from '../../../services/CountriesService';

import './RegionalBlocInList.scss';

interface RegionalBlocInListProps {
    bloc:RegionalBlocInfo;
}

const RegionalBlocInList = ({ bloc }: RegionalBlocInListProps) => {
    return <Link className="custom-link" to={`/ta2/bloc/${bloc.acronym}`} key={bloc.acronym}>
        <div className="regional-bloc">
            <span className="rb-name">{bloc.name}</span>
            <span className="rb-acronym">({bloc.acronym})</span>
        </div>
    </Link>
}

export default RegionalBlocInList;