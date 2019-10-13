import React, { Component } from 'react';

function Final(props) {
  return (
    <div>
      <h3 className="final">Congratulations! You're now ready to use the turret!</h3>
  
      <button className="goToMindType" onClick={props.finalHandler}>Use the turret</button>
  
    </div>
  )
}

export default Final;