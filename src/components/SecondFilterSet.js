import React, { useContext } from 'react';
import styles from '../styles/SecondFilterSet.module.css';
import PlanetsContext from '../context/PlanetsContext';

function SecondFilterSet() {
  const {
    setSortedColumn,
  } = useContext(PlanetsContext);

  const obj = {
    order: { column: 'population', sort: 'ASC' },
  };

  return (
    <>
      <div
        className={ styles.order_dropbox }
      >
        <label htmlFor="columnSort">
          Ordenar:
          {' '}
          <select
            id="columnSort"
            data-testid="column-sort"
            onClick={ ({ target }) => {
              obj.order.column = target.value;
            } }
          >
            <option
              value="population"
            >
              population
            </option>
            <option
              value="orbital_period"
            >
              orbital_period
            </option>
            <option
              value="diameter"
            >
              diameter
            </option>
            <option
              value="rotation_period"
            >
              rotation_period
            </option>
            <option
              value="surface_water"
            >
              surface_water
            </option>
          </select>
        </label>
      </div>
      <div
        className={ styles.order_div }
      >
        <div className={ styles.asc_div }>
          <input
            style={ { marginRight: '5px' } }
            id="ASC"
            type="radio"
            value="ASC"
            data-testid="column-sort-input-asc"
            name="or"
            onClick={ () => {
              obj.order.sort = 'ASC';
              return obj;
            } }
          />
          {' '}
          Ascendente
        </div>
        <div
          className={ styles.asc_div }
        >
          <input
            style={ { marginRight: '5px' } }
            type="radio"
            value="DESC"
            data-testid="column-sort-input-desc"
            name="or"
            onClick={ () => {
              obj.order.sort = 'DESC';
              return obj;
            } }
          />
          {' '}
          Descendente
        </div>
      </div>
      <button
        className={ styles.order_button }
        type="button"
        data-testid="column-sort-button"
        onClick={ () => {
          console.log(obj);
          return setSortedColumn(obj);
        } }
      >
        Ordenar
      </button>
    </>
  );
}

export default SecondFilterSet;
