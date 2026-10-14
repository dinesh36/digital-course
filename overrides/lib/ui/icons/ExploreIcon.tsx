import React from 'react';
import { IconProps } from '@/ui/types/iconProps';

function ExploreIcon({
  width = 24,
  height = 24,
  fill = 'currentColor',
  className,
}: IconProps & { className?: string }): React.ReactElement {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer circle */}
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke={fill}
        strokeWidth="2"
      />

      {/* Compass needle */}
      <path
        d="M14.5 9.5L13 13L9.5 14.5L11 11L14.5 9.5Z"
        fill={fill}
      />
    </svg>
  );
}

export default ExploreIcon;
