import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Table.module.css';
import PlanetsContext from '../context/PlanetsContext';

function Table({ filtering }) {
  const { planets,
    filteredPlanets,
    setFilteredPanets, sortedColumn,
    appliedFilters, setAppliedFilters } = useContext(PlanetsContext);

  useEffect(() => {
    setFilteredPanets(planets);
  }, [planets, setFilteredPanets]);

  const deleteCondition = ({ target }) => {
    const apply = appliedFilters.filter((value, index) => index !== Number(target.name));

    let filteringPlanets = planets;

    apply.forEach((applying) => {
      filteringPlanets = filtering(filteringPlanets, applying);
    });

    setFilteredPanets(filteringPlanets);
    setAppliedFilters(apply);
  };

  const preSorted = sortedColumn.order.sort === 'ASC' ? filteredPlanets
    .sort((a, b) => a[sortedColumn.order.column] - b[sortedColumn
      .order.column]) : filteredPlanets
    .sort((a, b) => b[sortedColumn.order.column] - a[sortedColumn.order.column]);

  return (
    <div style={ { width: '100%' } }>
      <div
        className={ styles.remove_div }
      >
        {appliedFilters.map((applying, index) => (
          <div
            data-testid="filter"
            key={ index }
            className={ styles.filter_div }
          >
            <span>
              {applying.column}
              {' '}
              {applying.compare}
              {' '}
              {applying.number}
            </span>
            <button
              className={ styles.delete_button }
              type="button"
              name={ index }
              onClick={ deleteCondition }
            >
              Apagar
            </button>
          </div>
        )) }
      </div>
      <button
        className={ styles.delete_all }
        type="button"
        data-testid="button-remove-filters"
        onClick={ () => {
          setAppliedFilters([]);
          setFilteredPanets(planets);
        } }
      >
        Remover Filtragens
      </button>
      <div
        style={ {
          height: '48vh',
          overflow: 'scroll',
        } }
      >
        <table>
          <thead>
            <tr>
              {(filteredPlanets.length > 0
                ? Object.keys(filteredPlanets[0])
                : Object.keys(planets[0])
              ).map((title) => (
                <th
                  key={ title }
                >
                  {(title.charAt(0).toUpperCase() + title.slice(1)).replace(/_/, ' ')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(sortedColumn.order.sort === '' ? filteredPlanets : preSorted)
              .map((planet) => (
                <tr key={ planet.name }>
                  {
                    Object.values(planet).map((entry, index) => (
                      index === 0 ? (
                        <th
                          data-testid="planet-name"
                          key={ entry.name }
                          style={ {

                          } }
                        >
                          {entry}
                        </th>
                      ) : (
                        <th
                          key={ entry.name }
                        >
                          {entry}
                        </th>
                      )
                    ))
                  }
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;

Table.propTypes = {
  filtering: PropTypes.func.isRequired,
};
