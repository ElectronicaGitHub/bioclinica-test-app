import React from 'react';
import { Link } from 'react-router-dom';
import { CountryInfo } from '../../../services/CountriesService';
import './CountryInList.scss'
import { LazyLoadImage } from 'react-lazy-load-image-component';

interface CountryInListProps {
    country: CountryInfo;
}

const CountryInList = ({ country }:CountryInListProps) => {
    return <Link className="custom-link" to={`/ta2/country/${country.code}`}>
        <div className="country-in-list">
            <div className="c-flag-container">
                <LazyLoadImage
                    alt={country.name}
                    wrapperClassName="c-flag"
                    effect="opacity"
                    src={country.flag}
                />
            </div>
            <span className="c-name">
                {country.name}
                <span className="c-code">({country.code})</span>
            </span>
        </div>
    </Link>
}

export default CountryInList;