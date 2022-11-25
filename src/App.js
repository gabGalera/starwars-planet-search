import React, { useEffect, useState } from 'react';
import Table from './components/Table';
import './App.css';
import PlanetsContext from './context/PlanetsContext';
import FirstFilterSet from './components/FirstFilterSet';
import SecondFilterSet from './components/SecondFilterSet';
// import Loading from './components/Loading';

function App() {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredPlanets, setFilteredPanets] = useState([]);
  const [inputText, setInputText] = useState('');
  const [column, setColumn] = useState('population');
  const [compare, setCompare] = useState('maior que');
  const [number, setNumber] = useState(0);
  const [appliedFilters, setAppliedFilters] = useState([]);
  const [sortedColumn, setSortedColumn] = useState({
    order: { column: 'population', sort: '' } });

  useEffect(() => {
    fetch('https://swapi.dev/api/planets')
      .then((results) => results.json())
      .then((data) => setPlanets(
        data.results.map((entry) => {
          const { residents, ...others } = entry;
          return others;
        }),
      ))
      .catch((error) => console.error(error))
      .then(() => setLoading(false));
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

  if (loading) return <h1>Loading...</h1>;

  return (
    <PlanetsContext.Provider value={ context }>
      <input
        type="text"
        value={ inputText }
        onChange={ filterFunc }
        data-testid="name-filter"
      />
      <FirstFilterSet filtering={ filtering } />
      <SecondFilterSet
        sortedColumn={ sortedColumn }
        setSortedColumn={ setSortedColumn }
      />
      <Table filtering={ filtering } />
    </PlanetsContext.Provider>
  );
}

export default App;
