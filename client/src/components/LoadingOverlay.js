import React from 'react';

export default (props) => {
  if(props.show){
    return (<div className={"loading-overlay" + (props.bg? ' bg' : '')}><div className="loader"></div></div>);
  }else{
    return (<div></div>);
  }
}
