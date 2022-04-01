import axios from 'axios';
import { React, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './SingleMovie.css';

function SingleMovie() {
  
  const {id} = useParams()

  const [movie, setMovie] = useState({
    isFetched: false,
    data: {},
    error: null
  });

  const [movieVideos, setMovieVideos] = useState({
    isFetched: false,
    data: {},
    error: null
  });

  const [SimilarMovies, setSimilarMovies] = useState({
    isFetched: false,
    data: {},
    error: null
  });

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
      params: {
        api_key: "bd2c8dad4fadd7120948aecf82cd2432"
      }
    })
      .then(function(response) {
        setMovie({
          isFetched: true,
          data: response.data,
          error: false
        })
      })
      .catch(function(error) {
        setMovie({
          isFetched: true,
          data: [],
          error: error
        })
      })

    axios.get(`https://api.themoviedb.org/3/movie/${id}/videos`, {
      params: {
        api_key: "bd2c8dad4fadd7120948aecf82cd2432"
      }
    })
      .then(function(response) {
        setMovieVideos({
          isFetched: true,
          data: response.data,
          error: false
        })
      })
      .catch(function(error) {
        setMovieVideos({
          isFetched: true,
          data: [],
          error: error
        })
      })
    axios.get(`https://api.themoviedb.org/3/movie/${id}/similar`, {
      params: {
        api_key: "bd2c8dad4fadd7120948aecf82cd2432"
      }
    })
      .then(function(response) {
        setSimilarMovies({
          isFetched: true,
          data: response.data,
          error: false
        })
      })
      .catch(function(error) {
        setSimilarMovies({
          isFetched: true,
          data: [],
          error: error
        })
      })
  }, [id]);

  return ( 
    <div className="movie">
      <div className="movie-poster">
        <img className="movie-image" src={`https://image.tmdb.org/t/p/w500${movie.data.backdrop_path}`} alt="movie-banner" />
        <div className="movie-info">
          <h2 className="movie-title">{movie.data.title}</h2>
          <div className="movie-imdb-wrap">
            <span className='imdb-year'>{movie.data.release_date}</span>
            <span className='imdb-rating'><i class='bx bxl-imdb'></i>{movie.data.vote_average}</span>
            <span className='imdb-rating'><i class='bx bxs-movie'></i>{movie.data.vote_count}</span>
          </div>
          <div className="movie-buttons">
            <button className='movie-btn watch-btn'><i class='bx bx-play'></i>Watch online</button>
            <button className='movie-btn fav-btn'><i class='bx bx-plus'></i>add to favourites</button>
          </div>

          <p className="movie-tagline">{movie.data.tagline}</p>
          <p className="movie-date">
            <span className='movie-info-heading'>Year:</span> 
            <span className="movie-info-desc">{movie.data.release_date}</span>
          </p>
          <p className="movie-country">
            <span className='movie-info-heading'>Country:</span> 
            <span className="movie-info-desc">-----</span>
          </p>
          <p className="movie-budget">
            <span className='movie-info-heading'>Budget:</span> 
            <span className="movie-info-desc">${movie.data.budget}</span>
          </p>
          <p className="movie-genres">
            <span className='movie-info-heading'>Genres:</span> 
            <span className="movie-info-desc">-------</span>
          </p>
        </div>
      </div>

      <div className="container">
        <div className="movie-desc">
          <div className="overview-wrap">
            <div className="overview-heading heading">Overiew</div>
            <p className='overview'>{movie.data.overview}</p>
          </div>
          <div className="trailer">
            {
              movieVideos.isFetched ? (
                <div>
                  {
                    movieVideos.data.results.slice(0, 1).map((video, index) => (
                      <iframe width="560" height="315" src={`https://www.youtube.com/embed/${video.key}`} title={video.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    ))
                  }
                </div>
              ) : (
                <h1>Loading...</h1>
              )
            }
          </div>
        </div>
      </div>
      <div className="container">
        <div className="similar-movies">
          <h3 className="similar-heading heading">Similar movies</h3>
          {
            SimilarMovies.isFetched ? (
              <div className='similar-row'>
                {
                  SimilarMovies.data.results.slice(0, 5).map((movie, index) => (
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
            ) : (
              <h1>Loading...</h1>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default SingleMovie;