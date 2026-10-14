import React from 'react';
import { IconProps } from '@/ui/types/iconProps';

function SignOutIcon({
  width = 24,
  height = 24,
  fill = 'none',
  stroke = 'currentColor',
  strokeWidth = 0.9,
  className,
}: IconProps & { className?: string }): React.ReactElement {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M2.50001 12C2.50001 7.30558 6.30558 3.49998 11 3.49998C12.3579 3.49998 13.6401 3.81803 14.7775
        4.38327C15.0248 4.50616 15.3249 4.40533 15.4478 4.15804C15.5706 3.91075 15.4698 3.61066 15.2225
        3.48775C13.95 2.85536 12.5158 2.5 11 2.5C5.75327 2.5 1.5 6.7533 1.5 12C1.5 17.2467 5.7533 21.5 11
        21.5C12.5158 21.5 13.95 21.1446 15.2225 20.5122C15.4698 20.3893 15.5706 20.0893 15.4478 19.842C15.3249
        19.5947 15.0248 19.4938 14.7775 19.6167C13.6401 20.1819 12.3579 20.5 11 20.5C6.3056 20.5 2.50001 16.6944 2.50001 12V12Z"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      <path
        d="M18.3536 7.64646C18.1583 7.45118 17.8417 7.45118 17.6464 7.64646C17.4512 7.84172 17.4512
        8.15831 17.6464 8.35357L20.7929 11.5H12.5C12.2239 11.5 12 11.7239 12 12C12 12.2761 12.2239
        12.5 12.5 12.5H20.7929L17.6464 15.6464C17.4512 15.8417 17.4512 16.1583 17.6464 16.3536C17.8417
        16.5488 18.1583 16.5488 18.3536 16.3536L22.3536 12.3536C22.4005 12.3068 22.4375 12.2512 22.4627
        12.1899C22.4874 12.1296 22.5 12.0651 22.5 12C22.5002 11.8727 22.4516 11.7501 22.3643 11.6575L22.3523
        11.6452L18.3536 7.64646Z"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}

export default SignOutIcon;
