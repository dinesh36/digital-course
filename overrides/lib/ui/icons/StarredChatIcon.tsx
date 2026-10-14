import React from 'react';
import { IconProps } from '@/ui/types/iconProps';

function StarredChatIcon({
  width = 120,
  height = 120,
  fill = 'none',
  className,
}: IconProps & { className?: string }): React.ReactElement {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 120 120"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Decorative Dots */}
      <circle cx="18" cy="28" r="3" fill="#C4B5FD" />
      <circle cx="100" cy="24" r="2.5" fill="#DDD6FE" />
      <circle cx="14" cy="76" r="2.5" fill="#DDD6FE" />
      <circle cx="106" cy="80" r="3" fill="#C4B5FD" />
      <circle cx="32" cy="12" r="2" fill="#E9D5FF" />
      <circle cx="88" cy="10" r="2" fill="#E9D5FF" />

      {/* Chat Bubble */}
      <path
        d="M60 18C41.7746 18 27 30.9837 27 47C27 63.0163 41.7746 76 60 76C64.6947 76 69.1604 75.1223 73.1724
        73.5433L88.5 82L84.6804 67.9607C90.4718 62.6541 93 55.1656 93 47C93 30.9837 78.2254 18 60 18Z"
        fill="#EDE9FE"
      />

      {/* Star */}
      <path
        d="M60 34L64.3262 43.0385L74 44.4549L67 51.2727L68.6525 61L60 56.3077L51.3475 61L53 51.2727L46
        44.4549L55.6738 43.0385L60 34Z"
        fill="#7C3AED"
      />
    </svg>
  );
}

export default StarredChatIcon;
