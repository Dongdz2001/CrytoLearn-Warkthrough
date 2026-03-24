import React from 'react';
import './AlphabetTable.css';

const AlphabetTable = ({ topData, bottomData }) => {
  const defaultTop = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const defaultBottom = Array.from({ length: 26 }, (_, i) => i);

  const top = topData || defaultTop;
  const bottom = bottomData || defaultBottom;

  return (
    <div className="alphabet-container fade-in">
      <div className="alphabet-grid">
        {top.map((item, index) => (
          <div key={index} className="alphabet-cell">
            <span className="alphabet-letter">{item}</span>
            <span className="alphabet-index">{bottom[index]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlphabetTable;
