import React from "react";
 
const Popup = props => {
  return (
    <div className="fixed">
      <div className="relative">
        <span className="fixed" onClick={props.handleClose}>x</span>
        {props.content}
      </div>
    </div>
  );
};
 
export default Popup;