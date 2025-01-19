import { useState } from "react";

import classNames from "classnames";

type RatingFilterProps = {
  onRatingSelect: (newRating: number) => void;
};

const RatingFilter: React.FC<RatingFilterProps> = (props) => {
  // Props
  const { onRatingSelect } = props;

  // We want 5 stars to be rendered
  const starCount = 5; // Do not change in order to prevent breaking the CSS
  const [hoveredStarIndex, setHoveredStarIndex] = useState<number>(0);
  // The selectedStarIndex is the filter!
  const [selectedStarIndex, setSelectedStarIndex] = useState<number>(0);

  // When the user hovers over a star, this should be detected and the styling of the relevant element should change.
  const handleMouseEnter = (index: number) => {
    setHoveredStarIndex(index);
  };

  // When the user removes the mouse from any a star, remove the hover state by resetting it to 0.
  const handleMouseLeave = () => {
    setHoveredStarIndex(0);
  };

  // Function that handles the selection of rating
  const handleRatingSelect = (index: number) => {
    setSelectedStarIndex(index);
    onRatingSelect(index);
  };

  return (
    <div
      className={classNames(
        "rating-filter",
        `rating-filter--hovered-${hoveredStarIndex}`,
        `rating-filter--hovered-${selectedStarIndex}`
      )}
    >
      {Array.from({ length: starCount }, (_, index) => (
        <button
          type="button"
          className="btn btn--star"
          key={index}
          onMouseEnter={() => handleMouseEnter(index + 1)} // Set hovered index on mouse enter
          onMouseLeave={handleMouseLeave} // Reset on mouse leave
          onClick={() => handleRatingSelect(index + 1)} // Set the selected element upon click on the star
        >
          <svg
            className={classNames(
              "svg",
              "svg--stars",
              hoveredStarIndex > index && "svg--hoverState",
              selectedStarIndex > index && "svg--selectedState"
            )}
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.99999 14.8917L15.15 18.0001L13.7833 12.1417L18.3333 8.20008L12.3417 7.68341L9.99999 2.16675L7.65832 7.68341L1.66666 8.20008L6.20832 12.1417L4.84999 18.0001L9.99999 14.8917Z"
              fill="#5959597a"
            />
          </svg>
        </button>
      ))}
    </div>
  );
};

export default RatingFilter;
