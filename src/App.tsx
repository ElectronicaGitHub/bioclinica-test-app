import React, { useEffect } from 'react';
import { 
  BrowserRouter as Router, 
  Switch, 
  Route, 
  Link
} from 'react-router-dom';

import {AppBar, Toolbar, Button} from '@material-ui/core';
import './App.scss';
import FormBuilder from './components/Test1/FormBuilder/FormBuilder.component';
import RegionalBlocsList from './components/Test2/RegionalBlocsList/RegionalBlocsList.component';
import store from './stores/CountriesStore';
import RegionalBlocDetails from './components/Test2/RegionalBlocDetails/RegionalBlocDetails.component';
import { Provider } from 'mobx-react';
import CountryDetails from './components/Test2/CountryDetails/CountryDetails.component';
import CountriesService from './services/CountriesService';
import AllCountriesList from './components/Test2/AllCountriesList/AllCountriesList.component';


function App() { 
  
  return (
    <div className="App">
      <Router>
        <AppBar position="relative" color="inherit">
          <Toolbar>
            <Button variant="outlined" color="primary">
              <Link to="/">Test App #1</Link>
            </Button>

            <Button variant="outlined" color="primary">
              <Link to="/ta2">Test App #2</Link>
            </Button>

            <Button variant="outlined" color="primary">
              <Link to="/ta2/countries">Test App #2 (All Countries)</Link>
            </Button>

          </Toolbar>
        </AppBar>

        <div className="app-content">
          <Provider countriesStore={store}>
            <Switch>
              <Route exact path="/" component={FormBuilder}></Route>
              <TA2></TA2>
            </Switch>
          </Provider>
        </div> 
      </Router>
    </div>
  );
}

const TA2 = () => {
  useEffect(() => {
    CountriesService.api.loadData();
  }, []);

  return <>
    <Route exact path="/ta2" component={RegionalBlocsList}></Route>
    <Route path="/ta2/bloc/:bloc_acronym" component={RegionalBlocDetails}></Route>
    <Route path="/ta2/country/:country_code" component={CountryDetails}></Route>
    <Route path="/ta2/countries" component={AllCountriesList}></Route>
  </>
};

export default App;
