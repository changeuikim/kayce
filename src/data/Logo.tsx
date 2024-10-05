import React from 'react';

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
}

const Logo: React.FC<LogoProps> = ({ width = 55, height = 55, ...props }) => {
  return (
    <svg
      version="1.2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 55 55"
      width={width}
      height={height}
      {...props}
    >
      <title>Red Line Logo</title>
      <defs>
        <linearGradient
          id="g1"
          x2="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(50.658,0,0,28.947,0,1.932)"
        >
          <stop offset="0" stopColor="#ff0000" />
          <stop offset="1" stopColor="#aa0000" />
        </linearGradient>
        <linearGradient
          id="g2"
          x2="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(50.658,0,0,28.947,4.342,24.12)"
        >
          <stop offset="0" stopColor="#ff0000" />
          <stop offset="1" stopColor="#aa0000" />
        </linearGradient>
      </defs>
      <path fill="url(#g1)" d="M0 30.9L28.9 2H50.7L21.7 30.9z" />
      <path fill="url(#g2)" d="M4.3 53L33.3 24.1H55L26.1 53z" />
    </svg>
  );
};

export default Logo;
