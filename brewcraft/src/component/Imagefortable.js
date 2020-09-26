import React from 'react';
export default function Imagefortable ({ cell }) {
    return (
      <img
        className="d-flex ml-3 rounded-circle"
        src={cell}
        alt="Generic placeholder"
        height="37"
      />
    );
  };
  