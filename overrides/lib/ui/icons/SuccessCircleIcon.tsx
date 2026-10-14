import React from 'react';
import { IconProps } from '@/ui/types/iconProps';

function SuccessCircleIcon({
  width = 24, height = 24, fill = 'currentColor', className,
}: IconProps & { className?: string }): React.ReactElement {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C14.1 3 16.03 3.72 17.56 4.93"
        stroke={fill}
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      <path d="M8 12.5L11 15.5L20 8" stroke={fill} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default SuccessCircleIcon;
