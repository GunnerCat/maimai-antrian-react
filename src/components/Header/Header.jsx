import React from 'react';
import './Header.css';
import BemacoLogo from '../../assets/BemacoLogo.png'
export default function Header() {

    return (
      <header class="flex flex-col item-center mb-5 justify-center">
          <div class="flex justify-center">
            <img src={BemacoLogo} class='object-cover justify-bottom'></img>
          </div>
          <div class="flex ">Antrian Maimai Hari ini</div>
          <div class="flex ">Day, DD/MM/YYYY</div>

      </header>
    );
  
  
  }