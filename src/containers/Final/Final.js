import React, { Component } from 'react';

function Final(props) {
  return (
    <div>
      <h3 className="final">Congratulations! You're now ready to use MindType!</h3>
  
  <button className="goToMindType" onClick={props.finalHandler}>Go to MindType</button>
  
    </div>
  )
}

export default Final;