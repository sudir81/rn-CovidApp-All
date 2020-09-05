import React, {useState, useEffect} from 'react';
import './homePage.css';
import {FormControl, Select, MenuItem, Card} from '@material-ui/core';
import InfoBox from '../components/infoBox.component';
import MapComponent from '../components/map.component';
import LiveCasesTable from '../components/liveCasesTable.component';
import {sortData, prettyPrintStat} from '../../utils/utils';
import LineGraph from '../../graphs/lineGraph.component';
import 'leaflet/dist/leaflet.css';
import numeral from 'numeral';

import {v4 as uuidv4} from 'uuid';

const HomePage = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({lat: 34.80746, lng: -40.4796});
  const [mapZoom, setMapZoom] = useState(1.5);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState('cases');

  useEffect(() => {
    fetchCountryInfo(selectedCountry);
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));

          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
          setCountries(countries);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setSelectedCountry(countryCode);
    fetchCountryInfo(countryCode);
  };

  const fetchCountryInfo = async (countryCode) => {
    const url =
      countryCode === 'worldwide'
        ? 'https://disease.sh/v3/covid-19/all'
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
        countryCode === 'worldwide'
          ? setMapOptions(34.80746, -40.4796, 1.5)
          : setMapOptions(data.countryInfo.lat, data.countryInfo.long, 4);
      });
  };

  const setMapOptions = (lat, long, zoom) => {
    setMapCenter([lat, long]);
    setMapZoom(zoom);
  };

  return (
    <div className="homePage">
      <div className="home_left">
        <div className="home_header">
          <h1>COVID-19 Tracker</h1>
          <FormControl className="home_dropdown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={selectedCountry}>
              <MenuItem value="worldwide">World wide</MenuItem>

              {countries.map((country) => (
                <MenuItem key={uuidv4()} value={country.value}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="covid_stats">
          <InfoBox
            isRed
            active={casesType === 'cases'}
            onClick={(e) => setCasesType('cases')}
            title="Cases"
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={numeral(countryInfo.cases).format('0,0')}
          />
          <InfoBox
            active={casesType === 'recovered'}
            onClick={(e) => setCasesType('recovered')}
            title="Recovered"
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={numeral(countryInfo.recovered).format('0,0')}
          />
          <InfoBox
            isRed
            active={casesType === 'deaths'}
            onClick={(e) => setCasesType('deaths')}
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={numeral(countryInfo.deaths).format('0,0')}
          />
        </div>
        <MapComponent
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <Card className="home_right">
        <h3>Live cases by country</h3>
        <LiveCasesTable countries={tableData} />
        <h3 className="graph_title">Worldwide cases</h3>
        <LineGraph className="home_graph" casesType={casesType} />
      </Card>
    </div>
  );
};

export default HomePage;
