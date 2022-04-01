import axios from 'axios';
import { React, useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import Card from '../components/Card/Card';
import Pagination from '../components/Pagination/Pagination';

function Movies() {

  const [popularList, setPopularList] = useState({
    isFetched: false,
    data: {},
    totalPage: null,
    error: null
  });

  const [activePage, setActivePage] = useState(1);

  const activePageHandler = (page) => {
    setActivePage(page)
  }

  useEffect(() => {
    axios.get('https://api.themoviedb.org/3/movie/popular', {
      params: {
        api_key: "bd2c8dad4fadd7120948aecf82cd2432",
        page: activePage
      }
    })
      .then(function(response) {
        setPopularList({
          isFetched: true,
          data: response.data,
          totalPage: response.data.total_page,
          error: false
        })
      })
      .catch(function(error) {
        setPopularList({
          isFetched: true,
          data: [],
          totalPage: null,
          error: error
        })
      })
  }, [activePage]);

  
  return ( 
    <div className="movie">
      {
        popularList.isFetched ? (
          <div className="container">
            <Pagination activePage={activePage} totalPage={popularList.totalPage} setCurrentPage={activePageHandler} />
            <div className="row">
              {
                popularList.data.results.map((movie, index) => (
                  <div key={movie.id} className="card">
                    <Link to={`/movie/${movie.id}`} className="card-link">
                      <img className='card-image' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                      <p className='card-title'>{movie.title}</p>
                      <div className="card-play-wrap">
                        <i className='card-play bx bx-play-circle'></i>
                      </div>
                      <p className='card-rating'>{movie.vote_average}</p>
                    </Link>
                  </div>
                ))
              }
            </div>
          </div>
        ) : (
          <h1 className="loading">Loading...</h1>
        )
      }
    </div>
   );
}

export default Movies;