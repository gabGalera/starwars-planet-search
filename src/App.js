import React, { useEffect, useState } from 'react';
import Table from './components/Table';
import './App.css';
import PlanetsContext from './context/PlanetsContext';

function App() {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredPlanets, setFilteredPanets] = useState([]);
  const [inputText, setInputText] = useState('');

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

  const context = {
    planets,
    filteredPlanets,
    setFilteredPanets,
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
      <Table />
    </PlanetsContext.Provider>
  );
}

export default App;
