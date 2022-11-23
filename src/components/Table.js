import React, { useEffect, useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const { planets, filteredPlanets, setFilteredPanets } = useContext(PlanetsContext);
  const [column, setColumn] = useState('population');
  const [compare, setCompare] = useState('maior que');
  const [number, setNumber] = useState(0);
  const [appliedFilters, setAppliedFilters] = useState([]);

  useEffect(() => {
    setFilteredPanets(planets);
  }, [planets, setFilteredPanets]);

  const filterColumn = ({ target }) => {
    setColumn(target.value);
  };

  const handleClick = () => {
    const apply = [...appliedFilters, {
      column,
      compare,
      number,
    }];

    let filteringPlanets = planets;

    const filtering = (applying) => {
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

    apply.forEach((applying) => { filteringPlanets = filtering(applying); });

    setFilteredPanets(filteringPlanets);
    setAppliedFilters(apply);
  };

  return (
    <>
      {console.log(filteredPlanets)}
      <select
        onClick={ filterColumn }
        data-testid="column-filter"
      >
        {
          !appliedFilters.find((applying) => applying.column === 'population')
        && (
          <option
            value="population"
          >
            population
          </option>)
        }
        {
          !appliedFilters.find((applying) => applying.column === 'orbital_period')
        && (
          <option
            value="orbital_period"
          >
            orbital_period
          </option>)
        }
        {
          !appliedFilters.find((applying) => applying.column === 'diameter')
        && (
          <option
            value="diameter"
          >
            diameter
          </option>)
        }
        {
          !appliedFilters.find((applying) => applying.column === 'rotation_period')
        && (
          <option
            value="rotation_period"
          >
            rotation_period
          </option>)
        }
        {
          !appliedFilters.find((applying) => applying.column === 'surface_water')
        && (
          <option
            value="surface_water"
          >
            surface_water
          </option>)
        }
      </select>
      <select
        data-testid="comparison-filter"
        onClick={ ({ target }) => setCompare(target.value) }
      >
        <option
          value="maior que"
        >
          maior que
        </option>
        <option
          value="menor que"
        >
          menor que
        </option>
        <option
          value="igual a"
        >
          igual a
        </option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        value={ number }
        onChange={ ({ target }) => setNumber(target.value) }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filtrar
      </button>
      <table style={ { overflow: 'hidden' } }>
        <thead>
          <tr>
            {(filteredPlanets.length > 0
              ? Object.keys(filteredPlanets[0])
              : Object.keys(planets[0])
            ).map((title) => (
              <th
                key={ title }
                style={ {
                  background: '#2E3035',
                  border: '1px solid #000000',
                  borderRadius: '1px 0px 0px 0px',

                  fontFamily: 'Epilogue',
                  fontStyle: 'normal',
                  fontWeight: '700',
                  fontSize: '14px',
                  lineHeight: '18px',
                  /* or 129% */

                  color: '#FFFFFF',
                } }
              >
                {(title.charAt(0).toUpperCase() + title.slice(1)).replace(/_/, ' ')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredPlanets
            .map((planet) => (
              <tr key={ planet.name }>
                {
                  Object.values(planet).map((entry) => (
                    <th
                      key={ entry.name }
                    >
                      {entry}
                    </th>
                  ))
                }
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default Table;
