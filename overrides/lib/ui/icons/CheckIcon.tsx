import React from 'react';
import { IconProps } from '@/ui/types/iconProps';

function CheckIcon({
  width = 24, height = 24, fill = 'currentColor', className,
}: IconProps & { className?: string }): React.ReactElement {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M5 12.5L10 18L19 5" stroke={fill} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default CheckIcon;
