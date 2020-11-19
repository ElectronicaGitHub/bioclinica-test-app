import { inject, observer } from 'mobx-react';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { CountryInfo } from '../../../services/CountriesService';
import { CountriesStore } from '../../../stores/CountriesStore';
import Select, { ValueType } from 'react-select';
import CountriesList from '../CountriesList/CountriesList.component';
import * as lodash from 'lodash';

import './AllCountriesList.scss';
import { couldStartTrivia } from 'typescript';

interface AllCountriesListProps {
    countriesStore: CountriesStore;
}

enum BorderFilterModes {
    Intersection,
    Union
}

const AllCountriesList = ({ countriesStore }: AllCountriesListProps) => {

    const [countries, setCountries] = useState<CountryInfo[]>([]);
    const [nameFilter, setNameFilter] = useState<string>('');
    const [borderFilter, setBorderFilter] = useState<string[]>([]);
    const [borderFilterMode, setBorderFilterMode] = useState<BorderFilterModes>(BorderFilterModes.Intersection);

    useEffect(() => {
        setCountries(Array.from(countriesStore.countries.values()));
    }, [countriesStore.dataLoaded]);
   
    if (!countriesStore.dataLoaded) {
        return <h2>Data loading...</h2>
    }
    
    const nameFilterFn = ((c:CountryInfo) => {
        return c.name.match(new RegExp(nameFilter, 'i'));
    });

    const selectBorderFilterTypeOptions = [
        { value : BorderFilterModes.Intersection, label: 'Intersection'},
        { value : BorderFilterModes.Union, label: 'Union'}
    ]

    const selectBorderFilterOptions = countries.map((el:CountryInfo) => {
        return {
            value : el.code,
            label: el.name
        }
    });

    const borderFilterChangeHandle = (value: any) => {
        setBorderFilter((value||[]).map((e:any) => e.value));   
    }
    const nameHandleChange = (e:ChangeEvent<HTMLInputElement>) => {
        setNameFilter(e.target.value);
    }
    const borderFilterTypeChangeHandle = (e:any) => {
        setBorderFilterMode(e.value);
    }

    let _countries:CountryInfo[] = []
    if (!borderFilter.length) {
        _countries = countries!.filter(nameFilterFn);
    } else {
        if (borderFilterMode == BorderFilterModes.Union) {
            _countries = lodash.uniq(
                borderFilter.flatMap((code:string):string[] => countriesStore.countries.get(code)!.borders)
            )
            .map((code: string): CountryInfo => countriesStore.countries.get(code)!)
            .filter(nameFilterFn);
        } else {
            _countries = lodash.intersection(
                ...borderFilter.map((code: string): string[] => countriesStore.countries.get(code)!.borders.slice())
            )
            .map((code: string): CountryInfo => countriesStore.countries.get(code)!)
            .filter(nameFilterFn);
        }
    }
    
    return <div className="all-countries-list">
        <div className="ac-filters-panel">
            <div className="form-control">
                <label>Filter by name</label>
                <input onChange={nameHandleChange} className="custom-input" type="text"/>
            </div>
            <div className="form-control">
                <label>Filter by borders</label>
                {/* big lists solution with react-window */}
                {/* https://codesandbox.io/s/lxv7omv65l?file=/index.js */}
                <Select 
                    onChange={borderFilterChangeHandle}
                    options={selectBorderFilterOptions}
                    isMulti
                ></Select>
            </div>
            <div className="form-control minified">
                <label>Border filter type</label>
                <Select
                    isDisabled={borderFilter.length < 2}
                    onChange={borderFilterTypeChangeHandle}
                    options={selectBorderFilterTypeOptions}
                    defaultValue={selectBorderFilterTypeOptions.find(el => el.value == BorderFilterModes.Intersection)} 
                ></Select>
                {2 - borderFilter.length > 0 ? <div className="tooltip">{2 - borderFilter.length} more borders to select</div> : null}
            </div>
        </div>
        <div className="rb-countries-list">
            <CountriesList countries={_countries} />
        </div>
    </div>
}

export default inject('countriesStore')(observer(AllCountriesList));