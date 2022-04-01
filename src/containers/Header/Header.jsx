import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './header.css';
import Logo from '../../assets/images/logo.png';
import { SearchedMovie } from '../../pages';

function Header() {

  const [searchValue, setSearchValue] = useState('');

  const navigate = useNavigate()

  useEffect(() => {
    if (searchValue.length > 0) {
      navigate(`/search`)
    } else {
      navigate(`/`)
    }
  }, [searchValue]);

  return ( 
    <div className="header">
      <div className="container">
        <div className="header-inner">
          <Link className='header-logo__wrap' to="/">
            <img className='header-logo' src={Logo} alt="Logo" />
          </Link>
          <div>
            <Link className='header-link' to="/movies">Movies</Link>
            <Link className='header-link' to="/shows">TV-shows</Link>
            <Link className='header-link' to="/series">Series</Link>
            <Link className='header-link' to="/sport">Sport</Link>
          </div>
          <div className='header-search-wrap'>
            <input 
              onChange={(e) => setSearchValue(e.target.value)} 
              className='header-search' 
              type="search" 
              placeholder='Search...' 
            />
            <i className='search-icon bx bx-search'></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;