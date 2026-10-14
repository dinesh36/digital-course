import React from 'react';
import { IconProps } from '@/ui/types/iconProps';

function HeartIcon({
  width = 24,
  height = 24,
  fill = 'none',
  stroke = 'currentColor',
  strokeWidth = 2,
  className,
}: IconProps & { className?: string }): React.ReactElement {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 30 30"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      stroke={stroke}
      strokeWidth={strokeWidth}
      className={className}
    >
      <path
        d="M26.1666 5.94496C25.5503 5.32835 24.8185 4.83921 24.0131 4.50549C23.2077 4.17177 22.3444 4
        21.4726 4C20.6008 4 19.7375 4.17177 18.9321 4.50549C18.1267 4.83921 17.395 5.32835 16.7786
        5.94496L15.4996 7.22404L14.2205 5.94496C12.9756 4.70004 11.2871 4.00065 9.52649 4.00065C7.7659
        4.00065 6.07742 4.70004 4.8325 5.94496C3.58757 7.18988 2.88818 8.87836 2.88818 10.6389C2.88818
        12.3995 3.58757 14.088 4.8325 15.3329L6.11158 16.612L15.4996 26L24.8875 16.612L26.1666 15.3329C26.7832
        14.7166 27.2724 13.9849 27.6061 13.1794C27.9398 12.374 28.1116 11.5108 28.1116 10.6389C28.1116 9.76714
        27.9398 8.90387 27.6061 8.09846C27.2724 7.29305 26.7832 6.56128 26.1666 5.94496Z"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default HeartIcon;
