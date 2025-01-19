import React from 'react';

interface StarsProps extends React.SVGProps<SVGSVGElement> {
  // You can add any other custom props here if needed

}

const Stars: React.FC<StarsProps> = (props) => {
  return (
    <svg
      className="svg svg--stars"
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.99999 14.8917L15.15 18.0001L13.7833 12.1417L18.3333 8.20008L12.3417 7.68341L9.99999 2.16675L7.65832 7.68341L1.66666 8.20008L6.20832 12.1417L4.84999 18.0001L9.99999 14.8917Z"
        fill="#FFAF45"
      />
    </svg>
  );
};

export default Stars;
