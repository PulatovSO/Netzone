import React from 'react';
import './Pagination.css'

function Pagination({ activePage, totalPage, setCurrentPage }) {
  return ( 
    <div className="pagination">
      <button disabled={activePage <= 1 ? 'true' : ''} onClick={() => setCurrentPage(activePage - 1)} className="previous"><i class='bx bxs-chevron-left'></i></button>
      <span className="current-page">{activePage}</span>
      <button disabled={activePage >= totalPage ? 'true' : ''} onClick={() => setCurrentPage(activePage + 1)} className="next"><i class='bx bxs-chevron-right'></i></button>
    </div>
   );
}

export default Pagination;