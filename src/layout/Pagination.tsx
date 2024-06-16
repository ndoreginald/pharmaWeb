

const Pagination = ({ productsPerPage, totalProducts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a href="#" className="page-link" onClick={(e) => { e.preventDefault(); if (currentPage > 1) paginate(currentPage - 1); }}>
            Previous
          </a>
        </li>
        {pageNumbers.map(number => (
          <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
            <a onClick={(e) => { e.preventDefault(); paginate(number); }} href="#" className="page-link">
              {number}
            </a>
          </li>
        ))}
        <li className={`page-item ${currentPage === pageNumbers.length ? 'disabled' : ''}`}>
          <a href="#" className="page-link" onClick={(e) => { e.preventDefault(); if (currentPage < pageNumbers.length) paginate(currentPage + 1); }}>
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
