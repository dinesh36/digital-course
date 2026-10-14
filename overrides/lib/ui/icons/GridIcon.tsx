import React from 'react';
import { IconProps } from '@/ui/types/iconProps';

function GridIcon({
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
      <rect x="3" y="3" width="7" height="7" rx="2" fill={fill} />
      <rect x="14" y="3" width="7" height="7" rx="2" fill={fill} />
      <rect x="3" y="14" width="7" height="7" rx="2" fill={fill} />
      <rect x="14" y="14" width="7" height="7" rx="2" fill={fill} />
    </svg>
  );
}

export default GridIcon;
