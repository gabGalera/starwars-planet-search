import React, { useEffect, useState } from 'react';
import './App.css';

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
    <table>
      <thead>
        <tr>
          {Object.keys(planets[0]).map((title) => <th key={ title }>{title}</th>)}
        </tr>
      </thead>
      <tbody>
        {planets
          .map((planet) => (
            <tr key={ planet.name }>
              {
                Object.values(planet).map((entry) => <th key={ entry.name }>{entry}</th>)
              }
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default App;
