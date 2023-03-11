import React from 'react';

const Pagination = ( units: {unitsPerPage: any, totalUnits: any, paginate: any, currentPage: any} ) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(units.totalUnits / units.unitsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination justify-center pl-36 md:pl-0 lg:pl-0'>
        {pageNumbers.map(number => (
          <li key={number} className='m-0 lg:m-3 px-2'>
            <a onClick={() => units.paginate(number)} className={number == units.currentPage ? 'active' : 'pagination-btn'}>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;