import React from 'react';

const Loader = ({size,color}) => {
  return (
    <div className={`loader ${color?'border-slate-700':''}`} style={{width:size,height:size}}></div>
  );
};

export default Loader;
