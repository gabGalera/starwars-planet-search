import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from '../context/PlanetsContext';
import styles from '../styles/FirstFilterSet.module.css';

function FirstFilterSet({ filtering }) {
  const { planets,
    setFilteredPanets,
    setColumn,
    compare, setCompare,
    number, setNumber,
    appliedFilters, setAppliedFilters } = useContext(PlanetsContext);

  const filterColumn = (value) => {
    setColumn(value);
  };

  const handleClick = () => {
    const apply = [...appliedFilters, {
      column: document.getElementById('columnFilter').value,
      compare,
      number,
    }];

    let filteringPlanets = planets;

    apply.forEach((applying) => {
      filteringPlanets = filtering(filteringPlanets, applying);
    });

    setColumn(document.getElementById('columnFilter').value);
    setFilteredPanets(filteringPlanets);
    setAppliedFilters(apply);
  };

  return (
    <>
      <div
        className={ styles.column_div }
      >
        <label
          htmlFor="columnFilter"
        >
          Coluna:
          {' '}
          <select
            id="columnFilter"
            onClick={ ({ target }) => filterColumn(target.value) }
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
        </label>
      </div>
      <div
        className={ styles.column_div }
      >

        <label
          htmlFor="columnFilter"
        >
          Operator:
          {' '}
          <select
            data-testid="comparison-filter"
            onChange={ ({ target }) => setCompare(target.value) }
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
        </label>
      </div>
      <input
        className={ styles.value_filter }
        type="number"
        data-testid="value-filter"
        value={ number }
        onChange={ ({ target }) => setNumber(target.value) }
      />
      <button
        className={ styles.filter_button }
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filtrar
      </button>
    </>
  );
}

export default FirstFilterSet;

FirstFilterSet.propTypes = {
  filtering: PropTypes.func.isRequired,
};
