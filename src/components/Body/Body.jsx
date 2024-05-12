import React from 'react';
import { useState,useEffect  } from 'react';
import './Body.css';

import Modal from '../Modal/Modal.jsx';
export default function Body(props) {
  return (
    <div class="min-h-50vh mb-5 flex flex-col justify-center">
      <div class="mb-5 flex flex-col items-center">
          {props.names.length === 0 ?
            <span>There are no names</span>
            : (props.names.map((name, index) => (
            <div key={index} class="name-item">
              <span class="flex justify-center ">{name}</span>
            </div>
          )))}
      </div>
      <div className="flex justify-center">
        <button type="button" className="btn btn-blue" onClick={props.onQueueFromBody}>Queue</button>
      </div>
    </div>
  );


}