import React from 'react';

import './styles.css';

class Trane extends React.Component {
  render() {
    return (
      <div className="grid">
        {/* shapes */}
        <div className="cell1">
          <div className="circle"></div>
        </div>
        <div className="cell2">
          <div className="rectangle"></div>
        </div>
        <div className="cell3">
        </div>
        <div className="cell4">
          <div className="rectangle"></div>
        </div>
        <div className="cell5">
          <div className="rectangle"></div>
        </div>
        <div className="cell6">
          <div className="rectangle"></div>
        </div>
        <div className="cell7">
          <div className="rectangle"></div>
        </div>

        {/* text */}
        <div className="cell8">
          <span className="text">m</span>
        </div>
        <div className="cell9">
          <span className="text">a</span>
        </div>
        <div className="cell10">
          <span className="text">r</span>
        </div>
        <div className="cell11">
          <span className="text">in</span>
        </div>
        <div className="cell12">
          <span className="text">e</span>
        </div>
        <div className="cell13">
          <span className="text">ll</span>
        </div>
        <div className="cell14">
          <span className="text">i</span>
        </div>

        <div className="cell15">
          <span className="text">John Marinelli</span>
        </div>
      </div>
    );
  }
};

export default Trane;
