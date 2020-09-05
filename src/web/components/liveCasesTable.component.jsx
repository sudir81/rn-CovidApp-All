import React from 'react';
import './liveCasesTable.css';
import {v4 as uuidv4} from 'uuid';
import numeral from 'numeral';

const LiveCasesTable = ({countries}) => {
  return (
    <div className="casesTable">
      {countries.map(({country, cases}) => (
        <tr key={uuidv4()}>
          <td>{country}</td>
          <td>{numeral(cases).format('0,0')}</td>
        </tr>
      ))}
    </div>
  );
};

export default LiveCasesTable;
