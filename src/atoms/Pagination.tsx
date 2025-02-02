import { useState, useEffect } from "react";
import classNames from "classnames";

import Button from "../quarks/Button";

export default function Pagination() {
  // --- State ---
  const [page, setPage] = useState<number>(1);
  const [pageOptions, setPageOptions] = useState<number[]>([1, 2, 3, 4, 5]);
  const [loading, setLoading] = useState<boolean>(false);

  // --- Props ---

  // Handles the changing of the page.
  const changePage = (newPage: number) => {
    // Ensure that the new page cannot be set lower than 1!
    if (newPage < 1) return;

    // Set loading to true
    setLoading(true);

    // Set the new current page.
    setPage(newPage);

    // Handle the chane of params here...

    if (newPage >= 1 && newPage <= 3) {
      // If the new page is anywhere between 1 and 4:
      setPageOptions([1, 2, 3, 4, 5]);
    } else {
      // In all other cases../
      setPageOptions([
        newPage - 2,
        newPage - 1,
        newPage,
        newPage + 1,
        newPage + 2,
      ]);
    }
    // Set loading to false
    setLoading(false);
  };

  return (
    <div className="pagination">
      <Button
        onClick={() => changePage(page - 1)}
        disabled={loading}
        className="btn btn--green btn--previous"
        type="button"
      >
        <svg
          className="svg svg--chevron-left"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <title>chevron-left</title>
          <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
        </svg>
      </Button>
      {pageOptions.map((pageOption, index) => (
        <Button
          key={index}
          disabled={loading}
          className={classNames(
            "btn",
            page !== pageOption && "btn--gray2",
            page === pageOption && "btn--green"
          )}
          type="button"
          onClick={() => changePage(pageOption)}
        >
          <span className="btn__text">{pageOption}</span>
        </Button>
      ))}
      <Button
        onClick={() => changePage(page + 1)}
        disabled={loading}
        className="btn btn--green btn--to-next"
        type="button"
      >
        <svg
          className="svg svg--chevron-right"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <title>chevron-right</title>
          <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
        </svg>
      </Button>
    </div>
  );
}
