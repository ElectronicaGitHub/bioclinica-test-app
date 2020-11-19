// Here we define a store
import { makeAutoObservable } from 'mobx';
import remotedev from 'mobx-remotedev';
import {CountryInfo, RegionalBlocInfo} from '../services/CountriesService';

export class CountriesStore {
    dataLoaded:boolean = false;
    blocs: Map<string, RegionalBlocInfo> = new Map();
    countries: Map<string, CountryInfo> = new Map();

    constructor() {
        makeAutoObservable(this);
    }

    importBlocsAndCountriesData(_blocs:Map<string,RegionalBlocInfo>, _countries:Map<string, CountryInfo>) {
        this.blocs = _blocs;
        this.countries = _countries;
        this.dataLoaded = true;
    }
}

const store = remotedev(new CountriesStore(), {});

export default store;