import React from 'react';

export default ({ leftElem, rightElem }) => (
  <div className="row mb2">
    <div className="col-md-6">
      {leftElem}
    </div>
    <div className="col-md-6">
      {rightElem}
    </div>
  </div>
);
