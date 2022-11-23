import React, { useEffect, useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';
// import TrashIcon from './TrashIcon';

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

  const handleClick = () => {
    const apply = [...appliedFilters, {
      column,
      compare,
      number,
    }];

    let filteringPlanets = planets;

    apply.forEach((applying) => {
      filteringPlanets = filtering(filteringPlanets, applying);
    });

    setFilteredPanets(filteringPlanets);
    setAppliedFilters(apply);
  };

  const deleteCondition = ({ target }) => {
    const apply = appliedFilters.filter((value, index) => index !== Number(target.name));

    let filteringPlanets = planets;

    apply.forEach((applying) => {
      filteringPlanets = filtering(filteringPlanets, applying);
    });

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
      <div>
        <div
          style={ {
            display: 'flex',
            flexDirection: 'column',
            margin: '4px',
          } }
        >
          {appliedFilters.map((applying, index) => (
            <div data-testid="filter" key={ index }>
              <span
                style={ {
                  margin: '4px',
                } }
              >
                {applying.column}
                {' '}
                {applying.compare}
                {' '}
                {applying.number}
              </span>
              <button
                type="button"
                style={ {
                  display: 'flex',
                  width: '5%',
                } }
                name={ index }
                onClick={ deleteCondition }
              >
                Apagar
              </button>
            </div>
          )) }
        </div>
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ () => {
            setAppliedFilters([]);
            setFilteredPanets(planets);
          } }
        >
          Remover Filtragens
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
      </div>
    </>
  );
}

export default Table;
