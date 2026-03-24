import React from 'react';
import './XorTable.css';

const XorTable = () => {
  const rows = [
    { a: 0, b: 0, res: 0 },
    { a: 0, b: 1, res: 1 },
    { a: 1, b: 0, res: 1 },
    { a: 1, b: 1, res: 0 },
  ];

  return (
    <div className="xor-table-container">
      <div className="xor-table-header">
        <div className="xor-column-label">Bit A (Data)</div>
        <div className="xor-column-label">Bit B (Key)</div>
        <div className="xor-column-label result">Bit A ⊕ B (Out)</div>
      </div>
      <div className="xor-table-body">
        {rows.map((row, index) => (
          <div key={index} className="xor-row">
            <div className="xor-cell bit-a">{row.a}</div>
            <div className="xor-operator">⊕</div>
            <div className="xor-cell bit-b">{row.b}</div>
            <div className="xor-equals">=</div>
            <div className="xor-cell bit-res">{row.res}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default XorTable;
