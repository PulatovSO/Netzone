import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './assets/styles/main.css';
import Header from './containers/Header/Header';
import {
  Home,
  Movies,
  Shows,
  SingleShow,
  SingleMovie,
  SearchedMovie
 } from './pages'


function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/shows" element={<Shows />} />
        <Route path="/movie/:id" element={<SingleMovie />} />
        <Route path="/show/:id" element={<SingleShow />} />
        <Route path="/search" element={<SearchedMovie />} />
      </Routes>
    </div>
  );
}

export default App;
