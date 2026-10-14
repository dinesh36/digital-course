import React from 'react';
import { IconProps } from '@/ui/types/iconProps';

function SettingsIcon({
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
      {/* Gear shape */}
      <path
        d="M19.14 12.94c.04-.3.06-.61.06-.94s-.02-.64-.06-.94l2.03-1.58a.5.5 0 00.12-.64l-1.92-3.32a.5.5
        0 00-.6-.22l-2.39.96a7.028
        7.028 0 00-1.63-.94l-.36-2.54A.5.5 0 0013.9 2h-3.8a.5.5 0 00-.49.41l-.36 2.54c-.59.23-1.14.54-1.63.94l-2.39-.96a.5.5
        0 00-.6.22L2.7
        8.47a.5.5 0 00.12.64l2.03 1.58c-.04.3-.06.61-.06.94s.02.64.06.94l-2.03 1.58a.5.5 0
        00-.12.64l1.92 3.32c.14.24.43.34.69.22l2.39-.96c.49.4
        1.04.72 1.63.94l.36 2.54c.05.24.25.41.49.41h3.8c.24 0 .44-.17.49-.41l.36-2.54c.59-.23
        1.14-.54 1.63-.94l2.39.96c.26.12.55.02.69-.22l1.92-3.32a.5.5 0
        00-.12-.64l-2.03-1.58z"
        stroke={fill}
        strokeWidth="1.5"
      />

      {/* Inner circle */}
      <circle
        cx="12"
        cy="12"
        r="3"
        stroke={fill}
        strokeWidth="1.5"
      />
    </svg>
  );
}

export default SettingsIcon;
