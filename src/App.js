import React, { useEffect, useState } from 'react';
import Table from './components/Table';
import styles from './styles/App.module.css';
import './App.css';
import PlanetsContext from './context/PlanetsContext';
import FirstFilterSet from './components/FirstFilterSet';
import SecondFilterSet from './components/SecondFilterSet';
import intro from './images/intro.gif';
import logoStartWars from './images/logoStarWars.svg';
import theme from './music/theme.mp3';
import searchIcon from './images/searchIcon.svg';

function App() {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredPlanets, setFilteredPanets] = useState([]);
  const [inputText, setInputText] = useState('');
  const [column, setColumn] = useState('population');
  const [compare, setCompare] = useState('maior que');
  const [number, setNumber] = useState(0);
  const [playMusic, setPlayMusic] = useState(true);
  const [appliedFilters, setAppliedFilters] = useState([]);
  const [sortedColumn, setSortedColumn] = useState({
    order: { column: 'population', sort: '' } });

  useEffect(() => {
    global.alert(`If you want this this website to work with 
background music, please check your browser permissions. Press OK to continue.`);
    const loadingTime = 7000;
    const musicTime = 49600;
    setTimeout(() => {
      const changeState = false;
      setPlayMusic(changeState);
    }, musicTime);
    fetch('https://swapi.dev/api/planets')
      .then((results) => results.json())
      .then((data) => setPlanets(
        data.results.map((entry) => {
          const { residents, ...others } = entry;
          return others;
        }),
      ))
      .catch((error) => console.error(error))
      .then(() => setTimeout(() => {
        setLoading(false);
      }, loadingTime));
  }, []);

  const filterFunc = ({ target }) => {
    setInputText(target.value);
    const newArray = planets.filter((planet) => planet.name.includes(target.value));
    setFilteredPanets(newArray);
  };

  const filtering = (filteringPlanets, applying) => {
    switch (applying.compare) {
    case 'maior que':
      return filteringPlanets
        .filter((planet) => Number(planet[applying.column]) > Number(applying.number));
    case 'menor que':
      return filteringPlanets
        .filter((planet) => Number(planet[applying.column]) < Number(applying.number));
    default:
      return filteringPlanets
        .filter((planet) => Number(planet[applying.column]) === Number(
          applying.number,
        ));
    }
  };

  const context = {
    planets,
    filteredPlanets,
    setFilteredPanets,
    column,
    setColumn,
    compare,
    setCompare,
    number,
    setNumber,
    appliedFilters,
    setAppliedFilters,
    sortedColumn,
    setSortedColumn,
  };

  return (
    <>
      { playMusic && (
        <audio
          preload="auto"
          autoPlay
          src={ theme }
        >
          <track kind="captions" src="background music" srcLang="no" />
          Your browser does not support the audio element.
        </audio>
      ) }
      { loading ? (
        <div
          className={ styles.loading_div }
        >
          <img
            src={ intro }
            alt="intro gif"
            className={ styles.intro_gif }
          />
        </div>
      ) : (
        <PlanetsContext.Provider value={ context }>
          <div
            className={ styles.main_div }
          >
            <div
              className={ styles.logo_container }
            >
              <img
                className={ styles.logo }
                src={ logoStartWars }
                alt="logo star"
              />
            </div>
            <div
              className={ styles.main_content }
            >
              <div
                className={ styles.search_input_div }
              >
                <input
                  className={ styles.search_input }
                  type="text"
                  value={ inputText }
                  onChange={ filterFunc }
                  data-testid="name-filter"
                />
                <img
                  className={ styles.search_image }
                  src={ searchIcon }
                  alt="search icon"
                />
              </div>
              <div
                className={ styles.filters_div }
              >
                <FirstFilterSet filtering={ filtering } />
                <SecondFilterSet
                  sortedColumn={ sortedColumn }
                  setSortedColumn={ setSortedColumn }
                />
              </div>
              <Table filtering={ filtering } />
            </div>
          </div>
        </PlanetsContext.Provider>
      ) }
    </>
  );
}

export default App;
