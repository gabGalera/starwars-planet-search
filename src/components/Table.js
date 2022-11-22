import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Table({ planets }) {
  const [filteredPlanets, setFilteredPanets] = useState([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    setFilteredPanets(planets);
  }, [planets]);

  const filterFunc = ({ target }) => {
    setInputText(target.value);
    const newArray = planets.filter((planet) => planet.name.includes(target.value));
    setFilteredPanets(newArray);
  };

  return (
    <>
      <input
        type="text"
        value={ inputText }
        onChange={ filterFunc }
        data-testid="name-filter"
      />
      <table style={ { overflow: 'hidden' } }>
        <thead>
          <tr>
            {Object.keys(planets[0]).map((title) => (
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
                {title}
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

Table.propTypes = {
  planets: PropTypes.shape().isRequired,
};

export default Table;
