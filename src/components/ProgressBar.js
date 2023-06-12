// //////////////////////////////////////////////////////////////////////// //
// /////////////////////////////// IMPORTS //////////////////////////////// //
// //////////////////////////////////////////////////////////////////////// //
import React from 'react';
// import { useSelector } from 'react-redux';
import { Circle, WrapCircles } from './ProgressBarStyles'

// //////////////////////////////////////////////////////////////////////// //
// /////////////////////////// PROGRESSBAR //////////////////////////////// //
// //////////////////////////////////////////////////////////////////////// //
export const ProgressBar = () => {
  // const todolist = useSelector((store) => store.todos.items)

  return (
    <>
      <p>Progressbar</p>
      <WrapCircles>
        <Circle className="per-0">
          <div className="inner">0%</div>
        </Circle>
        <Circle className="per-25">
          <div className="inner">25%</div>
        </Circle>
        <Circle className="per-50">
          <div className="inner">50%</div>
        </Circle>
        <Circle className="per-75">
          <div className="inner">75%</div>
        </Circle>
        <Circle className="per-100">
          <div className="inner">100%</div>
        </Circle>
      </WrapCircles>
    </>
  )
}
// //////////////////////////////////////////////////////////////////////// //
// ///////////////////////////// RETURN JSX /////////////////////////////// //
// //////////////////////////////////////////////////////////////////////// //
