import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
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
          {(sortedColumn.order.sort === '' ? filteredPlanets : preSorted)
            .map((planet) => (
              <tr key={ planet.name }>
                {
                  Object.values(planet).map((entry, index) => (
                    index === 0 ? (
                      <th
                        data-testid="planet-name"
                        key={ entry.name }
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
  );
}

export default Table;

Table.propTypes = {
  filtering: PropTypes.func.isRequired,
};
