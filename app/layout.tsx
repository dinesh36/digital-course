import React from 'react';
import '../styles/globals.scss';

// Only the document shell. The page chrome (navbar, footer, store) is in the layout of each route group: `(dynamic)` reads the
// request (path and signed-in user) on every render, `(static)` is built once and so cannot read it.
export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
