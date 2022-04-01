import axios from 'axios';
import { React, useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import './Home.css'
function Home() {

  const [topList, setTopList] = useState({
    isFetched: false,
    data: {},
    error: null
  });

  const [popularList, setPopularList] = useState({
    isFetched: false,
    data: {},
    error: null
  });

  const [upcomingList, setUpcomingList] = useState({
    isFetched: false,
    data: {},
    error: null
  });

  useEffect(() => {
    axios.get('https://api.themoviedb.org/3/movie/top_rated', {
      params: {
        api_key: "bd2c8dad4fadd7120948aecf82cd2432"
      }
    })
      .then(function(response) {
        setTopList({
          isFetched: true,
          data: response.data,
          error: false
        })
      })
      .catch(function(error) {
        setTopList({
          isFetched: true,
          data: [],
          error: error
        })
      })

    axios.get('https://api.themoviedb.org/3/movie/popular', {
      params: {
        api_key: "bd2c8dad4fadd7120948aecf82cd2432"
      }
    })
      .then(function(response) {
        setPopularList({
          isFetched: true,
          data: response.data,
          error: false
        })
      })
      .catch(function(error) {
        setPopularList({
          isFetched: true,
          data: [],
          error: error
        })
      })

    axios.get('https://api.themoviedb.org/3/movie/upcoming', {
      params: {
        api_key: "bd2c8dad4fadd7120948aecf82cd2432"
      }
    })
      .then(function(response) {
        setUpcomingList({
          isFetched: true,
          data: response.data,
          error: false
        })
      })
      .catch(function(error) {
        setUpcomingList({
          isFetched: true,
          data: [],
          error: error
        })
      })
  }, []);


  return ( 
    <div className="home">

      {
        popularList.isFetched ? (
          <div className="home-banner">
            <img className="movie-image" src={`https://image.tmdb.org/t/p/w500${popularList.data.results[0].backdrop_path}`} alt="movie-banner" /> 
          </div>
        ) : (
          ''
        )
      }


      {
        topList.isFetched ? (
          <div className="container section">
            <button className='section-header-btn'>Top rated <i class='bx bx-chevron-right'></i></button>
            <div className="row">
              {
                topList.data.results.slice(0, 5).map((movie, index) => (
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

      {
        popularList.isFetched ? (
          <div className="container section">
            <button className='section-header-btn'>Popular <i class='bx bx-chevron-right'></i></button>
            <div className="row">
              {
                popularList.data.results.slice(0, 5).map((movie, index) => (
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

      {
        upcomingList.isFetched ? (
          <div className="container section">
            <button className='section-header-btn'>Upcoming <i class='bx bx-chevron-right'></i></button>
            <div className="row">
              {
                upcomingList.data.results.slice(0, 5).map((movie, index) => (
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

export default Home;