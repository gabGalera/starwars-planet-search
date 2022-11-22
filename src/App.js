import React, { useEffect, useState } from 'react';
import Table from './components/Table';
import './App.css';
import PlanetsContext from './context/PlanetsContext';

function App() {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <h1>Loading...</h1>;

  return (
    <PlanetsContext.Provider value={ planets }>
      <Table />
    </PlanetsContext.Provider>
  );
}

export default App;
