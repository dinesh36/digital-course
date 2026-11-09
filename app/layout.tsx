import React from 'react';
import '../styles/globals.scss';

// Only the document shell. The page chrome (navbar, footer, store) is in the layout of the `(static)` route group,
// which is built once at `next build`.
export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
